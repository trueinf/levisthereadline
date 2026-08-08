import { useState } from 'react'
import { useApp } from '../context'
import { s } from '../style'
import { CampaignCards, PageHeader, Status } from '../components/common'

const filterLabels = ['All campaigns', 'Active', 'At risk', 'Historical']

export function Campaigns() {
  const { openNewCampaign, openWorkspace } = useApp()
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <div className="page">
      <PageHeader
        eyebrow="Campaign portfolio"
        title="Campaigns"
        sub="Manage global campaigns, regional extensions and content lifecycles from a single operating view."
        action={<button className="btn btn-primary" onClick={openNewCampaign}>Create campaign</button>}
      />
      <div className="filters">
        {filterLabels.map((label, i) => (
          <button key={label} className={`filter ${activeFilter === i ? 'active' : ''}`} onClick={() => setActiveFilter(i)}>{label}</button>
        ))}
      </div>
      <CampaignCards />
      <div className="section-title"><h2>Portfolio readiness</h2><span>Sorted by launch urgency</span></div>
      <div className="card table-card"><div className="table-wrap"><table>
        <thead><tr><th>Campaign</th><th>Markets</th><th>Readiness</th><th>Next launch</th><th>Owner</th><th>Status</th></tr></thead>
        <tbody>
          <tr style={s('cursor:pointer')} onClick={() => openWorkspace('beo')}><td><div className="row-title">Behind Every Original</div><div className="row-sub">Global campaign · 2026</div></td><td>US, France, Japan, India</td><td><div className="progress" style={s('width:130px')}><span style={s('width:72%')} /></div></td><td>15 Feb 2026</td><td>Global Brand Creative</td><td><Status label="At Risk" /></td></tr>
          <tr style={s('cursor:pointer')} onClick={() => openWorkspace('football')}><td><div className="row-title">Football Federation Partnerships</div><div className="row-sub">Partner campaign · 2026</div></td><td>US, France, England, Mexico</td><td><div className="progress" style={s('width:130px')}><span style={s('width:58%')} /></div></td><td>14 May 2026</td><td>Global Partnerships</td><td><Status label="At Risk" /></td></tr>
          <tr style={s('cursor:pointer')} onClick={() => openWorkspace('thermodapt')}><td><div className="row-title">501® Thermodapt</div><div className="row-sub">Product innovation</div></td><td>US, France, Japan</td><td><div className="progress" style={s('width:130px')}><span style={s('width:44%')} /></div></td><td>03 Mar 2026</td><td>Product Marketing</td><td><Status label="Blocked" /></td></tr>
          <tr style={s('cursor:pointer')} onClick={() => openWorkspace('reimagine')}><td><div className="row-title">REIIMAGINE / Denim Cowboy</div><div className="row-sub">Historical campaign</div></td><td>Global archive</td><td><div className="progress" style={s('width:130px')}><span style={s('width:100%')} /></div></td><td>Complete</td><td>Global Brand Creative</td><td><Status label="Published" /></td></tr>
        </tbody></table></div></div>
    </div>
  )
}
