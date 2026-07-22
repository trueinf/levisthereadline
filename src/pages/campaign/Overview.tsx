import { useApp } from '../../context'
import { s } from '../../style'
import { VariantBtn } from '../../components/common'
import { workspaceCampaigns } from '../../data'

export function Overview() {
  const { setCampaignTab, toast, workspaceCampaignId } = useApp()
  const c = workspaceCampaigns[workspaceCampaignId] ?? workspaceCampaigns.beo
  return (
    <>
      <section className="card card-pad" style={s('padding:0;overflow:hidden;margin-bottom:18px')}>
        <div style={s('display:grid;grid-template-columns:minmax(0,1.2fr) minmax(380px,.8fr)')}>
          <div style={s('min-height:315px;position:relative;overflow:hidden;background:linear-gradient(90deg,rgba(15,15,15,.06),rgba(15,15,15,.18)),linear-gradient(135deg,#2b1715 0%,#7c463a 58%,#d5b097 100%)')}>
            <div style={s('position:absolute;left:34px;top:30px;color:#fff;z-index:2')}>
              <span className="tag" style={s('display:inline-flex;padding:6px 10px;border:1px solid rgba(255,255,255,.45);border-radius:99px;font-size:11px;text-transform:uppercase;letter-spacing:1px')}>Approved campaign visual</span>
            </div>
            <div style={s('position:absolute;right:9%;top:11%;width:220px;height:270px;border-radius:110px 110px 30px 30px;background:rgba(255,255,255,.20);transform:rotate(-5deg)')} />
            <div style={s('position:absolute;right:5%;bottom:20px;width:330px;height:74px;background:rgba(10,10,10,.48)')} />
            <div style={s('position:absolute;left:34px;bottom:30px;color:#fff;z-index:2')}>
              <div style={s('font-size:12px;letter-spacing:1.2px;text-transform:uppercase;opacity:.78;margin-bottom:6px')}>{c.subtitle}</div>
              <div style={s('font-size:34px;font-weight:850;letter-spacing:-1.4px')}>{c.name}</div>
            </div>
          </div>

          <div style={s('padding:28px 30px;background:var(--paper)')}>
            <div className="eyebrow">Campaign brief snapshot</div>
            <h2 style={s('font-size:30px;margin-bottom:10px')}>{c.completeness}% complete</h2>
            <p className="subhead" style={s('font-size:13px;margin-bottom:20px')}>Threadline has reconciled the connected campaign sources, identified the launch-blocking findings and prepared a governed baseline for downstream agents.</p>

            <div className="detail-pair"><span>Objective</span><b>{c.objective}</b></div>
            <div className="detail-pair"><span>Products</span><b>{c.products}</b></div>
            <div className="detail-pair"><span>Markets</span><b>{c.markets}</b></div>
            <div className="detail-pair"><span>Channels</span><b>{c.channels}</b></div>
            <div className="detail-pair"><span>Sources</span><b>{c.sources}</b></div>

            <div style={s('display:flex;gap:10px;margin-top:20px')}>
              <button className="btn btn-primary" onClick={() => setCampaignTab('brief')}>Review findings</button>
              <button className="btn btn-light" onClick={() => toast('View source material — prototype action')}>View source material</button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-4" style={s('margin-top:18px')}>
        <div className="card metric"><div className="metric-label">Brief completeness</div><div className="metric-value">{c.completeness}%</div><div className="metric-note">Baseline fields confirmed</div></div>
        <div className="card metric"><div className="metric-label">Overall readiness</div><div className="metric-value">{c.readiness}%</div><div className="metric-note">{c.readyOf}</div></div>
        <div className="card metric"><div className="metric-label">Open risks</div><div className="metric-value">{c.openRisks}</div><div className="metric-note">{c.risksNote}</div></div>
        <div className="card metric"><div className="metric-label">Content reuse</div><div className="metric-value">{c.reuse}%</div><div className="metric-note">Before new generation</div></div>
      </div>

      <div className="layout-main" style={s('margin-top:20px')}>
        <section className="card card-pad"><div className="card-head"><div><h2>What needs attention</h2><p>Cross-system issues that affect activation.</p></div></div>
          <div className="action-list">
            <div className="action-row"><div className="action-index">BR</div><div><h4>Two brief inputs still need confirmation</h4><p>Japan social rights and France paid-media assortment remain unresolved.</p></div><button className="btn btn-dark btn-sm" onClick={() => setCampaignTab('brief')}>Review brief</button></div>
            <div className="action-row"><div className="action-index">JP</div><div><h4>Japan Instagram is blocked by asset rights</h4><p>Replace the talent image with a territory-cleared product-led asset.</p></div><VariantBtn variantId="VAR-010" cls="btn-light btn-sm">Resolve</VariantBtn></div>
            <div className="action-row"><div className="action-index">FR</div><div><h4>French Story copy exceeds layout safe area</h4><p>The shorter transcreated headline has passed language and brand review.</p></div><VariantBtn variantId="VAR-006" cls="btn-light btn-sm">Review</VariantBtn></div>
          </div>
        </section>
        <section className="card card-pad"><div className="card-head"><div><h2>Campaign lineage</h2><p>Brief to market execution</p></div></div>
          <div className="timeline">
            <div className="timeline-item done"><h4>Source brief connected</h4><p>Workfront campaign record + approved assets</p></div>
            <div className="timeline-item done"><h4>Global brief structured</h4><p>Objective, products, markets and channels extracted</p></div>
            <div className="timeline-item"><h4>Regional inputs being confirmed</h4><p>Japan rights and France assortment</p></div>
            <div className="timeline-item"><h4>Readiness analysis active</h4><p>18 content requirements generated</p></div>
          </div>
        </section>
      </div>

      <div className="section-title"><h2>Market readiness</h2><span>Persistent campaign context</span></div>
      <div className="grid grid-4">
        <div className="card market-card"><span className="status ready">Ready</span><div className="market-code">US · EN-US</div><h3>United States</h3><div className="market-stats"><div><b>4</b><span>Variants</span></div><div><b>100%</b><span>Ready</span></div></div></div>
        <div className="card market-card"><span className="status risk">At Risk</span><div className="market-code">FR · FR-FR</div><h3>France</h3><div className="market-stats"><div><b>4</b><span>Variants</span></div><div><b>50%</b><span>Ready</span></div></div></div>
        <div className="card market-card"><span className="status blocked">Blocked</span><div className="market-code">JP · JA-JP</div><h3>Japan</h3><div className="market-stats"><div><b>4</b><span>Variants</span></div><div><b>50%</b><span>Ready</span></div></div></div>
        <div className="card market-card"><span className="status ready">Ready</span><div className="market-code">IN · EN-IN</div><h3>India</h3><div className="market-stats"><div><b>4</b><span>Variants</span></div><div><b>100%</b><span>Ready</span></div></div></div>
      </div>
    </>
  )
}
