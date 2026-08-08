import { Btn, PageHeader } from '../components/common'

export function Integrations() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="Existing technology ecosystem"
        title="Integrations"
        sub="Threadline operates as an agentic layer above Levi’s systems of record and execution. These connections provide context, invoke tools and return governed outputs."
        action={<Btn label="Add integration" cls="btn-primary" />}
      />

      <div className="capability-kpis">
        <div className="summary-card"><div className="label">Connected systems</div><div className="num">9</div><div className="note">Content, product, workflow and activation</div></div>
        <div className="summary-card"><div className="label">Healthy</div><div className="num">8</div><div className="note">Normal synchronization</div></div>
        <div className="summary-card"><div className="label">Degraded</div><div className="num">1</div><div className="note">Paid-media preview API</div></div>
        <div className="summary-card"><div className="label">Last full sync</div><div className="num">18m</div><div className="note">Campaign and asset context</div></div>
      </div>

      <div className="grid grid-3">
        <div className="integration-card"><div className="eyebrow">DAM</div><h3>Adobe Experience Manager Assets</h3><p>Approved source assets, metadata, rights, derivatives and lineage.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">42 campaign assets</span></div></div>
        <div className="integration-card"><div className="eyebrow">Campaign workflow</div><h3>Workfront / incumbent planning</h3><p>Campaign briefs, owners, timelines, tasks, approvals and source changes.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">v14 synced</span></div></div>
        <div className="integration-card"><div className="eyebrow">Commerce</div><h3>SCAYLE / product services</h3><p>Product, fit, wash, availability, price and destination modules.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">Feed 07:30</span></div></div>
        <div className="integration-card"><div className="eyebrow">Data and AI</div><h3>Google Cloud / BigQuery</h3><p>Performance signals, market intelligence and analytical context.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">Hourly</span></div></div>
        <div className="integration-card"><div className="eyebrow">Agent orchestration</div><h3>Microsoft / Azure super-agent</h3><p>Threadline content-agent cluster access from the existing employee agent environment.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">Brokered</span></div></div>
        <div className="integration-card"><div className="eyebrow">Localization</div><h3>Existing TMS / language providers</h3><p>Translation memory, glossaries, jobs, linguists and approvals.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">12,408 ja-JP segments</span></div></div>
        <div className="integration-card"><div className="eyebrow">CRM</div><h3>CRM platform</h3><p>Segments, email components, scheduling, tracking and deployment.</p><div className="source-usage"><span className="status ready">Connected</span><span className="meta-pill">4 locales</span></div></div>
        <div className="integration-card"><div className="eyebrow">Activation</div><h3>Social and paid media</h3><p>Destination specifications, scheduling, publishing and verification.</p><div className="source-usage"><span className="status risk">Preview degraded</span><span className="meta-pill">Publishing healthy</span></div></div>
        <div className="integration-card"><div className="eyebrow">Brand model</div><h3>Levi’s SLM v0.9</h3><p>Private product, brand, SEO and routine channel generation route.</p><div className="source-usage"><span className="status ready">Available</span><span className="meta-pill">Catalogue current</span></div></div>
      </div>
    </div>
  )
}
