# Woodpecker Review — Image Instructions for Illustration AI

Hard rules for this set:
- All final images must be **100% English, zero Chinese characters** (Chinese and English article versions share the same image set).
- AI may only generate **textless atmosphere backgrounds** as a last-resort fallback; never AI-generated text/numbers/UI structure.
- Real screenshots must be **desensitized**: blur emails, account names, profile photos, and any personal/company identifiers.
- **No fabricated statistics.** Prices below are verified from the official pricing page; if re-rendering as an HTML chart, use these verified numbers with source.

Sources: Woodpecker official co-brand kit (`Woodpeckerco-brand-kit/screens/`) and https://woodpecker.co/pricing/ (verified 2026-08-14).

---

## 01-intro.png

- **Filename:** `imgs/01-intro.png`
- **Content:** Woodpecker campaign performance dashboard (source: brand kit `Campaign stats.png`). Must show: campaign list with per-campaign metrics (e.g. "SaaS in Portugal" with Emails sent / Delivered / Views / Replies / Bounces / Click rates), a performance chart, status indicators. This is the "what it looks like when it works" shot — high open/deliverability numbers visible so readers instantly see the tool in action.
- **Type:** real dashboard screenshot (from official brand kit)
- **Login wall:** no
- **Desensitization:** check the top-right for any demo account name / avatar; if present, blur it. Keep the Woodpecker logo and UI chrome.
- **Language:** 100% English, zero Chinese
- **Note:** metrics are official demo data; do not alter or invent numbers.

## 02-feature.png

- **Filename:** `imgs/02-feature.png`
- **Content:** Woodpecker campaign sequence + email editor UI. Must show: top app nav (Campaigns, Lead Finder, Prospects, Lists, Deliverability, Inbox, Templates, Add-ons, Integrations, AI Agent), left sequence panel with "Campaign start → Right away", "Prospects sending delay → No delay", "Email Step 1", "Next step delay → 2 days"; right email editor with subject line "Checked solutions after the last week's conference", body beginning "Hi {{FIRST_NAME}}...", email-signature dropdown showing "Use sender's signature / No signature", formatting toolbar.
- **Type:** real UI screenshot (from official brand kit)
- **Login wall:** no
- **Desensitization:** **blur the top-right demo account name "Margaret Woodpecker co S.A." and the dropdown avatar.** Keep the Woodpecker logo and all UI chrome.
- **Language:** 100% English, zero Chinese
- **Optional upgrade (if a second feature shot is wanted):** brand kit also has `Condition-based campaigns.png` — a visual condition-logic builder (If opened → wait → send). It makes the "auto-routing on reply" capability much more convincing than a plain editor. If used, name it `imgs/05-feature2.png`.

## 03-pricing.png

- **Filename:** `imgs/03-pricing.png`
- **Content:** Woodpecker official pricing page. Must show: pricing slider (starting at 500 contacts), monthly/annual toggle, annual discount banner, plan card with price for 500 contacts, list of add-ons and their prices, "Start free trial" CTA, "14-day free trial, no credit card required" note.
- **Type:** real official site screenshot
- **Login wall:** no
- **Annotation (post-process):** add a **red highlight box around the "14-day free trial, no credit card required" note** to lower the reader's mental barrier (conversion-focused).
- **Verified official numbers to render (if using HTML chart fallback):**
  - 500 contacts: **$35/month** (monthly), approx **$23/month** (annual, save 33%)
  - Add-ons: LinkedIn automation **$29/mo**, API/MCP access **$20/mo**, Extra warm-up slot **$5/mo**, Agency Panel **$27/mo**
  - Source: https://woodpecker.co/pricing/ (verified 2026-08-14; use the live page if numbers differ)
- **Desensitization:** none
- **Language:** 100% English, zero Chinese
- **Fallback:** if the live pricing page cannot be captured, build an HTML chart from the verified numbers above.

## 04-verdict.png

- **Filename:** `imgs/04-verdict.png`
- **Content:** Woodpecker Deliverability Monitor (source: brand kit `Deliverability Monitor.png`). Must show: domain reputation tiers (green/yellow/red), overall deliverability summary, metric cards (Emails sent, Delivered emails, Views, Replies, Bounces), sentiment cards (Interested, Maybe, Not interested), line chart over time, filter pills.
- **Type:** real dashboard screenshot (from official brand kit)
- **Login wall:** no
- **Desensitization:** none required; demo numbers are official brand-kit data, no emails/accounts visible
- **Language:** 100% English, zero Chinese
- **Note:** this is the evidence-level shot — it appears in the **"How It Stays Out of the Spam Folder"** section (front half of the article), not at the end. Dashboard numbers are part of the official demo screenshot; do not alter or invent them.

---

## Optional atmosphere backgrounds (fallback only)

Use these **textless** atmosphere backgrounds only if a real screenshot above cannot be sourced. Any labels must be added later via HTML/Canva overlay.

- **Intro fallback:** dark navy (#0f172a), abstract glowing envelope and LinkedIn-icon nodes, teal-to-green gradient, minimalist tech illustration, no text, no numbers.
- **Verdict fallback:** dark navy (#0f172a), glowing upward trend line with subtle grid, green/teal gradient, no text, no numbers.
