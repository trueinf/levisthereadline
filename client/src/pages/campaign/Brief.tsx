import { useApp } from '../../context'
import { s } from '../../style'
import { Btn, PageHeader, VariantBtn } from '../../components/common'

export function Brief() {
  const { toast } = useApp()
  return (
    <>
      <PageHeader
        eyebrow="Campaign foundation"
        title="Campaign Brief & Intake"
        sub="Threadline has reconciled the connected campaign sources, identified conflicts and assumptions, and prepared a governed baseline for downstream agents."
        action={<Btn label="Review 2 blocking findings" cls="btn-primary" />}
      />

      <div style={s('display:flex;justify-content:flex-end;gap:14px;align-items:center;margin-top:-14px;margin-bottom:18px')}>
        <span style={s('font-size:11px;color:var(--muted)')}>Last source sync: 18 minutes ago</span>
        <Btn label="Sync source systems" cls="btn-light btn-sm" />
      </div>

      <div className="grid grid-4" style={s('margin-bottom:18px')}>
        <div className="card metric"><div className="metric-label">Brief completeness</div><div className="metric-value">89%</div><div className="metric-note">24 of 27 baseline fields confirmed</div></div>
        <div className="card metric"><div className="metric-label">Launch-blocking gaps</div><div className="metric-value">2</div><div className="metric-note">Japan rights · France assortment</div></div>
        <div className="card metric"><div className="metric-label">Source conflicts</div><div className="metric-value">2</div><div className="metric-note">Cross-system inconsistencies</div></div>
        <div className="card metric"><div className="metric-label">Assumptions awaiting confirmation</div><div className="metric-value">1</div><div className="metric-note">India CRM provisionally included</div></div>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Campaign foundation</h2><p>Structured and reconciled from the connected global campaign sources.</p></div><span className="status ready">24 confirmed</span></div>
            <div className="grid grid-2">
              <div>
                <div className="metric-label">Campaign objective</div>
                <p style={s('font-size:14px;line-height:1.55;margin-bottom:0')}>Celebrate original voices shaping culture and connect their stories to Levi’s products and self-expression.</p>
                <span className="source-chip confirmed">Workfront brief · Confirmed</span><span className="confidence">98% confidence</span>
              </div>
              <div>
                <div className="metric-label">Desired audience response</div>
                <p style={s('font-size:14px;line-height:1.55;margin-bottom:0')}>See Levi’s as part of personal identity and cultural self-expression, then explore the featured product stories.</p>
                <span className="source-chip inferred">Threadline interpretation</span><span className="confidence">Needs confirmation</span>
              </div>
              <div>
                <div className="metric-label">Creative platform</div>
                <p style={s('font-size:14px;line-height:1.55;margin-bottom:0')}>Behind Every Original — personal stories, cultural influence and denim as an expression of individuality.</p>
                <span className="source-chip confirmed">Workfront + campaign source · Confirmed</span><span className="confidence">96% confidence</span>
              </div>
              <div>
                <div className="metric-label">Protected elements</div>
                <p style={s('font-size:14px;line-height:1.55;margin-bottom:0')}>Campaign name, Levi’s brand marks, approved product names and ambassador rights.</p>
                <span className="source-chip confirmed">AEM metadata + brand rules</span><span className="confidence">Confirmed</span>
              </div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Products, markets and channels</h2><p>Confirmed scope and Threadline-detected regional differences.</p></div><Btn label="Edit scope" cls="btn-light btn-sm" /></div>
            <div className="grid grid-3">
              <div>
                <div className="metric-label">Featured products</div>
                <p style={s('font-size:13px;line-height:1.55;margin-bottom:0')}>Low Slim Bootcut<br />578™ Baggy<br />Relaxed Trucker<br />India: Cinch Waist and Loose Boot</p>
                <span className="source-chip confirmed">Commerce + regional brief</span>
              </div>
              <div>
                <div className="metric-label">Markets & locales</div>
                <p style={s('font-size:13px;line-height:1.55;margin-bottom:0')}>United States · en-US<br />France · fr-FR<br />Japan · ja-JP<br />India · en-IN</p>
                <span className="source-chip confirmed">Workfront scope</span>
              </div>
              <div>
                <div className="metric-label">Channels</div>
                <p style={s('font-size:13px;line-height:1.55;margin-bottom:0')}>E-commerce<br />Instagram / social<br />CRM / email<br />Paid display</p>
                <span className="source-chip inferred">Global + regional merge</span>
              </div>
            </div>

            <div style={s('margin-top:18px;padding-top:16px;border-top:1px solid #eee9e2')}>
              <div className="metric-label">Regional scope differences detected</div>
              <div className="grid grid-2" style={s('margin-top:10px')}>
                <div className="choice"><div className="choice-label">India</div><blockquote style={s('font-size:16px')}>Regional ambassador and assortment replace the global product focus.</blockquote><p>Alia Bhatt · Cinch Waist · Loose Boot</p></div>
                <div className="choice"><div className="choice-label">Japan</div><blockquote style={s('font-size:16px')}>Global product set retained; social rights are incomplete.</blockquote><p>578™ Baggy · Relaxed Trucker</p></div>
              </div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Governance and operating rules</h2><p>Controls inherited by creation, localization, assurance and activation.</p></div></div>
            <div className="grid grid-2">
              <div className="choice"><div className="choice-label">Human oversight</div><blockquote style={s('font-size:17px')}>Global hero creative and high-risk local adaptations require human approval.</blockquote><p>AI augments creative and regional teams; it does not replace them.</p></div>
              <div className="choice"><div className="choice-label">Rights & claims</div><blockquote style={s('font-size:17px')}>No market activation without valid talent rights and product evidence.</blockquote><p>Rights, claims and product availability are validated before publishing.</p></div>
            </div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Connected sources</h2><p>Click a source to inspect the version Threadline reconciled.</p></div></div>

            <div className="source-row" style={s('cursor:pointer')} onClick={() => toast('Workfront campaign record — prototype action')}>
              <div className="source-icon">WF</div>
              <div><h4>Workfront campaign record</h4><p>Objective, owners, timeline and deliverables</p></div>
              <div className="source-version">v14 · 18m</div>
            </div>
            <div className="source-row" style={s('cursor:pointer')} onClick={() => toast('AEM Assets — prototype action')}>
              <div className="source-icon">A</div>
              <div><h4>AEM Assets</h4><p>Approved visuals, metadata and rights</p></div>
              <div className="source-version">42 assets · 21m</div>
            </div>
            <div className="source-row" style={s('cursor:pointer')} onClick={() => toast('Commerce / product data — prototype action')}>
              <div className="source-icon">P</div>
              <div><h4>Commerce / product data</h4><p>Products, fits, washes and market availability</p></div>
              <div className="source-version">Feed 07:30</div>
            </div>
            <div className="source-row" style={s('cursor:pointer')} onClick={() => toast('Regional briefs — prototype action')}>
              <div className="source-icon">RB</div>
              <div><h4>Regional briefs</h4><p>India connected · Japan partially complete</p></div>
              <div className="source-version">2 of 4</div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Threadline findings</h2><p>Conflicts, missing information and assumptions with downstream impact.</p></div><span className="status risk">5 findings</span></div>

            <div className="finding conflict">
              <div className="finding-top"><div><div className="finding-type">Source conflict</div><h4>Japan social rights do not match campaign scope</h4></div><VariantBtn variantId="VAR-010" cls="btn-dark btn-sm">Resolve</VariantBtn></div>
              <p>Workfront includes Japan Instagram, while the selected AEM asset is licensed only for the US and France.</p>
              <div className="impact">
                <div><b>Impact:</b> 1 Instagram variant blocked</div>
                <div>2 ambassador source images excluded</div>
                <div>Japan e-commerce and CRM remain unaffected</div>
              </div>
            </div>

            <div className="finding missing">
              <div className="finding-top"><div><div className="finding-type">Missing input</div><h4>France paid-media assortment is incomplete</h4></div><Btn label="Confirm" cls="btn-light btn-sm" /></div>
              <p>The campaign promotes the Kick Start wash, but commerce data does not confirm availability for the paid-media launch window.</p>
              <div className="impact">
                <div><b>Impact:</b> 3 paid-display formats at risk</div>
                <div>Low Slim Bootcut creative may need replacement</div>
                <div>France CRM and Instagram remain unaffected</div>
              </div>
            </div>

            <div className="finding assumption">
              <div className="finding-top"><div><div className="finding-type">Threadline assumption</div><h4>India CRM has been provisionally included</h4></div><Btn label="Review" cls="btn-light btn-sm" /></div>
              <p>The global plan includes CRM, while the India regional brief names only e-commerce and social.</p>
              <div className="impact">
                <div><b>Impact:</b> 1 provisional CRM requirement created</div>
                <div>No launch block until the baseline is confirmed</div>
              </div>
            </div>

            <Btn label="View all 5 findings" cls="btn-light" style={s('width:100%;justify-content:center')} />
          </div>

          <div className="baseline">
            <div style={s('display:flex;justify-content:space-between;gap:14px;align-items:flex-start;margin-bottom:14px')}>
              <div><div className="eyebrow" style={s('margin-bottom:6px')}>Governed campaign context</div><h3 style={s('margin-bottom:5px')}>Confirm campaign baseline</h3></div>
              <span className="baseline-version">Draft v1.0</span>
            </div>
            <p style={s('font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:14px')}>Once confirmed, this becomes the approved context used by Readiness, Assemble, Create, Adapt, Translate, Transcreate and Assurance.</p>
            <div className="detail-pair"><span>Confirmed fields</span><b>24 of 27</b></div>
            <div className="detail-pair"><span>Accepted assumptions</span><b>0</b></div>
            <div className="detail-pair"><span>Blocking findings</span><b>2 unresolved</b></div>
            <Btn label="Confirm baseline after resolution" cls="btn-primary" style={s('width:100%;justify-content:center;margin-top:16px')} />
          </div>
        </aside>
      </div>
    </>
  )
}
