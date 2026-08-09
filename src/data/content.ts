import { markdownReviews } from '@/content/markdownReviews'

export type CategorySlug = 'software' | 'creators' | 'security' | 'hardware'

export interface Category {
  slug: CategorySlug
  name: string
  tagline: string
  description: string
  icon: string
  toolCount: number
  accentClass: string
}

export interface ToolReview {
  slug: string
  name: string
  category: CategorySlug
  subcategory: string
  rating: number
  tagline: string
  summary: string
  pros: string[]
  cons: string[]
  pricing: string
  url: string
  date: string
  readTime: number
  bestFor: string
  whoShouldSkip: string
  keyAdvantage: string
  bodySections: { heading: string; paragraphs: string[] }[]
  featured?: boolean
  editorsPick?: boolean
  markdownBody?: string
}

const baseCategories: Category[] = [
  {
    slug: 'software',
    name: 'Software',
    tagline: 'SaaS tools that run your day',
    description:
      'Project management, AI writing, and productivity platforms that help teams and individuals get more done.',
    icon: 'MonitorSmartphone',
    toolCount: 0,
    accentClass: 'text-accent-600 bg-accent-50',
  },
  {
    slug: 'creators',
    name: 'Creators',
    tagline: 'Tools for content makers',
    description:
      'Video editors, audio AI, and creative suites built for YouTubers, podcasters, and digital storytellers.',
    icon: 'Clapperboard',
    toolCount: 0,
    accentClass: 'text-sage-600 bg-sage-50',
  },
  {
    slug: 'security',
    name: 'Security',
    tagline: 'Protect your privacy online',
    description:
      'VPNs, password managers, and privacy tools that keep your data safe and your browsing anonymous.',
    icon: 'ShieldCheck',
    toolCount: 0,
    accentClass: 'text-sand-600 bg-sand-50',
  },
  {
    slug: 'hardware',
    name: 'Hardware',
    tagline: 'Gear that powers your work',
    description:
      'Workstations, monitors, keyboards, and peripherals reviewed for developers, designers, and power users.',
    icon: 'Cpu',
    toolCount: 0,
    accentClass: 'text-ink-600 bg-ink-100',
  },
]

export const heroTags: string[] = [
  'Project Management',
  'Video Editing',
  'VPN',
  'AI Writing',
  'Productivity',
  'Paraphraser',
]

export const reviews: ToolReview[] = [
  {
    slug: 'clickup-review-2026',
    name: 'ClickUp',
    category: 'software',
    subcategory: 'Project Management',
    rating: 4.6,
    tagline: 'The most powerful PM tool — if you can tame it',
    summary:
      'ClickUp 3.0 packs task management, docs, dashboards, whiteboards, and AI into a single workspace. It is the most feature-rich project management tool we have tested, but that power comes with a learning curve. For teams willing to invest in setup, it replaces three or four separate apps.',
    pros: ['All-in-one: tasks, docs, dashboards, chat', 'Highly customizable views and automations', 'Built-in AI assistant for summaries and task creation', 'Generous free plan for small teams'],
    cons: ['Steep learning curve for new users', 'Interface can feel cluttered at scale', 'Performance lags on very large workspaces'],
    pricing: 'From $7/seat/month',
    url: '#',
    date: '2026-01-15',
    readTime: 9,
    bestFor: 'Teams that want one tool to replace Asana, Notion, and Slack',
    whoShouldSkip: 'Solo users or tiny teams who just need a simple task list',
    keyAdvantage: 'Replaces 3-4 separate apps in one workspace',
    bodySections: [
      {
        heading: 'Overview',
        paragraphs: [
          'ClickUp has been on a relentless feature march since its launch, and version 3.0 is the most ambitious update yet. The promise is simple: replace every productivity tool your team uses with a single workspace. After three weeks of daily use, we can say it gets closer than anything else on the market — but the trade-off is complexity.',
          'We tested ClickUp across a 12-person marketing team, migrating from a mix of Asana, Google Docs, and Slack. The migration took a weekend, and within two weeks the team was fully operational. The AI features, in particular, surprised us — task auto-generation from meeting notes saved real time.',
        ],
      },
      {
        heading: 'Key features',
        paragraphs: [
          'The hierarchical structure (Workspace > Space > Folder > List > Task) gives you granular control over organization. Views are where ClickUp shines: List, Board, Calendar, Timeline, Gantt, Whiteboard, and the new Chat view cover every workflow we could think of. Custom fields and automations let you build a CRM, a bug tracker, or a content calendar without leaving the app.',
          'ClickUp AI, launched in 3.0, can summarize threads, generate subtasks from a brief, and write status updates. It is not as capable as a standalone chatbot, but it has the advantage of context — it knows your workspace, your tasks, and your team.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'The Free Forever plan supports unlimited tasks and members but caps automations and storage. The Unlimited plan at $7/seat/month unlocks most features for small teams. Business at $12/seat adds advanced automations, dashboards, and time tracking. Enterprise pricing is available on request.',
          'For a team of 10, the Unlimited plan costs $70/month — less than most teams spend on separate docs, chat, and PM tools combined.',
        ],
      },
      {
        heading: 'Verdict',
        paragraphs: [
          'ClickUp is not for everyone. Solo users and small teams who just need a simple task list will find it overwhelming. But if your team is juggling three or four separate tools and wants to consolidate, ClickUp is the best all-in-one option we have tested. The learning curve is real, but the payoff is a workspace that adapts to your workflow instead of forcing you to adapt to it.',
        ],
      },
    ],
    featured: true,
    editorsPick: true,
  },
  {
    slug: 'descript-review-2026',
    name: 'Descript',
    category: 'creators',
    subcategory: 'Video Editing',
    rating: 4.5,
    tagline: 'The AI video editor that makes editing feel like writing',
    summary:
      'Descript turns video editing into a text-based workflow — edit the transcript and the video follows. With Overdub voice cloning, filler word removal, and AI eye contact, it is the fastest way for podcasters and YouTubers to produce polished content without opening a traditional timeline editor.',
    pros: ['Text-based editing is intuitive and fast', 'Overdub AI voice cloning for corrections', 'Automatic filler word and silence removal', 'All-in-one: screen recording, editing, publishing'],
    cons: ['Less control than timeline-based editors', 'Resource-heavy on older machines', 'AI features gated to higher tiers'],
    pricing: 'From $12/month',
    url: '#',
    date: '2026-01-22',
    readTime: 16,
    bestFor: 'Podcasters and YouTubers who want to edit video like a doc',
    whoShouldSkip: 'Editors needing color grading, motion graphics, or multi-cam work',
    keyAdvantage: 'Edit video by editing text — no timeline needed',
    bodySections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Descript flips video editing on its head: instead of working on a timeline, you edit a transcript. Delete a sentence in the text and the corresponding video clip disappears. It is a workflow that feels natural to anyone who has ever edited a document, and for talking-head content it is remarkably fast.',
          'We tested Descript on a 30-minute YouTube interview and a 45-minute podcast episode. The transcription was accurate enough to edit directly, and the filler-word removal (um, uh, like) cut two minutes off the interview without any awkward gaps.',
        ],
      },
      {
        heading: 'AI features',
        paragraphs: [
          'Overdub is the headline feature: clone your voice and generate audio by typing. It is designed for corrections — fix a mispronounced word without re-recording. The cloned voice is convincing for short phrases, though longer generated passages sound slightly robotic.',
          'Other AI tools include eye-contact correction (subtly adjusts your gaze to the camera), studio sound (removes room noise), and automatic captions. The new AI Chapters feature segments your video by topic automatically.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'The free plan includes 1 hour of transcription per month — enough to try the workflow. The Hobbyist plan at $12/month gives you 10 hours. The Pro plan at $24/month unlocks Overdub, AI voices, and higher-resolution exports. Teams and Enterprise plans add collaboration features.',
          'For a solo YouTuber publishing weekly, the Pro plan is the sweet spot. The Hobbyist plan works if you only need basic editing without the AI features.',
        ],
      },
      {
        heading: 'Verdict',
        paragraphs: [
          'Descript is not a replacement for Premiere or DaVinci Resolve — if you need color grading, motion graphics, or multi-camera editing, you will be frustrated. But for podcasters, YouTubers, and anyone producing talking-head content, it is the fastest path from raw recording to published video. The text-based workflow is genuinely a better way to edit this type of content.',
        ],
      },
    ],
    featured: true,
    editorsPick: true,
  },
  {
    slug: 'jasper-ai-review-2026',
    name: 'Jasper AI',
    category: 'software',
    subcategory: 'AI Writing',
    rating: 4.2,
    tagline: 'Is it still the king of AI writing tools?',
    summary:
      'Jasper has evolved from a simple copy generator into a full marketing copilot with brand voice, campaign workflows, and team collaboration. In 2026, the question is whether it justifies its premium price when ChatGPT and Claude can write for free. For marketing teams that need brand consistency at scale, the answer is still yes.',
    pros: ['Best-in-class brand voice training', 'Campaign workflows tie multiple assets together', 'Team collaboration and approval flows', 'Surfer SEO integration for optimized content'],
    cons: ['Expensive compared to general-purpose AI chatbots', 'Output quality gap with free tools has narrowed', 'Steeper onboarding for solo users'],
    pricing: 'From $39/month',
    url: '#',
    date: '2026-01-08',
    readTime: 11,
    bestFor: 'Marketing teams that need brand consistency across campaigns',
    whoShouldSkip: 'Solo writers — free tools like ChatGPT now match the quality',
    keyAdvantage: 'Best-in-class brand voice training at scale',
    bodySections: [
      {
        heading: 'Overview',
        paragraphs: [
          'When Jasper launched, it was the only serious AI writing tool for marketers. Now that ChatGPT, Claude, and Gemini can all generate marketing copy for free, Jasper needs to justify its $39/month starting price. After a month of testing, we think it still does — but only for a specific type of user.',
          'We tested Jasper across a content team of five, producing blog posts, ad copy, and email sequences. The brand voice feature was the standout: after training it on 20 existing pieces of content, the output matched our house style with minimal editing.',
        ],
      },
      {
        heading: 'Key features',
        paragraphs: [
          'Brand Voice is Jasper\'s killer feature. Upload your existing content and it learns your tone, vocabulary, and formatting preferences. New generations match that voice without prompting. For teams producing high volumes of on-brand content, this alone can justify the subscription.',
          'Campaign workflows let you generate a blog post, social posts, an email, and ad copy from a single brief. Each asset stays on-message because they share the same brand voice and context. The team collaboration features — assignments, approval flows, and revision history — make it feel like a real content production tool, not just a chatbot wrapper.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'The Creator plan at $39/month gives one user access to brand voice and basic templates. The Pro plan at $59/month adds campaign workflows, SEO mode, and API access. Teams and Business plans add collaboration features and higher volume limits.',
          'For a solo writer, $39/month is steep when ChatGPT Plus is $20. For a marketing team producing dozens of assets per month, the time saved on brand consistency and workflow management pays for itself.',
        ],
      },
      {
        heading: 'Verdict',
        paragraphs: [
          'Jasper is no longer the only option for AI-assisted writing, and for solo users, free or cheaper alternatives are genuinely better. But for marketing teams that need brand consistency, campaign coordination, and approval workflows, Jasper is still the most complete tool on the market. The question is not whether Jasper is good — it is — but whether your team produces enough content to justify the price.',
        ],
      },
    ],
    featured: true,
    editorsPick: true,
  },
  {
    slug: 'notion-ai-review-2026',
    name: 'Notion AI',
    category: 'software',
    subcategory: 'Productivity',
    rating: 4.3,
    tagline: 'Is it finally worth the upgrade?',
    summary:
      'Notion AI has grown from a novelty into a genuinely useful workspace assistant. The Q&A feature searches across all your pages, the meeting note summarizer pulls action items automatically, and the writer now supports custom presets. If your team already lives in Notion, the AI add-on is a no-brainer. If not, it alone is not reason enough to switch.',
    pros: ['Seamless integration with existing Notion workspace', 'Q&A searches across all pages and databases', 'Meeting note summaries with action item extraction', 'Custom AI presets for repetitive workflows'],
    cons: ['Limited value if you do not already use Notion', 'No image generation or video capabilities', 'Per-seat pricing adds up for larger teams'],
    pricing: '$10/member/month',
    url: '#',
    date: '2026-01-28',
    readTime: 12,
    bestFor: 'Teams already using Notion who want AI inside their workspace',
    whoShouldSkip: 'Anyone not already living in Notion — standalone AI is cheaper',
    keyAdvantage: 'AI that searches across your entire workspace',
    bodySections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Notion AI launched as a simple text generator bolted onto pages. Two years later, it has grown into a workspace assistant that can search, summarize, and draft — all without leaving Notion. The question for 2026 is whether it has matured enough to justify the $10/member/month add-on.',
          'We tested Notion AI across a 15-person product team that already used Notion for docs, project tracking, and wikis. The AI features felt like a natural extension of the workspace rather than a separate tool bolted on.',
        ],
      },
      {
        heading: 'Key features',
        paragraphs: [
          'The Q&A feature is the most useful: ask a question in natural language and it searches across all your pages, databases, and comments to find the answer. "What did we decide about the pricing change?" pulls up the relevant meeting notes, Slack threads, and decision docs. It is like having a search engine that understands context.',
          'The meeting note summarizer is the second standout. Paste a transcript or connect a recording, and Notion AI extracts action items, decisions, and discussion points into a structured page. Custom AI presets let you save prompts — "Draft a release notes section from these tickets" — and reuse them across the workspace.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'Notion AI is a $10/member/month add-on on top of any Notion plan. For a team on the Plus plan ($10/member), that doubles the per-seat cost to $20. For a team of 15, that is $150/month just for AI features.',
          'The value calculation is simple: if your team already uses Notion heavily, the time saved on search and meeting summaries easily covers the cost. If Notion is just a place where you keep a few docs, the AI add-on is not worth it.',
        ],
      },
      {
        heading: 'Verdict',
        paragraphs: [
          'Notion AI in 2026 is a genuinely useful tool — but only inside Notion. The Q&A and meeting summarizer features are best-in-class for workspace search and note processing. If your team already lives in Notion, the add-on is a no-brainer. If you are considering switching to Notion just for the AI, do not — standalone tools like ChatGPT or Claude offer more power per dollar.',
        ],
      },
    ],
    featured: true,
  },
  {
    slug: 'quillbot-review-2026',
    name: 'QuillBot',
    category: 'security',
    subcategory: 'Paraphraser',
    rating: 4.0,
    tagline: 'Is this $8.33/month paraphraser actually worth it?',
    summary:
      'QuillBot remains the most accessible paraphrasing and writing assistant for students and non-native English writers. The seven paraphrase modes, grammar checker, and plagiarism detector cover the essentials. At $8.33/month on the annual plan, it is affordable — but AI chatbots are catching up fast on rewriting quality.',
    pros: ['Seven distinct paraphrase modes', 'Built-in grammar checker and plagiarism detector', 'Chrome extension works anywhere', 'Affordable annual pricing'],
    cons: ['Paraphrase quality lags behind general AI chatbots for complex text', 'Plagiarism checker limited on lower tiers', 'Citation generator is basic'],
    pricing: 'From $8.33/month',
    url: '#',
    date: '2026-01-18',
    readTime: 14,
    bestFor: 'Students and non-native English writers who need quick paraphrasing',
    whoShouldSkip: 'Professionals who only occasionally paraphrase — use a free chatbot',
    keyAdvantage: 'Seven mode-specific paraphrase styles plus a Chrome extension',
    bodySections: [
      {
        heading: 'Overview',
        paragraphs: [
          'QuillBot was one of the first dedicated paraphrasing tools on the market, and it remains popular with students, academics, and non-native English writers. In 2026, with AI chatbots able to rewrite text on command, does a standalone paraphraser still make sense? After two weeks of testing, our answer is: yes, but the gap is closing.',
          'We tested QuillBot on academic papers, blog drafts, and business emails. The seven paraphrase modes (Standard, Fluency, Formal, Academic, Simple, Creative, Expand) give you real control over the output tone — something a general chatbot does not offer out of the box.',
        ],
      },
      {
        heading: 'Key features',
        paragraphs: [
          'The paraphraser is the core tool. Paste text, pick a mode, and get a rewritten version. The Standard mode is reliable for general use; the Academic mode is genuinely useful for formalizing casual drafts; and the Creative mode produces more varied (if sometimes less accurate) output.',
          'The grammar checker is competent but not as thorough as Grammarly. The plagiarism detector scans against a web database and is useful for students, though the scan limit on lower tiers is restrictive. The Chrome extension lets you paraphrase text inside Google Docs, Gmail, and any web text field — this is where QuillBot shines for daily use.',
        ],
      },
      {
        heading: 'Pricing',
        paragraphs: [
          'The free plan gives you Standard and Fluency modes with a 125-word limit per paraphrase. The Premium plan at $8.33/month (billed annually) unlocks all seven modes, the plagiarism detector, and higher word limits. Monthly billing is $19.95/month, which is significantly more expensive.',
          'For students, the annual plan is affordable and the Chrome extension makes it easy to use across assignments. For professionals, the value depends on how often you paraphrase — if it is daily, the subscription pays for itself in time saved.',
        ],
      },
      {
        heading: 'Verdict',
        paragraphs: [
          'QuillBot is a focused tool that does one thing well: paraphrasing with mode control. The question is whether that focus justifies a subscription when ChatGPT can rewrite text for free. For students and non-native English speakers who value the Chrome extension and mode-specific output, yes. For everyone else, a general AI chatbot may be the better choice. At $8.33/month on the annual plan, it is affordable enough to try and decide for yourself.',
        ],
      },
    ],
  },
  ...markdownReviews.map((r) => ({
    slug: r.slug,
    name: r.name,
    category: r.category as CategorySlug,
    subcategory: r.subcategory,
    rating: r.rating,
    tagline: r.tagline,
    summary: r.summary,
    pros: r.pros,
    cons: r.cons,
    pricing: r.pricing,
    url: r.url,
    date: r.date,
    readTime: r.readTime,
    bestFor: r.bestFor,
    whoShouldSkip: r.whoShouldSkip,
    keyAdvantage: r.keyAdvantage,
    bodySections: [],
    markdownBody: r.markdownBody,
    featured: r.featured,
    editorsPick: r.editorsPick,
  })),
]

// toolCount is derived from the actual reviews array so the site never shows
// stale hardcoded numbers.
export const categories: Category[] = baseCategories.map((c) => ({
  ...c,
  toolCount: reviews.filter((r) => r.category === c.slug).length,
}))

export interface TeamMember {
  name: string
  role: string
  bio: string
  initials: string
  accentClass: string
  avatar: string
  socials: { label: string; url: string }[]
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Tyce Shirley',
    role: 'Founder & Editor-in-Chief',
    bio: 'Former product manager at two SaaS startups. Tyce started Toolisme after spending too many hours comparing tools for his own team. He oversees editorial standards and reviews methodology.',
    initials: 'TS',
    accentClass: 'bg-accent-100 text-accent-800',
    avatar: '/avatars/tyce-shirley.jpg',
    socials: [
      { label: 'X', url: 'https://x.com/toolisme' },
      { label: 'LinkedIn', url: '#' },
    ],
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Reviewer & Software Editor',
    bio: 'Priya has a background in content marketing and journalism. She leads our Software category and developed the scoring rubric we use across all reviews. She has tested over 40 SaaS tools.',
    initials: 'PS',
    accentClass: 'bg-sage-100 text-sage-800',
    avatar: '/avatars/priya-sharma.jpg',
    socials: [
      { label: 'X', url: 'https://x.com/soywhale' },
      { label: 'LinkedIn', url: '#' },
    ],
  },
  {
    name: 'David Okonkwo',
    role: 'Creators & Hardware Editor',
    bio: 'A visual artist turned tech reviewer, David brings a creator perspective to our video, audio, and hardware reviews. His work has been featured in three digital art exhibitions.',
    initials: 'DO',
    accentClass: 'bg-sand-100 text-sand-800',
    avatar: '/avatars/david-okonkwo.jpg',
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'Instagram', url: '#' },
    ],
  },
  {
    name: 'Sofia Reyes',
    role: 'Security Editor & Researcher',
    bio: 'Sofia researches privacy tools and online security. She runs our annual security survey and writes the deep-dive VPN comparisons that keep our recommendations honest.',
    initials: 'SR',
    accentClass: 'bg-ink-100 text-ink-800',
    avatar: '/avatars/sofia-reyes.jpg',
    socials: [
      { label: 'LinkedIn', url: '#' },
      { label: 'X', url: '#' },
    ],
  },
  {
    name: 'James Park',
    role: 'Developer & Data Engineer',
    bio: 'James keeps the Toolisme database running. He built our tool comparison engine and the search infrastructure that powers the site.',
    initials: 'JP',
    accentClass: 'bg-accent-100 text-accent-800',
    avatar: '/avatars/james-park.jpg',
    socials: [
      { label: 'GitHub', url: 'https://www.github.com/wdhlycom' },
      { label: 'LinkedIn', url: '#' },
    ],
  },
  {
    name: 'Aisha Bello',
    role: 'Community & Partnerships',
    bio: 'Aisha manages reader feedback, the guestbook, and our relationships with tool makers. If you want to suggest a tool for review, she is the person to reach.',
    initials: 'AB',
    accentClass: 'bg-sage-100 text-sage-800',
    avatar: '/avatars/aisha-bello.jpg',
    socials: [
      { label: 'Email', url: 'mailto:master@toolisme.com' },
      { label: 'LinkedIn', url: '#' },
    ],
  },
]

export interface EditorialValue {
  title: string
  description: string
  icon: string
}

export const editorialValues: EditorialValue[] = [
  {
    title: 'Hands-on testing',
    description:
      'Every tool is used for real tasks before we review it. We do not rewrite press releases — we share what actually happened when we tried it.',
    icon: 'FlaskConical',
  },
  {
    title: 'Clear scoring',
    description:
      'Each review uses a published rubric covering features, ease of use, output quality, value, and support. You can see exactly how we arrived at a score.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Affiliate transparency',
    description:
      'Some links are affiliate links. That never affects our ratings or which tools we recommend. We say so on every page and in our full disclosure.',
    icon: 'BadgeCheck',
  },
  {
    title: 'Reader corrections',
    description:
      'Tools change fast. If we get something wrong or a tool updates, readers flag it and we update the review. Every correction is dated.',
    icon: 'RefreshCw',
  },
]

export interface ContactFaqItem {
  question: string
  answer: string
}

export const contactFaqs: ContactFaqItem[] = [
  {
    question: 'How do I suggest a tool for review?',
    answer:
      'Use the contact form and select "Tool suggestion" as the topic. Tell us the tool name, what it does, and why you think it deserves a review. We test suggestions in batches and will let you know when it goes live.',
  },
  {
    question: 'Do you offer sponsored reviews?',
    answer:
      'No. We do not accept payment for reviews or ratings. Tool makers can sponsor banner placements or newsletter spots, which are always clearly labeled, but they cannot pay for a score or a positive write-up.',
  },
  {
    question: 'Can I republish your reviews?',
    answer:
      'Excerpts with attribution and a link back are fine. For full republication or syndication, contact us using the form below and we will get back to you.',
  },
  {
    question: 'How often do you update reviews?',
    answer:
      'We re-test tools when there is a major version update or at least every six months. Each review shows its last-updated date at the top.',
  },
  {
    question: 'I found a mistake in a review. What should I do?',
    answer:
      'Please tell us. Use the form, select "Correction," and include the review URL and what is wrong. We investigate and publish a dated correction if needed.',
  },
]

export interface GuestbookEntry {
  id: string
  name: string
  message: string
  date: string
  location: string
}

export const guestbookSeed: GuestbookEntry[] = [
  {
    id: 'g1',
    name: 'Liam',
    message: 'Your ClickUp review saved me from choosing the wrong PM tool. The comparison with Notion was exactly what I needed.',
    date: '2026-01-20',
    location: 'Toronto, CA',
  },
  {
    id: 'g2',
    name: 'Hana',
    message: 'The Descript review convinced me to switch from Premiere. Text-based editing is a game changer for my YouTube channel.',
    date: '2026-01-16',
    location: 'Osaka, JP',
  },
  {
    id: 'g3',
    name: 'Daniel',
    message: 'Appreciate the transparency about affiliate links. Makes trusting the reviews a lot easier.',
    date: '2026-01-12',
    location: 'Berlin, DE',
  },
  {
    id: 'g4',
    name: 'Priyanka',
    message: 'Would love to see a QuillBot vs Grammarly comparison. Both seem similar and I cannot decide which to subscribe to.',
    date: '2026-01-09',
    location: 'Mumbai, IN',
  },
]
