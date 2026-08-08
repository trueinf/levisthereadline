import { s } from '../../style'
import { Btn, PageHeader } from '../../components/common'

export function Assemble() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Assemble"
        sub="Threadline has searched approved campaign, product and market content, evaluated suitability for the selected context, excluded unsafe material and prepared a traceable package before new generation."
        action={<Btn label="Start new assembly" cls="btn-primary" />}
      />

      <div className="context-bar">
        <span className="context-token"><strong>Market</strong> Japan</span>
        <span className="context-token"><strong>Channel</strong> E-commerce</span>
        <span className="context-token"><strong>Product</strong> 578™ Baggy</span>
        <span className="context-token"><strong>Locale</strong> ja-JP</span>
        <span className="context-token"><strong>Requirement</strong> VAR-009</span>
        <Btn label="Change context" cls="btn-light btn-sm" style={s('margin-left:auto')} />
      </div>

      <div className="assemble-kpis">
        <div className="summary-card"><div className="label">Package reusable</div><div className="num">61%</div><div className="note">Approved content already available</div></div>
        <div className="summary-card"><div className="label">Approved modules found</div><div className="num">5</div><div className="note">Across campaign, product and market sources</div></div>
        <div className="summary-card"><div className="label">Missing components</div><div className="num">3</div><div className="note">Creation or transcreation required</div></div>
        <div className="summary-card"><div className="label">Excluded modules</div><div className="num">2</div><div className="note">Outdated or contextually unsuitable</div></div>
      </div>

      <div className="workload-line">
        <span><b>3 new components instead of 8</b></span>
        <span><b>~45 minutes</b> estimated production effort avoided</span>
        <span><b>100% lineage</b> retained from source to package</span>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head">
              <div><h2>Recommended reusable components</h2><p>Ranked by campaign, product, market, channel and approval fit.</p></div>
              <span className="status ready">5 approved matches</span>
            </div>

            <div className="grid grid-2">
              <div className="module-card selected">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Campaign proposition</div><span className="match-badge">92% match</span></div>
                <h3>Originals have stories worth telling, with denim as part of how those stories are expressed.</h3>
                <div className="module-meta"><span className="meta-pill">Workfront + AEM</span><span className="meta-pill">Approved v3</span><span className="meta-pill">Global reuse</span></div>
                <div className="why-box"><b>Why Threadline recommends this</b><p>Exact campaign match, globally approved, preserves the required originality and story proposition, and is suitable for Japanese e-commerce with localized supporting copy.</p></div>
              </div>

              <div className="module-card selected">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Product fit module</div><span className="match-badge">96% match</span></div>
                <h3>1990s-inspired non-stretch baggy jean that sits at the waist and falls straight through the leg.</h3>
                <div className="module-meta"><span className="meta-pill">Commerce / PIM</span><span className="meta-pill">Product approved</span><span className="meta-pill">3 markets</span></div>
                <div className="why-box"><b>Why Threadline recommends this</b><p>Exact 578™ Baggy match, approved product facts, and Japanese terminology already exists in translation memory.</p></div>
              </div>

              <div className="module-card selected">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Approved CTA</div><span className="match-badge">88% match</span></div>
                <h3>コレクションを見る</h3>
                <div className="module-meta"><span className="meta-pill">Translation memory</span><span className="meta-pill">Japan approved</span><span className="meta-pill">E-commerce</span></div>
                <div className="why-box"><b>Why Threadline recommends this</b><p>Previously approved for Japanese Levi’s commerce and compatible with the destination component.</p></div>
              </div>

              <div className="module-card selected">
                <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Product image</div><span className="match-badge">94% match</span></div>
                <h3>AST-006 · Japan product-led 578™ frame</h3>
                <div className="module-meta"><span className="meta-pill">AEM Assets</span><span className="meta-pill">Japan rights valid</span><span className="meta-pill">Product-led</span></div>
                <div className="why-box"><b>Why Threadline recommends this</b><p>Correct product, cleared for Japan e-commerce and visually preserves the stacked ankle and baggy silhouette.</p></div>
              </div>
            </div>

            <div style={s('display:flex;justify-content:space-between;align-items:center;margin-top:16px')}>
              <Btn label="View 1 additional match" cls="btn-light btn-sm" />
              <Btn label="Assemble selected components" cls="btn-dark btn-sm" />
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Live content package preview</h2><p>Every slot retains its source and transformation history.</p></div><span className="status risk">3 gaps remain</span></div>

            <div className="package-preview"><div className="package-slot">Campaign line</div><div className="package-value">自分らしさには、物語がある。</div><div className="package-state"><span className="slot-localized">TRANSCREATED</span></div></div>
            <div className="package-preview"><div className="package-slot">Product title</div><div className="package-value">578™ バギージーンズ</div><div className="package-state"><span className="slot-reused">REUSED</span></div></div>
            <div className="package-preview"><div className="package-slot">Product description</div><div className="package-value">90年代に着想を得た、ウエスト位置で穿くバギーフィット。</div><div className="package-state"><span className="slot-localized">LOCALIZED</span></div></div>
            <div className="package-preview"><div className="package-slot">CTA</div><div className="package-value">コレクションを見る</div><div className="package-state"><span className="slot-reused">REUSED</span></div></div>
            <div className="package-preview"><div className="package-slot">SEO title</div><div className="package-value">Not yet created</div><div className="package-state"><span className="slot-missing">MISSING</span></div></div>
            <div className="package-preview"><div className="package-slot">SEO description</div><div className="package-value">Not yet created</div><div className="package-state"><span className="slot-missing">MISSING</span></div></div>
            <div className="package-preview"><div className="package-slot">Alt text</div><div className="package-value">Not yet created</div><div className="package-state"><span className="slot-missing">MISSING</span></div></div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Assembly plan</h2><p>Japan · E-commerce · 578™ Baggy</p></div></div>

            <div className="timeline">
              <div className="timeline-item done"><h4>Global proposition</h4><p>Reused from approved campaign module</p></div>
              <div className="timeline-item done"><h4>Product fit module</h4><p>Reused and localized with approved terminology</p></div>
              <div className="timeline-item done"><h4>CTA and image</h4><p>Approved Japan-specific components selected</p></div>
              <div className="timeline-item"><h4>SEO title and description</h4><p>Route to Multi-Model Content Creation</p></div>
              <div className="timeline-item"><h4>Image alt text</h4><p>Generate, then route to Assurance</p></div>
            </div>

            <Btn label="Assemble and route gaps" cls="btn-primary" style={s('width:100%;justify-content:center')} />
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Missing component routes</h2><p>Threadline selects the correct downstream capability.</p></div></div>

            <div className="route-card"><h4>SEO title</h4><p>Generate from approved campaign and product modules under a 60-character limit.</p><span className="route-tag">Create</span></div>
            <div className="route-card"><h4>SEO description</h4><p>Generate from approved product facts and Japanese search language.</p><span className="route-tag">Create</span></div>
            <div className="route-card"><h4>Image alt text</h4><p>Create from AST-006, then validate product and accessibility accuracy.</p><span className="route-tag">Create → Assure</span></div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Excluded content</h2><p>Relevant-looking modules Threadline rejected.</p></div><Btn label="View all" cls="btn-light btn-sm" /></div>
            <div className="excluded-list">
              <div className="excluded-item"><h4>US 578™ social caption</h4><p>Rejected because the tone and channel purpose do not suit Japanese e-commerce.</p></div>
              <div className="excluded-item"><h4>Older stretch-denim product description</h4><p>Rejected because the current 578™ Baggy is non-stretch and the product facts conflict.</p></div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
