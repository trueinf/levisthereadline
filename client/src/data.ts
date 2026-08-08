export type PageId =
  | 'home'
  | 'campaigns'
  | 'campaign'
  | 'library'
  | 'approvals'
  | 'insights'
  | 'activity'
  | 'integrations'

export type CampaignTabId =
  | 'overview'
  | 'brief'
  | 'readiness'
  | 'assemble'
  | 'create'
  | 'adapt'
  | 'translate'
  | 'transcreate'
  | 'assure'
  | 'activate'
  | 'learn'

export type ChannelId = 'ecommerce' | 'crm' | 'instagram' | 'display' | 'creator'

export const campaignTabs: [CampaignTabId, string][] = [
  ['overview', 'Overview'],
  ['brief', 'Brief'],
  ['readiness', 'Readiness'],
  ['assemble', 'Assemble'],
  ['create', 'Create'],
  ['adapt', 'Adapt'],
  ['translate', 'Translate'],
  ['transcreate', 'Transcreate'],
  ['assure', 'Assure'],
  ['activate', 'Activate'],
  ['learn', 'Learn'],
]

export interface Variant {
  title: string
  status: string
  rationale?: string
  sources?: string[]
  impact?: string[]
  details: [string, string][]
}

export const variants: Record<string, Variant> = {
  'VAR-006': {
    title: 'France · Instagram Story',
    status: 'At Risk',
    rationale:
      'This requirement exists because the approved campaign includes France, Instagram and the Relaxed Trucker Jacket. Threadline selected the global source asset, applied French localization and then detected a layout constraint.',
    sources: ['Workfront campaign scope', 'France regional brief', 'AEM source asset AST-003', 'Instagram Story specification'],
    impact: ['France Instagram Story cannot activate until the layout is regenerated', 'France CRM and e-commerce remain unaffected'],
    details: [
      ['Campaign', 'Behind Every Original'], ['Market', 'France · fr-FR'], ['Product', 'Relaxed Trucker Jacket'],
      ['Channel', 'Instagram Story · 9:16'], ['Issue', 'Translated headline exceeds safe area'],
      ['Recommended action', 'Use “L’originalité, en denim.” and regenerate the layout'],
      ['Owner', 'France Social'], ['Due', '14 Feb 2026'],
    ],
  },
  'VAR-010': {
    title: 'Japan · Instagram Feed',
    status: 'Blocked',
    rationale:
      'This requirement was created because Japan, Instagram and the 578™ Baggy are in the confirmed baseline. Threadline matched the requested placement to AST-005, then found that the asset rights exclude Japan social use.',
    sources: ['Workfront campaign scope', 'Japan regional brief', 'Commerce assortment', 'AEM rights metadata', 'Instagram Feed specification'],
    impact: ['Japan Instagram activation is blocked', 'Japan CRM and e-commerce remain unaffected', 'AST-006 is available as a cleared replacement'],
    details: [
      ['Campaign', 'Behind Every Original'], ['Market', 'Japan · ja-JP'], ['Product', '578™ Baggy'],
      ['Channel', 'Instagram Feed · 4:5'], ['Issue', 'Selected ambassador asset is not licensed for Japan social use'],
      ['Recommended action', 'Replace AST-005 with territory-cleared product asset AST-006'],
      ['Owner', 'Japan Social'], ['Due', '16 Feb 2026'],
    ],
  },
  'VAR-011': {
    title: 'Japan · CRM Launch Email',
    status: 'At Risk',
    rationale:
      'This requirement exists because the campaign baseline includes Japan CRM and the Relaxed Trucker Jacket. Product facts are approved, but the global hero line requires transcreation rather than direct translation.',
    sources: ['Workfront channel plan', 'Japan regional brief', 'Approved product module CNT-004', 'CRM character limits'],
    impact: ['Only the Japanese hero line requires regional approval', 'The factual product block remains valid', 'Launch can proceed after transcreation approval'],
    details: [
      ['Campaign', 'Behind Every Original'], ['Market', 'Japan · ja-JP'], ['Product', 'Relaxed Trucker Jacket'],
      ['Channel', 'CRM / Email'], ['Issue', 'Literal translation is unnatural'],
      ['Recommended action', 'Approve “自分らしさには、物語がある。” and retain the factual product block'],
      ['Owner', 'Japan CRM'], ['Due', '17 Feb 2026'],
    ],
  },
  'VAR-017': {
    title: '501® Thermodapt · Product Module',
    status: 'Blocked',
    details: [
      ['Campaign', '501® Thermodapt'], ['Market', 'United States · en-US'], ['Product', '501® Thermodapt'],
      ['Channel', 'E-commerce PDP'], ['Issue', 'Generated claim promises performance in every temperature'],
      ['Recommended action', 'Use approved claim: “Designed to support breathability and temperature regulation.”'],
      ['Owner', 'Product Marketing'], ['Due', '2 Mar 2026'],
    ],
  },
}

export interface ChannelPackage {
  title: string
  subtitle: string
  status: string
  primary: string
  rows: [string, string, string, string, string][]
  notes: string[]
}

/** A generated content override for one slot, keyed by `${channel}:${item}`. */
export interface SlotOverride {
  content: string
  state: string
}

/**
 * Brand / campaign grounding fed to the LLM as context so generated copy stays
 * on-brand for "Behind Every Original". Mirrors the on-screen message
 * architecture and grounding package in the Create tab.
 */
export const campaignGrounding = {
  campaign: 'Behind Every Original',
  coreMessage: 'Originality has a story, and denim is part of how it is expressed.',
  productEmphasis: '578™ Baggy silhouette, movement and 1990s attitude.',
  proofPoint: 'Waist-sitting, non-stretch, baggy fit through the leg.',
  cta: 'Explore the 578™ collection.',
  protectedElements: 'Campaign name, Levi’s brand marks, approved product names.',
}

export const OPENAI_MODELS = ['gpt-5.4'] as const

/** A user-created campaign and the content generated for it. */
export interface Campaign {
  id: string
  name: string
  brief: string
  product: string
  audience: string
  tone: string
  market: string
  locale: string
  /** selected marketing-channel ids (see marketingChannels) */
  channels: string[]
  /** generated content keyed by `${channel}:${item}` */
  generated: Record<string, string>
  createdAt: string
}

export const TONES = ['Playful', 'Confident', 'Editorial', 'Minimal', 'Bold', 'Warm', 'Premium'] as const

/** A real marketing channel and the content pieces it needs. */
export interface MarketingChannel {
  id: string
  label: string
  desc: string
  slots: { item: string; constraint: string }[]
}

export const marketingChannels: MarketingChannel[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    desc: 'Feed, Stories and Reels',
    slots: [
      { item: 'Feed caption', constraint: 'Engaging caption, ~125 characters before truncation' },
      { item: 'Story text', constraint: 'Short overlay text, under 40 characters' },
      { item: 'Reel hook', constraint: 'Scroll-stopping first line, under 60 characters' },
      { item: 'Hashtags', constraint: '5–8 relevant hashtags' },
      { item: 'Image alt text', constraint: 'Accessible description of the visual' },
    ],
  },
  {
    id: 'facebook',
    label: 'Facebook',
    desc: 'Feed posts and link ads',
    slots: [
      { item: 'Post copy', constraint: 'Conversational post, 1–3 short sentences' },
      { item: 'Headline', constraint: 'Link headline, under 40 characters' },
      { item: 'Link description', constraint: 'Supporting description, under 30 words' },
      { item: 'Call to action', constraint: 'Short CTA phrase' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO / Website',
    desc: 'Search and landing pages',
    slots: [
      { item: 'Page title', constraint: 'SEO title tag, under 60 characters' },
      { item: 'Meta description', constraint: 'Search snippet, under 155 characters' },
      { item: 'H1 headline', constraint: 'Primary on-page headline' },
      { item: 'Product description', constraint: '2–3 sentence benefit-led description' },
    ],
  },
  {
    id: 'email',
    label: 'Email',
    desc: 'CRM and newsletters',
    slots: [
      { item: 'Subject line', constraint: 'Compelling subject, under 45 characters' },
      { item: 'Preheader', constraint: 'Preview text, under 90 characters' },
      { item: 'Hero headline', constraint: 'Above-the-fold headline' },
      { item: 'Body copy', constraint: 'Short body paragraph, 2–3 sentences' },
      { item: 'Call to action', constraint: 'Button label, under 25 characters' },
    ],
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    desc: 'Short-form video',
    slots: [
      { item: 'Video hook', constraint: 'On-screen hook for the first 2 seconds' },
      { item: 'Caption', constraint: 'Caption with personality, under 100 characters' },
      { item: 'Hashtags', constraint: '3–5 trend-aware hashtags' },
    ],
  },
  {
    id: 'google-ads',
    label: 'Google Ads',
    desc: 'Search and display',
    slots: [
      { item: 'Headline 1', constraint: 'Responsive search ad headline, under 30 characters' },
      { item: 'Headline 2', constraint: 'Second headline, under 30 characters' },
      { item: 'Long headline', constraint: 'Display long headline, under 90 characters' },
      { item: 'Description', constraint: 'Ad description, under 90 characters' },
    ],
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    desc: 'Posts and threads',
    slots: [
      { item: 'Post', constraint: 'Single post, under 280 characters' },
      { item: 'Thread hook', constraint: 'Opening line to start a thread' },
    ],
  },
  {
    id: 'youtube',
    label: 'YouTube',
    desc: 'Video listing copy',
    slots: [
      { item: 'Video title', constraint: 'Click-worthy title, under 70 characters' },
      { item: 'Description', constraint: 'First 2 lines shown above the fold' },
      { item: 'Tags', constraint: '6–10 relevant tags' },
    ],
  },
]

/** Look up a marketing channel by id. */
export const findChannel = (id: string): MarketingChannel | undefined => marketingChannels.find((c) => c.id === id)

/** A portfolio campaign shown in the full workspace (Overview header + snapshot). */
export interface WorkspaceCampaign {
  id: string
  name: string
  /** header line under the title, e.g. "Global campaign · 4 markets · Feb–Mar 2026" */
  subtitle: string
  status: string
  /** optional hero/card image (served from /public); falls back to a gradient */
  image?: string
  /** CSS background-position for the image (default "center"); use to avoid cropping faces */
  imagePosition?: string
  objective: string
  products: string
  markets: string
  channels: string
  sources: string
  completeness: number
  readiness: number
  readyOf: string
  openRisks: string
  risksNote: string
  reuse: number
}

export const DEFAULT_CAMPAIGN = 'beo'

export const workspaceCampaigns: Record<string, WorkspaceCampaign> = {
  beo: {
    id: 'beo',
    name: 'Behind Every Original',
    subtitle: 'Global campaign · 4 markets · Feb–Mar 2026',
    status: 'At Risk',
    image: '/campaign-hero.webp',
    objective: 'Celebrate original voices shaping culture and connect their stories to Levi’s products and self-expression.',
    products: 'Low Slim Bootcut, 578™ Baggy, Relaxed Trucker',
    markets: 'United States, France, Japan and India',
    channels: 'E-commerce, social, CRM and paid display',
    sources: 'Workfront, AEM Assets and commerce data · reconciled 18 min ago',
    completeness: 89,
    readiness: 72,
    readyOf: '12 of 18 requirements ready',
    openRisks: '6',
    risksNote: '2 blocked · 4 at risk',
    reuse: 61,
  },
  football: {
    id: 'football',
    name: 'Football Federation Partnerships',
    subtitle: 'Partner campaign · 4 federations · 2026',
    status: 'At Risk',
    image: '/football-hero.jpg',
    objective: 'Coordinate four football federation partnerships and connect their crests and stories to Levi’s co-branded product.',
    products: 'Co-branded Trucker, 501® Original',
    markets: 'United States, France, England and Mexico',
    channels: 'Social, retail and CRM',
    sources: 'Workfront, partner rights registry and AEM · reconciled 30 min ago',
    completeness: 76,
    readiness: 58,
    readyOf: '10 of 20 requirements ready',
    openRisks: '5',
    risksNote: 'Partner sign-off pending',
    reuse: 40,
  },
  thermodapt: {
    id: 'thermodapt',
    name: '501® Thermodapt',
    subtitle: 'Product innovation · 3 markets · 2026',
    status: 'Blocked',
    image: '/thermodapt-hero.png',
    imagePosition: 'center top',
    objective: 'Launch the 501® Thermodapt with temperature-regulation storytelling grounded in approved evidence.',
    products: '501® Thermodapt',
    markets: 'United States, France and Japan',
    channels: 'E-commerce, social and paid display',
    sources: 'Workfront, legal claims register and commerce data',
    completeness: 62,
    readiness: 44,
    readyOf: '8 of 18 requirements ready',
    openRisks: '4',
    risksNote: 'Claim approval blocked',
    reuse: 30,
  },
  reimagine: {
    id: 'reimagine',
    name: 'REIIMAGINE / Denim Cowboy',
    subtitle: 'Historical campaign · Global archive',
    status: 'Published',
    image: '/denim-cowboy-hero.jpg',
    objective: 'A completed campaign retained as creative reference and content memory — not for direct reuse.',
    products: 'Archive collection',
    markets: 'Global archive',
    channels: 'Archive',
    sources: 'Archived campaign record',
    completeness: 100,
    readiness: 100,
    readyOf: 'Complete',
    openRisks: '0',
    risksNote: 'None · archived',
    reuse: 100,
  },
}

/** Suggested locale per market (used to prefill the campaign form). */
export const marketLocales: Record<string, string> = {
  'United States': 'en-US',
  France: 'fr-FR',
  Japan: 'ja-JP',
  India: 'en-IN',
  'United Kingdom': 'en-GB',
  Germany: 'de-DE',
  Mexico: 'es-MX',
  Global: 'en',
}

export const packages: Record<ChannelId, ChannelPackage> = {
  ecommerce: {
    title: 'E-commerce package',
    subtitle: 'Japan · 578™ Baggy · ja-JP',
    status: '3 generated · 3 reused',
    primary: 'Create missing e-commerce content',
    rows: [
      ['Product title', '578™ バギージーンズ', 'Reused', 'Approved product module', 'Levi’s SLM validation'],
      ['Product description', '90年代に着想を得た、ウエスト位置で穿くバギーフィット。', 'Localized', 'Approved product facts', 'SLM → Japanese specialist'],
      ['SEO title', 'Levi’s® 578™ バギージーンズ メンズ', 'Generated', '60-character search title', 'Levi’s SLM'],
      ['SEO description', '90年代のスタイルに着想を得た578™バギージーンズ。', 'Generated', '155-character search description', 'SLM → Japanese specialist'],
      ['CTA', 'コレクションを見る', 'Reused', 'Japan-approved commerce CTA', 'Translation memory'],
      ['Image alt text', 'ブラックのLevi’s® 578™バギージーンズを着用した全身スタイル。', 'Generated', 'Accessibility and product accuracy', 'Vision → SLM validation'],
    ],
    notes: ['Product facts are locked', 'Light human review', 'SCAYLE / CMS destination'],
  },
  crm: {
    title: 'CRM package',
    subtitle: 'Japan · 578™ Baggy · ja-JP',
    status: '2 missing · 1 under review',
    primary: 'Create missing CRM content',
    rows: [
      ['Subject line', 'Not yet created', 'Missing', '28-character limit', 'Frontier + Japanese specialist'],
      ['Preheader', 'Not yet created', 'Missing', '80-character limit', 'Levi’s SLM'],
      ['Hero headline', '自分らしさには、物語がある。', 'Under review', 'High-visibility campaign expression', 'Japanese specialist'],
      ['Body copy', 'Approved product story available', 'Reusable', 'Campaign + product modules', 'Levi’s SLM'],
      ['Product block', '578™ fit and fabric module', 'Reused', 'Approved product facts', 'Commerce source'],
      ['CTA', 'コレクションを見る', 'Reused', 'Japan-approved CTA', 'Translation memory'],
    ],
    notes: ['Regional brand review required', 'Red Tab segment available', 'CRM platform destination'],
  },
  instagram: {
    title: 'Instagram package',
    subtitle: 'Japan · 578™ Baggy · ja-JP',
    status: '1 missing · asset ready',
    primary: 'Create missing Instagram content',
    rows: [
      ['Feed caption', '578™で、自分らしいシルエットを。', 'Generated', 'Product-led feed caption', 'Levi’s SLM'],
      ['Story headline', 'Not yet created', 'Missing', '32-character safe-area limit', 'Japanese specialist'],
      ['Image alt text', 'ブラックの578™バギージーンズを着用した全身スタイル。', 'Generated', 'Accessibility', 'Vision → SLM'],
      ['Campaign tags', '#Levis #BehindEveryOriginal', 'Reusable', 'Approved global tags', 'Campaign baseline'],
      ['Source asset', 'AST-006 Japan product-led frame', 'Ready', 'Japan social rights valid', 'AEM Assets'],
    ],
    notes: ['Territory-cleared replacement asset selected', 'Story layout adaptation required', 'Social platform destination'],
  },
  display: {
    title: 'Paid display package',
    subtitle: 'Japan · 578™ Baggy · ja-JP',
    status: '2 generated · 1 missing',
    primary: 'Create missing display content',
    rows: [
      ['Short headline', '578™で、自分らしく。', 'Generated', '30-character limit', 'Levi’s SLM'],
      ['Long headline', '自分らしいシルエットを、578™バギーで。', 'Generated', '60-character limit', 'SLM → specialist'],
      ['CTA', 'コレクションを見る', 'Reused', 'Approved display CTA', 'Translation memory'],
      ['1:1 variant', 'Copy package ready', 'Ready', 'Square placement', 'Adapt'],
      ['1.91:1 variant', 'Long headline review needed', 'At Risk', 'Landscape placement', 'Create → Adapt'],
      ['4:5 variant', 'Not yet created', 'Missing', 'Portrait placement', 'Adapt'],
    ],
    notes: ['Responsive display set', '3 destination formats', 'Paid media platform'],
  },
  creator: {
    title: 'Creator brief',
    subtitle: 'Japan · 578™ Baggy · ja-JP',
    status: 'Optional · not routed',
    primary: 'Create creator brief',
    rows: [
      ['Campaign objective', 'Celebrate personal originality through denim', 'Reusable', 'Campaign baseline', 'Workfront brief'],
      ['Product focus', '578™ Baggy silhouette and movement', 'Reusable', 'Approved product facts', 'Commerce source'],
      ['Mandatory message', 'Behind Every Original campaign lineage', 'Reusable', 'Protected campaign element', 'Campaign baseline'],
      ['Creator freedom', 'Personal styling and movement interpretation', 'Generated', 'Market-appropriate guidance', 'Frontier model'],
      ['Do not', 'Make unsupported fit or performance claims', 'Reusable', 'Governance rule', 'Assurance policy'],
      ['Deliverables', '1 Reel, 2 Stories, 3 stills', 'Draft', 'Prototype deliverable set', 'Threadline template'],
    ],
    notes: ['Optional for current e-commerce route', 'Global + regional approval if activated', 'Creator workflow destination'],
  },
}
