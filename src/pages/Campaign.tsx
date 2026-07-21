import { useApp } from '../context'
import { s } from '../style'
import { Btn, Status } from '../components/common'
import { campaignTabs } from '../data'
import { Overview } from './campaign/Overview'
import { Brief } from './campaign/Brief'
import { Readiness } from './campaign/Readiness'
import { Assemble } from './campaign/Assemble'
import { Create } from './campaign/Create'
import { Adapt } from './campaign/Adapt'
import { Translate } from './campaign/Translate'
import { Transcreate } from './campaign/Transcreate'
import { Assure } from './campaign/Assure'
import { Activate } from './campaign/Activate'
import { Learn } from './campaign/Learn'

function CampaignNav() {
  const { campaignTab, setCampaignTab } = useApp()
  return (
    <>
      <div className="campaign-head">
        <div className="campaign-title"><div className="campaign-symbol" /><div><h1>Behind Every Original</h1><p>Global campaign · 4 markets · Feb–Mar 2026</p></div></div>
        <div style={s('display:flex;gap:10px;align-items:center')}><Status label="At Risk" /> <Btn label="Review recommended actions" cls="btn-primary" /></div>
      </div>
      <div className="campaign-tabs">
        {campaignTabs.map(([id, label]) => (
          <button key={id} className={`campaign-tab ${campaignTab === id ? 'active' : ''}`} onClick={() => setCampaignTab(id)}>{label}</button>
        ))}
      </div>
    </>
  )
}

export function Campaign() {
  const { campaignTab } = useApp()
  return (
    <div className="page">
      <CampaignNav />
      {campaignTab === 'overview' && <Overview />}
      {campaignTab === 'brief' && <Brief />}
      {campaignTab === 'readiness' && <Readiness />}
      {campaignTab === 'assemble' && <Assemble />}
      {campaignTab === 'create' && <Create />}
      {campaignTab === 'adapt' && <Adapt />}
      {campaignTab === 'translate' && <Translate />}
      {campaignTab === 'transcreate' && <Transcreate />}
      {campaignTab === 'assure' && <Assure />}
      {campaignTab === 'activate' && <Activate />}
      {campaignTab === 'learn' && <Learn />}
    </div>
  )
}
