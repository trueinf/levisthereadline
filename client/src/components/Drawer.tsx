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
  const title = drawer?.type === 'variant' ? (variants[drawer.variantId] ?? variants['VAR-006']).title : 'Content requirement'

  return (
    <>
      <div className={`drawer-backdrop ${open ? 'show' : ''}`} onClick={closeDrawer} />
      <aside className={`variant-drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head">
          <div><div className="eyebrow">Content requirement</div><h2>{title}</h2></div>
          <button className="icon-btn" onClick={closeDrawer}><Icon name="close" /></button>
        </div>
        <div className="drawer-body">
          {drawer?.type === 'variant' && <VariantBody variantId={drawer.variantId} />}
        </div>
      </aside>
    </>
  )
}
