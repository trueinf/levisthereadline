import type { CSSProperties, ReactNode } from 'react'
import { useApp } from '../context'
import { s } from '../style'
import { findChannel, type CampaignTabId } from '../data'

const CREATED_ARTS = ['alt', 'gold', 'purple', '']

/** Maps a status label to the CSS modifier class used in the prototype. */
export function statusClass(label: string): string {
  if (label === 'Ready' || label === 'Approved' || label === 'Published') return 'ready'
  if (label === 'At Risk' || label === 'In review' || label === 'Scheduled') return 'risk'
  if (label === 'Blocked' || label === 'Paused' || label === 'Failed') return 'blocked'
  return 'neutral'
}

export function Status({ label }: { label: string }) {
  return <span className={`status ${statusClass(label)}`}>{label}</span>
}

/**
 * Generic action button. With no `onClick`, it fires the prototype toast using
 * its own label text — mirroring the original `data-action="toast"` behavior.
 */
export function Btn({
  label,
  cls = 'btn-primary',
  onClick,
  style,
}: {
  label: string
  cls?: string
  onClick?: () => void
  style?: CSSProperties
}) {
  const { toast } = useApp()
  return (
    <button className={`btn ${cls}`} style={style} onClick={onClick ?? (() => toast(`${label} — prototype action`))}>
      {label}
    </button>
  )
}

/** Convenience wrapper: button that opens the campaign workspace at a tab. */
export function TabBtn({ tab, cls = 'btn-primary', style, children }: { tab: CampaignTabId; cls?: string; style?: CSSProperties; children: ReactNode }) {
  const { setCampaignTab } = useApp()
  return (
    <button className={`btn ${cls}`} style={style} onClick={() => setCampaignTab(tab)}>
      {children}
    </button>
  )
}

/** Button that opens a variant drawer. */
export function VariantBtn({ variantId, cls = 'btn-dark btn-sm', style, children }: { variantId: string; cls?: string; style?: CSSProperties; children: ReactNode }) {
  const { openVariant } = useApp()
  return (
    <button className={`btn ${cls}`} style={style} onClick={() => openVariant(variantId)}>
      {children}
    </button>
  )
}

export function PageHeader({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string
  title: string
  sub: string
  action?: ReactNode
}) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="subhead">{sub}</p>
      </div>
      {action}
    </div>
  )
}

export function CampaignCards() {
  const { campaigns, openCampaign, openWorkspace } = useApp()
  return (
    <div className="grid grid-4">
      {campaigns.map((c, i) => {
        const total = c.channels.reduce((n, id) => n + (findChannel(id)?.slots.length ?? 0), 0)
        const done = Object.keys(c.generated).length
        const pct = total ? Math.round((done / total) * 100) : 0
        return (
          <article key={c.id} className="card campaign-card soft-lift" style={s('cursor:pointer')} onClick={() => openCampaign(c.id)}>
            <div className={`campaign-art ${CREATED_ARTS[i % CREATED_ARTS.length]}`}><span className="status ready">Yours</span><div className="corner" /></div>
            <div className="content">
              <h3>{c.name || 'Untitled campaign'}</h3>
              <div className="meta-row"><span>{c.market}</span><span>{c.channels.length} channel{c.channels.length === 1 ? '' : 's'}</span></div>
              <div className="progress" style={s('margin-top:16px')}><span style={s(`width:${pct}%`)} /></div>
            </div>
          </article>
        )
      })}
      <article className="card campaign-card soft-lift" style={s('cursor:pointer')} onClick={() => openWorkspace('beo')}>
        <div className="campaign-art" style={s('background:url(/campaign-hero.webp) center/cover no-repeat, linear-gradient(135deg,#111,#8e4034 60%,#d7b69e)')}><div className="corner" /></div>
        <div className="content"><h3>Behind Every Original</h3><div className="meta-row"><span>4 markets</span><span>18 variants</span></div><div className="progress" style={s('margin-top:16px')}><span style={s('width:72%')} /></div></div>
      </article>
      <article className="card campaign-card soft-lift" style={s('cursor:pointer')} onClick={() => openWorkspace('football')}>
        <div className="campaign-art alt" style={s('background:url(/football-hero.jpg) center/cover no-repeat, linear-gradient(135deg,#0d1a28,#315a75 60%,#a6c4d6)')}><div className="corner" /></div>
        <div className="content"><h3>Football Federation Partnerships</h3><div className="meta-row"><span>4 federations</span><span>Launch orchestration</span></div><div className="progress" style={s('margin-top:16px')}><span style={s('width:58%')} /></div></div>
      </article>
      <article className="card campaign-card soft-lift" style={s('cursor:pointer')} onClick={() => openWorkspace('thermodapt')}>
        <div className="campaign-art gold" style={s('background:url(/thermodapt-hero.png) center top/cover no-repeat, linear-gradient(135deg,#231f18,#8d7042 55%,#e0c692)')}><div className="corner" /></div>
        <div className="content"><h3>501® Thermodapt</h3><div className="meta-row"><span>Product innovation</span><span>3 markets</span></div><div className="progress" style={s('margin-top:16px')}><span style={s('width:44%')} /></div></div>
      </article>
      <article className="card campaign-card soft-lift" style={s('cursor:pointer')} onClick={() => openWorkspace('reimagine')}>
        <div className="campaign-art purple" style={s('background:url(/denim-cowboy-hero.jpg) center/cover no-repeat, linear-gradient(135deg,#170f19,#5c315f 55%,#d1a5cd)')}><div className="corner" /></div>
        <div className="content"><h3>REIIMAGINE / Denim Cowboy</h3><div className="meta-row"><span>Content memory</span><span>Learning</span></div><div className="progress" style={s('margin-top:16px')}><span style={s('width:100%')} /></div></div>
      </article>
    </div>
  )
}
