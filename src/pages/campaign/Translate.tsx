import { s } from '../../style'
import { Btn, PageHeader, Status } from '../../components/common'

export function Translate() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Translate"
        sub="Threadline decides what should be reused, translated, routed to a specialist or escalated to transcreation—while preserving product truth, locale conventions, channel constraints and downstream lineage."
        action={<Btn label="New translation job" cls="btn-primary" />}
      />

      <div className="context-bar">
        <span className="context-token"><strong>Market</strong> Japan</span>
        <span className="context-token"><strong>Locale</strong> ja-JP</span>
        <span className="context-token"><strong>Product</strong> 578™ Baggy</span>
        <span className="context-token"><strong>Source</strong> en-US baseline</span>
        <span className="context-token"><strong>Job</strong> 8 content items</span>
        <Btn label="Change translation context" cls="btn-light btn-sm" style={s('margin-left:auto')} />
      </div>

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Content items</div><div className="num">8</div><div className="note">Across commerce, CRM and social</div></div>
        <div className="summary-card"><div className="label">Translation memory reuse</div><div className="num">63%</div><div className="note">Approved terminology recovered</div></div>
        <div className="summary-card"><div className="label">Automated route</div><div className="num">5</div><div className="note">Low-risk product content</div></div>
        <div className="summary-card"><div className="label">Escalated to transcreation</div><div className="num">2</div><div className="note">High-visibility campaign language</div></div>
      </div>

      <div className="grid grid-2" style={s('margin-bottom:18px')}>
        <section className="card card-pad">
          <div className="card-head"><div><h2>Translation queue</h2><p>Content is routed differently based on visibility, risk and channel.</p></div><span className="status risk">2 require market judgment</span></div>
          <div className="work-queue">
            <div className="work-item"><div className="work-icon">P</div><div><h4>Product description</h4><p>63% TM match · approved fit glossary</p></div><span className="model-chip specialist">Specialist model</span></div>
            <div className="work-item"><div className="work-icon">SEO</div><div><h4>SEO title and description</h4><p>Search-aware localization · product facts locked</p></div><span className="model-chip private">SLM → specialist</span></div>
            <div className="work-item"><div className="work-icon">CRM</div><div><h4>CRM hero line</h4><p>Literal translation is unnatural</p></div><span className="model-chip">Transcreate</span></div>
            <div className="work-item"><div className="work-icon">IG</div><div><h4>Instagram Story headline</h4><p>32-character limit and cultural tone</p></div><span className="model-chip">Transcreate</span></div>
            <div className="work-item"><div className="work-icon">CTA</div><div><h4>Calls to action</h4><p>Approved Japanese expressions already available</p></div><span className="model-chip private">Reuse</span></div>
          </div>
        </section>

        <section className="card card-pad">
          <div className="card-head"><div><h2>Locale intelligence</h2><p>Translation is managed at locale, channel and product level—not language alone.</p></div></div>
          <div className="grid grid-2">
            <div className="locale-card"><h4>Product terminology</h4><p>Keep 578™ and approved baggy-fit language; retain Levi’s product naming conventions.</p></div>
            <div className="locale-card"><h4>Style and register</h4><p>Natural and precise Japanese; avoid overly literal global sentence structure.</p></div>
            <div className="locale-card"><h4>Commerce conventions</h4><p>Local sizing references, Japanese punctuation and search phrasing.</p></div>
            <div className="locale-card"><h4>Channel constraints</h4><p>SEO 60/155 characters, CRM 28-character hero, Story 32-character headline.</p></div>
          </div>
        </section>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Translation workbench</h2><p>Product description · Japan e-commerce · 578™ Baggy</p></div><Status label="Approved" /></div>
            <div className="translation-grid">
              <div className="editor-box">
                <div className="eyebrow">English source</div>
                <h3>Approved product module · CNT-004</h3>
                <div className="editor-copy">A 1990s-inspired baggy fit that sits at the waist and falls straight through the leg.</div>
                <div className="source-usage"><span className="meta-pill">Product facts locked</span><span className="meta-pill">Non-stretch</span><span className="meta-pill">Commerce source</span></div>
              </div>
              <div className="editor-box">
                <div className="eyebrow">Japanese localized output</div>
                <h3>Specialist model + Levi’s terminology</h3>
                <div className="editor-copy">90年代に着想を得た、ウエスト位置で穿くバギーフィット。</div>
                <div className="source-usage"><span className="meta-pill">63% TM reuse</span><span className="meta-pill">Japan glossary</span><span className="meta-pill">Light review</span></div>
              </div>
            </div>

            <div className="qa-grid" style={s('margin-top:14px')}>
              <div className="qa-item"><b>95</b><span>Language confidence</span></div>
              <div className="qa-item"><b>Pass</b><span>Product facts</span></div>
              <div className="qa-item"><b>Pass</b><span>Terminology</span></div>
              <div className="qa-item"><b>Pass</b><span>Channel length</span></div>
            </div>

            <div style={s('display:flex;justify-content:flex-end;gap:9px;margin-top:14px')}>
              <Btn label="Compare engines" cls="btn-light" />
              <Btn label="Approve translation" cls="btn-primary" />
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Change-impact intelligence</h2><p>Threadline tracks every downstream item derived from the source language.</p></div><span className="status risk">Source change detected</span></div>
            <div className="action-row">
              <div className="action-index">Δ</div>
              <div><h4>The global product description changed after translation</h4><p>Fabric language was clarified. Threadline identified 4 Japanese derivatives, but only 2 require retranslation; the campaign headline and CTA remain valid.</p></div>
              <Btn label="Review impact" cls="btn-dark btn-sm" />
            </div>
            <div className="lineage-row"><b>Japanese PDP description</b><span>Fabric sentence affected</span><span className="status risk">Reopen</span></div>
            <div className="lineage-row"><b>Japanese SEO description</b><span>Derived from affected product facts</span><span className="status risk">Reopen</span></div>
            <div className="lineage-row"><b>Japanese CRM hero</b><span>Campaign expression only</span><span className="status ready">Unaffected</span></div>
            <div className="lineage-row"><b>Japanese CTA</b><span>Approved reusable phrase</span><span className="status ready">Unaffected</span></div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Routing decision</h2><p>Why this item followed this translation path.</p></div></div>
            <div className="timeline">
              <div className="timeline-item done"><h4>Approved translation memory searched</h4><p>63% reusable match found</p></div>
              <div className="timeline-item done"><h4>Content classified as product factual</h4><p>Low creative deviation and low reputational risk</p></div>
              <div className="timeline-item done"><h4>Japanese specialist selected</h4><p>Best acceptance for ja-JP commerce content</p></div>
              <div className="timeline-item done"><h4>Product and terminology checks passed</h4><p>578™ and non-stretch facts retained</p></div>
              <div className="timeline-item done"><h4>Light human review</h4><p>No material edits required</p></div>
            </div>
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Translation resources</h2><p>Existing Levi’s assets orchestrated by Threadline.</p></div></div>
            <div className="grounding-list">
              <div className="grounding-item"><div className="grounding-icon">TM</div><div><h4>Translation memory</h4><p>12,408 approved Japanese segments</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">G</div><div><h4>Product and fit glossary</h4><p>Current through product feed 07:30</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">T</div><div><h4>Existing TMS connector</h4><p>Jobs, linguists and approval history</p></div></div>
              <div className="grounding-item"><div className="grounding-icon">M</div><div><h4>Approved model routes</h4><p>SLM, specialist model and human review</p></div></div>
            </div>
            <Btn label="Create translation for another channel" cls="btn-light" style={s('width:100%;justify-content:center;margin-top:12px')} />
          </div>
        </aside>
      </div>
    </>
  )
}
