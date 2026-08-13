# AI 生图指南 — TubeMagic vs Subscribr 对比文配图（4 张）

> 本指南面向 **AI 生图**工作流（即梦 / Midjourney / DALL·E 等），不是截图。核心思路先看下面这一段，再逐张执行。

## 一、生图基本思路（先读这个，90% 的坑都在这里）

**AI 文生图有三个天生短板，做"信息图"时必须绕开：**

1. **文字会乱码**。AI 生成的图里只要出现成段文字，大概率拼错、漏字、或字数和你要的对不上。英文稍好，中文更糟。
2. **结构不可控**。流程箭头、分支、对齐，AI 画出来经常歪；你没法微调某一处。
3. **数字不可信**。图里的价格、百分比，AI 会自己编——这是评测文的红线。

**所以正确的姿势是"分层"：**

> **AI 生图只出"底图/风格层"（无文字或极少文字），所有文字、数字、箭头用 Canva / PowerPoint / HTML-to-screenshot 后期叠加。**
> 你本机已有 HTML-to-screenshot 技能——**流程类、对比类、决策树类图直接用 HTML 排版再截图，文字 100% 精准、还能像素级对齐**，比 AI 生图更可控。AI 生图留给"视觉氛围、卡片底纹、插画感"的图。

**判定表（每张图先看这行）：**

| 图 | 内容属性 | 推荐方式 |
|---|---|---|
| 01-intro | 三工具工作流对比（文字密集） | **HTML 排版截图**（首选）或 Canva；AI 只做背景 |
| 02-compare | 真实 UI 截图 + 红框标注 | **必须真人截图**（AI 无法生成真实界面）；标注用 Canva/PPT |
| 03-pricing | 成本计算卡（数字为主） | AI 生图出卡片底图 + **数字后期叠加**，或直接 HTML |
| 04-verdict | 竖版决策树（文字密集） | **HTML 排版截图**（首选）或 Canva；AI 只做背景 |

---

## 二、逐张方案

### 01-intro.png — 三工具工作流对比图（1200×630）

**内容**（参考改进建议）：
- 左列：TubeMagic → 粘贴频道链接 → 一键生成脚本 + 标题/Tags/描述
- 中列：Subscribr → 挖掘爆款离群视频 → 套用完播率 Hook 模板生成深度脚本
- 底列（参照）：InVideo → Prompt 一键直接导出成品视频

**首选（推荐，文字精准）：** 用 HTML-to-screenshot 技能。结构：三栏卡片（TubeMagic 蓝 / Subscribr 绿 / InVideo 灰做参照弱化），每栏 3 步竖排箭头，底部一条"参照"虚线隔开 InVideo。深色底（`#0f172a`）白字，与文章 CTA 按钮同风格。

**备选（AI 生图 + 后期）：** 提示词生成**无文字**三栏工作流底图，再用 Canva 叠加文字：

```
Prompt（即梦/Midjourney）:
Minimalist 3-column workflow illustration, dark navy background (#0f172a),
three rounded card outlines side by side, subtle upward arrows between steps,
clean flat design, no text, no letters, no numbers, 16:9, high contrast, modern SaaS style
```

生成后：Canva 里在每栏卡片内打字（左 TubeMagic 流程 / 中 Subscribr 流程 / 底 InVideo 参照），中文正文用思源黑体或苹方，英文标签用 Inter。

### 02-compare.png — 脚本编辑器对比 + 红框标注（1200×800）

**内容**（参考改进建议）：
- TubeMagic 截图：红框标出"Claude 模型选择"、"一键生成 Tags/描述"按钮
- Subscribr 截图：红框标出"Hook / Setup / Payoff 完播率结构"提示区
- 各配文字标签（如 👈 选模型 / 👈 完播率拆解）

**方案（AI 生图做不了，必须截图）：**
1. 无痕窗口登录两工具（用各自的免费/试用额度进脚本编辑器），截两张干净 UI 图
2. Canva 或 PowerPoint：左右并排，红色描边矩形框住要突出的区域，加 `👈` 文字标签
3. 导出 PNG 合并到一张

> ⚠️ 不要用 AI 生成"假装是软件界面"的图——读者一看就知道是假的，评测可信度直接崩。真实截图是这篇文信任感的底线。

### 03-pricing.png — "算一笔账"成本对比卡（1200×630）

**内容**（参考改进建议）：
- 外包英文脚本（Upwork/Fiverr）：$50–$100 / 篇
- TubeMagic / Subscribr：约 $2–$4 / 篇（按月产 10 篇折算）
- 视觉化：左边"外包"卡片灰暗放大、右边"AI 工具"卡片高亮金色

**方案（AI 生图出底图 + 数字后期，或直接 HTML）：**
- **HTML 首选**：两张卡片左右对比，数字用大字排版（$50-100 vs $2-4），右侧加"省 90%+"徽章
- **AI 生图备选**：提示词生成无文字双卡片对比底图，数字后期叠加（数字绝不能交给 AI 生成）：

```
Prompt:
Side-by-side comparison cards illustration, dark navy background,
left card dull gray with downward arrow, right card glowing gold with
upward arrow, minimalist flat design, no text, no numbers, 16:9
```

生成后 Canva 叠字：左卡"外包英文脚本 $50–100/篇"，右卡"AI 工具 $2–4/篇"（标"按月产 10 篇折算"小字 + 数据来源注）。

### 04-verdict.png — 竖版决策树（1080×1920 手机友好）

**内容**（参考改进建议）：竖向流动——"你处于什么阶段？→ 选 A / 选 B"，确保手机屏不用放大就能看清。

**首选（HTML，强烈推荐）：** 竖版流：顶部问题框 → 四个分支卡（每卡：场景一句话 + 推荐工具 + 该工具色条）。TubeMagic 蓝、Subscribr 绿、InVideo 灰（参照）、"都不买"灰。字号 ≥ 24px，手机宽度 375px 下可读。

**备选（AI 生图 + 后期）：** 只让 AI 画竖向的抽象流程背景（圆点/连线装饰），**所有分支文字由 Canva 叠加**。AI 直接画带文字的决策树必然乱码。

---

## 三、通用规范

- **尺寸**：横版 1200×630（intro/pricing）、竖版 1080×1920（verdict）、compare 1200×800
- **配色**：沿用文章 CTA 深底 `#0f172a` + 白字；TubeMagic 主蓝、Subscribr 主绿、InVideo 主灰
- **文字后期**：Canva 免费版 / PowerPoint / HTML-to-screenshot 均可；中文用思源黑体/苹方，英文 Inter
- **禁 AI 生成**：任何成段文字、价格数字、真实软件界面——全部后期叠或直接截图
- **产出自检**：生成后放大 100% 检查每个字/数字是否准确，尤其是价格与 "2x-10x / 95+ / 500 积分" 这类数字
