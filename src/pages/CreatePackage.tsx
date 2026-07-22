import { useMemo, useState } from 'react'
import { useApp } from '../context'
import { s } from '../style'
import { PageHeader } from '../components/common'
import { ImageStudio } from '../components/ImageStudio'
import { Icon } from '../icons'
import { marketLocales, packages, type ChannelId } from '../data'
import { packageSystemPrompt, campaignSlotUserPrompt, TRANSLATE_SYSTEM } from '../generation'
import { generateContent } from '../api'

const CHANNELS: { id: ChannelId; label: string; desc: string }[] = [
  { id: 'ecommerce', label: 'E-commerce', desc: 'SEO, product content, alt text' },
  { id: 'crm', label: 'CRM', desc: 'Subject, preheader, hero, body, CTA' },
  { id: 'instagram', label: 'Instagram', desc: 'Caption, Story headline, alt text' },
  { id: 'display', label: 'Paid display', desc: 'Short headline, long headline, CTA' },
  { id: 'creator', label: 'Creator brief', desc: 'Objective, guardrails, deliverables' },
]

const OBJECTIVES: { id: string; desc: string }[] = [
  { id: 'Product discovery', desc: 'Explain the product and encourage exploration' },
  { id: 'Campaign engagement', desc: 'Build emotional relevance and participation' },
  { id: 'Conversion', desc: 'Drive product clicks and purchase intent' },
  { id: 'Creator enablement', desc: 'Give creators clear intent and room to interpret' },
]

type RunStatus = 'pending' | 'running' | 'done' | 'error'
interface Run {
  channel: ChannelId
  channelLabel: string
  item: string
  constraint: string
  status: RunStatus
  content?: string
  english?: string
  error?: string
}

const statusLabel: Record<RunStatus, string> = { pending: 'Queued', running: 'Generating…', done: 'Generated', error: 'Failed' }
const statusCls: Record<RunStatus, string> = { pending: 'neutral', running: 'risk', done: 'ready', error: 'blocked' }

export function CreatePackage() {
  const { closeCreate, model, toast } = useApp()
  const [step, setStep] = useState<'configure' | 'generated'>('configure')

  // editable context
  const [campaignName, setCampaignName] = useState('Behind Every Original')
  const [market, setMarket] = useState('Japan')
  const [product, setProduct] = useState('578™ Baggy')
  const [locale, setLocale] = useState('ja-JP')
  const [channels, setChannels] = useState<Record<ChannelId, boolean>>({
    ecommerce: true,
    crm: true,
    instagram: true,
    display: false,
    creator: false,
  })
  const [objective, setObjective] = useState('Product discovery')

  const [runs, setRuns] = useState<Run[]>([])
  const [running, setRunning] = useState(false)
  const [published, setPublished] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showEnglish, setShowEnglish] = useState(false)
  const [translating, setTranslating] = useState(false)

  const chosen = CHANNELS.filter((c) => channels[c.id])
  const targets = useMemo(
    () =>
      chosen.flatMap((c) =>
        packages[c.id].rows.map((r) => ({ channel: c.id, channelLabel: c.label, item: r[0], constraint: r[3] })),
      ),
    [chosen],
  )
  const ctx = { campaign: campaignName, market, product, locale, objective }
  const doneCount = runs.filter((r) => r.status === 'done').length

  const toggle = (id: ChannelId) => setChannels((prev) => ({ ...prev, [id]: !prev[id] }))
  function onMarketChange(m: string) {
    setMarket(m)
    if (marketLocales[m]) setLocale(marketLocales[m])
  }

  async function generate() {
    if (targets.length === 0) {
      toast('Select at least one channel')
      return
    }
    setPublished(false)
    setShowEnglish(false)
    setStep('generated')
    setRunning(true)
    setRuns(targets.map((t) => ({ ...t, status: 'pending' as RunStatus })))
    for (let i = 0; i < targets.length; i++) {
      const t = targets[i]
      setRuns((prev) => prev.map((r, idx) => (idx === i ? { ...r, status: 'running' } : r)))
      try {
        const text = await generateContent({
          model,
          system: packageSystemPrompt(ctx),
          user: campaignSlotUserPrompt(t.channelLabel, t.item, t.constraint),
        })
        setRuns((prev) => prev.map((r, idx) => (idx === i ? { ...r, status: 'done', content: text } : r)))
      } catch (err) {
        setRuns((prev) => prev.map((r, idx) => (idx === i ? { ...r, status: 'error', error: err instanceof Error ? err.message : String(err) } : r)))
      }
    }
    setRunning(false)
  }

  async function translateAll() {
    // If translations already exist, just toggle the view.
    const need = runs.filter((r) => r.content && !r.english)
    if (need.length === 0) {
      setShowEnglish((v) => !v)
      return
    }
    setTranslating(true)
    for (const r of need) {
      try {
        const en = await generateContent({ model, system: TRANSLATE_SYSTEM, user: r.content! })
        setRuns((prev) => prev.map((x) => (x.channel === r.channel && x.item === r.item ? { ...x, english: en } : x)))
      } catch {
        /* skip individual translation failures */
      }
    }
    setTranslating(false)
    setShowEnglish(true)
  }

  const stepper = (
    <div className="stepper">
      <div className={`step ${step === 'configure' ? 'active' : 'done'}`}>
        <div className="step-dot">{step === 'configure' ? '1' : '✓'}</div>
        <div className="step-label">Configure</div>
      </div>
      <div className={`step-line ${step === 'generated' ? 'done' : ''}`} />
      <div className={`step ${step === 'generated' ? 'active' : ''}`}>
        <div className="step-dot">2</div>
        <div className="step-label">Review &amp; publish</div>
      </div>
    </div>
  )

  /* ---------------------------------------------------- Configure step */
  if (step === 'configure') {
    return (
      <div className="page">
        <button className="btn btn-light btn-sm" style={s('margin-bottom:16px')} onClick={closeCreate}>← Back to Create</button>
        <PageHeader
          eyebrow="New package"
          title="Create content package"
          sub="Set the campaign context, choose channels and an objective, then generate a coherent multi-channel package."
        />
        {stepper}

        <div className="layout-main">
          <section>
            <div className="card card-pad" style={s('margin-bottom:18px')}>
              <div className="eyebrow">1 · Campaign context</div>
              <h3 style={s('margin:0 0 16px')}>Edit the creation context</h3>
              <div className="field-group">
                <label className="tl-label">Campaign</label>
                <input className="tl-field" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
              </div>
              <div className="grid grid-2" style={s('gap:16px')}>
                <div className="field-group">
                  <label className="tl-label">Market / country</label>
                  <select className="tl-field" value={market} onChange={(e) => onMarketChange(e.target.value)}>
                    {Object.keys(marketLocales).map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label className="tl-label">Locale</label>
                  <input className="tl-field" value={locale} onChange={(e) => setLocale(e.target.value)} />
                </div>
              </div>
              <div className="field-group">
                <label className="tl-label">Product</label>
                <input className="tl-field" value={product} onChange={(e) => setProduct(e.target.value)} />
              </div>
            </div>

            <div className="card card-pad" style={s('margin-bottom:18px')}>
              <div className="eyebrow">2 · Channels</div>
              <h3 style={s('margin:0 0 12px')}>Select the channels for this package</h3>
              <div className="grid grid-2" style={s('gap:10px')}>
                {CHANNELS.map((c) => (
                  <div key={c.id} className={`channel-pick ${channels[c.id] ? 'selected' : ''}`} onClick={() => toggle(c.id)}>
                    <span className="tick">✓</span>
                    <div><b>{c.label}</b><span>{packages[c.id].rows.length} pieces · {c.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="eyebrow">3 · Objective</div>
              <h3 style={s('margin:0 0 12px')}>What should this content achieve?</h3>
              <div className="grid grid-2" style={s('gap:10px')}>
                {OBJECTIVES.map((o) => (
                  <div key={o.id} className={`channel-pick ${objective === o.id ? 'selected' : ''}`} onClick={() => setObjective(o.id)}>
                    <span className="tick">✓</span>
                    <div><b>{o.id}</b><span>{o.desc}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside>
            <div className="card card-pad" style={s('position:sticky;top:86px')}>
              <div className="eyebrow">Generate</div>
              <h3 style={s('margin-bottom:8px')}>{targets.length} content item{targets.length === 1 ? '' : 's'} across {chosen.length} channel{chosen.length === 1 ? '' : 's'}</h3>
              <div className="detail-pair"><span>Campaign</span><b>{campaignName || '—'}</b></div>
              <div className="detail-pair"><span>Market</span><b>{market} · {locale}</b></div>
              <div className="detail-pair"><span>Product</span><b>{product || '—'}</b></div>
              <div className="detail-pair"><span>Objective</span><b>{objective}</b></div>
              <button className="btn btn-primary" style={s('width:100%;justify-content:center;margin-top:16px')} disabled={targets.length === 0} onClick={generate}>
                <Icon name="sparkle" /> Generate content
              </button>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  /* ---------------------------------------------------- Generated step */
  return (
    <div className="page">
      <button className="btn btn-light btn-sm" style={s('margin-bottom:16px')} onClick={() => setStep('configure')}>← Back to edit</button>
      <PageHeader
        eyebrow="Content package"
        title={campaignName}
        sub={`${market} · ${locale} · ${product} — ${objective}`}
        action={
          <div style={s('display:flex;gap:9px;align-items:center')}>
            <button className="btn btn-light" disabled={running} onClick={generate}>Regenerate all</button>
            <button
              className="btn btn-primary"
              disabled={running || doneCount === 0 || published}
              onClick={() => {
                setPublished(true)
                setShowPublishModal(true)
              }}
            >
              {published ? 'Published ✓' : 'Publish'}
            </button>
          </div>
        }
      />
      {stepper}

      <div className="output-split">
        <div className="visual-col">
          <ImageStudio
            label={`${campaignName} visual`}
            defaultPrompt={`High-quality marketing photograph for the campaign "${campaignName}". Featured product: ${product}. Market: ${market}. Professional advertising photography, clean composition, natural lighting, on-brand. No text, captions, or logos overlaid.`}
          />
        </div>

        <section className="card card-pad">
          <div className="card-head">
            <div><h2>Generated content</h2><p>Live output from {model} for {campaignName}.</p></div>
            <div style={s('display:flex;gap:9px;align-items:center;flex-wrap:wrap;justify-content:flex-end')}>
              <button className="btn btn-light btn-sm" disabled={running || translating || doneCount === 0} onClick={translateAll}>
                <Icon name="globe" /> {translating ? 'Translating…' : showEnglish ? 'Show original' : 'Translate to English'}
              </button>
              <span className={`status ${running ? 'risk' : 'ready'}`}>{running ? `${doneCount}/${runs.length} done` : `${doneCount}/${runs.length} generated`}</span>
            </div>
          </div>

          {runs.map((r, i) => {
            const shown = showEnglish && r.english ? r.english : r.content
            return (
              <div className="output-block" key={i}>
                <div className="output-head">
                  <div>
                    <h3>{r.item}</h3>
                    <div className="slot-detail">{r.channelLabel} · {r.constraint}</div>
                  </div>
                  <div style={s('display:flex;gap:7px;align-items:center')}>
                    {showEnglish && r.english && <span className="meta-pill">EN</span>}
                    <span className={`status ${statusCls[r.status]}`}>{statusLabel[r.status]}</span>
                  </div>
                </div>
                {shown && <div className="output-text">{shown}</div>}
                {r.error && <p style={s('font-size:12px;color:var(--danger);margin:0')}>{r.error}</p>}
              </div>
            )
          })}
        </section>
      </div>

      {showPublishModal && (
        <div className="modal-backdrop" onClick={() => setShowPublishModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-badge"><Icon name="check" /></div>
            <h2>Package published</h2>
            <p>
              <b>{campaignName}</b> — {doneCount} content item{doneCount === 1 ? '' : 's'} across {chosen.length} channel{chosen.length === 1 ? '' : 's'} ({market} · {locale}) — is now published.
            </p>
            <button className="btn btn-primary" style={s('width:100%;justify-content:center')} onClick={() => setShowPublishModal(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
