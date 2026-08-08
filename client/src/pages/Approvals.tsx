import { useState } from 'react'
import { useApp } from '../context'
import { s } from '../style'
import { Btn, PageHeader, Status, VariantBtn } from '../components/common'

const filterLabels = ['Assigned to me', 'Brand', 'Regional', 'Rights', 'Legal', 'Partner']

export function Approvals() {
  const { toast } = useApp()
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <div className="page">
      <PageHeader
        eyebrow="Review queue"
        title="Approvals"
        sub="Review complete decision packages with the global master, local change, assurance evidence, downstream impact and exact approval requested."
        action={<Btn label="Review next priority" cls="btn-primary" />}
      />

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Assigned to me</div><div className="num">4</div><div className="note">2 due today</div></div>
        <div className="summary-card"><div className="label">High risk</div><div className="num">2</div><div className="note">Rights and product claim</div></div>
        <div className="summary-card"><div className="label">Average review time</div><div className="num">9.7h</div><div className="note">18% faster than prior cycle</div></div>
        <div className="summary-card"><div className="label">Returned incomplete</div><div className="num">3%</div><div className="note">Readiness checks reduce rework</div></div>
      </div>

      <div className="filters">
        {filterLabels.map((label, i) => (
          <button key={label} className={`filter ${activeFilter === i ? 'active' : ''}`} onClick={() => setActiveFilter(i)}>{label}</button>
        ))}
      </div>

      <div className="layout-main">
        <section className="card table-card">
          <div className="table-wrap"><table>
            <thead><tr><th>Decision package</th><th>Campaign</th><th>Market</th><th>Approval requested</th><th>Due</th><th>Risk</th><th /></tr></thead>
            <tbody>
              <tr><td><div className="row-title">French Instagram Story</div><div className="row-sub">Short headline + regenerated 9:16 layout</div></td><td>Behind Every Original</td><td>France</td><td>Global brand approval for local copy change</td><td>Today</td><td><Status label="At Risk" /></td><td><VariantBtn variantId="VAR-006" cls="btn-dark btn-sm">Review</VariantBtn></td></tr>
              <tr><td><div className="row-title">Japan Instagram replacement</div><div className="row-sub">AST-006 product-led source</div></td><td>Behind Every Original</td><td>Japan</td><td>Rights and regional approval after source replacement</td><td>Today</td><td><Status label="Blocked" /></td><td><VariantBtn variantId="VAR-010" cls="btn-dark btn-sm">Review</VariantBtn></td></tr>
              <tr><td><div className="row-title">Thermodapt PDP claim</div><div className="row-sub">Evidence-grounded rewrite</div></td><td>501® Thermodapt</td><td>US</td><td>Legal approval for corrected product claim</td><td>Tomorrow</td><td><Status label="Blocked" /></td><td><VariantBtn variantId="VAR-017" cls="btn-dark btn-sm">Review</VariantBtn></td></tr>
              <tr><td><div className="row-title">France Federation Story</div><div className="row-sub">Partner crest + campaign copy</div></td><td>Football Federations</td><td>France</td><td>Federation partner approval</td><td>12 May</td><td><Status label="At Risk" /></td><td><button className="btn btn-light btn-sm" onClick={() => toast('Open — prototype action')}>Open</button></td></tr>
            </tbody>
          </table></div>
        </section>

        <aside className="approval-package">
          <div className="eyebrow">Next priority review</div>
          <h3>French Instagram Story</h3>
          <p style={s('font-size:10px;color:var(--muted);line-height:1.45')}>Threadline has assembled the complete decision context so the reviewer does not need to search across Workfront, AEM, translation and layout tools.</p>
          <div className="decision-row"><span>Global master</span><b>Originality and story expressed through denim</b></div>
          <div className="decision-row"><span>Local change</span><b>“L’originalité, en denim.”</b></div>
          <div className="decision-row"><span>Why changed</span><b>Original French line overflowed the Story safe area</b></div>
          <div className="decision-row"><span>Assurance</span><b>Brand, product, French language and rights passed</b></div>
          <div className="decision-row"><span>Remaining risk</span><b>Creative approval of shorter expression</b></div>
          <div className="decision-row"><span>Impact</span><b>Only France Instagram Story affected</b></div>
          <div style={s('display:flex;gap:8px;margin-top:14px')}>
            <button className="btn btn-light" style={s('flex:1')} onClick={() => toast('Request change — prototype action')}>Request change</button>
            <button className="btn btn-primary" style={s('flex:1')} onClick={() => toast('Approve — prototype action')}>Approve</button>
          </div>
        </aside>
      </div>
    </div>
  )
}
