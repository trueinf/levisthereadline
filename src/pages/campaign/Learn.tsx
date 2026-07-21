import { s } from '../../style'
import { Btn, PageHeader } from '../../components/common'

export function Learn() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Learn"
        sub="Threadline connects outcomes to the exact content, model, market, adaptation and human decisions that produced them—then recommends what to reuse, create, test or stop producing next."
        action={<Btn label="Generate learning brief" cls="btn-primary" />}
      />

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Highest engagement</div><div className="num">7.1%</div><div className="note">India Instagram regional execution</div></div>
        <div className="summary-card"><div className="label">Best CRM CTR</div><div className="num">3.1%</div><div className="note">Japan transcreated hero</div></div>
        <div className="summary-card"><div className="label">Fastest approval</div><div className="num">4h</div><div className="note">Reused US e-commerce module</div></div>
        <div className="summary-card"><div className="label">Avoidable production</div><div className="num">11%</div><div className="note">Low-use landscape variants</div></div>
      </div>

      <div className="grid grid-2" style={s('margin-bottom:18px')}>
        <section className="card">
          <div className="card-pad card-head"><div><h2>Performance linked to content decisions</h2><p>Outcomes are connected to lineage, not shown as isolated marketing metrics.</p></div></div>
          <div className="bars">
            <div className="bar-item"><b>5.8%</b><div className="bar" style={s('height:58%')} /><span>US<br />Product-led</span></div>
            <div className="bar-item"><b>5.2%</b><div className="bar" style={s('height:52%')} /><span>France<br />Short transcreation</span></div>
            <div className="bar-item"><b>6.4%</b><div className="bar red" style={s('height:64%')} /><span>Japan<br />Transcreated CRM</span></div>
            <div className="bar-item"><b>7.1%</b><div className="bar red" style={s('height:71%')} /><span>India<br />Regional execution</span></div>
          </div>
        </section>

        <section className="card card-pad">
          <div className="card-head"><div><h2>Decision lineage example</h2><p>Why the Japan CRM result is analytically useful.</p></div></div>
          <div className="lineage-row"><b>Global campaign</b><span>Behind Every Original baseline v1.0</span><span>Source</span></div>
          <div className="lineage-row"><b>Market adaptation</b><span>Japanese hero transcreation · Option B</span><span>Decision</span></div>
          <div className="lineage-row"><b>Model route</b><span>Japanese specialist with regional review</span><span>Generation</span></div>
          <div className="lineage-row"><b>Human edit</b><span>One punctuation correction</span><span>Review</span></div>
          <div className="lineage-row"><b>Outcome</b><span>3.1% CTR · 12h approval</span><span>Result</span></div>
        </section>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>What appears to be working</h2><p>Patterns are ranked by evidence strength and separated from causal claims.</p></div></div>
            <div className="grid grid-2">
              <div className="insight-card">
                <h4>Japanese transcreated hero copy outperformed direct translation benchmarks</h4>
                <p>Observed in three recent CRM campaigns. Audience targeting and offer differences remain possible confounders.</p>
                <div className="confidence-line"><span>Evidence strength</span><div className="mini-bar"><span style={s('width:82%')} /></div><b>Strong pattern</b></div>
              </div>
              <div className="insight-card">
                <h4>India regional ambassador and assortment increased engagement</h4>
                <p>Alia-led content with Cinch Waist and Loose Boot delivered the strongest engagement in this campaign.</p>
                <div className="confidence-line"><span>Evidence strength</span><div className="mini-bar"><span style={s('width:74%')} /></div><b>Promising</b></div>
              </div>
              <div className="insight-card">
                <h4>Levi’s SLM performs strongly for product and SEO content</h4>
                <p>High product accuracy, low relative cost and limited human editing across routine content.</p>
                <div className="confidence-line"><span>Evidence strength</span><div className="mini-bar"><span style={s('width:91%')} /></div><b>High confidence</b></div>
              </div>
              <div className="insight-card">
                <h4>Landscape social variants are frequently produced but rarely used</h4>
                <p>Portrait and 4:5 formats account for most published Japan social usage.</p>
                <div className="confidence-line"><span>Evidence strength</span><div className="mini-bar"><span style={s('width:88%')} /></div><b>Operationally clear</b></div>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Model and production learning</h2><p>Quality, cost and human effort are evaluated together.</p></div></div>
            <table className="evidence-table">
              <thead><tr><th>Route</th><th>Best use</th><th>Approval rate</th><th>Human edit</th><th>Cost</th><th>Recommendation</th></tr></thead>
              <tbody>
                <tr><td>Levi’s SLM</td><td>Product, SEO and routine channel copy</td><td>91%</td><td>9%</td><td>1×</td><td>Scale</td></tr>
                <tr><td>Japanese specialist</td><td>Natural Japanese and hero transcreation</td><td>95%</td><td>11%</td><td>3×</td><td>Use selectively</td></tr>
                <tr><td>Frontier creative</td><td>Premium CRM and creator concepts</td><td>84%</td><td>22%</td><td>4×</td><td>Reserve for high-value work</td></tr>
                <tr><td>Generic translation</td><td>Low-risk factual draft only</td><td>62%</td><td>38%</td><td>1×</td><td>Do not use for campaign copy</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Recommended decisions</h2><p>Evidence-based guidance; creative and regional teams retain control.</p></div></div>
            <div className="action-list">
              <div className="action-row"><div className="action-index">1</div><div><h4>Default Japanese hero copy to transcreation</h4><p>Use direct translation only for factual product modules.</p></div><Btn label="Adopt rule" cls="btn-dark btn-sm" /></div>
              <div className="action-row"><div className="action-index">2</div><div><h4>Scale the Levi’s SLM for e-commerce content</h4><p>Use it as the first route for product, SEO and routine channel variants.</p></div><Btn label="Update routing" cls="btn-light btn-sm" /></div>
              <div className="action-row"><div className="action-index">3</div><div><h4>Reduce low-use landscape production</h4><p>Remove two default formats from the next Japan social plan.</p></div><Btn label="Apply next cycle" cls="btn-light btn-sm" /></div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Recommended experiment</h2><p>Turn a recurring pattern into stronger evidence.</p></div></div>
            <div className="direct-create-card">
              <h3>Japan CRM: translation vs transcreation</h3>
              <p>Hold audience, offer, send time and product constant. Compare a natural localized translation against the selected transcreated hero.</p>
              <div className="detail-pair"><span>Primary metric</span><b>Click-through rate</b></div>
              <div className="detail-pair"><span>Secondary</span><b>Open rate and conversion</b></div>
              <div className="detail-pair"><span>Recommended sample</span><b>50/50 split</b></div>
              <Btn label="Create experiment brief" cls="btn-primary" style={s('width:100%;justify-content:center;margin-top:12px')} />
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Market memory updated</h2><p>Reusable intelligence for the next campaign.</p></div></div>
            <div className="grid grid-2">
              <div className="memory-card"><h4>Japan</h4><p>Understated hero language, specialist model route and portrait social preference.</p></div>
              <div className="memory-card"><h4>India</h4><p>Regional ambassador, local assortment and English-led cultural adaptation perform strongly.</p></div>
              <div className="memory-card"><h4>France</h4><p>Concise editorial phrasing and early layout-length validation reduce rework.</p></div>
              <div className="memory-card"><h4>Global</h4><p>Reuse approved product modules before invoking new generation.</p></div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
