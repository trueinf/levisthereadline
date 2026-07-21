import { s } from '../../style'
import { Btn, PageHeader, Status, VariantBtn } from '../../components/common'

export function Adapt() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Adapt"
        sub="Threadline determines which asset variants are truly required, chooses the correct approved source, orchestrates Levi’s existing production tools and validates every product, rights, layout and channel decision."
        action={<Btn label="Create adaptation" cls="btn-primary" />}
      />

      <div className="context-bar">
        <span className="context-token"><strong>Market</strong> Japan</span>
        <span className="context-token"><strong>Channel</strong> Instagram</span>
        <span className="context-token"><strong>Product</strong> 578™ Baggy</span>
        <span className="context-token"><strong>Requirement</strong> VAR-010</span>
        <span className="context-token"><strong>Destination</strong> Feed · 4:5</span>
        <Btn label="Change adaptation context" cls="btn-light btn-sm" style={s('margin-left:auto')} />
      </div>

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Required variants</div><div className="num">4</div><div className="note">Feed, Story, square and commerce crop</div></div>
        <div className="summary-card"><div className="label">Approved source options</div><div className="num">3</div><div className="note">1 rejected by territory rights</div></div>
        <div className="summary-card"><div className="label">Production tools</div><div className="num">2</div><div className="note">Adobe crop + layout service</div></div>
        <div className="summary-card"><div className="label">Estimated effort avoided</div><div className="num">68%</div><div className="note">Through source selection and reuse</div></div>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Source decision</h2><p>Threadline evaluated product, rights, channel and visual suitability before choosing the source.</p></div><span className="status ready">Replacement recommended</span></div>
            <div className="grid grid-3">
              <div className="module-card excluded">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Original request</div><span className="status blocked">Blocked</span></div>
                <div className="asset-preview"><div className="asset-label"><b>AST-005 · Talent movement</b><span>US + France rights only</span></div></div>
                <div className="why-box"><b>Rejected because</b><p>Japan social rights are missing even though product and composition are otherwise suitable.</p></div>
              </div>
              <div className="module-card selected">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Recommended source</div><span className="match-badge">94% fit</span></div>
                <div className="asset-preview blue"><div className="asset-label"><b>AST-006 · Product-led 578™</b><span>Japan social + commerce cleared</span></div></div>
                <div className="why-box"><b>Selected because</b><p>Exact product match, valid rights, full silhouette visible and enough negative space for Japanese copy.</p></div>
              </div>
              <div className="module-card">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Alternative source</div><span className="match-badge warn">78% fit</span></div>
                <div className="asset-preview light"><div className="asset-label"><b>AST-002 · Global movement</b><span>Rights valid · crop risk</span></div></div>
                <div className="why-box"><b>Not preferred because</b><p>The stacked ankle is partially obscured in 4:5 and the translated headline has limited safe space.</p></div>
              </div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Required channel variants</h2><p>Only formats that the approved channel plan actually needs are produced.</p></div><span className="status ready">4 selected from 9 possible</span></div>
            <div className="format-grid">
              <div className="format-card"><div className="format-preview" /><h4>Instagram Feed · 4:5</h4><p>Product silhouette, Japanese headline, campaign tags and alt text.</p><div className="source-usage"><span className="status ready">Ready</span></div></div>
              <div className="format-card"><div className="format-preview story" /><h4>Instagram Story · 9:16</h4><p>Short headline, interface safe zones and CTA placement.</p><div className="source-usage"><span className="status risk">Layout review</span></div></div>
              <div className="format-card"><div className="format-preview square" /><h4>Square social · 1:1</h4><p>Product-led crop for reusable paid and organic placements.</p><div className="source-usage"><span className="status ready">Ready</span></div></div>
              <div className="format-card"><div className="format-preview banner" /><h4>Commerce crop · 16:9</h4><p>Campaign module crop with product focus and no overlaid copy.</p><div className="source-usage"><span className="status ready">Ready</span></div></div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Adaptation workbench</h2><p>Proposed 4:5 Japan Instagram Feed variant.</p></div><Status label="Ready" /></div>
            <div className="grid grid-2">
              <div className="asset-preview blue" style={s('min-height:315px')}><div className="asset-label"><b>Source · AST-006</b><span>Full product silhouette and Japan rights</span></div></div>
              <div className="asset-preview light" style={s('min-height:315px')}><div className="asset-label"><b>Adapted · 4:5</b><span>自分らしさには、物語がある。</span></div></div>
            </div>
            <div className="qa-grid" style={s('margin-top:14px')}>
              <div className="qa-item"><b>Pass</b><span>Product visibility</span></div>
              <div className="qa-item"><b>Pass</b><span>Logo safe area</span></div>
              <div className="qa-item"><b>Pass</b><span>Japan rights</span></div>
              <div className="qa-item"><b>Pass</b><span>4:5 specification</span></div>
            </div>
            <div style={s('display:flex;justify-content:flex-end;gap:9px;margin-top:14px')}>
              <Btn label="Generate alternate crop" cls="btn-light" />
              <Btn label="Approve and write to AEM" cls="btn-primary" />
            </div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Adaptation rules applied</h2><p>Apparel, market, rights and channel intelligence.</p></div></div>
            <div className="rule-list">
              <div className="rule-item"><div className="rule-num">1</div><div><h4>Preserve the commercial focal point</h4><p>578™ silhouette and stacked ankle remain visible.</p></div><span className="status ready">Pass</span></div>
              <div className="rule-item"><div className="rule-num">2</div><div><h4>Use only market-available products</h4><p>Japan assortment confirms the featured black 578™.</p></div><span className="status ready">Pass</span></div>
              <div className="rule-item"><div className="rule-num">3</div><div><h4>Respect talent and territory rights</h4><p>Product-led source replaces restricted ambassador asset.</p></div><span className="status ready">Resolved</span></div>
              <div className="rule-item"><div className="rule-num">4</div><div><h4>Coordinate translated copy and layout</h4><p>Japanese hero line fits feed and Story safe zones.</p></div><span className="status risk">1 review</span></div>
              <div className="rule-item"><div className="rule-num">5</div><div><h4>Maintain asset lineage</h4><p>Source, crop, model route, rights and approvals retained.</p></div><span className="status ready">Complete</span></div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Production orchestration</h2><p>Threadline uses existing tools rather than replacing them.</p></div></div>
            <div className="timeline">
              <div className="timeline-item done"><h4>AEM source resolved</h4><p>AST-006 selected with valid rights</p></div>
              <div className="timeline-item done"><h4>Adobe crop service</h4><p>Product-aware 4:5 and 1:1 crops generated</p></div>
              <div className="timeline-item done"><h4>Layout service</h4><p>Japanese copy and safe zones applied</p></div>
              <div className="timeline-item"><h4>Creative approval</h4><p>Story layout requires one final review</p></div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Other adaptation work</h2><p>Directly create or review variants for other channels.</p></div></div>
            <div className="work-queue">
              <div className="work-item"><div className="work-icon">FR</div><div><h4>France Instagram Story</h4><p>Short headline and 9:16 reflow</p></div><VariantBtn variantId="VAR-006" cls="btn-light btn-sm">Open</VariantBtn></div>
              <div className="work-item"><div className="work-icon">IN</div><div><h4>India paid display set</h4><p>Loose Boot · 1:1, 1.91:1 and 4:5</p></div><Btn label="Create" cls="btn-light btn-sm" /></div>
              <div className="work-item"><div className="work-icon">CRM</div><div><h4>Japan CRM hero crop</h4><p>2:1 desktop and 4:5 mobile</p></div><Btn label="Create" cls="btn-light btn-sm" /></div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
