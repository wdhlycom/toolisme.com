# Snov.io 配图指南（imgs/）

本文 **5 个插图位**（01/02/03/04/05）。你是 AI 生图，下面把**生图的基本思路**讲透，再给每个槽位的具体做法。

---

## 一、AI 生图的核心认知（必读）

AI 文生图有三大天然短板，直接决定"什么图能用 AI、什么不能"：

1. **文字会乱码**——让它写 "1,000 credits" 大概率变成鬼画符。
2. **结构不可控**——让它画"后台界面"十次九个崩。
3. **数字会编**——让它放数据，数字不可信（如"Sender Health 98%"这种具体数字它纯属编造）。

**正确姿势 = 分层**：AI 只出**无文字、氛围感、装饰性**的底图（渐变、路径、节点、抽象曲线），**文字 / 数字 / 箭头 / 标签** 全部用 Canva / PPT / HTML-to-screenshot 后期叠加上去。

**本篇的特殊性**：Snov.io 是 SaaS，最有说服力的图是**真实界面特写**（不是全景大图——手机端/公众号里全景 UI 缩成蚂蚁，读者看不见细节）。**01/02/03 三张必须真截图**；04 用 Canva/PPT 直做；05 可用 AI 底图 + 后期叠字。

---

## 二、5 个槽位的具体处置

### 01-intro.png — LinkedIn 插件抓取特写（**真截图，非 AI**）
- **内容**：一个 LinkedIn 人物页或公司页，右侧/悬浮层是 **Snov.io Chrome 插件**的抓取卡片——高亮显示"一键获取邮箱"的按钮，能看到联系人邮箱 + 已验证状态（绿色勾）。
- **为什么用特写而非全景**：全景后台在手机端看不清；特写才能让读者一眼看懂"哦，它能直接在 LinkedIn 上抓邮箱"。
- **怎么取**：装 Snov.io Chrome 扩展（snov.io/extension）→ 打开 LinkedIn / Sales Navigator 页面 → 截图插件浮层（**局部截图，放大到按钮清晰**）。
- **AI 替代方案（若无法登录 LinkedIn）**：生成"邮箱探针"氛围底图——深底 #0f172a、放大镜/信封图标、蓝绿光晕，**无文字**；"Get email / Verified ✓"标签后期用 Canva 叠。提示词见下。

### 02-feature.png — Drip Campaign 工作流画布局部（**真截图，非 AI**）
- **内容**：Snov.io Drip Campaign 的可视化工作流画布**局部**——展示分支逻辑（如 `If Opened → Wait 2 days → Send Email B`），红框标出 **AI 写作辅助** 或 **Spintax** 按钮。
- **怎么取**：app.snov.io → Drip Campaigns → 打开一个序列 → 截图画布局部（放大分支节点，红色标注框后期叠加）。
- 这张图证明"自动化序列不是简单群发"，是 B2B 读者最想确认的能力。

### 03-pricing.png — 定价页（**真截图，非 AI**）
- **内容**：snov.io/pricing 各档并排（Trial / Starter / Pro S / Pro M / Pro L / Ultra + 25% 年付横幅）。
- **怎么取**：访问 https://snov.io/pricing/ 整页截图（官方页自带 "🔥 25% off" 横幅）。
- 若做社媒分享图，用 AI 深底边框 + 手动排价格数字。

### 04-verdict.png — 卡片式决策流程图（**Canva/PPT 直做，或 AI 底图+叠字**）
- **内容**：**卡片式**决策流程（方便读者截图保存），每张卡片 = 一类人群 → 推荐档位：
  - 卡片 1：**外贸新手 / 个人** → Starter（$39）
  - 卡片 2：**独立销售 / 小团队** → Starter 够用，点数别浪费
  - 卡片 3：**成熟 Outbound 团队**（10+ 邮箱、多语言）→ Pro S（$99，无限预热）
  - 卡片 4：**高量级 Agency**（月 5 万+ credits）→ Ultra / 定制
- **推荐做法**：Canva / PPT 画四张卡片 + 箭头流，文字清晰可控，比 AI 生图准。
- **AI 氛围版**：生成"分叉路径"深底插画，卡片文字后期叠。提示词见下。

### 05-warmup.png — 预热效果趋势图（**AI 生底图 + 后期叠字，或图表工具直做**）
- **内容**：一条**上升趋势曲线**，示意发件声誉/进箱率随周数爬坡（对应"技术原理"段的预热说明）。
- **⚠️ 数字诚实红线**：曲线是**示意**——x 轴写 "Week 1 → Week 8"，y 轴写"Sender reputation / Inbox rate"，**具体百分比留空或用你自己后台的真实截图数字**。**禁止**写 "50%→98%" 这种编造数字（那是第三方建议稿拍的，我们没有数据源）。
- **推荐做法**：用 Canva / 图表工具画一条平滑上升曲线最干净；或 AI 生成"上升趋势光带"底图 + 后期叠坐标轴文字。
- **AI 氛围底图**：深色科技底 + 一条发光上升曲线，无文字、无数字。

---

## 三、AI 生图 Prompt 模板（仅用于氛围底图）

统一风格：深色科技底 #0f172a，蓝绿渐变光晕，人形/信封/节点元素，无文字。

**01 氛围底图（邮箱探针）：**
> Dark navy background (#0f172a), a glowing magnifier over an envelope icon with a checkmark glow, teal-to-blue gradient, subtle particle trails, minimalist tech illustration, no text, no letters, clean futuristic style

**04 氛围底图（决策/路径）：**
> Dark navy background (#0f172a), a glowing forked roadmap with four lit doorway cards, abstract decision metaphor, teal and amber accent lights, no text, cinematic minimal

**05 氛围底图（上升趋势）：**
> Dark navy background (#0f172a), a single glowing upward trend line sweeping across the frame, teal gradient glow under the curve, subtle grid dots, minimalist data illustration, no text, no letters, no numbers, clean futuristic style

**关键约束（每次都加）**：`no text, no letters, no numbers, no watermark`——杜绝乱码。

---

## 四、后期叠字（用 Canva / PPT / HTML-to-screenshot）
- 字体：站点是英文全球受众，用干净无衬线（Inter / Helvetica）。
- 数据必须手打：Trial 50 credits、Starter $39、Pro S $99、25% off、G2 4.6/5——不要信 AI 生成的任何数字。
- 05 趋势图的百分比数字：留空或用自己的真实后台数据，别填编造值。
- 导出：1200×630（社媒分享尺寸）或按正文宽度 1200×675。

---

## 五、取图来源 URL（真截图用）
- 后台（登录后）：https://app.snov.io/
- Drip Campaigns：登录后 → 左侧 Drip Campaigns → 打开序列画布
- 定价页：https://snov.io/pricing/
- Chrome 扩展：https://snov.io/extension （安装后在 LinkedIn/Sales Nav 页抓取）
- 官网首页（hero/定位说明）：https://snov.io/

> 提醒：真截图里的 Snov.io logo / 品牌元素保留即可，无需去水印（那是官网自有品牌，不是第三方水印）。截图务必用**局部特写**（01/02），保证手机端文字可读。
