import { s } from '../style'
import { Btn, PageHeader } from '../components/common'

export function Insights() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Cross-campaign intelligence"
        title="Insights"
        sub="Understand which content, markets, models and operating decisions are improving performance, reuse, approval speed and production efficiency across Threadline."
        action={<Btn label="Export intelligence brief" cls="btn-light" />}
      />

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Content reuse</div><div className="num">61%</div><div className="note">+8 points vs prior cycle</div></div>
        <div className="summary-card"><div className="label">Approval time</div><div className="num">9.7h</div><div className="note">18% faster</div></div>
        <div className="summary-card"><div className="label">SLM acceptance</div><div className="num">89%</div><div className="note">Product-led content</div></div>
        <div className="summary-card"><div className="label">Produced, not used</div><div className="num">11%</div><div className="note">Opportunity to reduce waste</div></div>
      </div>

      <div className="grid grid-2" style={s('margin-bottom:18px')}>
        <section className="card">
          <div className="card-pad card-head"><div><h2>Model acceptance by content type</h2><p>Approval rate combined with human-edit effort.</p></div></div>
          <div className="bars">
            <div className="bar-item"><b>91%</b><div className="bar red" style={s('height:91%')} /><span>SLM<br />Product</span></div>
            <div className="bar-item"><b>84%</b><div className="bar" style={s('height:84%')} /><span>Frontier<br />CRM</span></div>
            <div className="bar-item"><b>95%</b><div className="bar red" style={s('height:95%')} /><span>Specialist<br />Japanese</span></div>
            <div className="bar-item"><b>62%</b><div className="bar" style={s('height:62%')} /><span>Generic<br />Translation</span></div>
          </div>
        </section>

        <section className="card card-pad">
          <div className="card-head"><div><h2>Cross-campaign recommendations</h2><p>Actions derived from performance and production lineage.</p></div></div>
          <div className="action-list">
            <div className="action-row"><div className="action-index">1</div><div><h4>Route routine product content to the Levi’s SLM</h4><p>High accuracy, low edit effort and lowest cost.</p></div><Btn label="Adopt" cls="btn-dark btn-sm" /></div>
            <div className="action-row"><div className="action-index">2</div><div><h4>Transcreate Japanese campaign language</h4><p>Direct translation repeatedly underperforms in naturalness and engagement.</p></div><Btn label="Update rule" cls="btn-light btn-sm" /></div>
            <div className="action-row"><div className="action-index">3</div><div><h4>Remove low-use landscape social variants</h4><p>Reduce default production requirements by two formats.</p></div><Btn label="Apply" cls="btn-light btn-sm" /></div>
          </div>
        </section>
      </div>

      <div className="grid grid-3">
        <div className="insight-card"><h4>Markets</h4><p>India benefits from full regional execution; Japan from selective cultural transcreation; France from concise localization and early layout checks.</p><div className="source-usage"><span className="meta-pill">4 market memories</span></div></div>
        <div className="insight-card"><h4>Content supply chain</h4><p>Reuse-first assembly produces the fastest approvals. Late layout validation remains a major source of avoidable rework.</p><div className="source-usage"><span className="meta-pill">18% faster approvals</span></div></div>
        <div className="insight-card"><h4>Governance</h4><p>Rights and unsupported claims are the most common high-severity blockers; both can be detected before production.</p><div className="source-usage"><span className="meta-pill">2 recurring policies</span></div></div>
        <div className="insight-card"><h4>Asset production</h4><p>Product-led imagery is a strong fallback where talent rights are restricted, particularly for commerce and social adaptation.</p><div className="source-usage"><span className="meta-pill">68% effort avoided</span></div></div>
        <div className="insight-card"><h4>Translation</h4><p>Translation memory performs well for product facts, while campaign headlines require specialist language and regional judgment.</p><div className="source-usage"><span className="meta-pill">63% TM reuse</span></div></div>
        <div className="insight-card"><h4>Experiments</h4><p>Japan CRM translation-versus-transcreation is the highest-value controlled test proposed for the next cycle.</p><div className="source-usage"><span className="meta-pill">1 recommended test</span></div></div>
      </div>
    </div>
  )
}
