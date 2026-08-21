# Snov.io 配图指南（imgs/）

本文 **3 张图 + 1 个视频**（01/02/03 + 06-demo.mp4），04 决策树按 skill 规范**不配图**（写进正文为结构化逻辑）。**01/02/03 + 视频全部已落地**。

---

## 0. AI 生图的核心认知（必读）

AI 文生图三大天然短板：①文字乱码 ②结构不可控 ③数字会编。
**正确姿势 = 分层**：AI 只出无文字氛围底图；文字/数字/标签全部用 Canva/PPT/HTML-to-screenshot 后期叠加。**本篇特殊性**：Snov.io 是 SaaS，最有说服力的是真实界面特写。

---

## 1. 已落地插图

### ✅ imgs/01-intro.png — LinkedIn 插件抓取特写（真截图，已落地）
- **来源:** 用户提供的演示视频 `06-demo.mp4` 关键帧（LinkedIn 搜索"UI/UX Designer"+ Snov.io 插件浮窗）
- **Content:** LinkedIn 搜索结果页 + Snov.io Chrome 插件浮窗，列出 6 个联系人姓名/职位/邮箱 + 验证绿点 + "Select/unselect all" 复选框 + "Save selected" 按钮
- **Type:** `real plugin screenshot`（演示视频抽帧）
- **Desensitization note:** 画面内姓名（Harold Fitch 等）和邮箱（@gmail.com/@yahoo.com/@snov.io）为演示用**示例数据**，非真实用户，无需脱敏；alt 文本已声明。
- **Language:** 100% English（UI 本身是英文）
- **Status:** ✅ 已落地（50092 bytes）

### ✅ imgs/02-feature.png — Drip Campaign 可视化画布（真截图，已落地）
- **来源:** 用户补充（app.snov.io 登录后截图）
- **Content:** Drip Campaign 画布——右侧面板拖拽 Email / Delay / Condition / LinkedIn action / Goal 到画布，虚线连接分支逻辑；AI 写作辅助可见
- **Type:** `real official product screenshot`
- **Language:** 100% English
- **Status:** ✅ 已落地（136477 bytes）

### ✅ imgs/03-pricing.png — 官方定价页（真截图，已落地）
- **来源:** 用户补充（snov.io/pricing 截图）
- **Content:** Trial / Starter / Pro S / Pro M / Pro L / Ultra 各档并排
- **Type:** `real official pricing page screenshot`
- **Language:** 100% English
- **Status:** ✅ 已落地（213380 bytes）

### ✅ imgs/06-demo.mp4 — LinkedIn 插件使用演示视频（真视频，已落地）
- **来源:** 用户提供 `C:/Users/Holive Hu/Desktop/Snovio Service [nezoIcq6Z8E].mp4`（33s，1174×720，VP9/Opus），已重命名为 `06-demo.mp4`（去掉空格/方括号，编译期友好）
- **Content:** LinkedIn 搜索结果 → Snov.io 插件浮窗 → 预览带验证状态的邮箱 → Save selected 整批保存
- **嵌入方式:** `<video src="imgs/06-demo.mp4" controls poster="imgs/01-intro.png" ...>`（poster 用 01-intro 帧，首屏不黑）
- **编译时:** mp4 搬 `public/reviews/snovio-demo.mp4`，md 路径改 `/reviews/snovio-demo.mp4`
- **Status:** ✅ 已落地（2047936 bytes）

---

## 2. 已删除的插图槽位

### ❌ imgs/04-verdict.png — 决策树图（按 skill 规范不配图）
- **Reason:** "Decision trees are NEVER images"——决策树写进正文为结构化分支，由 `SnovioDecisionTree` 组件挂载到 `<div id="snovio-decision-tree">`。
- **旧图:** 文件仍在但 md 不再引用——建议删除（与组件保持一致）。

### ❌ imgs/05-warmup.png — 预热示意曲线（不再使用）
- **Reason:** 05-warmup 是 08-14 生成的示意曲线（"illustrative — trust your own dashboard numbers"），本次重写未引用。
- **升级路径:** 若后续跑 Starter warm-up，用真实 sender reputation 数字重画（HTML 图表）。

---

## 3. 后期叠字（用 Canva / PPT / HTML-to-screenshot）

字体 Inter / Helvetica（英文全球受众）。数据必须手打：Trial 50 credits、Starter $39、Pro S $99、25% off、G2 4.6/5——别信 AI 生成的任何数字。导出 1200×630（社媒分享尺寸）。

---

## 4. 取图来源 URL

- 官方定价页：`https://snov.io/pricing/`
- 后台（登录后）：`https://app.snov.io/`
- Drip Campaigns 文档：`https://snov.io/drip-campaigns/`
- Chrome 扩展：`https://snov.io/extension`
- 演示视频（已入稿）：`imgs/06-demo.mp4`（原文件在桌面 `Snovio Service [nezoIcq6Z8E].mp4`）

> 提醒：真截图里的 Snov.io logo / 品牌元素保留即可；截图务必用**局部特写**，保证手机端文字可读。
