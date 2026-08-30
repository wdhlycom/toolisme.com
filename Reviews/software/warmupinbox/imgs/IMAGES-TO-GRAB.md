# WarmupInbox 配图指南（imgs/）

本文 4 个插图位。你是 AI 生图，下面把**生图的基本思路**讲透，再给每个槽位的具体做法。

---

## 一、AI 生图的核心认知（必读）

AI 文生图有三大天然短板，直接决定"什么图能用 AI、什么不能"：

1. **文字会乱码**——让它写 "Deliverability 98%" 大概率变成鬼画符。
2. **结构不可控**——让它画"仪表盘布局"十次九个崩。
3. **数字会编**——让它放数据，数字不可信。

**正确姿势 = 分层**：AI 只出**无文字、氛围感、装饰性**的底图（渐变、邮箱图标、网络节点、抽象曲线），**文字 / 数字 / 箭头 / 标签** 全部用 Canva / PPT / HTML-to-screenshot 后期叠加上去。这样既有 AI 的视觉效率，又保证信息准确。

**本篇的特殊性**：WarmupInbox 是 SaaS，最有力的图其实是**真实后台截图**（仪表盘、定价页）。这类图 AI 生不出来（会崩信任感），建议优先真截图；只有"氛围封面图"才用 AI 生底图。

---

## 二、4 个槽位的具体处置

### 01-intro.png — 开场/仪表盘（**建议真截图，非 AI**）
- **内容**：WarmupInbox 后台仪表盘——连接邮箱列表、实时声誉分、预热活跃度曲线。
- **为什么真截图**：读者要"看到真实界面"才有信任。AI 画仪表盘会糊。
- **怎么取**：登录 app.warmupinbox.com → 截图 dashboard 全屏（或连 2-3 个邮箱的概览）。
- **AI 替代方案（若无法登录）**：生成一张"抽象邮箱网络"底图——深底 #0f172a、发光的信封图标连成网络节点、蓝绿渐变。提示词见下。文字标签（"30,000+ real inboxes"）后期用 Canva 叠。

### 02-stack.png — 冷邮件三件套链路图（**本篇新增，对应"生态锚点"段；建议 Canva/PPT 制作，或 AI 生底图 + 后期叠字**）
- **内容**：一条三段流水线 —— 左 `[Snov.io 找客]` → 中 `[WarmupInbox 养号]` → 右 `[Woodpecker 发信]`，三段用箭头连接，每段标注代表工具名 + 一句话职能。
- **为什么做这张**：这是本文"生态锚点"的核心视觉，让读者一眼看懂 WarmupInbox 只是冷邮件链路的中间一环，自然把流量导向同系列的另两篇（Snov.io、Woodpecker）。也是系列三篇"自成体系"的视觉锚。
- **推荐做法**：用 Canva / PPT / HTML-to-screenshot 直接画（文字清晰可控、箭头准确），比 AI 生图更准。这是架构示意图，无需真截图。
- **AI 氛围版（若想要配图氛围）**：生成一张"三段发光路径"深底插画（三个节点由一条光带串起），文字标签（工具名 + 职能）后期用 Canva 叠。提示词见下。

### 03-pricing.png — 定价表（**真截图，非 AI**）
- **内容**：官网 pricing 页三档方案并排（Basic/Pro/Max + 年付/月付价）。
- **怎么取**：访问 warmupinbox.com/pricing，整页截图（已含 SAVE 20% 横幅）。
- 注意：截图即可，无需 AI。若要做社媒分享图，再用 AI 生成深底边框 + 把定价数字手动排上去。

### 04-verdict.png — 决策树（**AI 生底图 + 后期叠字，或真做图表**）
- **内容**：按"邮箱数量 × 新/老域名"映射到工具的可视化。
- **推荐做法**：用 Canva / PPT 直接做一张决策树（文字清晰可控），比 AI 生图更准。
- **AI 氛围版**：若想要配图氛围，生成一张"分叉路口 / 路线图"深底插画，再把决策文字叠上去。

---

## 三、AI 生图 Prompt 模板（仅用于氛围底图）

统一风格：深色科技底 #0f172a，蓝绿渐变光晕，邮箱/网络/盾牌元素，无文字。

**01 氛围底图（邮箱网络）：**
> Dark navy background (#0f172a), glowing envelope icons connected in a mesh network of 30,000+ nodes, teal-to-blue gradient glow, subtle particle trails, minimalist tech illustration, no text, no letters, clean futuristic style

**04 氛围底图（决策/路径）：**
> Dark navy background (#0f172a), a glowing forked roadmap with two paths leading to lit doorways, one path calm one path steep, abstract decision metaphor, teal and amber accent lights, no text, cinematic minimal

**02 氛围底图（三件套链路 / 生态锚点）：**
> Dark navy background (#0f172a), a glowing horizontal path linking three luminous nodes from left to center to right, teal-to-amber gradient flow, subtle data particles traveling along the path, abstract pipeline metaphor, minimalist tech illustration, no text, no letters, no numbers, clean futuristic style

**关键约束（每次都加）**：`no text, no letters, no numbers, no watermark`——杜绝乱码。

---

## 四、后期叠字（用 Canva / PPT / HTML-to-screenshot）
- 字体：站点是英文全球受众，用干净无衬线（Inter / Helvetica）。
- 数据必须手打：Basic $15、Pro $49、Max $79、30,000+ inboxes、4.6/5——不要信 AI 生成的任何数字。
- 导出：1200×630（社媒分享尺寸）或按正文宽度 1200×675。

---

## 五、取图来源 URL（真截图用）
- 仪表盘（登录后）：https://app.warmupinbox.com/
- 定价页：https://www.warmupinbox.com/pricing
- 官网首页（hero/网络说明）：https://www.warmupinbox.com/

> 提醒：真截图里的 WarmupInbox logo / 品牌元素保留即可，无需去水印（那是官网自有品牌，不是第三方水印）。
