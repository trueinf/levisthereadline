import { s } from '../../style'
import { Btn, PageHeader, Status } from '../../components/common'

export function Activate() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Activate"
        sub="Threadline dynamically determines approval paths, confirms cross-system readiness, packages each destination correctly and coordinates synchronized release, verification and rollback through Levi’s existing platforms."
        action={<Btn label="Open launch console" cls="btn-primary" />}
      />

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Market-channel packages</div><div className="num">16</div><div className="note">Across 4 markets and 4 channels</div></div>
        <div className="summary-card"><div className="label">Published</div><div className="num">8</div><div className="note">US and India live</div></div>
        <div className="summary-card"><div className="label">Scheduled</div><div className="num">3</div><div className="note">Approved and destination-ready</div></div>
        <div className="summary-card"><div className="label">Paused</div><div className="num">3</div><div className="note">Rights, layout and stock exceptions</div></div>
      </div>

      <div className="launch-map" style={s('margin-bottom:18px')}>
        <div className="launch-card"><div className="market-code">US · EN-US</div><h3>United States</h3><p>Global master and all destination packages are live.</p><Status label="Published" /><div className="source-usage"><span className="meta-pill">4/4 channels</span><span className="meta-pill">Verified</span></div></div>
        <div className="launch-card"><div className="market-code">FR · FR-FR</div><h3>France</h3><p>E-commerce and CRM ready; social layout and display assortment require action.</p><Status label="At Risk" /><div className="source-usage"><span className="meta-pill">2 ready</span><span className="meta-pill">2 paused</span></div></div>
        <div className="launch-card"><div className="market-code">JP · JA-JP</div><h3>Japan</h3><p>CRM scheduled; Instagram paused until the source asset is replaced.</p><Status label="Blocked" /><div className="source-usage"><span className="meta-pill">2 ready</span><span className="meta-pill">1 paused</span></div></div>
        <div className="launch-card"><div className="market-code">IN · EN-IN</div><h3>India</h3><p>Regional Alia-led packages are published and verified.</p><Status label="Published" /><div className="source-usage"><span className="meta-pill">4/4 channels</span><span className="meta-pill">Verified</span></div></div>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Japan CRM activation package</h2><p>A single decision package across approvals, AEM, product and destination readiness.</p></div><Status label="Scheduled" /></div>
            <div className="grid grid-2">
              <div className="approval-package">
                <div className="eyebrow">Approval package</div>
                <h3>What the approver sees</h3>
                <div className="decision-row"><span>Global master</span><b>Behind Every Original baseline v1.0</b></div>
                <div className="decision-row"><span>Local change</span><b>Japanese transcreated hero line</b></div>
                <div className="decision-row"><span>Product</span><b>Relaxed Trucker · Japan available</b></div>
                <div className="decision-row"><span>Assurance</span><b>Brand, product, language and rights passed</b></div>
                <div className="decision-row"><span>Approvals</span><b>Japan Brand + CRM owner complete</b></div>
              </div>
              <div className="approval-package">
                <div className="eyebrow">Destination package</div>
                <h3>What Threadline sends</h3>
                <div className="decision-row"><span>Subject</span><b>Approved Japanese subject line</b></div>
                <div className="decision-row"><span>Hero</span><b>Transcreated headline + AEM derivative</b></div>
                <div className="decision-row"><span>Product block</span><b>Approved title, fit, CTA and links</b></div>
                <div className="decision-row"><span>Metadata</span><b>Segment, locale, tags and tracking</b></div>
                <div className="decision-row"><span>Destination</span><b>Existing CRM platform</b></div>
              </div>
            </div>
            <div className="qa-grid" style={s('margin-top:14px')}>
              <div className="qa-item"><b>Pass</b><span>Approvals complete</span></div>
              <div className="qa-item"><b>Pass</b><span>AEM asset current</span></div>
              <div className="qa-item"><b>Pass</b><span>Product available</span></div>
              <div className="qa-item"><b>Pass</b><span>Tracking present</span></div>
            </div>
          </div>

          <div className="card table-card" style={s('margin-bottom:18px')}>
            <div className="card-pad card-head"><div><h2>Activation plan</h2><p>Cross-system release state by market and channel.</p></div></div>
            <div className="table-wrap"><table>
              <thead><tr><th>Market package</th><th>Dynamic approval path</th><th>AEM</th><th>Product</th><th>Destination</th><th>Release</th><th>State</th></tr></thead>
              <tbody>
                <tr><td><div className="row-title">US · E-commerce</div><div className="row-sub">VAR-001</div></td><td>Global Brand → Product</td><td>Current</td><td>Available</td><td>SCAYLE + CMS</td><td>12 Feb · 09:00 PST</td><td><Status label="Published" /></td></tr>
                <tr><td><div className="row-title">France · Instagram Story</div><div className="row-sub">VAR-006</div></td><td>France Brand → Global Brand</td><td>Derivative pending</td><td>Available</td><td>Social platform</td><td>15 Feb · 09:00 CET</td><td><Status label="Paused" /></td></tr>
                <tr><td><div className="row-title">France · Paid Display</div><div className="row-sub">VAR-008</div></td><td>France Media → Product</td><td>Current</td><td>Featured wash delayed</td><td>Paid media platform</td><td>16 Feb · 08:00 CET</td><td><Status label="Paused" /></td></tr>
                <tr><td><div className="row-title">Japan · Instagram Feed</div><div className="row-sub">VAR-010</div></td><td>Japan Brand → Rights</td><td>Source rejected</td><td>Available</td><td>Social platform</td><td>18 Feb · 10:00 JST</td><td><Status label="Paused" /></td></tr>
                <tr><td><div className="row-title">Japan · CRM</div><div className="row-sub">VAR-011</div></td><td>Japan Brand → CRM</td><td>Current</td><td>Available</td><td>CRM platform</td><td>18 Feb · 08:00 JST</td><td><Status label="Scheduled" /></td></tr>
                <tr><td><div className="row-title">India · E-commerce</div><div className="row-sub">VAR-013</div></td><td>SAMEA Brand → Product</td><td>Current</td><td>Available</td><td>SCAYLE + CMS</td><td>13 Mar · 09:00 IST</td><td><Status label="Published" /></td></tr>
              </tbody>
            </table></div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Post-publication verification</h2><p>Threadline confirms that successful API delivery became a correct live experience.</p></div><span className="status ready">8 packages verified</span></div>
            <div className="verify-list">
              <div className="verify-item"><div className="rule-num">✓</div><div><h4>Correct language and asset are live</h4><p>US and India destination pages match the approved package.</p></div><span className="status ready">Pass</span></div>
              <div className="verify-item"><div className="rule-num">✓</div><div><h4>Product links and prices resolve</h4><p>Commerce links and localized pricing are valid.</p></div><span className="status ready">Pass</span></div>
              <div className="verify-item"><div className="rule-num">✓</div><div><h4>Tracking and campaign tags are present</h4><p>Analytics lineage is connected to the published variants.</p></div><span className="status ready">Pass</span></div>
              <div className="verify-item"><div className="rule-num">!</div><div><h4>France display package remains paused</h4><p>No unauthorized or unavailable-product content was published.</p></div><span className="status risk">Protected</span></div>
            </div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Destination systems</h2><p>Threadline packages and coordinates; existing systems continue to execute.</p></div></div>
            <div className="destination-grid">
              <div className="destination-card"><h4>AEM Assets</h4><p>Approved derivatives, metadata, rights and lineage.</p><div className="source-usage"><span className="status ready">Connected</span></div></div>
              <div className="destination-card"><h4>SCAYLE / CMS</h4><p>Commerce modules, product links and locale fields.</p><div className="source-usage"><span className="status ready">Connected</span></div></div>
              <div className="destination-card"><h4>CRM platform</h4><p>Subject, preheader, body, segment and tracking.</p><div className="source-usage"><span className="status ready">Connected</span></div></div>
              <div className="destination-card"><h4>Social publishing</h4><p>Asset, caption, alt text, tags and schedule.</p><div className="source-usage"><span className="status risk">1 paused</span></div></div>
              <div className="destination-card"><h4>Paid media</h4><p>Responsive formats, copy, CTA and tracking.</p><div className="source-usage"><span className="status risk">France pause</span></div></div>
              <div className="destination-card"><h4>Analytics</h4><p>Variant lineage and campaign performance signals.</p><div className="source-usage"><span className="status ready">Connected</span></div></div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Exception isolation</h2><p>One market issue does not stop the whole global campaign.</p></div></div>
            <div className="action-row">
              <div className="action-index">FR</div>
              <div><h4>Featured wash delayed in France</h4><p>Pause 3 paid-display formats, switch to the Relaxed Trucker fallback and leave France CRM, Instagram and all other markets unchanged.</p></div>
            </div>
            <Btn label="Apply isolated fallback" cls="btn-dark" style={s('width:100%;justify-content:center;margin-top:12px')} />
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Rollback readiness</h2><p>Every active package retains a reversible release history.</p></div><span className="status ready">100%</span></div>
            <div className="timeline">
              <div className="timeline-item done"><h4>Previous approved version retained</h4><p>AEM and destination identifiers recorded</p></div>
              <div className="timeline-item done"><h4>Recall scope calculated</h4><p>Market, channel and derivative lineage available</p></div>
              <div className="timeline-item done"><h4>Notification plan prepared</h4><p>Owners and approvers mapped</p></div>
            </div>
            <Btn label="Simulate rollback" cls="btn-light" style={s('width:100%;justify-content:center')} />
          </div>
        </aside>
      </div>
    </>
  )
}
