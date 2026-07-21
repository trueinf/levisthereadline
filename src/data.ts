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
