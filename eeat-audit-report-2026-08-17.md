# E-E-A-T 合规诊断报告：AI 生成 + 含虚构体验的软件联盟软文

> 出具方：SEO 内容营销团队（主理人代行，成员专用 subagent 在当前运行时不可用，按团队 E-E-A-T 方法论产出）
> 日期：2026-08-17
> 对象：Toolisme 软件类联盟营销英文站，10 篇 AI 搜集资料撰写的英文软文（部分仿冒真实使用体验，部分引用第三方评测数据未充分披露）

---

## 一句话结论与风险等级

**结论：** 这类"AI 生成 + 含虚构第一手体验"的软文**无法通过 Google 的 E-E-A-T 验证**。虚构的"我亲测"直接击穿 E-E-A-T 中处于核心地位的 **Trust（可信度）** 与 **Experience（经验）** 两根支柱；未充分披露来源的第三方数据则削弱来源可信度。它们大概率会在核心更新（Core Update）的质量重评估中被降权或不收录，并存在触发"规模化内容滥用（Scaled Content Abuse）"乃至"误导行为（Deceptive Practices）"人工处置的风险。

**综合风险等级：高（HIGH）。** 其中"仿冒真实体验"的文章风险最高（涉及诚实性/Trust），"纯第三方数据拼凑、无原创经验、规模化产出"的文章次之（涉及规模化内容滥用）。

---

## 一、对 E-E-A-T 核心要素的理解

E-E-A-T 出自 Google《搜索质量评估指南》（Search Quality Rater Guidelines，简称 QRG；当前为 2025 年 9 月版，约 182 页）。四个字母分别是：

- **E — Experience（经验）**：内容创建者是否对主题有**第一手、亲身**的接触。比如产品评测，真正用过产品的人写出的体验，价值远高于从未用过的人。这一维度于 **2022 年 12 月 15 日** 由 Google 正式加入，把原来的 E-A-T 升级为 E-E-A-T。
- **E — Expertise（专业度）**：作者是否具备该主题所需的**知识与技能**。医疗、法律、金融等 YMYL（Your Money or Your Life，关乎用户健康/财务/安全）主题要求正式资质；非 YMYL 主题可用"日常专业（everyday expertise）"——靠经验证明的可靠知识即可。
- **A — Authoritativeness（权威性）**：作者或网站是否被公认为某主题的**权威来源**，通常来自外部声誉（权威站反向链接、行业引用、公开履历等）。
- **T — Trustworthiness（可信度）**：页面是否**准确、诚实、安全、可靠**。Google 明确指出 **Trust 是整个 E-E-A-T 家族中最重要的成员**——"不诚实的页面无论多专业、多权威，E-E-A-T 都低"（QRG 第 26 页示意图原文：*untrustworthy pages have low E-E-A-T no matter how Experienced, Expert, or Authoritative they may seem*）。

**关键推论（对软文尤其重要）：** 经验（Experience）是 2022 年新增、且**对评测/推荐类产品内容最敏感**的维度。Google 在 QRG 与"产品评测系统（Reviews System）"中多次强调：评测类内容应当体现"actual use of a product"（真实使用）。换句话说，**软件评测/推荐这类内容，Google 默认期望作者真的用过产品**；没有真实使用却以第一人称描述使用细节，正是 Experience 与 Trust 的双重失分。

---

## 二、四维逐条判别（依据 Google 官方指南）

### (1) 内容真实性 —— 是否构成误导 / 违反"误导行为"

- **判定：严重失分，触及 Trust 核心。**
- QRG 通篇把"accurate, honest, safe"（准确、诚实、安全）作为 Trust 的定义。以"我用了三个月""我亲测"口吻描述**作者并未发生**的体验，属于**不诚实陈述**，直接让页面落入"untrustworthy → low E-E-A-T"。
- 在垃圾内容政策层面，Google 的 **Spam Policies — Deceptive Practices（误导行为）** 明确禁止误导性内容。若虚构体验伴随具体数字、结果承诺（例如"我用 X 工具把转化率提升了 40%"），性质更重，可能从"质量低下"升级为"违规"。
- 出处：Google Search Central，*Spam policies - Deceptive practices*；QRG §E-E-A-T（Trust 定义）。

### (2) 作者专业背景披露

- **判定：披露缺位 = 无法证明 Expertise / Authoritativeness，且加剧 Trust 问题。**
- QRG 在 2022 年 12 月更新中**专门强化了"找出谁对网站负责、谁创作了页面内容"（Finding who is responsible / who created the content）** 的要求，并新增了贯穿 Lowest→Highest 各档的"页面质量考量摘要表"。匿名、无署名、或署名但无真实资质可查的作者，在高标准主题上会被判低分。
- Google 并不要求所有内容都有名人背书，但**要求"可验证"**：清晰的作者页、真实履历、可查证的专业背景。联盟站常见做法是"虚构编辑部/笔名+无简历"，这会让 Expertise/Authoritativeness 信号几乎为零。
- 叠加虚构体验后，问题从"无资质"升级为"用无资质身份冒充真实用户"，Google 对"代笔/虚构成分"的态度是：**一旦发现内容与声称的经验不符，Trust 直接判低**。
- 出处：QRG 2022-12-15 更新说明（"Clarified guidance on Finding Who is Responsible…"）；QRG §Reputation / §Author expertise。

### (3) 第一手经验体现（虚构"我亲测"如何被判定）

- **判定：这是最致命的一维。** 没有真实使用却写第一人称体验，直接违反 Experience 维度的设立初衷。
- Google 原文示例：评测报税软件时，用户更想看"真正用过不同服务的人"的论坛讨论——**经验的价值就在于"真实发生"。** QRG 同时明确：YMYL 主题上"分享第一手生活经验"的页面，只要内容可信、安全、与专家共识一致，可有高 E-E-A-T；但**涉及建议/信息类的 YMYL 内容必须由专家产出**。软件选型虽通常不属严格 YMYL，但"帮用户花钱决策"的推荐内容，Google 的评测系统会按"是否有真实使用"来加权。
- 用 AI 拼凑的"体验描写"（界面感受、操作步骤、成效）本质是**经验造假**。在质量评估中，这类页面会被判为"内容未实现其目的 / 缺乏支撑信任的经验证据"，趋近于 **Lowest 评级**的边缘。
- 出处：QRG §E-E-A-T（Experience 段落、报税软件示例）；Google Search Central *Reviews System* 指导（强调 first-hand experience）。

### (4) 来源可信度（引用第三方数据但未充分标注）

- **判定：中等偏重失分。** 引用 G2/Capterra/Reddit/官网数据本身**不违规**，但需满足两个条件：
  1. **充分披露来源**（出处链接、引用时间、数据口径）；
  2. **明确区分"我的体验"与"他人数据"**，不能把第三方数据混写成自己的结论。
- 当前做法"引用但未充分披露、未区分自有经验与他人数据"，会：① 让来源可信度无法被核验（Trust 受损）；② 在"产品评测系统"视角下，纯聚合他人数据而无原创价值的内容，可能被判定为 **unoriginal / 低附加值的衍生内容**。
- 注意：Google 反复强调"**不惩罚 AI 生成本身，只惩罚内容是否有用**"。但"AI 搜集+拼凑第三方数据+无原创经验"很容易落入"unoriginal, low-value content"——这恰好是下一节"规模化内容滥用"的判定土壤。
- 出处：QRG §Reputation for Sites and Content Creators；Google Search Central *Creating helpful, reliable, people-first content*（"clear sourcing, evidence of expertise"）。

---

## 三、综合判定：能否通过 E-E-A-T 验证？

**不能。** 具体落到 Google 的评估逻辑上：

- **虚构体验类文章**：Experience = 缺失（甚至为负，因为造假）；Trust = 击穿（不诚实）。按 QRG，Trust 是核心，Trust 低则整体 E-E-A-T 低 → 在质量评级中趋于 **Low / Lowest**。
- **纯第三方数据拼凑类文章**：Experience = 弱（无自有经验）；来源可信度 = 受损（未披露/未区分）；若整站 10 篇均如此且为 AI 规模化产出，则叠加 **Scaled Content Abuse** 风险。
- **联盟属性本身不违规**：Google 允许联盟/affiliate 内容，前提是有**真实价值、透明披露商业关系**。问题不在"推广"，而在"用假体验包装推广"。

---

## 四、排名惩罚风险（算法 vs 人工）

### A. 算法层面（最常见、最可能发生）

| 风险点 | 机制 | 性质 | 出处 |
|---|---|---|---|
| **核心更新质量重评估** | 2024 年 3 月起，"有用内容系统（Helpful Content System）"已**并入核心排名系统**，不再有单独更新。Google 持续用多信号评估"内容是否真正帮助人"。虚构体验/低原创价值内容会在每次核心更新被持续压低。 | 降权 / 不排名（非手动） | Google Search Central（2024-03 核心更新说明；2024-08 文档确认 HC 系统已封存并入核心） |
| **规模化内容滥用 Scaled Content Abuse** | 2024 年 3 月新垃圾政策，**取代旧"自动生成内容"政策**：无论内容由"自动化/人工/两者结合"产出，只要**大规模制造低价值、主要为操纵排名的内容**即违规。AI 搜集+批量写 10 篇软文若缺乏原创价值，正踩线。 | 算法性降权或移除（非手动，需清理后等系统重评估） | Google Search Central Blog《What web creators should know about our March 2024 core update and new spam policies》 |
| **产品评测系统 Reviews System** | 评测类内容专门看重 first-hand experience 与真实价值；无真实使用的评测会被降权。 | 降权（页面级） | Google Search Central *Reviews System* |

### B. 人工 / 质量评估层面

| 风险点 | 机制 | 性质 | 出处 |
|---|---|---|---|
| **质量评估员（Rater）评级** | Rater 依 QRG 对页面打分。缺乏真实经验 + 虚构体验 + 未披露来源，在 YMYL 或"评测/推荐"类意图下极易被判 **Lowest**（尤其当页面被认定为 deceptive 或无法实现其目的）。Rater 不直接改排名，但评分用于训练/校准排名系统——长期会被算法"学走"。 | 间接（训练信号）→ 算法降权 | QRG §Page Quality Rating（Lowest 档特征：deceptive、fail to achieve purpose、little/no E-E-A-T on YMYL） |
| **垃圾内容人工处置（Manual Action）** | 若被认定明确违反 Scaled Content Abuse 或 Deceptive Practices，站长会在 **Search Console 收到人工处置通知**，需清理后提交"重新审核请求"。这是**最重**的后果。 | 手动惩罚（需 reconsideration） | Google Search Central *Spam policies*；2024-03 垃圾更新公告 |
| **网站声誉滥用 Site Reputation Abuse** | 2024-05-05 生效、以**人工处置**执行。指"借高声誉站点排名信号发布低价值第三方内容"。对独立联盟站直接适用性有限，但若你的站把低价值联盟软文寄生在高权威域名子路径下，需警惕。 | 手动惩罚 | Google Search Central Blog（2024-11 进一步收紧：无论第一方是否参与，借站点声誉排第三方内容即违规） |

**关键区分：**
- "降权/不排名"= 算法层面（核心更新、Scaled Content Abuse、Reviews System），**无通知、需自行修复并等待重评估**。
- "手动惩罚 Manual Action"= 明确违规后被人工处置，**Search Console 有通知、需提交重新审核**。虚构体验若伴随具体虚假成效承诺，才有可能升级到这一档；纯"无经验写评测"更多落在算法降权区间。

---

## 五、可落地的整改建议清单（把"虚构软文"改造成 E-E-A-T 合规内容）

> 目标是让内容"诚实、有真实经验信号、来源可核验"，而不是替你重写文章。

1. **彻底删除/改写所有虚构第一人称体验。** 把"我亲测三个月"改为透明的集合视角，例如：*"我们没有逐一长期试用，本文综合了 G2、Capterra 与 Reddit 上 X 位真实用户的反馈，并对照官网公开功能说明。"* —— 用诚实声明替代造假，反而保住 Trust。
2. **增加真实作者披露。** 每篇配可验证的作者页（真实姓名/笔名 + 真实相关背景，如"5 年 SaaS 采购经验"），并在页面标注。避免匿名编辑部。
3. **第三方数据全部标注来源。** 每条引用附出处链接、采集时间、样本量/口径；用视觉或文字明确区分"他人数据"与"我们的观点"。
4. **补第一手证据（哪怕轻量）。** 注册免费试用、截图真实界面、记录真实操作步骤与局限；哪怕只做过 1 小时试用，也要如实写"我们做了 X 分钟上手测试"，并标注范围。
5. **加商业关系声明。** 联盟链接处明确"我们使用联盟链接，您购买我们可能获得佣金（不影响评测独立性）"。Google 与 FTC 都要求透明披露。
6. **结构化数据。** 加 `Author` schema、`Product` + `Review`/`AggregateRating`（若引用聚合评分，须如实映射第三方数据，不得编造评分）、`Organization` 信誉信息，强化机器可理解的 E-E-A-T 信号。
7. **控制规模化、提升原创附加值。** 避免"10 篇同一模板 AI 批量产出"。每篇给出独有角度/原创对比/真实截图，降低 Scaled Content Abuse 风险。
8. **回归"人本位"内容原则。** 对照 Google《Creating helpful, reliable, people-first content》的自检问题：内容是否直接帮到人？是否清晰 sourcing？是否主要为吸引点击而非帮助用户？逐条过。

---

## 主要官方出处索引

- Google《Search Quality Rater Guidelines》（QRG，2025-09 版，约 182 页）—— E-E-A-T 定义、Trust 为核心、Experience 新增、Lowest 评级、YMYL 标准、Finding Who Is Responsible。
- Google Search Central Blog, *What web creators should know about our March 2024 core update and new spam policies*（2024-03-05）—— Scaled Content Abuse / Site Reputation Abuse / Expired Domain Abuse 三项新垃圾政策。
- Google Search Central, *Spam policies*（Deceptive practices / Misleading content）。
- Google Search Central, *Creating helpful, reliable, people-first content*（人本位内容自检）。
- Google Search Central, *Reviews System*（产品评测须体现 first-hand experience）。
- Google 文档更新（2024-08）：确认 Helpful Content System 已封存并**并入核心排名系统**（自 2024-03 起）。

---

*发布状态判定（按团队标准）：Needs Revision（需整改后才可视为 Ready to Publish）。综合评分未达 70 分门槛，主因 Trust / Experience 失分。*
