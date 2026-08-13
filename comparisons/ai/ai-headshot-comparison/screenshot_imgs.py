import os, datetime
from playwright.sync_api import sync_playwright

IMG = r"C:\Users\Holive Hu\Desktop\toolisme\Reviews\ai\ai-headshot-comparison\imgs"
ART = r"C:\Users\Holive Hu\Desktop\toolisme\Reviews\ai\ai-headshot-comparison"

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

VIEWPORT_SHOTS = [
    ("02-headshotpro", "https://www.headshotpro.com", 1440, 900),
    ("02-aragon", "https://www.aragon.ai", 1440, 900),
]
PRICING = [
    ("p1", "https://www.headshotpro.com/pricing", 1440, 1500),
    ("p2", "https://www.aragon.ai/pricing", 1440, 1500),
    ("p3", "https://betterpic.io/pricing", 1440, 1500),
    ("p4", "https://www.proshoot.co/pricing", 1440, 1500),
]

def capture(page, name, url, w, h):
    page.set_viewport_size({"width": w, "height": h})
    try:
        page.goto(url, wait_until="load", timeout=35000)
    except Exception as e:
        print(f"  [warn] {name} goto load failed: {e}; retry domcontentloaded")
        try:
            page.goto(url, wait_until="domcontentloaded", timeout=35000)
        except Exception as e2:
            print(f"  [ERR] {name} failed completely: {e2}")
            return False
    page.wait_for_timeout(3000)
    out = os.path.join(IMG, f"{name}.png")
    page.screenshot(path=out)
    print(f"  [ok] saved {name}.png")
    return True

def build_composite(paths):
    imgs = "".join(
        f'<div class="cell"><div class="cap">{c}</div><img src="file://{p}"></div>'
        for c, p in paths
    )
    html = f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{{box-sizing:border-box;}}
    body{{margin:0;background:#fff;font-family:"Segoe UI","Microsoft YaHei",Arial,sans-serif;padding:28px;}}
    h1{{font-size:22px;color:#1f2937;margin:0 0 18px;}}
    .grid{{display:grid;grid-template-columns:1fr 1fr;gap:18px;}}
    .cell{{border:1px solid #e5e7eb;border-radius:12px;padding:12px;background:#fafafa;}}
    .cap{{font-size:14px;font-weight:700;color:#374151;margin-bottom:8px;}}
    img{{width:100%;height:auto;display:block;border-radius:6px;}}
    </style></head><body>
    <h1>Pricing comparison — official plans (Aug 2026)</h1>
    <div class="grid">{imgs}</div></body></html>"""
    p = os.path.join(ART, "composite-03.html")
    with open(p, "w", encoding="utf-8") as f:
        f.write(html)
    return p

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
    page = browser.new_page(user_agent=UA, viewport={"width": 1440, "height": 900})
    page.context.set_extra_http_headers({})  # default
    print("== viewport shots (02) ==")
    for name, url, w, h in VIEWPORT_SHOTS:
        capture(page, name, url, w, h)
    print("== pricing shots ==")
    for name, url, w, h in PRICING:
        capture(page, name, url, w, h)
    # composite 03
    print("== composite 03 ==")
    comp_paths = [( "HeadshotPro", os.path.join(IMG, "p1.png")),
                  ( "Aragon.ai", os.path.join(IMG, "p2.png")),
                  ( "BetterPic", os.path.join(IMG, "p3.png")),
                  ( "Proshoot", os.path.join(IMG, "p4.png"))]
    comp_html = build_composite(comp_paths)
    page.goto("file://" + comp_html.replace("\\", "/"), wait_until="load")
    page.wait_for_timeout(800)
    page.screenshot(path=os.path.join(IMG, "03-pricing.png"), full_page=True)
    print("  [ok] saved 03-pricing.png")
    # decision tree 04
    print("== decision tree 04 ==")
    dt = os.path.join(ART, "decision-tree.html").replace("\\", "/")
    page.goto("file://" + dt, wait_until="load")
    page.wait_for_timeout(600)
    page.screenshot(path=os.path.join(IMG, "04-verdict.png"), full_page=True)
    print("  [ok] saved 04-verdict.png")
    browser.close()

# cleanup temp
for t in ["p1.png", "p2.png", "p3.png", "p4.png", "composite-03.html"]:
    try:
        os.remove(os.path.join(IMG if t.endswith('.png') else ART, t))
    except OSError:
        pass
print("DONE", datetime.datetime.now().isoformat())
