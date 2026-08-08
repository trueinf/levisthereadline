import { s } from '../style'
import { Btn, PageHeader } from '../components/common'

export function Activity() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="System observability"
        title="Agent Activity"
        sub="See what Threadline agents decided, which tools and models they invoked, what evidence they used and where human authorization is required."
        action={<Btn label="Export activity log" cls="btn-light" />}
      />

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Agent runs today</div><div className="num">148</div><div className="note">Across 4 active campaigns</div></div>
        <div className="summary-card"><div className="label">Completed automatically</div><div className="num">82%</div><div className="note">Low-risk operations</div></div>
        <div className="summary-card"><div className="label">Human decisions requested</div><div className="num">11</div><div className="note">Brand, rights and regional review</div></div>
        <div className="summary-card"><div className="label">Failed tool calls</div><div className="num">1</div><div className="note">Recovered without campaign impact</div></div>
      </div>

      <div className="layout-main">
        <section className="card card-pad">
          <div className="card-head"><div><h2>Recent activity</h2><p>Agent reasoning summaries and tool outcomes.</p></div><span className="status ready">Live</span></div>
          <div className="activity-event"><div className="work-icon">A</div><div><h4>Adaptation agent replaced AST-005 with AST-006</h4><p>Reason: Japan social rights were missing. Adobe crop service generated 4:5 and 1:1 variants; existing copy approvals were retained.</p></div><span className="status ready">Completed</span></div>
          <div className="activity-event"><div className="work-icon">T</div><div><h4>Translation agent escalated Japanese CRM hero to Transcreate</h4><p>Reason: literal translation scored 48 for naturalness; product facts remained in the translation route.</p></div><span className="status risk">Human review</span></div>
          <div className="activity-event"><div className="work-icon">S</div><div><h4>Levi’s SLM generated Japan SEO metadata</h4><p>Product accuracy 99, brand 94, channel limits passed. Routed for light review.</p></div><span className="status ready">Completed</span></div>
          <div className="activity-event"><div className="work-icon">R</div><div><h4>Readiness agent recalculated 18 requirements</h4><p>Three source changes detected; no new photography required. One India CRM assumption remains open.</p></div><span className="status ready">Completed</span></div>
          <div className="activity-event"><div className="work-icon">P</div><div><h4>Publishing agent paused France paid display</h4><p>Commerce feed indicated a featured-wash delay. France CRM, Instagram and other markets were not affected.</p></div><span className="status risk">Protected</span></div>
        </section>

        <aside className="card card-pad">
          <div className="card-head"><div><h2>Run detail</h2><p>Selected activity: Japan asset replacement.</p></div></div>
          <div className="decision-row"><span>Agent</span><b>Asset Adaptation Orchestrator</b></div>
          <div className="decision-row"><span>Inputs</span><b>VAR-010, AST-005, Japan rights, Instagram spec</b></div>
          <div className="decision-row"><span>Decision</span><b>Replace source rather than request new rights</b></div>
          <div className="decision-row"><span>Tools invoked</span><b>AEM search, Adobe crop service, layout validator</b></div>
          <div className="decision-row"><span>Output</span><b>AST-006 derivatives and preserved approvals</b></div>
          <div className="decision-row"><span>Human action</span><b>Creative review for Story layout only</b></div>
          <Btn label="Open full audit record" cls="btn-dark" style={s('width:100%;justify-content:center;margin-top:14px')} />
        </aside>
      </div>
    </div>
  )
}
