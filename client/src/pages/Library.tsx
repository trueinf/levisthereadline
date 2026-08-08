import { useState } from 'react'
import { s } from '../style'
import { Btn, PageHeader } from '../components/common'
import { Icon } from '../icons'

const filterLabels = ['All content', 'Campaign modules', 'Products', 'Assets', 'Translations', 'Claims', 'Historical reference']

export function Library() {
  const [activeFilter, setActiveFilter] = useState(0)
  return (
    <div className="page">
      <PageHeader
        eyebrow="Approved content memory"
        title="Content Library"
        sub="Search and understand approved content, product truth, market language, assets, rights and usage—before Threadline reuses or generates anything."
        action={<Btn label="Add approved content" cls="btn-primary" />}
      />

      <div className="search" style={s('max-width:none;margin-bottom:16px')}><Icon name="search" /><input placeholder="Search approved copy, product facts, assets, translations, rights or market language" /></div>
      <div className="filters">
        {filterLabels.map((label, i) => (
          <button key={label} className={`filter ${activeFilter === i ? 'active' : ''}`} onClick={() => setActiveFilter(i)}>{label}</button>
        ))}
      </div>

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Approved modules</div><div className="num">1,284</div><div className="note">Campaign, product and channel content</div></div>
        <div className="summary-card"><div className="label">Reusable in current campaign</div><div className="num">61%</div><div className="note">Matched to active requirements</div></div>
        <div className="summary-card"><div className="label">Rights-expiring assets</div><div className="num">14</div><div className="note">Within the next 60 days</div></div>
        <div className="summary-card"><div className="label">Historical references</div><div className="num">238</div><div className="note">Inspiration only · not direct reuse</div></div>
      </div>

      <div className="grid grid-3">
        <div className="module-card selected">
          <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Campaign proposition</div><span className="match-badge">92% current fit</span></div>
          <h3>Behind Every Original</h3>
          <div className="module-copy">Originals have stories worth telling, with denim as part of how those stories are expressed.</div>
          <div className="module-meta"><span className="meta-pill">Workfront + AEM</span><span className="meta-pill">Approved v3</span><span className="meta-pill">Global</span></div>
          <div className="why-box"><b>Usage</b><p>Referenced in 12 active variants across 4 markets. Protected campaign proposition.</p></div>
        </div>
        <div className="module-card">
          <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Product truth</div><span className="match-badge">Exact match</span></div>
          <h3>578™ Baggy</h3>
          <div className="module-copy">1990s-inspired non-stretch baggy jean that sits at the waist and falls straight through the leg.</div>
          <div className="module-meta"><span className="meta-pill">Commerce / PIM</span><span className="meta-pill">3 markets</span><span className="meta-pill">Current</span></div>
          <div className="why-box"><b>Usage</b><p>Source of truth for generation, translation, assurance and commerce activation.</p></div>
        </div>
        <div className="module-card">
          <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Regional proposition</div><span className="match-badge">India approved</span></div>
          <h3>Alia Bhatt campaign extension</h3>
          <div className="module-copy">Originality expressed through curiosity, self-belief and choosing a personally true path.</div>
          <div className="module-meta"><span className="meta-pill">Regional brief</span><span className="meta-pill">India</span><span className="meta-pill">Approved</span></div>
          <div className="why-box"><b>Usage</b><p>Drives India e-commerce, social, CRM and paid-display content packages.</p></div>
        </div>
        <div className="module-card">
          <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Approved claim</div><span className="status risk">High sensitivity</span></div>
          <h3>501® Thermodapt</h3>
          <div className="module-copy">Designed to support temperature regulation, breathability and moisture management.</div>
          <div className="module-meta"><span className="meta-pill">Evidence linked</span><span className="meta-pill">Legal approved</span><span className="meta-pill">Do not strengthen</span></div>
          <div className="why-box"><b>Guardrail</b><p>Blocks absolute language such as “keeps you cool in every temperature.”</p></div>
        </div>
        <div className="module-card excluded">
          <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Historical inspiration</div><span className="status neutral">Reference only</span></div>
          <h3>REIIMAGINE / The Denim Cowboy</h3>
          <div className="module-copy">Reinvention and reinterpretation while preserving Levi’s heritage codes.</div>
          <div className="module-meta"><span className="meta-pill">Historical</span><span className="meta-pill">Partner rights</span><span className="meta-pill">No direct insertion</span></div>
          <div className="why-box"><b>Restriction</b><p>May inform creative reasoning but cannot be copied into published content or used to imitate celebrity language.</p></div>
        </div>
        <div className="module-card">
          <div className="module-top"><div className="eyebrow" style={s('margin-bottom:0')}>Asset</div><span className="match-badge">Japan cleared</span></div>
          <div className="asset-preview blue" style={s('min-height:150px')}><div className="asset-label"><b>AST-006 · 578™ product-led</b><span>Japan social + commerce</span></div></div>
          <div className="module-meta"><span className="meta-pill">AEM Assets</span><span className="meta-pill">Rights valid</span><span className="meta-pill">Expires 2028</span></div>
          <div className="why-box"><b>Usage</b><p>Recommended source for Japan Instagram, e-commerce and paid display.</p></div>
        </div>
      </div>
    </div>
  )
}
