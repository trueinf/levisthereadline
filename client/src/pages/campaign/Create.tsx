import { useState } from 'react'
import { useApp } from '../../context'
import { s } from '../../style'
import { Btn, PageHeader, Status } from '../../components/common'
import { packages, type ChannelId } from '../../data'
import { generateContent } from '../../api'
import { NEEDS_CONTENT, systemPrompt, userPrompt, type Row } from '../../generation'

const channelTabs: [ChannelId, string][] = [
  ['ecommerce', 'E-commerce'],
  ['crm', 'CRM'],
  ['instagram', 'Instagram'],
  ['display', 'Paid display'],
  ['creator', 'Creator brief'],
]

function ChannelWorkspace() {
  const { createChannel, openCreate, toast, model, overrides, setOverride } = useApp()
  const pkg = packages[createChannel]
  const [busy, setBusy] = useState<string | null>(null) // item name, or '__all__'

  // Apply any generated overrides on top of the static seed rows.
  const rows: Row[] = pkg.rows.map((r) => {
    const ov = overrides[`${createChannel}:${r[0]}`]
    return ov ? [r[0], ov.content, ov.state, r[3], r[4]] : r
  })

  async function genOne(row: Row) {
    setBusy(row[0])
    try {
      const text = await generateContent({ model, system: systemPrompt(pkg), user: userPrompt(pkg, row) })
      setOverride(`${createChannel}:${row[0]}`, { content: text, state: 'Generated' })
      toast(`Generated: ${row[0]}`)
    } catch (err) {
      toast(`Generation failed — ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setBusy(null)
    }
  }

  async function genMissing() {
    const targets = rows.filter((r) => NEEDS_CONTENT(r[2]))
    if (targets.length === 0) {
      toast('No missing content in this package')
      return
    }
    setBusy('__all__')
    try {
      for (const row of targets) {
        const text = await generateContent({ model, system: systemPrompt(pkg), user: userPrompt(pkg, row) })
        setOverride(`${createChannel}:${row[0]}`, { content: text, state: 'Generated' })
      }
      toast(`Generated ${targets.length} item${targets.length > 1 ? 's' : ''} with ${model}`)
    } catch (err) {
      toast(`Generation failed — ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setBusy(null)
    }
  }

  const headStatusRisk = pkg.status.includes('missing') || pkg.status.includes('review')
  const busyAll = busy === '__all__'

  return (
    <div className="card card-pad">
      <div className="card-head">
        <div><h2>{pkg.title}</h2><p>{pkg.subtitle}</p></div>
        <span className={`status ${headStatusRisk ? 'risk' : 'ready'}`}>{pkg.status}</span>
      </div>

      <table className="slot-table">
        <thead><tr><th>Content item</th><th>Current content</th><th>State</th><th>Purpose / constraint</th><th>Model route</th><th /></tr></thead>
        <tbody>
          {rows.map((r, i) => {
            const rowBusy = busy === r[0]
            const stateLabel = NEEDS_CONTENT(r[2]) ? 'At Risk' : 'Ready'
            const routeCls = r[4].includes('SLM') ? 'private' : r[4].includes('specialist') ? 'specialist' : ''
            return (
              <tr key={i}>
                <td><div className="slot-name">{r[0]}</div></td>
                <td>{rowBusy ? <span style={s('color:var(--muted)')}>Generating…</span> : r[1]}</td>
                <td><Status label={stateLabel} /></td>
                <td><div className="slot-detail">{r[3]}</div></td>
                <td><span className={`model-chip ${routeCls}`}>{r[4]}</span></td>
                <td style={s('text-align:right')}>
                  <button className="btn btn-light btn-sm" disabled={busy != null} onClick={() => genOne(pkg.rows[i])}>
                    {rowBusy ? '…' : NEEDS_CONTENT(r[2]) ? 'Generate' : 'Regenerate'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="workload-line" style={s('margin:14px 0 0')}>
        {pkg.notes.map((n) => <span key={n}>{n}</span>)}
      </div>

      <div className="channel-actions">
        <button className="btn btn-light" onClick={openCreate}>Create new {pkg.title.toLowerCase()} variant</button>
        <button className="btn btn-primary" disabled={busy != null} onClick={genMissing}>
          {busyAll ? 'Generating…' : pkg.primary}
        </button>
      </div>
    </div>
  )
}


export function Create() {
  const { createChannel, setCreateChannel, openCreate, model } = useApp()
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Create"
        sub="Create directly for any approved channel or complete the content gaps routed from Assemble, while Threadline preserves one coherent message architecture across every output."
        action={
          <div style={s('display:flex;gap:9px;align-items:center')}>
            <Btn label="View creation queue" cls="btn-light" />
            <button className="btn btn-primary" onClick={openCreate}>Create content</button>
          </div>
        }
      />

      <div className="context-bar">
        <span className="context-token"><strong>Campaign</strong> Behind Every Original</span>
        <span className="context-token"><strong>Market</strong> Japan</span>
        <span className="context-token"><strong>Product</strong> 578™ Baggy</span>
        <span className="context-token"><strong>Locale</strong> ja-JP</span>
        <span className="context-token"><strong>Baseline</strong> v1.0</span>
        <button className="btn btn-light btn-sm" style={s('margin-left:auto')} onClick={openCreate}>Change or create context</button>
      </div>

      <div className="grid grid-2" style={s('margin-bottom:18px')}>
        <section className="card card-pad">
          <div className="card-head"><div><h2>Creation queue</h2><p>Tasks routed from Assemble and other campaign agents.</p></div><span className="status risk">5 open</span></div>
          <div className="creation-queue">
            <div className="queue-item"><div className="queue-icon">EC</div><div><h4>Japan e-commerce gaps</h4><p>SEO title, SEO description and image alt text</p></div><div className="queue-route">SLM + specialist</div></div>
            <div className="queue-item"><div className="queue-icon">CRM</div><div><h4>Japan CRM package</h4><p>Subject line, preheader and hero approval</p></div><div className="queue-route">Frontier + specialist</div></div>
            <div className="queue-item"><div className="queue-icon">IG</div><div><h4>Japan Story headline</h4><p>Create within 32-character safe-area limit</p></div><div className="queue-route">Japanese specialist</div></div>
            <div className="queue-item"><div className="queue-icon">FR</div><div><h4>France display fallback</h4><p>Create Relaxed Trucker headline set after assortment change</p></div><div className="queue-route">Levi’s SLM</div></div>
            <div className="queue-item"><div className="queue-icon">IN</div><div><h4>India CRM extension</h4><p>Provisional subject, preheader and body copy</p></div><div className="queue-route">Frontier + SLM</div></div>
          </div>
        </section>

        <section className="card card-pad">
          <div className="card-head"><div><h2>Cross-channel message architecture</h2><p>One approved message system adapted by channel—not five unrelated prompts.</p></div><Btn label="Edit architecture" cls="btn-light btn-sm" /></div>
          <div className="message-architecture">
            <div className="message-block"><div className="label">Core message</div><p>Originality has a story, and denim is part of how it is expressed.</p></div>
            <div className="message-block"><div className="label">Product emphasis</div><p>578™ Baggy silhouette, movement and 1990s attitude.</p></div>
            <div className="message-block"><div className="label">Proof point</div><p>Waist-sitting, non-stretch, baggy fit through the leg.</p></div>
            <div className="message-block"><div className="label">Call to action</div><p>Explore the 578™ collection.</p></div>
          </div>
          <div className="direct-create-card" style={s('margin-top:14px')}>
            <h3>Create a new coherent package</h3>
            <p>Select one or more channels and Threadline will recommend the required content slots, model routes and governance path.</p>
            <button className="btn btn-dark" onClick={openCreate}>Create across channels</button>
          </div>
        </section>
      </div>

      <div className="channel-nav">
        {channelTabs.map(([id, label]) => (
          <button key={id} className={createChannel === id ? 'active' : ''} onClick={() => setCreateChannel(id)}>{label}</button>
        ))}
      </div>

      <div className="generation-workbench">
        <section>
          <ChannelWorkspace />
        </section>

        <aside>
          <div className="model-panel" style={s('margin-bottom:18px')}>
            <div className="eyebrow">Recommended private model</div>
            <h3>Levi’s SLM v0.9</h3>
            <p style={s('font-size:11px;color:var(--muted);line-height:1.5;margin-bottom:12px')}>Used automatically for approved product, fit, wash, CTA, SEO and routine channel language.</p>
            <div className="model-stat"><span>Active generation model</span><b>{model}</b></div>
            <div className="model-stat"><span>Hosting</span><b>OpenAI · via dev proxy</b></div>
            <div className="model-stat"><span>Brand baseline</span><b>v1.0 current</b></div>
            <div className="model-stat"><span>Product catalogue</span><b>Synced 22m ago</b></div>
            <div className="model-stat"><span>Product accuracy history</span><b>98%</b></div>
            <div className="model-stat"><span>Average human edit</span><b>9%</b></div>
            <div className="model-stat"><span>Relative cost</span><b>1×</b></div>
            <Btn label="View model card" cls="btn-dark" style={s('width:100%;justify-content:center;margin-top:14px')} />
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Grounding package</h2><p>Applied to every channel created from this context.</p></div></div>
            <div className="grounding-list">
              <div className="grounding-item"><div className="grounding-icon">B</div><div><h4>Campaign baseline v1.0</h4><p>Objective, protected language and market scope</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">P</div><div><h4>578™ Baggy product facts</h4><p>Fit, rise, fabric and approved product naming</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">JP</div><div><h4>Japan market guidance</h4><p>Precise, understated and natural expression</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">Ch</div><div><h4>Channel-specific constraints</h4><p>SEO, CRM, social, display and creator formats</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">R</div><div><h4>Claims and governance rules</h4><p>Protected terms, unsupported claims and review level</p></div></div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Routing principles</h2><p>Users create content; Threadline chooses the safest and most effective approved route.</p></div></div>
            <div className="route-card"><h4>Product and SEO content</h4><p>Levi’s SLM first; specialist refinement only where language quality requires it.</p><span className="route-tag">SLM-led</span></div>
            <div className="route-card"><h4>Premium campaign copy</h4><p>Frontier model competition with Levi’s brand evaluation and regional approval.</p><span className="route-tag">Creative competition</span></div>
            <div className="route-card"><h4>Alt text and visual metadata</h4><p>Vision-language model followed by product validation and assurance.</p><span className="route-tag">Vision → Assure</span></div>
          </div>
        </aside>
      </div>
    </>
  )
}
