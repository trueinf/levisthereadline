import { useApp } from '../context'
import { Icon, type IconName } from '../icons'
import type { PageId } from '../data'

const items: { page: PageId; icon: IconName; label: string; count?: number }[] = [
  { page: 'home', icon: 'home', label: 'Home' },
  { page: 'campaigns', icon: 'layers', label: 'Campaigns' },
  { page: 'library', icon: 'archive', label: 'Content Library' },
  { page: 'approvals', icon: 'check', label: 'Approvals', count: 4 },
  { page: 'insights', icon: 'chart', label: 'Insights' },
]

const systemItems: { page: PageId; icon: IconName; label: string }[] = [
  { page: 'activity', icon: 'pulse', label: 'Agent Activity' },
  { page: 'integrations', icon: 'link', label: 'Integrations' },
]

export function Sidebar() {
  const { activeNav, navigate } = useApp()

  const NavItem = ({ page, icon, label, count }: { page: PageId; icon: IconName; label: string; count?: number }) => (
    <button className={`nav-item ${activeNav === page ? 'active' : ''}`} onClick={() => navigate(page)}>
      <span className="nav-icon"><Icon name={icon} /></span>
      <span>{label}</span>
      {count != null && <span className="nav-count">{count}</span>}
    </button>
  )

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">LS</div>
        <div className="brand-name">Threadline<small>Agentic content orchestration</small></div>
      </div>
      <nav className="nav">
        <div className="nav-label">Workspace</div>
        {items.map((it) => <NavItem key={it.page} {...it} />)}
        <div className="nav-label">System</div>
        {systemItems.map((it) => <NavItem key={it.page} {...it} />)}
      </nav>
      <div className="sidebar-bottom">
        <div className="profile">
          <div className="avatar">MP</div>
          <div><strong>Manoj P.</strong><span>Global Content Strategy</span></div>
        </div>
      </div>
    </aside>
  )
}
