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
  slug: string
  role: string
  bio: string
  location: string
  initials: string
  accentClass: string
  avatar: string
  socials: { label: string; url: string }[]
  authorPage: boolean
}

export interface AuthorDetail {
  slug: string
  name: string
  role: string
  location: string
  avatar: string
  about: string
  expertise: string[]
  howIWork: string
  sameAs: string[]
  socials: { label: string; url: string }[]
  disclosure: string
}

export const authorDetails: AuthorDetail[] = [
  {
    slug: 'holive',
    name: 'Holive',
    role: 'Founder & Editor-in-Chief',
    location: 'Austin, Texas, USA',
    avatar: '/avatars/holive.png',
    about:
      "Holive is the founder and editor-in-chief of Toolisme. Before starting the site, he was a product manager at two SaaS startups, where he spent countless hours comparing tools for his own teams. He launched Toolisme to spare other teams that same trial and error. Today he sets the site's editorial standards and owns the review methodology every reviewer follows.",
    expertise: ['SaaS selection', 'productivity tools', 'review methodology', 'affiliate transparency'],
    howIWork:
      "I don't personally test every tool. Instead I define the hands-on testing standard, review each published piece for accuracy, and keep our scoring rubric honest. Every review on Toolisme runs through me before it goes live.",
    sameAs: ['https://x.com/toolisme'],
    socials: [{ label: 'X', url: 'https://x.com/toolisme' }],
    disclosure: 'Content on Toolisme is reviewed by the editorial team. See our Affiliate Disclosure.',
  },
  {
    slug: 'annie-cole',
    name: 'Annie Cole',
    role: 'Lead Reviewer & Software Editor',
    location: 'Toronto, Ontario, Canada',
    avatar: '/avatars/annie-cole.jpg',
    about:
      "Annie Cole leads Toolisme's Software category. With a background in content marketing and journalism, she built the scoring rubric used across all reviews and has hands-on tested 40+ SaaS tools. She focuses on project management, CRM, and AI writing assistants.",
    expertise: ['SaaS reviews', 'scoring rubric', 'project management tools', 'AI writing tools'],
    howIWork:
      "Where I can, I spend at least one week using each tool inside a real workflow — not a demo account. For tools I couldn't test directly, I aggregate and cite real user reports from public reviews and communities, and I note exactly where it helps or falls short. Everything is scored against our published rubric.",
    sameAs: ['https://x.com/soywhale'],
    socials: [{ label: 'X', url: 'https://x.com/soywhale' }],
    disclosure: 'Content on Toolisme is reviewed by the editorial team. See our Affiliate Disclosure.',
  },
  {
    slug: 'trueer-quinn',
    name: 'trueer Quinn',
    role: 'Creators & Hardware Editor',
    location: 'Melbourne, Victoria, Australia',
    avatar: '/avatars/trueer-quinn.jpg',
    about:
      "trueer Quinn is our Creators & Hardware Editor. A visual artist turned tech reviewer, he brings a creator's perspective to video, audio, and hardware reviews. His creative work has appeared in three digital art exhibitions.",
    expertise: ['video editing tools', 'podcast/audio tools', 'creator hardware', 'creator workflows'],
    howIWork:
      "Where possible I test every tool inside a real creator project — cutting an actual video, recording a podcast episode, or running a live stream — rather than ticking feature boxes. When I can't run a tool myself, I combine hands-on checks with sourced user feedback from creator communities and label which is which. If it doesn't survive a real deadline, it doesn't score well.",
    sameAs: [],
    socials: [],
    disclosure: 'Content on Toolisme is reviewed by the editorial team. See our Affiliate Disclosure.',
  },
  {
    slug: 'bill-hartman',
    name: 'Bill Hartman',
    role: 'Security Editor & Researcher',
    location: 'Manchester, United Kingdom',
    avatar: '/avatars/bill-hartman.jpg',
    about:
      "Bill Hartman researches privacy tools and online security. He runs Toolisme's annual security survey and writes the deep-dive VPN comparisons that keep our recommendations honest. Every claim links to primary sources — vendor docs and independent audits.",
    expertise: ['VPNs', 'password managers', 'privacy browsers', 'security awareness'],
    howIWork:
      "For each tool I set it up and use it hands-on where I can — configuring the VPN, running speed and leak tests, reading the provider's audit report — then verify every claim against primary sources. Where I can't test directly, I aggregate and cite real user reports and label them as such. I never promise absolute protection; I report what the evidence shows.",
    sameAs: [],
    socials: [],
    disclosure: 'Content on Toolisme is reviewed by the editorial team. See our Affiliate Disclosure.',
  },
]

export const getAuthor = (slug: string): AuthorDetail | undefined =>
  authorDetails.find((a) => a.slug === slug)

export const teamMembers: TeamMember[] = [
  {
    name: 'Holive',
    slug: 'holive',
    role: 'Founder & Editor-in-Chief',
    bio: "Holive is the founder and editor-in-chief of Toolisme. Before starting the site, he was a product manager at two SaaS startups, where he spent countless hours comparing tools for his own teams. He launched Toolisme to spare other teams that same trial and error. Today he sets the site's editorial standards and owns the review methodology every reviewer follows.",
    location: 'Austin, Texas, USA',
    initials: 'HO',
    accentClass: 'bg-accent-100 text-accent-800',
    avatar: '/avatars/holive.png',
    socials: [
      { label: 'X', url: 'https://x.com/toolisme' },
    ],
    authorPage: true,
  },
  {
    name: 'Annie Cole',
    slug: 'annie-cole',
    role: 'Lead Reviewer & Software Editor',
    bio: "Annie Cole leads Toolisme's Software category. With a background in content marketing and journalism, she built the scoring rubric used across all reviews and has hands-on tested 40+ SaaS tools. She focuses on project management, CRM, and AI writing assistants.",
    location: 'Toronto, Ontario, Canada',
    initials: 'AC',
    accentClass: 'bg-sage-100 text-sage-800',
    avatar: '/avatars/annie-cole.jpg',
    socials: [
      { label: 'X', url: 'https://x.com/soywhale' },
    ],
    authorPage: true,
  },
  {
    name: 'trueer Quinn',
    slug: 'trueer-quinn',
    role: 'Creators & Hardware Editor',
    bio: "trueer Quinn is our Creators & Hardware Editor. A visual artist turned tech reviewer, he brings a creator's perspective to video, audio, and hardware reviews. His creative work has appeared in three digital art exhibitions.",
    location: 'Melbourne, Victoria, Australia',
    initials: 'TQ',
    accentClass: 'bg-sand-100 text-sand-800',
    avatar: '/avatars/trueer-quinn.jpg',
    socials: [],
    authorPage: true,
  },
  {
    name: 'Bill Hartman',
    slug: 'bill-hartman',
    role: 'Security Editor & Researcher',
    bio: "Bill Hartman researches privacy tools and online security. He runs Toolisme's annual security survey and writes the deep-dive VPN comparisons that keep our recommendations honest. Every claim links to primary sources — vendor docs and independent audits.",
    location: 'Manchester, United Kingdom',
    initials: 'BH',
    accentClass: 'bg-ink-100 text-ink-800',
    avatar: '/avatars/bill-hartman.jpg',
    socials: [],
    authorPage: true,
  },
  {
    name: 'James Calder',
    slug: 'james-calder',
    role: 'Developer & Data Engineer',
    bio: 'James Calder keeps the Toolisme database running. He built our tool comparison engine and the search infrastructure that powers the site, so the numbers you see in comparisons stay current.',
    location: 'Vancouver, British Columbia, Canada',
    initials: 'JC',
    accentClass: 'bg-accent-100 text-accent-800',
    avatar: '/avatars/james-calder.jpg',
    socials: [
      { label: 'GitHub', url: 'https://www.github.com/wdhlycom' },
    ],
    authorPage: false,
  },
  {
    name: 'Sofia Bennett',
    slug: 'sofia-bennett',
    role: 'Community & Partnerships',
    bio: 'Sofia Bennett manages Community & Partnerships. She handles reader feedback, the guestbook, and our relationships with tool makers — and is the person to reach if you want to suggest a tool for review.',
    location: 'Sydney, New South Wales, Australia',
    initials: 'SB',
    accentClass: 'bg-sage-100 text-sage-800',
    avatar: '/avatars/sofia-bennett.jpg',
    socials: [
      { label: 'Email', url: 'mailto:master@toolisme.com' },
    ],
    authorPage: false,
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
      'Every tool is tested hands-on where we have access. Where we can\'t run a tool ourselves, we combine documented testing with sourced user feedback from public reviews and communities — and we say which is which.',
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
