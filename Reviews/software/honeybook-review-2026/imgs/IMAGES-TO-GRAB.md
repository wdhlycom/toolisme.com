# HoneyBook 评测 · 插图提示词（IMAGES-TO-GRAB）

> **配图 AI 必读**：本文件供配图 Agent 使用。生成/抓取前请先访问以下两个文件获取完整上下文：
> - **① 原文/素材文件**：`C:\Users\Holive Hu\Downloads\HoneyBook 平台与联盟营销解析 - Google Gemini.md`（平台定位、竞品格局、配图建议）
> - **② 正文内容文件**：`C:\Users\Holive Hu\Desktop\toolisme\Reviews\software\honeybook-review-2026\honeybook-review-2026-en.md`（英文版正文，插图位置与图注以它为准）
>
> **全局硬规则**：
> 1. 图内文字 100% 纯英文，禁止任何中文（含标签、按钮、图注）。
> 2. AI 不得生成任何文字/数字/数据——凡需文字的图一律用真实截图或 HTML 排版截图。
> 3. 不编造统计数字；趋势/金额/评分只用官方公开数或留空。
> 4. 真实截图优先（Tier 1），第三方精选截图（Mobbin/SaaSFrame 等）只作视觉侦察，禁止直接搬运。

---

## 已就位（无需再生成）

| 图位 | 文件（public/reviews/） | 说明 |
|------|------------------------|------|
| 正文「A Real Look at the Interface」 | `honeybook-ui-email-drafts.webp` | 官方公开 CDN 抓取的真实 UI：AI 邮件建议弹窗（"Answer inquiry and book" / "Send follow up questions"）。已嵌入英文版。 |
| 正文「Who Should Use It」下方 | `honeybook-mobile.png` | 官方公开 CDN 抓取的真实移动端界面：婚礼摄影客户门户相册页。已嵌入英文版。 |

---

## 需抓取/生成的新图位

### 图位 1：Hero 首图 —— Clientflow 管道看板
- **位置**：英文版「What HoneyBook Actually Is」节后、官方视频前（或作为文章头图）。
- **内容**：HoneyBook 标志性的 **Clientflow 管道视图（Pipeline Board）**，横向展示客户阶段：`Inquiry → Proposal Sent → Signed → Paid`。
- **取图方式（按序尝试）**：
  1. Tier 1：HoneyBook 官网（honeybook.com）营销页/功能页/帮助中心公开界面，用 Chrome headless 实截 1200×630；
  2. 若登录墙：改用官方公开博客/帮助中心里展示管道界面的截图。
- **图注（英文）**：*The Clientflow board: every client and project stage at a glance — no more Excel.*
- **Prompt（供配图 AI，若走 HTML 排版截图）**：深色或浅色干净 SaaS 后台风格、横向 kanban 四列（Inquiry / Proposal Sent / Signed / Paid）、每列 2–3 张极简卡片（仅图标+客户名缩写如 "Maya W."），不出现任何具体金额/数字。1200×630，纯英文。

### 图位 2：Smart Files 核心卖点图
- **位置**：英文版「Core Features」节 Smart Files 段落后。
- **内容**：Smart Files 单页交互：左侧精美方案图册，右侧**在线电子签名框 + 信用卡支付组件**，一条链路完成签约付款。
- **取图方式（按序尝试）**：
  1. Tier 1：HoneyBook 官网 Smart Files 功能页/帮助中心公开界面实截；
  2. 若登录墙：官方公开演示图。
- **图注（英文）**：*Smart Files: proposal, contract, and payment in one page — clients sign and pay in a single link.*
- **Prompt（若走 HTML 排版截图）**：单页文件式布局，上部品牌化方案头图（抽象图，无真实客户照片），中部签名框（虚线框 + "Sign here"），底部支付按钮（"Pay deposit"），**无任何具体金额**。1200×630，纯英文。

### 图位 3：推荐机制示意（非必须，若正文已足够可省）
- **位置**：英文版「⭐ The Real Story」节（可选）。
- **内容**：推荐闭环示意：`Your referral link → Peer signs up → You earn $100–$200`。
- **取图方式**：**HTML 排版示意图**（无真实后台可截——Referral Dashboard 在登录墙后）。图标 + 极短标签，**不出现佣金金额数字以外的任何虚构数据**（$100/$200 为官方公开数，可标注来源）。
- **图注（英文）**：*How the member referral loop works: share the link, peers save 30%, you earn per signup.*
- **Prompt**：三段横向流程箭头图（图标：链接图标 → 用户头像组 → 钱包图标），每步仅一个英文短语标签，纯英文、无中文、无多余数字。1200×630。

---

## 技术要点
- 所有新图 1200×630 横版；正文插图用绝对路径 `/reviews/<filename>` 引用。
- 深色底 `#0f172a` + 白字（与 Toolisme 暗色主题一致）或跟随官方界面原色，二者均可；**图内文字必须纯英文**。
- 生成后将成品放入 `public/reviews/`，并在草稿 `Reviews/software/honeybook-review-2026/imgs/` 留同名副本。
- 图片唯一性：正文已用列表/表格枚举的内容（功能清单、价格表、竞品对比表）**不得重画成图**；以上三图位均为"正文没有的视觉结构"，符合规则。
