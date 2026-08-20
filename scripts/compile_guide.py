#!/usr/bin/env python3
"""
compile_guide.py — Toolisme 指南编译同步脚本（方案 B）

用途
----
你（大师）只在  guides/<slug>.md  写草稿，插图放在  guides/imgs/NN.png
（原文件和插图天然在一起）。本脚本代劳"拆两个文件夹"的脏活：

  1. 把草稿  guides/<slug>.md  复制到构建源  src/content/guides/<slug>.md
  2. 把  guides/imgs/NN.png  优化后搬到  public/guides/<prefix>-NN.{jpg,png}
        - NN == '01' 视为封面照片 -> 转 JPEG（质量 82，最长边 1280，渐进式）
        - 其余视为示意图 -> 保留 PNG（optimize）
  3. 把 md 里的  ![alt](imgs/NN.png)  改写为绝对路径  ![alt](/guides/<prefix>-NN.{ext})

构建源（src/content/guides/）因此成为"生成物"，以草稿为准，避免双份漂移。

用法
----
  python scripts/compile_guide.py <slug> [--prefix PREFIX]

示例
----
  # 键盘指南：用 kb 前缀，复刻已部署的 kb-01.jpg / kb-02.png ...
  python scripts/compile_guide.py how-to-choose-a-mechanical-keyboard --prefix kb

  # 新指南：默认用 slug 作前缀（保证唯一、不撞名）
  python scripts/compile_guide.py my-new-guide

依赖
----
  Pillow（本机 venv: C:/Users/Holive Hu/.workbuddy/binaries/python/envs/default）
  运行：
  C:/Users/Holive Hu/.workbuddy/binaries/python/envs/default/Scripts/python.exe scripts/compile_guide.py <slug> [--prefix PREFIX]
"""
import argparse
import os
import re

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DRAFT_DIR = os.path.join(ROOT, "guides")
BUILD_DIR = os.path.join(ROOT, "src", "content", "guides")
PUB_DIR = os.path.join(ROOT, "public", "guides")

# 匹配 markdown 图片：![alt](imgs/NN.png)
IMG_RE = re.compile(r"!\[([^\]]*)\]\(imgs/(\d{2})\.png\)")


def process_image(num: str, prefix: str, draft_imgs_dir: str, pub_dir: str) -> str:
    """优化并搬图，返回改写后的绝对路径（如 /guides/kb-01.jpg）。"""
    src = os.path.join(draft_imgs_dir, f"{num}.png")
    if not os.path.exists(src):
        raise FileNotFoundError(f"缺少插图：{src}（草稿引用了 imgs/{num}.png 但文件不存在）")

    is_hero = num == "01"
    im = Image.open(src)
    if is_hero:
        im = im.convert("RGB")
        im.thumbnail((1280, 1280))
        rel = f"/guides/{prefix}-{num}.jpg"
        out_path = os.path.join(pub_dir, f"{prefix}-{num}.jpg")
        im.save(out_path, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        im = im.convert("RGBA") if im.mode in ("P", "LA", "RGBA") else im.convert("RGB")
        rel = f"/guides/{prefix}-{num}.png"
        out_path = os.path.join(pub_dir, f"{prefix}-{num}.png")
        im.save(out_path, "PNG", optimize=True)
    return rel


def compile_guide(slug: str, prefix: str | None = None) -> None:
    prefix = prefix or slug
    draft_md = os.path.join(DRAFT_DIR, f"{slug}.md")
    if not os.path.exists(draft_md):
        raise FileNotFoundError(f"草稿不存在：{draft_md}")

    draft_imgs_dir = os.path.join(DRAFT_DIR, "imgs")
    os.makedirs(BUILD_DIR, exist_ok=True)
    os.makedirs(PUB_DIR, exist_ok=True)

    with open(draft_md, encoding="utf-8") as f:
        text = f.read()

    def repl(m: re.Match) -> str:
        alt, num = m.group(1), m.group(2)
        out_rel = process_image(num, prefix, draft_imgs_dir, PUB_DIR)
        return f"![{alt}]({out_rel})"

    new_text = IMG_RE.sub(repl, text)

    out_md = os.path.join(BUILD_DIR, f"{slug}.md")
    with open(out_md, "w", encoding="utf-8") as f:
        f.write(new_text)

    n_imgs = len(IMG_RE.findall(text))
    print(f"✓ 编译完成：{slug}")
    print(f"  构建源 -> {os.path.relpath(out_md, ROOT)}")
    print(f"  插图前缀 -> {prefix}（处理 {n_imgs} 张图，封面转 JPEG）")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="编译 guides/ 草稿到构建源 + public/guides/")
    ap.add_argument("slug", help="指南 slug，对应 guides/<slug>.md")
    ap.add_argument("--prefix", default=None, help="public/guides/ 下图片前缀（默认用 slug）")
    args = ap.parse_args()
    compile_guide(args.slug, args.prefix)
