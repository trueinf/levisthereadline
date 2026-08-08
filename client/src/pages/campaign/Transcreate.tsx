import { s } from '../../style'
import { Btn, PageHeader, Status } from '../../components/common'

export function Transcreate() {
  return (
    <>
      <PageHeader
        eyebrow="Campaign capability"
        title="Transcreate"
        sub="Threadline determines how much adaptation a market actually needs, preserves the approved global intent and coordinates language, product, visual, ambassador and channel changes with regional human judgment."
        action={<Btn label="Create market adaptation" cls="btn-primary" />}
      />

      <div className="context-bar">
        <span className="context-token"><strong>Market</strong> Japan</span>
        <span className="context-token"><strong>Campaign</strong> Behind Every Original</span>
        <span className="context-token"><strong>Products</strong> 578™ Baggy · Relaxed Trucker</span>
        <span className="context-token"><strong>Channels</strong> CRM · Instagram</span>
        <span className="context-token"><strong>Approval</strong> Japan Brand Lead</span>
        <Btn label="Change market" cls="btn-light btn-sm" style={s('margin-left:auto')} />
      </div>

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Markets assessed</div><div className="num">4</div><div className="note">2 require deep adaptation</div></div>
        <div className="summary-card"><div className="label">Global elements protected</div><div className="num">6</div><div className="note">Campaign, product and brand codes</div></div>
        <div className="summary-card"><div className="label">Local changes proposed</div><div className="num">4</div><div className="note">Copy, asset, tone and creator guidance</div></div>
        <div className="summary-card"><div className="label">Regional approval required</div><div className="num">1</div><div className="note">High-visibility hero language</div></div>
      </div>

      <div className="card card-pad" style={s('margin-bottom:18px')}>
        <div className="card-head"><div><h2>Recommended adaptation depth</h2><p>Threadline evaluates whether a market needs translation, localization, transcreation or a full regional execution.</p></div><span className="status risk">Deep transcreation recommended</span></div>
        <div className="adaptation-level">
          <div className="level-card"><h4>1 · Direct translation</h4><p>Preserves literal meaning with basic terminology changes.</p></div>
          <div className="level-card"><h4>2 · Linguistic localization</h4><p>Natural language, locale conventions and channel limits.</p></div>
          <div className="level-card selected"><h4>3 · Cultural transcreation</h4><p>Adapts emotional expression and tone while preserving global intent.</p></div>
          <div className="level-card"><h4>4 · Full regional execution</h4><p>Changes ambassador, product focus, visual direction and activation concept.</p></div>
        </div>
        <div className="workload-line" style={s('margin:14px 0 0')}>
          <span><b>Why level 3:</b> Literal “behind every original” structure is unnatural in Japanese.</span>
          <span>Global product set remains relevant, so a full regional execution is unnecessary.</span>
        </div>
      </div>

      <div className="layout-main">
        <section>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Global intent and market context</h2><p>Creative boundaries are explicit before alternatives are generated.</p></div><span className="status ready">Baseline protected</span></div>
            <div className="grid grid-3">
              <div><div className="metric-label">Global intent</div><p style={s('font-size:12px;line-height:1.5')}>Personal originality has a story, and denim is part of how that story is expressed.</p></div>
              <div><div className="metric-label">Japan market context</div><p style={s('font-size:12px;line-height:1.5')}>Natural, understated expression; avoid literal constructions and overt self-promotion.</p></div>
              <div><div className="metric-label">Non-negotiables</div><p style={s('font-size:12px;line-height:1.5')}>Campaign lineage, approved products, Levi’s brand marks and factual product language.</p></div>
            </div>
          </div>

          <div className="comparison">
            <div className="choice"><div className="choice-label">Option A · Closest to source</div><blockquote>すべてのオリジナルの後ろに物語がある。</blockquote><p>Meaning is recognizable but the sentence feels translated and structurally awkward.</p><div className="score-row"><span className="score">Fidelity 96</span><span className="score">Naturalness 48</span><span className="score">Cultural fit 52</span></div></div>
            <div className="choice selected"><div className="choice-label">Option B · Market-relevant</div><blockquote>自分らしさには、物語がある。</blockquote><p>Natural and restrained; preserves the emotional idea without copying the global syntax.</p><div className="score-row"><span className="score">Fidelity 91</span><span className="score">Naturalness 95</span><span className="score">Cultural fit 94</span></div></div>
            <div className="choice"><div className="choice-label">Option C · Product-led</div><blockquote>デニムと歩む、私だけの物語。</blockquote><p>Stronger denim association, but more expressive and individualistic than the market brief recommends.</p><div className="score-row"><span className="score">Fidelity 86</span><span className="score">Naturalness 88</span><span className="score">Cultural fit 82</span></div></div>
          </div>

          <div className="card card-pad" style={s('margin-top:18px')}>
            <div className="card-head"><div><h2>Coordinated market adaptation package</h2><p>The decision changes more than a single sentence.</p></div><Status label="Ready" /></div>
            <div className="adapt-package"><div className="label">CRM hero language</div><div className="value">Use Option B as the approved Japanese campaign expression.</div><div className="state">TRANSCREATED</div></div>
            <div className="adapt-package"><div className="label">Instagram support copy</div><div className="value">Use a shorter product-led variant derived from Option B.</div><div className="state">CHANNEL ADAPTED</div></div>
            <div className="adapt-package"><div className="label">Source visual</div><div className="value">Replace restricted ambassador asset with AST-006 product-led 578™ image.</div><div className="state">VISUAL ADAPTED</div></div>
            <div className="adapt-package"><div className="label">Product focus</div><div className="value">Retain 578™ Baggy and Relaxed Trucker; no assortment change required.</div><div className="state">GLOBAL RETAINED</div></div>
            <div className="adapt-package"><div className="label">Creator guidance</div><div className="value">Emphasize personal styling and movement rather than explicit self-assertion.</div><div className="state">LOCAL GUIDANCE</div></div>
            <div className="adapt-package"><div className="label">Approval path</div><div className="value">Japan Brand Lead → Global Brand for hero language only.</div><div className="state">HUMAN REVIEW</div></div>
          </div>
        </section>

        <aside>
          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Why Threadline recommends Option B</h2><p>Recommendation is grounded in intent, market context and prior decisions.</p></div></div>
            <div className="rule-list">
              <div className="rule-item"><div className="rule-num">1</div><div><h4>Preserves the story of originality</h4><p>Maintains the emotional core of the global platform.</p></div><span className="status ready">Strong</span></div>
              <div className="rule-item"><div className="rule-num">2</div><div><h4>Sounds natural in Japanese</h4><p>Avoids literal “behind” language and global sentence structure.</p></div><span className="status ready">95</span></div>
              <div className="rule-item"><div className="rule-num">3</div><div><h4>Works across CRM and social</h4><p>Can be shortened without changing its meaning.</p></div><span className="status ready">Reusable</span></div>
              <div className="rule-item"><div className="rule-num">4</div><div><h4>Aligns with prior regional approvals</h4><p>Similar tone was accepted in recent Japanese campaigns.</p></div><span className="status ready">Evidence</span></div>
            </div>
          </div>

          <div className="card card-pad" style={s('margin-bottom:18px')}>
            <div className="card-head"><div><h2>Regional collaboration</h2><p>AI accelerates judgment; the regional team remains the cultural authority.</p></div></div>
            <div className="timeline">
              <div className="timeline-item done"><h4>Global creative boundaries confirmed</h4><p>Campaign and protected elements locked</p></div>
              <div className="timeline-item done"><h4>Market context assembled</h4><p>Japan tone, product and channel guidance</p></div>
              <div className="timeline-item done"><h4>Alternatives generated and evaluated</h4><p>Three options with rationale</p></div>
              <div className="timeline-item"><h4>Japan Brand Lead review</h4><p>Selected language and rationale awaiting approval</p></div>
            </div>
            <Btn label="Route selected package for approval" cls="btn-primary" style={s('width:100%;justify-content:center')} />
          </div>

          <div className="card card-pad">
            <div className="card-head"><div><h2>Other market adaptations</h2><p>Different markets require different degrees of change.</p></div></div>
            <div className="work-queue">
              <div className="work-item"><div className="work-icon">FR</div><div><h4>France</h4><p>Selective copy transcreation and layout shortening</p></div><span className="status risk">Level 2–3</span></div>
              <div className="work-item"><div className="work-icon">IN</div><div><h4>India</h4><p>Alia Bhatt, Cinch Waist and Loose Boot regional execution</p></div><span className="status ready">Level 4</span></div>
              <div className="work-item"><div className="work-icon">US</div><div><h4>United States</h4><p>Global master requires no transcreation</p></div><span className="status ready">Level 0</span></div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
