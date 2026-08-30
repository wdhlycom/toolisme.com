# Geo Targetly 评测 · 插图提示词（IMAGES-TO-GRAB）

> **配图 AI 必读**：本文件供配图 Agent 使用。生成/抓取前请先访问以下两个文件获取完整上下文：
> - **① 原文/素材文件**：`C:\Users\Holive Hu\Desktop\Geo-Targetly-联盟营销推广指南.md`（产品特点、定价、竞品、推广策略）
> - **② 正文内容文件**：`C:\Users\Holive Hu\Desktop\toolisme\Reviews\software\geotargetly-review-2026\geotargetly-review-2026-en.md`（英文版正文，插图位置与图注以它为准）
>
> **全局硬规则**：
> 1. 图内文字 100% 纯英文，禁止任何中文（含标签、按钮、图注）。
> 2. AI 不得生成任何文字/数字/数据——凡需文字的图一律用真实截图或 HTML 排版截图。
> 3. 不编造统计数字；价格/精度/百分比只用官方公开数（正文已核实：国家级 95–99%、州级 80–90%、城市级 70–80%，Dev $9/月年付等，均可直接引用）。
> 4. 真实截图优先（Tier 1），第三方精选截图只作视觉侦察，禁止直接搬运。
> 5. 图片唯一性：正文已用列表/表格枚举的内容（功能清单、价格表、竞品表、精度阶梯）**不得重画成图**；以下图位均为"正文没有的视觉结构"。

---

## 新图位（需抓取/生成）

### 图位 1：Hero 首图 —— 后台规则编辑器（Geo Rules Builder）
- **位置**：英文版「What Geo Targetly Actually Is」节后（或作文章头图）。
- **内容**：Geo Targetly 后台的**规则编辑/定向设置界面**（Region Rules / Targeting 配置面板），直观展示"按国家/地区配置行为"的操作方式。
- **取图方式（按序尝试）**：
  1. Tier 1：官网 `geotargetly.com` 功能页/演示页公开界面，Chrome headless 实截 1200×630；
  2. 若登录墙：官网博客/帮助中心公开截图。
- **图注（英文）**：*The rule builder: pick a region, pick an action — no developer required.*
- **Prompt（若走 HTML 排版截图）**：浅色 SaaS 后台风格，左侧"Add rule"配置面板（Region 下拉 + 行为选项），右侧世界地图或国家列表高亮；仅图标+极短英文标签（如 "US", "Redirect to /us"），**不出现任何真实访客数据/金额**。1200×630，纯英文。

### 图位 2：Geo Currency 换币效果对比图
- **位置**：英文版「Content personalization」段 Geo Currency 处（或其后）。
- **内容**：同一商品页，左/上为 USD 价、右/下为 EUR 价（或其他货币）——"同一个页面，价格随访客自动变"的直观对比。
- **取图方式（按序尝试）**：
  1. Tier 1：官网 Geo Currency 功能页/帮助中心公开演示图；
  2. 若登录墙：官方公开演示截图。
- **图注（英文）**：*Geo Currency: the same product page, priced in the visitor's own currency automatically.*
- **Prompt（若走 HTML 排版截图）**：电商商品卡两张并排（同一商品图占位、同一英文品名），分别标注 "$49.00" 与 "€45.90"（**演示价格，非真实承诺价**，图注注明 illustrative）；中间用箭头或"Auto"标签连接。1200×630，纯英文。

### 图位 3：Geo Link 智能短链分流示意（可选，若正文已充分可省）
- **位置**：英文版「Routing & redirects」段 Geo Link 处（可选）。
- **内容**：一个 Smart Link 按访客位置分到不同落地页的流程示意：`geo.tly/offer → 🇺🇸 /us-deal`、`🇬🇧 /uk-deal`、`🇩🇪 /de-deal`。
- **取图方式**：**HTML 排版示意图**（官方无公开后台图可截）。图标 + 极短英文标签，不出现任何统计数字。
- **图注（英文）**：*One link, many destinations: Geo Link routes each visitor to the landing page that fits.*
- **Prompt**：横向分支图：一个短链图标（标签 "your.link"）分出三支，各带国旗 emoji + 落地页标签；纯英文、无中文、无数字。1200×630。

---

## 技术要点
- 所有新图 1200×630 横版；正文插图用绝对路径 `/reviews/<filename>` 引用。
- 深色底 `#0f172a` + 白字（与 Toolisme 暗色主题一致）或跟随官方界面原色，二者均可；**图内文字必须纯英文**。
- 生成后将成品放入 `public/reviews/`，并在草稿 `Reviews/software/geotargetly-review-2026/imgs/` 留同名副本。
- 货币演示数值仅为示意，正文/图注不得暗示为真实报价。
