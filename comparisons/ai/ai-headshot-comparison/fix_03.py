from playwright.sync_api import sync_playwright
IMG = r"C:\Users\Holive Hu\Desktop\toolisme\Reviews\ai\ai-headshot-comparison\imgs"
HTML = r"C:\Users\Holive Hu\Desktop\toolisme\Reviews\ai\ai-headshot-comparison\composite-03-v2.html"
with sync_playwright() as p:
    br = p.chromium.launch(channel="chrome", headless=True, args=["--no-sandbox"])
    pg = br.new_page(viewport={"width":1440,"height":1700})
    pg.goto("file:///" + HTML.replace("\\","/").replace(" ","%20"), wait_until="load")
    pg.wait_for_timeout(800)
    pg.screenshot(path=IMG + "\\03-pricing.png", full_page=True)
    print("OK 03-pricing v2 saved")
    br.close()
