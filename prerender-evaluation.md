# Toolisme 预渲染方案判断（专家复核）

## 结论
用户提供的 AI 诊断**方向正确、方案 D 最契合诉求**，但存在两处需修正/补充。

## 已核对的项目事实（支撑判断）
- `react-router-dom` 为 **^6.30.4**（v6，非 v7）。全站：`Link` 207 处、`useParams` 10 处、`Outlet` 2 处、router 引用 24 处 → router 已嵌入全站。
- `usePage`Meta（`src/hooks/usePageMeta.ts`）用 `useEffect` 设 `document.title`，用于 Review/Guide 详情页。
- 内容规模小（构建源 ~14 md + 首页/分类 ≈ 20 页）。

## 逐条判断
1. **空壳诊断**：成立（纯 CSR SPA）。但 Bingbot 也会执行 JS，Googlebot 更是 Chromium 渲染；"读不到"应限定为社交分享抓取器（X/FB/Slack/Discord）与部分 AI 爬虫（GPTBot 抓原始 HTML）。Google 的痛点主要是两波索引延迟 + 渲染预算。
2.1. **整站预渲染**：正确。首页/分类列表是 broad 词主战场，当前也是空壳。
3. **不照搬 finark（方案 A）**：正确。finark 先天无 router，硬搬=重写路由层，回归风险大。
4. **方案 D（无头浏览器构建期预渲染）**：最契合"低风险/不重写"。需补两个坑：①构建期 Chromium 依赖可能卡顿/下载失败，且需抽查产物确实含正文（静默空壳不报错）；②模块加载期若直访问 window/document 会崩（当前 usePageMeta 在 useEffect，安全）。
5. **方案 B（RR v7 prerender）**：长期干净路径，但升级框架模式 + 改写路由 + 撞 SSR 坑，1–2 天中等风险，宜作未来升级。
6. **因果修正**："半月 4 曝光"不全是 JS 问题，还与索引量、外链、内容体量、sitemap 有关。预渲染解决"可读/可索引"，不保证"有流量"。

## 建议
- 现阶段按 D 执行：装预渲染插件、配置路由清单、跑构建验证 HTML 含正文、本地抽查。
- 同步维护 sitemap.xml（项目已存在）并经 GSC 提交 + 外链，才是完整解法。
- 未来规模上来、想甩掉构建期 Chromium 依赖时，再考虑方案 B。

## 备注
用户诉求：爬虫可直接爬取（最高优先级）、改造低风险、不重写代码优于重来。
