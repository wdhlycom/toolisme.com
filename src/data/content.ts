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
  comparisonOnly?: boolean
  verdictBadge?: string
  ctaLabel?: string
  appCategory?: string
  operatingSystem?: string
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

const _allArticles: ToolReview[] = [
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
    comparisonOnly: r.comparisonOnly,
    verdictBadge: r.verdictBadge,
    ctaLabel: r.ctaLabel,
    appCategory: r.appCategory,
    operatingSystem: r.operatingSystem,
  })),
]

/** All articles (reviews + comparisons) — use when you need everything. */
export const allArticles: ToolReview[] = _allArticles

/** Regular reviews only (excludes comparison-only articles). */
export const reviews: ToolReview[] = _allArticles.filter((r) => !r.comparisonOnly)

/** Comparison-only articles. */
export const comparisons: ToolReview[] = _allArticles.filter((r) => r.comparisonOnly)

// toolCount is derived from the actual reviews array so the site never shows
// stale hardcoded numbers.
export const categories: Category[] = baseCategories.map((c) => ({
  ...c,
  toolCount: reviews.filter((r) => r.category === c.slug).length,
}))

/** Canonical review URL: /reviews/{category}/{slug} */
export const reviewPath = (r: Pick<ToolReview, 'category' | 'slug'>): string =>
  `/reviews/${r.category}/${r.slug}`

/** Canonical comparison URL: /comparisons/{category}/{slug} */
export const comparisonPath = (r: Pick<ToolReview, 'category' | 'slug'>): string =>
  `/comparisons/${r.category}/${r.slug}`

/** Returns the correct URL based on whether the article is comparison-only. */
export const articlePath = (r: ToolReview): string =>
  r.comparisonOnly ? comparisonPath(r) : reviewPath(r)

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
