# E-E-A-T 最终核验与优化建议（2026-09-01）

> 范围：针对 9/1 用户请求"再检查一下问题还存不存在，给一个总结优化建议"。
> 核验对象：8/21 全站审计锁定的 5 篇高危文 + 方法论页 `how-we-review.md`（均已是当前 `src/content` 构建源）。

---

## 一、核验结论：虚构体验问题是否还存在？

**结论：还在，且集中在 2 篇。** 逐篇当前状态：

| 文章 | 作者 | 第一人称/虚构体验 | 当前状态 | 判定 |
|---|---|---|---|---|
| `ahaslides-review-2026.md` | Annie Cole | "We ran it across four live events: an all-hands, an onboarding quiz, a client workshop, a team trivia night"；"Real footage from our all-hands"；"We built our first interactive deck in about ten minutes" | **虚构叙事一字未改**，仅补了一段 "How we tested this" 把虚构当成事实重述一遍 | 🔴 **仍虚构** |
| `woodpecker-review-2026.md` | Annie Cole | "Last month we helped a friend's SaaS team… Their domain was blacklisted"；"We moved them over to Woodpecker… 5,000 prospects, 9.2% reply"；"Our primary domain has stayed green the whole time"；"campaign 'SaaS in Portugal' built in about 10 minutes" | **虚构叙事一字未改**，Transparency 段反而写 "We write from real experience" 强化虚构 | 🔴 **仍虚构** |
| `buffer-review-2026.md` | Trueer | 已声明 "part hands-on, part research"，明确列出做了/没做，附独立 dashboard 截图 | **已透明化** | 🟢 **范本** |
| `tubemagic-vs-subscribr-2026.md` | Annie Cole | "This comparison is research-based, not hands-on testing: we didn't run either tool on a real account." | **已声明研究型** | 🟢 **范本** |
| `wizishop-review-2026.md` | Trueer | 已改 "we"、"several days"、"mock store"、"test-run estimates" 标注 | **已大幅弱化**，仅残留 mock store 叙事壳 | 🟡 **已弱化** |

**一句话：ahaslides 与 woodpecker 两篇的虚构第一人称体验当前仍明确存在，buffer/tubemagic 已是合规范本，wizishop 已从红转黄。**

---

## 二、关键新发现：方法论页与正文已自相矛盾（最危险的一点）

`how-we-review.md` 在 8/21 之后被改成了**强承诺、可验证**的口径，但两篇虚构评测正文直接违背它：

- 第 15 行："Most tools on Toolisme are **tested hands-on by a real person, on real accounts we pay for ourselves**."
- 第 19 行："We **live with each tool for at least two full weeks of daily use** before scoring… If we claim a feature is broken, slow, or exceptional, **there's a screenshot or log behind it**."
- 第 54 行："reviews are written by editors with **hands-on domain experience — people who have run the software**…"
- 第 56 行："Every review carries the author's name… a **real accountability marker**."

而 ahaslides / woodpecker **并没有**真实 hands-on（Annie Cole 没有办过 all-hands、没有帮朋友的 SaaS 团队迁域、没有跑过 "SaaS in Portugal" campaign）。

**这比原始问题更严重**：原来只是"文章像 AI 拼的"；现在你的站点**自己声明了一套可验证的测试标准，却有两篇旗舰评测公然违反它**。这正是 Google 最易抓的一类硬伤——
- 对 **人工评估员（QRG）**：抽查到方法论页 vs 正文不一致，直接触发 **Lowest 评级**（"deceptive or false" 内容）。
- 对 **算法**：站点自相矛盾是强 pattern 信号（声明/内容信任度割裂），叠加 affiliate 站属性，会拉低整站 Trust 评分。

**优先级：这个矛盾必须先解，比单篇改写更紧急。**

---

## 三、总结优化建议

### P0（立即，避免继续累积风险）

1. **改写 ahaslides、woodpecker 两篇的虚构叙事为诚实研究口径**
   - 直接套用 `tubemagic-vs-subscribr` 的 "research-based, not hands-on" 模板：删掉 all-hands / 朋友团队 / SaaS in Portugal / 自家域名 green 等编造情节。
   - 把"我们亲测"全部改写为：注册试用 + 官方文档 + G2/Capterra/Reddit 真实用户反馈（**必须标注来源与采集时间**）。
   - 删除/替换假截图声明：ahaslides 的 word-cloud 视频标 "real footage from our all-hands"、woodpecker 的两张 dashboard 截图配"我们迁移后"文案——若非真实自摄，改为"官方/示例截图"或删除。
   - woodpecker 的 9.2% reply / 5,000 prospects 等具体数字若无真实来源，改 "用户报告区间" 或删。

2. **收敛方法论页 `how-we-review.md` 的过度承诺**
   - 第 15、19、54 行把"most / we / hands-on"说得太满，与真实产能（你主要做 research-based）不符。
   - 改为：**"部分工具我们亲自试用；当我们无法亲自跑时，会明确标注为 research，并基于官方文档与带出处的用户反馈撰写。"** 与 tubemagic 正文的诚实口径对齐。
   - 不要写"≥2 周每日使用 + 每张截图 behind it"这种可被证伪的绝对承诺，除非你真能做到。

### P1（本周内）

3. **统一全站"透明度模板"**，每篇评测开头/结尾固定三选一标签：
   - `Hands-on`：确实注册试用并跑核心流程（如 buffer）
   - `Research-based`：未亲自跑，明确声明（如 tubemagic）
   - `Mixed`：部分亲测 + 部分研究（如 wizishop 的 mock store）
   - 模板写进 `toolisme-review-core` SKILL，新文强制套用。

4. **补齐可验证的作者身份（Authors/About 页）**
   - 正文有 Annie Cole / Trueer 等署名，但**没有对应的真实 bio 页**支撑"hands-on domain experience"的声称。
   - 至少给每位作者建一个简短 bio（真实背景、写该赛道的资质），让署名成为真 accountability marker 而非装饰。这也是 E-E-A-T 的 "Expertise/Authoritativeness" 硬指标。

### P2（排期清理）

5. **全站其余 9 篇做一次同等核验**：8/21 审计覆盖了 14 篇，但建议对剩余未逐字读过的文章再扫一遍同类虚构模式（"we ran / we tested / our team"），确保没有漏网之鱼。

6. **移除"假截图"类兜底话术**：任何 "screenshot behind every claim" 式承诺，若实际无图，一律删，避免再次与方法论页自相矛盾。

---

## 四、Google 能否识别？——回收核心疑问

- **算法没有逐句测谎仪**：单句虚构（"we ran it for two weeks"）抓不到。
- **但模式级 + 自相矛盾级信号算法+人工都能抓**：
  - 模板化批量产出、无真实作者身份、无原创实测证据 → 算法降权信号。
  - **你站点自己方法论页 vs 正文不一致** → 人工评估员一抽查即判 Lowest，且这是"可证伪"的硬伤，比模糊的 AI 味危险得多。
- **结论**：ahaslides/woodpecker 当前状态**过不了 E-E-A-T 人工评估**，存在被降权/低评级的真实风险；修掉 P0 两项后整体可回到合规区间（buffer/tubemagic 已是合格范式）。

---

## 五、建议执行顺序

```
1. 改 ahaslides + woodpecker 为 research-based 诚实口径   (P0)
2. 收敛 how-we-review.md 过度承诺，与正文对齐            (P0)
3. 建统一透明度模板 + 写入 review-core SKILL             (P1)
4. 补 Authors/About bio 页                              (P1)
5. 扫其余 9 篇 + 清假截图话术                             (P2)
```

> 注：以上为只读诊断与建议，未改动任何源文件。需要我动手改 ahaslides/woodpecker 两篇时，请确认——按协作约定，内容改写需你点头后再执行。
