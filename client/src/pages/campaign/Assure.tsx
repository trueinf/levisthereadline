import { s } from '../../style'
import { Btn, PageHeader, Status, VariantBtn } from '../../components/common'

export function Assure() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Assure"
        sub="Threadline classifies risk, determines the checks that apply, gathers evidence from Levi’s systems and produces an explainable publishability decision—without treating every content item the same."
        action={<Btn label="Run assurance" cls="btn-primary" />}
      />

      <div className="context-bar">
        <span className="context-token"><strong>Item</strong> Japan Instagram Feed · VAR-010</span>
        <span className="context-token"><strong>Risk class</strong> High</span>
        <span className="context-token"><strong>Reason</strong> Talent rights + local activation</span>
        <span className="context-token"><strong>Baseline</strong> v1.0</span>
        <Btn label="Select another item" cls="btn-light btn-sm" style={s('margin-left:auto')} />
      </div>

      <div className="risk-summary" style={s('margin-bottom:18px')}>
        <div className="risk-card"><h4>Checks required</h4><b>6</b><p>Dynamic policy set for this content item</p></div>
        <div className="risk-card"><h4>Passed</h4><b>5</b><p>Brand, product, cultural, channel and provenance</p></div>
        <div className="risk-card"><h4>Blocking failure</h4><b>1</b><p>Japan social territory rights</p></div>
        <div className="risk-card"><h4>Checks retained after fix</h4><b>5</b><p>No unnecessary full rerun</p></div>
      </div>

      <div className="card card-pad" style={s('margin-bottom:18px')}>
        <div className="card-head"><div><h2>Coordinated assurance agents</h2><p>Each agent contributes evidence to one publishability decision.</p></div><Status label="Blocked" /></div>
        <div className="agent-grid">
          <div className="agent-card"><div className="agent-top"><div className="agent-icon">B</div><Status label="Approved" /></div><h3>Brand Guardian</h3><p>Campaign intent, copy tone, product styling and Levi’s visual codes align with the approved master.</p><div className="agent-meter"><span style={s('width:89%')} /></div></div>
          <div className="agent-card"><div className="agent-top"><div className="agent-icon">P</div><Status label="Approved" /></div><h3>Product Accuracy</h3><p>578™ naming, non-stretch fabric, market assortment and displayed silhouette are correct.</p><div className="agent-meter"><span style={s('width:99%')} /></div></div>
          <div className="agent-card"><div className="agent-top"><div className="agent-icon">C</div><Status label="Approved" /></div><h3>Cultural Risk</h3><p>Japanese expression is natural, non-stereotypical and aligned with the approved market guidance.</p><div className="agent-meter"><span style={s('width:94%')} /></div></div>
          <div className="agent-card block"><div className="agent-top"><div className="agent-icon">R</div><Status label="Blocked" /></div><h3>Rights & Usage</h3><p>AEM rights metadata does not permit the selected talent image in Japan social placements.</p><div className="agent-meter"><span style={s('width:30%')} /></div></div>
          <div className="agent-card"><div className="agent-top"><div className="agent-icon">Ch</div><Status label="Approved" /></div><h3>Channel Compliance</h3><p>4:5 format, copy limit, safe zones, alt text and campaign metadata all pass.</p><div className="agent-meter"><span style={s('width:96%')} /></div></div>
          <div className="agent-card"><div className="agent-top"><div className="agent-icon">AI</div><Status label="Approved" /></div><h3>AI Provenance</h3><p>Models, source modules, generation templates, transformations and human edits are fully recorded.</p><div className="agent-meter"><span style={s('width:100%')} /></div></div>
        </div>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Evidence used</h2><p>The decision is grounded in authoritative sources rather than an unverified LLM judgment.</p></div></div>
            <table className="evidence-table">
              <thead><tr><th>Control</th><th>Evidence source</th><th>Evidence</th><th>Decision</th></tr></thead>
              <tbody>
                <tr><td>Brand</td><td>Campaign baseline v1.0</td><td>Approved global intent and protected language</td><td><Status label="Approved" /></td></tr>
                <tr><td>Product</td><td>Commerce / PIM</td><td>578™ Baggy, black wash, Japan availability confirmed</td><td><Status label="Approved" /></td></tr>
                <tr><td>Cultural</td><td>Japan regional guidance</td><td>Selected hero line accepted by specialist evaluation</td><td><Status label="Approved" /></td></tr>
                <tr><td>Rights</td><td>AEM asset AST-005</td><td>Territories: US and France; Japan excluded</td><td><Status label="Blocked" /></td></tr>
                <tr><td>Channel</td><td>Instagram Feed spec</td><td>4:5, copy, safe zones and alt text valid</td><td><Status label="Approved" /></td></tr>
                <tr><td>Provenance</td><td>Threadline generation record</td><td>Model route, source assets and approvals complete</td><td><Status label="Approved" /></td></tr>
              </tbody>
            </table>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Explainable publishability decision</h2><p>Threadline blocks only the affected source choice and preserves the valid work.</p></div></div>
            <div className="action-row">
              <div className="action-index">!</div>
              <div><h4>Publishing is blocked by territory rights</h4><p>Replace AST-005 with AST-006. The copy, product, cultural, channel and provenance approvals remain valid.</p></div>
              <Btn label="Apply replacement" cls="btn-primary btn-sm" />
            </div>
            <div className="workload-line" style={s('margin:14px 0 0')}>
              <span><b>After replacement:</b> only Rights & Usage and visual-product alignment rerun.</span>
              <span>Estimated assurance time saved: 74%.</span>
            </div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Policies applied</h2><p>Deterministic controls enforce non-negotiable requirements.</p></div></div>
            <div className="policy-card"><h4>No market activation without valid rights</h4><p>Talent, image, territory, channel and dates must match the destination.</p></div>
            <div className="policy-card"><h4>No unsupported product or sustainability claim</h4><p>Every claim must reference an approved evidence source.</p></div>
            <div className="policy-card"><h4>No generated human imagery without enhanced review</h4><p>Human-likeness changes trigger creative, legal and reputational approval.</p></div>
            <div className="policy-card"><h4>No publish without complete provenance</h4><p>Models, prompts, source content, transformations and humans must be traceable.</p></div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Dynamic risk classification</h2><p>Why this item received a high-risk route.</p></div></div>
            <div className="detail-pair"><span>Content visibility</span><b>Public social campaign</b></div>
            <div className="detail-pair"><span>Human likeness</span><b>Talent imagery</b></div>
            <div className="detail-pair"><span>Market change</span><b>Global source → Japan</b></div>
            <div className="detail-pair"><span>AI use</span><b>Copy + layout adaptation</b></div>
            <div className="detail-pair"><span>Review route</span><b>Regional Brand + Rights</b></div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Other assurance items</h2><p>Different content receives different controls.</p></div></div>
            <div className="work-queue">
              <div className="work-item"><div className="work-icon">TD</div><div><h4>Thermodapt PDP claim</h4><p>Unsupported absolute performance claim</p></div><VariantBtn variantId="VAR-017" cls="btn-light btn-sm">Open</VariantBtn></div>
              <div className="work-item"><div className="work-icon">FR</div><div><h4>France Story layout</h4><p>Copy passes; visual safe area at risk</p></div><VariantBtn variantId="VAR-006" cls="btn-light btn-sm">Open</VariantBtn></div>
              <div className="work-item"><div className="work-icon">SEO</div><div><h4>Japan SEO title</h4><p>Low-risk product metadata · light review</p></div><span className="status ready">Approved</span></div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
