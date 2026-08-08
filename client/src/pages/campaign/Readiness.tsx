import { useState } from 'react'
import { useApp } from '../../context'
import { s } from '../../style'
import { Btn, PageHeader, Status, VariantBtn } from '../../components/common'

const filterLabels = ['All markets', 'France', 'Japan', 'Blocked', 'At risk']

export function Readiness() {
  const { toast, openVariant } = useApp()
  const [activeFilter, setActiveFilter] = useState(0)

  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Readiness"
        sub="Threadline has interpreted the approved baseline, product assortment, assets, rights and channel rules to determine the exact content requirements needed for launch."
        action={
          <div style={s('text-align:right')}>
            <Btn label="Refresh readiness analysis" cls="btn-light" />
            <div style={s('font-size:10px;color:var(--muted);margin-top:6px')}>Last analysed 18m ago · 3 source changes detected</div>
          </div>
        }
      />

      <div className="summary-strip">
        <div className="summary-card"><div className="label">Content requirements</div><div className="num">18</div><div className="note">Relevant combinations identified</div></div>
        <div className="summary-card"><div className="label">Ready</div><div className="num">12</div><div className="note">Can move to assurance or activation</div></div>
        <div className="summary-card"><div className="label">At risk</div><div className="num">4</div><div className="note">Can proceed after targeted action</div></div>
        <div className="summary-card"><div className="label">Blocked</div><div className="num">2</div><div className="note">Launch-impacting dependencies</div></div>
      </div>

      <div className="workload-line">
        <span><b>61% reusable</b> from approved content</span>
        <span><b>7 net-new</b> content items required</span>
        <span><b>11 adaptations</b> across layouts and formats</span>
        <span><b>18 selected</b> from 80 theoretical combinations</span>
      </div>

      <div className="analysis-banner">
        <div><h3>Why 18 requirements?</h3><p>Threadline evaluated 4 markets, 4 channels, 5 products, regional assortments, existing content, asset rights and channel rules—then excluded combinations that are not commercially or operationally relevant.</p></div>
        <Btn label="Explain requirement plan" cls="btn-light btn-sm" />
      </div>

      <div className="layout-main" style={s('margin-bottom:18px')}>
        <section className="card card-pad">
          <div className="card-head"><div><h2>Market × channel readiness</h2><p>Select any cell to filter the requirement plan.</p></div><span className="status risk">2 markets need action</span></div>
          <table className="readiness-matrix">
            <thead><tr><th>Market</th><th>E-commerce</th><th>Instagram</th><th>CRM</th><th>Paid display</th></tr></thead>
            <tbody>
              <tr><td className="matrix-market">United States</td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>4/4 checks</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>4/4 checks</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>4/4 checks</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>4/4 checks</span></button></td>
              </tr>
              <tr><td className="matrix-market">France</td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Localized</span></button></td>
                <td><button className="matrix-cell risk" onClick={() => openVariant('VAR-006')}>At risk<span>Text overflow</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Approved</span></button></td>
                <td><button className="matrix-cell risk" onClick={() => toast('At risk — prototype action')}>At risk<span>Stock delay</span></button></td>
              </tr>
              <tr><td className="matrix-market">Japan</td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Localized</span></button></td>
                <td><button className="matrix-cell blocked" onClick={() => openVariant('VAR-010')}>Blocked<span>Territory rights</span></button></td>
                <td><button className="matrix-cell risk" onClick={() => openVariant('VAR-011')}>At risk<span>Transcreation</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Product-led</span></button></td>
              </tr>
              <tr><td className="matrix-market">India</td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Regional module</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Alia-led</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Provisional scope</span></button></td>
                <td><button className="matrix-cell ready" onClick={() => toast('Ready — prototype action')}>Ready<span>Regional copy</span></button></td>
              </tr>
            </tbody>
          </table>
        </section>

        <aside className="card card-pad">
          <div className="card-head"><div><h2>Recommended actions</h2><p>Prioritized by launch impact.</p></div></div>
          <div className="action-list">
            <div className="action-row"><div className="action-index">1</div><div><h4>Replace Japan Instagram asset</h4><p>Use territory-cleared product asset AST-006.</p></div><VariantBtn variantId="VAR-010" cls="btn-dark btn-sm">Resolve</VariantBtn></div>
            <div className="action-row"><div className="action-index">2</div><div><h4>Approve French short headline</h4><p>Regenerate the 9:16 layout after selection.</p></div><VariantBtn variantId="VAR-006" cls="btn-light btn-sm">Review</VariantBtn></div>
            <div className="action-row"><div className="action-index">3</div><div><h4>Approve Japanese CRM transcreation</h4><p>Product content is already valid and reusable.</p></div><VariantBtn variantId="VAR-011" cls="btn-light btn-sm">Review</VariantBtn></div>
          </div>
        </aside>
      </div>

      <div className="card table-card">
        <div className="card-pad" style={s('padding-bottom:8px')}>
          <div className="card-head" style={s('margin-bottom:12px')}><div><h2>Detailed requirement plan</h2><p>Operational requirements with dependency, action, owner and due date.</p></div></div>
          <div className="filters" style={s('margin-bottom:10px')}>
            {filterLabels.map((label, i) => (
              <button key={label} className={`filter ${activeFilter === i ? 'active' : ''}`} onClick={() => setActiveFilter(i)}>{label}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap"><table>
          <thead><tr><th>Requirement</th><th>Market</th><th>Channel</th><th>Product</th><th>Reuse</th><th>Dependency</th><th>Required action</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><div className="row-title">Localized campaign module</div><div className="row-sub">VAR-005</div></td><td>France</td><td>E-commerce</td><td>Low Slim Bootcut</td><td>72%</td><td>Fit glossary</td><td>Apply approved French terminology</td><td>France Content</td><td>14 Feb</td><td><Status label="Ready" /></td></tr>
            <tr style={s('cursor:pointer')} onClick={() => openVariant('VAR-006')}><td><div className="row-title">Instagram Story</div><div className="row-sub">VAR-006</div></td><td>France</td><td>Instagram</td><td>Relaxed Trucker</td><td>45%</td><td>Text overflow</td><td>Approve short headline and regenerate</td><td>France Social</td><td>14 Feb</td><td><Status label="At Risk" /></td></tr>
            <tr style={s('cursor:pointer')} onClick={() => openVariant('VAR-010')}><td><div className="row-title">Instagram Feed</div><div className="row-sub">VAR-010</div></td><td>Japan</td><td>Instagram</td><td>578™ Baggy</td><td>30%</td><td>Territory rights</td><td>Replace AST-005 with AST-006</td><td>Japan Social</td><td>16 Feb</td><td><Status label="Blocked" /></td></tr>
            <tr style={s('cursor:pointer')} onClick={() => openVariant('VAR-011')}><td><div className="row-title">CRM launch email</div><div className="row-sub">VAR-011</div></td><td>Japan</td><td>CRM</td><td>Relaxed Trucker</td><td>48%</td><td>Transcreation</td><td>Approve selected Japanese hero line</td><td>Japan CRM</td><td>17 Feb</td><td><Status label="At Risk" /></td></tr>
            <tr><td><div className="row-title">India campaign module</div><div className="row-sub">VAR-013</div></td><td>India</td><td>E-commerce</td><td>Cinch Waist</td><td>25%</td><td>Regional source copy</td><td>Assemble Alia narrative and product facts</td><td>India Content</td><td>11 Mar</td><td><Status label="Ready" /></td></tr>
            <tr><td><div className="row-title">India Instagram Feed</div><div className="row-sub">VAR-014</div></td><td>India</td><td>Instagram</td><td>Loose Boot</td><td>20%</td><td>None</td><td>Create approved regional caption</td><td>India Social</td><td>10 Mar</td><td><Status label="Ready" /></td></tr>
          </tbody></table></div>
      </div>
    </>
  )
}
