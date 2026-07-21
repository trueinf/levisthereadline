import { useApp } from '../context'
import { s } from '../style'
import { CampaignCards, PageHeader, VariantBtn } from '../components/common'

export function Home() {
  const { navigate, setCampaignTab } = useApp()
  return (
    <div className="page">
      <PageHeader
        eyebrow="Good morning, Manoj"
        title="Content operations, in focus"
        sub="Threadline has reviewed campaign readiness, approvals and market exceptions across your active portfolio."
        action={<span className="prototype-note">Prototype operational data</span>}
      />
      <section className="hero soft-lift">
        <div className="hero-copy">
          <span className="tag">Priority campaign · 2026</span>
          <h1>Behind Every Original</h1>
          <p>One global campaign, four markets and a connected content lineage from master brief to local activation.</p>
          <div className="hero-stats">
            <div><b>72%</b><span>Campaign ready</span></div>
            <div><b>18</b><span>Content requirements</span></div>
            <div><b>3</b><span>Issues need action</span></div>
          </div>
          <div className="hero-actions">
            <button className="btn btn-light" onClick={() => setCampaignTab('brief')}>Open brief</button>
            <button className="btn btn-ghost" onClick={() => setCampaignTab('readiness')}>View readiness</button>
          </div>
        </div>
      </section>

      <div className="grid grid-4" style={s('margin-top:18px')}>
        <div className="card metric"><div className="metric-label">Active campaigns</div><div className="metric-value">4</div><div className="metric-note"><span className="trend-up">+1</span> this month</div></div>
        <div className="card metric"><div className="metric-label">Ready variants</div><div className="metric-value">12</div><div className="metric-note">Across 4 markets</div></div>
        <div className="card metric"><div className="metric-label">Approvals waiting</div><div className="metric-value">4</div><div className="metric-note">2 require brand review</div></div>
        <div className="card metric"><div className="metric-label">Content reuse</div><div className="metric-value">61%</div><div className="metric-note"><span className="trend-up">+8 pts</span> vs prior cycle</div></div>
      </div>

      <div className="layout-main" style={s('margin-top:20px')}>
        <section className="card card-pad">
          <div className="card-head"><div><h2>Recommended actions</h2><p>Prioritized by launch impact and risk.</p></div><button className="btn btn-light btn-sm" onClick={() => navigate('approvals')}>Open queue</button></div>
          <div className="action-list">
            <div className="action-row"><div className="action-index">1</div><div><h4>Replace the Japan Instagram source asset</h4><p>Talent rights do not cover Japan social use. A product-led replacement is available.</p></div><VariantBtn variantId="VAR-010" cls="btn-dark btn-sm">Resolve</VariantBtn></div>
            <div className="action-row"><div className="action-index">2</div><div><h4>Approve the shorter French Story headline</h4><p>The translated headline exceeds the 9:16 safe area. A validated alternative is ready.</p></div><VariantBtn variantId="VAR-006" cls="btn-light btn-sm">Review</VariantBtn></div>
            <div className="action-row"><div className="action-index">3</div><div><h4>Correct the 501® Thermodapt product claim</h4><p>The generated copy promises an outcome beyond the approved product evidence.</p></div><VariantBtn variantId="VAR-017" cls="btn-light btn-sm">Review</VariantBtn></div>
          </div>
        </section>
        <section className="card card-pad">
          <div className="card-head"><div><h2>Launch pulse</h2><p>Next 14 days</p></div></div>
          <div className="timeline">
            <div className="timeline-item done"><h4>US global master</h4><p>Published · 12 Feb</p></div>
            <div className="timeline-item"><h4>France localization</h4><p>At risk · 15 Feb</p></div>
            <div className="timeline-item"><h4>Japan activation</h4><p>Blocked · 18 Feb</p></div>
            <div className="timeline-item"><h4>India extension</h4><p>Ready · 13 Mar</p></div>
          </div>
        </section>
      </div>

      <div className="section-title"><h2>Campaign portfolio</h2><span>4 active and reference campaigns</span></div>
      <CampaignCards />
    </div>
  )
}
