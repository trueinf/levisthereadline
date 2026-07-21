import { useEffect } from 'react'
import { useApp } from '../context'
import { Icon } from '../icons'
import { s } from '../style'
import { variants } from '../data'
import { Status } from './common'

function VariantBody({ variantId }: { variantId: string }) {
  const { toast } = useApp()
  const v = variants[variantId] ?? variants['VAR-006']
  return (
    <>
      <div style={s('margin-bottom:18px')}><Status label={v.status} /></div>
      {v.details.map((d, i) => (
        <div className="detail-pair" key={i}><span>{d[0]}</span><b>{d[1]}</b></div>
      ))}
      {v.rationale && (
        <div className="reason-panel">
          <h4>How Threadline arrived at this requirement</h4>
          <p style={s('font-size:11px;line-height:1.55;color:var(--muted);margin-bottom:12px')}>{v.rationale}</p>
          <div className="metric-label" style={s('margin-bottom:7px')}>Sources evaluated</div>
          <div className="reason-list">{v.sources?.map((src, i) => <div key={i}>{src}</div>)}</div>
          <div className="metric-label" style={s('margin:13px 0 7px')}>Downstream impact</div>
          <div className="reason-list">{v.impact?.map((src, i) => <div key={i}>{src}</div>)}</div>
        </div>
      )}
      <div style={s('display:flex;gap:10px;margin-top:22px')}>
        <button className="btn btn-primary" style={s('flex:1')} onClick={() => toast('Recommended action applied')}>Apply recommendation</button>
        <button className="btn btn-light" onClick={() => toast('Review package opened')}>Open review</button>
      </div>
    </>
  )
}

function CreateBody() {
  const { toast } = useApp()
  return (
    <>
      <div className="creation-drawer-section">
        <div className="eyebrow">1 · Campaign context</div>
        <h4>Choose the creation context</h4>
        <div className="detail-pair"><span>Campaign</span><b>Behind Every Original</b></div>
        <div className="detail-pair"><span>Market</span><b>Japan</b></div>
        <div className="detail-pair"><span>Product</span><b>578™ Baggy</b></div>
        <div className="detail-pair"><span>Locale</span><b>ja-JP</b></div>
      </div>

      <div className="creation-drawer-section">
        <div className="eyebrow">2 · Select channels</div>
        <h4>Create one coherent package across channels</h4>
        <div className="option-grid">
          <label className="option"><input type="checkbox" defaultChecked /><div><b>E-commerce</b><span>SEO, product content, alt text</span></div></label>
          <label className="option"><input type="checkbox" defaultChecked /><div><b>CRM</b><span>Subject, preheader, hero, body, CTA</span></div></label>
          <label className="option"><input type="checkbox" defaultChecked /><div><b>Instagram</b><span>Caption, Story headline, alt text</span></div></label>
          <label className="option"><input type="checkbox" /><div><b>Paid display</b><span>Short headline, long headline, CTA</span></div></label>
          <label className="option"><input type="checkbox" /><div><b>Creator brief</b><span>Objective, guardrails and deliverables</span></div></label>
        </div>
      </div>

      <div className="creation-drawer-section">
        <div className="eyebrow">3 · Objective</div>
        <h4>What should this content achieve?</h4>
        <div className="option-grid">
          <label className="option"><input name="objective" type="radio" defaultChecked /><div><b>Product discovery</b><span>Explain the product and encourage exploration</span></div></label>
          <label className="option"><input name="objective" type="radio" /><div><b>Campaign engagement</b><span>Build emotional relevance and participation</span></div></label>
          <label className="option"><input name="objective" type="radio" /><div><b>Conversion</b><span>Drive product clicks and purchase intent</span></div></label>
          <label className="option"><input name="objective" type="radio" /><div><b>Creator enablement</b><span>Give creators clear intent and room to interpret</span></div></label>
        </div>
      </div>

      <div className="creation-drawer-section">
        <div className="eyebrow">Threadline recommendation</div>
        <h4>11 content items across 3 channels</h4>
        <p style={s('font-size:11px;color:var(--muted);line-height:1.5;margin-bottom:10px')}>Threadline will reuse 5 approved components, create 6 new items and route them through Levi’s SLM, the Japanese specialist model and the vision-language model.</p>
        <div className="detail-pair"><span>Reused</span><b>Product title, description, CTA, tags, product facts</b></div>
        <div className="detail-pair"><span>Generated</span><b>SEO metadata, subject, preheader, hero line, caption, alt text</b></div>
        <div className="detail-pair"><span>Review path</span><b>Light review + Japan regional approval for hero copy</b></div>
      </div>

      <button className="btn btn-primary" style={s('width:100%;justify-content:center')} onClick={() => toast('Routing plan created for 11 content items')}>Generate routing plan</button>
    </>
  )
}

export function Drawer() {
  const { drawer, closeDrawer } = useApp()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDrawer])

  const open = drawer != null
  const title =
    drawer?.type === 'create'
      ? 'Create content package'
      : drawer?.type === 'variant'
      ? (variants[drawer.variantId] ?? variants['VAR-006']).title
      : 'Japan Instagram feed'

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'show' : ''}`} onClick={closeDrawer} />
      <aside className={`variant-drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head">
          <div><div className="eyebrow">{drawer?.type === 'create' ? 'New package' : 'Content requirement'}</div><h2>{title}</h2></div>
          <button className="icon-btn" onClick={closeDrawer}><Icon name="close" /></button>
        </div>
        <div className="drawer-body">
          {drawer?.type === 'variant' && <VariantBody variantId={drawer.variantId} />}
          {drawer?.type === 'create' && <CreateBody />}
        </div>
      </aside>
    </>
  )
}
