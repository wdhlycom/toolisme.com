# WiziShop 评测 · 插图提示词（IMAGES-TO-GRAB）

> **配图 AI 必读**：本文件供配图 Agent 使用。生成/抓取前请先访问以下两个文件获取完整上下文：
> - **① 原文/素材文件**：`C:\Users\Holive Hu\Desktop\WiziShop-联盟营销文章思路.md`（产品定位、三个推广思路）
> - **② 正文内容文件**：`C:\Users\Holive Hu\Desktop\toolisme\Reviews\creator\wizishop-review-2026\wizishop-review-2026-en.md`（英文版正文，插图位置与图注以它为准）
>
> **全局硬规则**：
> 1. 图内文字 100% 纯英文，禁止任何中文（含标签、按钮、图注）。
> 2. AI 不得生成任何文字/数字/数据——凡需文字的图一律用真实截图或 HTML 排版截图。
> 3. 不编造统计数字；正文已核实的官方数可引用（价格 €24.90/€34.90/€99.90/€149.90、7 天试用、2%/1% 交易费；"75 小时 vs 3 小时"为作者实测估算，已标注示意，图内**不得**出现该对比数字）。
> 4. 真实截图优先（Tier 1），第三方精选截图只作视觉侦察，禁止直接搬运。
> 5. 图片唯一性：正文已用列表/表格枚举的内容（功能清单、价格表、竞品表、Quiz 逻辑）**不得重画成图**；以下图位均为"正文没有的视觉结构"。

---

## 新图位（需抓取/生成）

### 图位 1：Hero 首图 —— AI 产品文案生成界面
- **位置**：英文版「The Core: AI Takes the Four Grind Jobs Off Your Plate」节后（或作文章头图）。
- **内容**：WiziShop 后台的 **AI 产品描述生成器** 界面（输入产品名/关键词 → 生成 SEO 描述），直观展示"AI 写文案"的核心场景。
- **取图方式（按序尝试）**：
  1. Tier 1：官网 `wizishop.com` 功能页/演示页公开界面，Chrome headless 实截 1200×630；
  2. 若登录墙：官网博客/帮助中心公开截图。
- **图注（英文）**：*The AI copy generator: name a product, get SEO-ready descriptions in seconds.*
- **Prompt（若走 HTML 排版截图）**：浅色 SaaS 后台风格，左侧输入框（"Product name" + "Keywords" + 生成按钮），右侧输出区显示 2-3 段英文产品描述片段（**示意文案，用占位式通用英文句，不出现真实品牌/价格**）；仅图标+极短英文标签。1200×630，纯英文。

### 图位 2：Pizi 拍照生成产品页示意
- **位置**：英文版「The Core」段 Pizi 处（或其后）。
- **内容**：手机拍照 → AI 生成产品页 的流程示意（`📱 Photo → ✨ Product page`）。
- **取图方式**：**HTML 排版示意图**（官方 App 界面在登录墙后）。图标 + 极短英文标签，无任何文字性数据。
- **图注（英文）**：*Pizi: snap a photo, get a product page — built for high-SKU sellers.*
- **Prompt**：横向三步流程（手机图标 → AI 图标 → 网页卡片图标），每步一个英文短语标签（"Take photo" / "AI builds" / "Product page ready"）；纯英文、无中文、无数字。1200×630。

### 图位 3：多语言/多市场示意（B2B 外贸场景）
- **位置**：英文版「The Angle Nobody Talks About」节（B2B 外贸段落）。
- **内容**：一个产品目录 → 7 国语言版本的示意（`One catalog → 🇫🇷 🇬🇧 🇩🇪 🇮🇹 🇪🇸 🇵🇹 🇳🇱`）。
- **取图方式**：**HTML 排版示意图**（官方无公开图）。图标 + 极短英文标签，不出现任何统计数字。
- **图注（英文）**：*One catalog, seven markets: AI translation removes the European language wall.*
- **Prompt**：左侧单本书/文件夹图标（标签 "One catalog"），右侧 7 个国旗 emoji 横向排列（FR/GB/DE/IT/ES/PT/NL），连接箭头标注 "AI translates"；纯英文、无中文、无数字。1200×630。

---

## 技术要点
- 所有新图 1200×630 横版；正文插图用绝对路径 `/reviews/<filename>` 引用。
- 深色底 `#0f172a` + 白字（与 Toolisme 暗色主题一致）或跟随官方界面原色，二者均可；**图内文字必须纯英文**。
- 生成后将成品放入 `public/reviews/`，并在草稿 `Reviews/creator/wizishop-review-2026/imgs/` 留同名副本。
- 效率对比数字（75 小时 vs 3 小时）已明确标注为示意估算，**图内禁止出现**；如需在图中表达效率提升，用方向性箭头或图标，不写字数。
