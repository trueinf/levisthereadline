import { campaignGrounding, packages, type Campaign, type ChannelId, type ChannelPackage } from './data'

export type Row = ChannelPackage['rows'][number]

/** The content slots (item + constraint) to produce per channel, derived from the package templates. */
export const channelSlots: Record<ChannelId, { item: string; constraint: string }[]> = Object.fromEntries(
  (Object.entries(packages) as [ChannelId, ChannelPackage][]).map(([id, p]) => [
    id,
    p.rows.map((r) => ({ item: r[0], constraint: r[3] })),
  ]),
) as Record<ChannelId, { item: string; constraint: string }[]>

/** System prompt grounded in a user-created campaign's own details. */
export function campaignSystemPrompt(c: Campaign): string {
  return [
    `You are Threadline, Levi's agentic content generation assistant. You write on-brand marketing copy for the campaign "${c.name}".`,
    '',
    'Campaign context:',
    `- Campaign name: ${c.name}`,
    c.brief ? `- Brief / objective: ${c.brief}` : '',
    c.product ? `- Product: ${c.product}` : '',
    c.audience ? `- Target audience: ${c.audience}` : '',
    c.tone ? `- Tone of voice: ${c.tone}` : '',
    `- Market: ${c.market}`,
    `- Locale: ${c.locale}`,
    '',
    'Rules:',
    `- Write in the correct language for the locale ${c.locale}. If it is not English, write natural, native copy (not a literal translation).`,
    '- Respect the stated purpose/constraint exactly, including any character limit.',
    '- Stay factual to the product; do not invent unsupported performance or fit claims.',
    '- Return ONLY the finished content text — no quotes, labels, notes, or explanation.',
  ]
    .filter(Boolean)
    .join('\n')
}

/** System prompt for the content-package flow, built from the editable context. */
export function packageSystemPrompt(ctx: {
  campaign: string
  market: string
  product: string
  locale: string
  objective: string
}): string {
  return [
    `You are Threadline, Levi's agentic content generation assistant. You write on-brand marketing copy for the campaign "${ctx.campaign}".`,
    '',
    'Campaign context:',
    `- Campaign: ${ctx.campaign}`,
    ctx.product ? `- Product: ${ctx.product}` : '',
    `- Market: ${ctx.market}`,
    `- Locale: ${ctx.locale}`,
    ctx.objective ? `- Objective: ${ctx.objective}` : '',
    '',
    'Rules:',
    `- Write in the correct language for the locale ${ctx.locale}. If it is not English, write natural, native copy (not a literal translation).`,
    '- Respect the stated purpose/constraint exactly, including any character limit.',
    '- Stay factual to the product; do not invent unsupported performance or fit claims.',
    '- Return ONLY the finished content text — no quotes, labels, notes, or explanation.',
  ]
    .filter(Boolean)
    .join('\n')
}

/** System prompt used to translate generated copy into English for review. */
export const TRANSLATE_SYSTEM =
  "You are a professional translator. Translate the user's marketing copy into natural, fluent English. Preserve meaning, tone, product names, and formatting. Return ONLY the English translation — no notes or quotes."

export function campaignSlotUserPrompt(channelLabel: string, item: string, constraint: string): string {
  return [
    `Channel: ${channelLabel}`,
    `Content item: ${item}`,
    `Purpose / constraint: ${constraint}`,
    '',
    'Write the content for this item now.',
  ].join('\n')
}

/** A slot whose content still needs to be created. */
export const NEEDS_CONTENT = (state: string) =>
  state === 'Missing' || state === 'Under review' || state === 'At Risk'

/** System prompt: grounds every generation in the campaign brand context. */
export function systemPrompt(pkg: ChannelPackage, objective?: string): string {
  const g = campaignGrounding
  return [
    'You are Threadline, Levi\'s agentic content generation assistant. You write on-brand marketing copy for the global campaign "Behind Every Original".',
    '',
    'Brand & campaign grounding:',
    `- Core message: ${g.coreMessage}`,
    `- Product emphasis: ${g.productEmphasis}`,
    `- Proof point: ${g.proofPoint}`,
    `- Call to action: ${g.cta}`,
    `- Protected elements (keep exact): ${g.protectedElements}`,
    `- Context for this package: ${pkg.subtitle}`,
    objective ? `- Objective for this content: ${objective}` : '',
    '',
    'Rules:',
    '- Write in the correct language for the target locale. If the locale is ja-JP, write natural, understated Japanese (not a literal translation).',
    '- Respect the stated purpose/constraint exactly, including any character limit.',
    '- Stay factual to the product. Do not invent unsupported performance or fit claims.',
    '- Return ONLY the finished content text — no quotes, labels, notes, or explanation.',
  ]
    .filter(Boolean)
    .join('\n')
}

export function userPrompt(pkg: ChannelPackage, row: Row): string {
  return [
    `Channel: ${pkg.title} (${pkg.subtitle})`,
    `Content item: ${row[0]}`,
    `Purpose / constraint: ${row[3]}`,
    `Preferred model route (style hint only): ${row[4]}`,
    '',
    'Write the content for this item now.',
  ].join('\n')
}
