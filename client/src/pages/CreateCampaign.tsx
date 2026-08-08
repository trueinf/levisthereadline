import { Fragment, useMemo, useState } from 'react'
import { useApp } from '../context'
import { s } from '../style'
import { PageHeader } from '../components/common'
import { ImageStudio } from '../components/ImageStudio'
import { Icon } from '../icons'
import { findChannel, marketingChannels, marketLocales, TONES, type Campaign } from '../data'
import { campaignSystemPrompt, campaignSlotUserPrompt, TRANSLATE_SYSTEM } from '../generation'
import { generateContent } from '../api'

/** Default image brief derived from the campaign details. */
function imagePromptFor(c: Campaign): string {
  return [
    `High-quality marketing photograph for the campaign "${c.name}".`,
    c.brief,
    c.product ? `Featured product: ${c.product}.` : '',
    c.audience ? `Audience: ${c.audience}.` : '',
    c.tone ? `Tone: ${c.tone}.` : '',
    `Market: ${c.market}.`,
    'Professional advertising photography, clean composition, natural lighting, on-brand. No text, captions, or logos overlaid.',
  ]
    .filter(Boolean)
    .join(' ')
}

export function CreateCampaign() {
  const { builderId, campaigns } = useApp()
  const existing = builderId && builderId !== 'new' ? campaigns.find((c) => c.id === builderId) : undefined
  return existing ? <CampaignWorkspace campaign={existing} /> : <NewCampaignForm />
}

/* ---------------------------------------------------------------- Wizard */

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="stepper">
      {steps.map((label, i) => (
        <Fragment key={label}>
          <div className={`step ${i === current ? 'active' : i < current ? 'done' : ''}`}>
            <div className="step-dot">{i < current ? '✓' : i + 1}</div>
            <div className="step-label">{label}</div>
          </div>
          {i < steps.length - 1 && <div className={`step-line ${i < current ? 'done' : ''}`} />}
        </Fragment>
      ))}
    </div>
  )
}

function NewCampaignForm() {
  const { addCampaign, openCampaign, closeBuilder, toast } = useApp()
  const [step, setStep] = useState(0)

  const [name, setName] = useState('')
  const [brief, setBrief] = useState('')
  const [product, setProduct] = useState('')
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState<string>('Confident')
  const [market, setMarket] = useState('United States')
  const [locale, setLocale] = useState('en-US')
  const [channels, setChannels] = useState<Record<string, boolean>>(
    Object.fromEntries(marketingChannels.map((c) => [c.id, ['instagram', 'facebook', 'seo', 'email'].includes(c.id)])),
  )

  const selected = marketingChannels.filter((c) => channels[c.id])
  const toggle = (id: string) => setChannels((prev) => ({ ...prev, [id]: !prev[id] }))
  const totalItems = selected.reduce((n, c) => n + c.slots.length, 0)

  function onMarketChange(m: string) {
    setMarket(m)
    if (marketLocales[m]) setLocale(marketLocales[m])
  }

  function next() {
    if (step === 0 && !name.trim()) return toast('Give the campaign a name')
    if (step === 1 && selected.length === 0) return toast('Select at least one channel')
    setStep((v) => Math.min(v + 1, 2))
  }

  function create() {
    const campaign: Campaign = {
      id: `camp-${Date.now()}`,
      name: name.trim(),
      brief: brief.trim(),
      product: product.trim(),
      audience: audience.trim(),
      tone,
      market,
      locale: locale.trim() || 'en',
      channels: selected.map((c) => c.id),
      generated: {},
      createdAt: new Date().toISOString(),
    }
    addCampaign(campaign)
    openCampaign(campaign.id)
    toast('Campaign created')
  }

  return (
    <div className="page">
      <div className="wizard">
        <button className="btn btn-light btn-sm" style={s('margin-bottom:16px')} onClick={closeBuilder}>← Back to Campaigns</button>
        <PageHeader
          eyebrow="New campaign"
          title="Create a campaign"
          sub="Set the context, choose channels, then generate on-brand content and visuals."
        />

        <Stepper steps={['Details', 'Channels', 'Review']} current={step} />

        <div className="card card-pad">
          {step === 0 && (
            <>
              <div className="field-group">
                <label className="tl-label">Campaign name</label>
                <input className="tl-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Spring Denim Reset" autoFocus />
              </div>
              <div className="field-group">
                <label className="tl-label">Brief / objective</label>
                <textarea className="tl-field" value={brief} onChange={(e) => setBrief(e.target.value)} placeholder="What should this campaign say and achieve?" />
              </div>
              <div className="grid grid-2" style={s('gap:16px')}>
                <div className="field-group">
                  <label className="tl-label">Featured product</label>
                  <input className="tl-field" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. 578™ Baggy" />
                </div>
                <div className="field-group">
                  <label className="tl-label">Target audience</label>
                  <input className="tl-field" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Gen-Z, style-led" />
                </div>
              </div>
              <div className="field-group">
                <label className="tl-label">Tone of voice</label>
                <div className="choice-tiles">
                  {TONES.map((t) => (
                    <button key={t} className={`choice-tile ${tone === t ? 'selected' : ''}`} onClick={() => setTone(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-2" style={s('gap:16px')}>
                <div className="field-group">
                  <label className="tl-label">Market</label>
                  <select className="tl-field" value={market} onChange={(e) => onMarketChange(e.target.value)}>
                    {Object.keys(marketLocales).map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label className="tl-label">Locale</label>
                  <input className="tl-field" value={locale} onChange={(e) => setLocale(e.target.value)} placeholder="e.g. en-US" />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h3 style={s('margin:0 0 4px')}>Which channels should this campaign cover?</h3>
              <p style={s('font-size:13px;color:var(--muted);margin:0 0 16px')}>Threadline will generate the right content pieces for each one.</p>
              <div className="grid grid-2" style={s('gap:10px')}>
                {marketingChannels.map((c) => (
                  <div key={c.id} className={`channel-pick ${channels[c.id] ? 'selected' : ''}`} onClick={() => toggle(c.id)}>
                    <span className="tick">✓</span>
                    <div><b>{c.label}</b><span>{c.slots.length} pieces · {c.desc}</span></div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 style={s('margin:0 0 14px')}>Review</h3>
              <div className="detail-pair"><span>Campaign</span><b>{name.trim() || 'Untitled'}</b></div>
              {brief.trim() && <div className="detail-pair"><span>Brief</span><b>{brief.trim()}</b></div>}
              {product.trim() && <div className="detail-pair"><span>Product</span><b>{product.trim()}</b></div>}
              {audience.trim() && <div className="detail-pair"><span>Audience</span><b>{audience.trim()}</b></div>}
              <div className="detail-pair"><span>Tone</span><b>{tone}</b></div>
              <div className="detail-pair"><span>Market</span><b>{market} · {locale}</b></div>
              <div className="detail-pair"><span>Channels</span><b>{selected.map((c) => c.label).join(', ')}</b></div>
              <div className="detail-pair"><span>Content to generate</span><b>{totalItems} pieces across {selected.length} channel{selected.length === 1 ? '' : 's'}</b></div>
            </>
          )}

          <div style={s('display:flex;justify-content:space-between;align-items:center;margin-top:22px;padding-top:18px;border-top:1px solid #eee9e2')}>
            <button className="btn btn-light" onClick={() => (step === 0 ? closeBuilder() : setStep((v) => v - 1))}>
              {step === 0 ? 'Cancel' : 'Back'}
            </button>
            {step < 2 ? (
              <button className="btn btn-primary" onClick={next}>Continue</button>
            ) : (
              <button className="btn btn-primary" onClick={create}>Create campaign</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------- Workspace */

interface Target {
  channel: string
  channelLabel: string
  item: string
  constraint: string
}

function CampaignWorkspace({ campaign }: { campaign: Campaign }) {
  const { updateCampaignContent, closeBuilder, openNewCampaign, model, toast } = useApp()
  const [busy, setBusy] = useState<string | null>(null) // key, channelId, or '__all__'
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [translations, setTranslations] = useState<Record<string, string>>({})
  const [showEnglish, setShowEnglish] = useState(false)
  const [translating, setTranslating] = useState(false)

  const targets: Target[] = useMemo(
    () =>
      campaign.channels.flatMap((id) => {
        const ch = findChannel(id)
        if (!ch) return []
        return ch.slots.map((slot) => ({ channel: id, channelLabel: ch.label, item: slot.item, constraint: slot.constraint }))
      }),
    [campaign.channels],
  )

  const keyOf = (t: Target) => `${t.channel}:${t.item}`
  const doneCount = targets.filter((t) => campaign.generated[keyOf(t)]).length
  const pct = targets.length ? Math.round((doneCount / targets.length) * 100) : 0
  const anyBusy = busy != null

  async function runOne(t: Target) {
    const key = keyOf(t)
    setErrors((e) => {
      const n = { ...e }
      delete n[key]
      return n
    })
    const text = await generateContent({
      model,
      system: campaignSystemPrompt(campaign),
      user: campaignSlotUserPrompt(t.channelLabel, t.item, t.constraint),
    })
    updateCampaignContent(campaign.id, key, text)
    // new content invalidates any cached translation
    setTranslations((prev) => {
      const n = { ...prev }
      delete n[key]
      return n
    })
  }

  async function genOne(t: Target) {
    setShowEnglish(false)
    setBusy(keyOf(t))
    try {
      await runOne(t)
    } catch (err) {
      setErrors((e) => ({ ...e, [keyOf(t)]: err instanceof Error ? err.message : String(err) }))
      toast('Generation failed')
    } finally {
      setBusy(null)
    }
  }

  async function genMany(list: Target[], busyKey: string) {
    setShowEnglish(false)
    setBusy(busyKey)
    let errs = 0
    for (const t of list) {
      try {
        await runOne(t)
      } catch (err) {
        errs++
        setErrors((e) => ({ ...e, [keyOf(t)]: err instanceof Error ? err.message : String(err) }))
      }
    }
    setBusy(null)
    toast(errs > 0 ? `Finished with ${errs} error${errs > 1 ? 's' : ''}` : `Generated ${list.length} piece${list.length > 1 ? 's' : ''}`)
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      toast('Copied to clipboard')
    } catch {
      toast('Could not copy')
    }
  }

  async function translateAll() {
    const keys = targets.map(keyOf).filter((k) => campaign.generated[k])
    const need = keys.filter((k) => !translations[k])
    if (need.length === 0) {
      setShowEnglish((v) => !v)
      return
    }
    setTranslating(true)
    for (const k of need) {
      try {
        const en = await generateContent({ model, system: TRANSLATE_SYSTEM, user: campaign.generated[k] })
        setTranslations((prev) => ({ ...prev, [k]: en }))
      } catch {
        /* skip individual translation failures */
      }
    }
    setTranslating(false)
    setShowEnglish(true)
  }

  return (
    <div className="page">
      <button className="btn btn-light btn-sm" style={s('margin-bottom:16px')} onClick={closeBuilder}>← Back to Campaigns</button>

      <PageHeader
        eyebrow="Campaign"
        title={campaign.name}
        sub={campaign.brief || 'Generate on-brand content and visuals for every channel.'}
        action={
          <div style={s('display:flex;gap:9px;align-items:center;flex-wrap:wrap;justify-content:flex-end')}>
            <button className="btn btn-light" onClick={openNewCampaign}>New campaign</button>
            <button className="btn btn-light" disabled={anyBusy || translating || doneCount === 0} onClick={translateAll}>
              <Icon name="globe" /> {translating ? 'Translating…' : showEnglish ? 'Show original' : 'Translate to English'}
            </button>
            <button className="btn btn-primary" disabled={anyBusy} onClick={() => genMany(targets, '__all__')}>
              <Icon name="sparkle" /> {busy === '__all__' ? `Generating ${doneCount}/${targets.length}…` : 'Generate all content'}
            </button>
          </div>
        }
      />

      <div className="context-bar">
        <span className="context-token"><strong>Market</strong> {campaign.market}</span>
        <span className="context-token"><strong>Locale</strong> {campaign.locale}</span>
        {campaign.product && <span className="context-token"><strong>Product</strong> {campaign.product}</span>}
        {campaign.audience && <span className="context-token"><strong>Audience</strong> {campaign.audience}</span>}
        <span className="context-token"><strong>Tone</strong> {campaign.tone}</span>
        <div className="progress-ring" style={s('margin-left:auto')}>
          <div className="progress bar"><span style={s(`width:${pct}%`)} /></div>
          <b style={s('font-size:12px')}>{doneCount}/{targets.length}</b>
        </div>
      </div>

      <ImageStudio label={`${campaign.name} visual`} defaultPrompt={imagePromptFor(campaign)} />

      {campaign.channels.map((id) => {
        const ch = findChannel(id)
        if (!ch) return null
        const chTargets: Target[] = ch.slots.map((slot) => ({ channel: id, channelLabel: ch.label, item: slot.item, constraint: slot.constraint }))
        const chDone = chTargets.filter((t) => campaign.generated[keyOf(t)]).length
        return (
          <div className="card card-pad" style={s('margin-bottom:18px')} key={id}>
            <div className="card-head">
              <div><h2>{ch.label}</h2><p>{chDone}/{ch.slots.length} generated · {ch.desc}</p></div>
              <button className="btn btn-light btn-sm" disabled={anyBusy} onClick={() => genMany(chTargets, id)}>
                {busy === id ? 'Generating…' : chDone === ch.slots.length ? 'Regenerate channel' : 'Generate channel'}
              </button>
            </div>

            {ch.slots.map((slot) => {
              const key = `${id}:${slot.item}`
              const content = campaign.generated[key]
              const shown = showEnglish && translations[key] ? translations[key] : content
              const err = errors[key]
              const rowBusy = busy === key
              const t: Target = { channel: id, channelLabel: ch.label, item: slot.item, constraint: slot.constraint }
              return (
                <div className="gen-item" key={slot.item}>
                  <div className="gen-head">
                    <div>
                      <h4>{slot.item}</h4>
                      <div className="slot-detail">{slot.constraint}</div>
                    </div>
                    <div className="gen-actions">
                      {showEnglish && translations[key] && <span className="meta-pill">EN</span>}
                      {content && !rowBusy && (
                        <>
                          <button className="icon-mini" title="Copy" onClick={() => copy(shown || '')}><Icon name="copy" /></button>
                          <button className="icon-mini" title="Regenerate" disabled={anyBusy} onClick={() => genOne(t)}><Icon name="refresh" /></button>
                        </>
                      )}
                      {!content && !rowBusy && (
                        <button className="btn btn-light btn-sm" disabled={anyBusy} onClick={() => genOne(t)}>Generate</button>
                      )}
                      {rowBusy && <button className="btn btn-light btn-sm" disabled>…</button>}
                    </div>
                  </div>
                  {rowBusy ? (
                    <div className="gen-empty">Generating…</div>
                  ) : shown ? (
                    <div className="gen-body">{shown}</div>
                  ) : err ? (
                    <p style={s('font-size:12px;color:var(--danger);margin:0')}>{err}</p>
                  ) : (
                    <div className="gen-empty">Not generated yet.</div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
