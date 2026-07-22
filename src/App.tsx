import { useApp } from './context'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { Drawer } from './components/Drawer'
import { Toast } from './components/Toast'
import { Home } from './pages/Home'
import { Campaigns } from './pages/Campaigns'
import { Campaign } from './pages/Campaign'
import { Library } from './pages/Library'
import { Approvals } from './pages/Approvals'
import { Insights } from './pages/Insights'
import { Activity } from './pages/Activity'
import { Integrations } from './pages/Integrations'
import { CreatePackage } from './pages/CreatePackage'
import { CreateCampaign } from './pages/CreateCampaign'
import { ImageViewer } from './pages/ImageViewer'

export function App() {
  const { page, createOpen, builderId, viewerImageId } = useApp()

  return (
    <>
      <div className="app">
        <Sidebar />
        <Topbar />
        <main>
          {viewerImageId != null ? (
            <ImageViewer />
          ) : builderId != null ? (
            <CreateCampaign />
          ) : createOpen ? (
            <CreatePackage />
          ) : (
            <>
              {page === 'home' && <Home />}
              {page === 'campaigns' && <Campaigns />}
              {page === 'campaign' && <Campaign />}
              {page === 'library' && <Library />}
              {page === 'approvals' && <Approvals />}
              {page === 'insights' && <Insights />}
              {page === 'activity' && <Activity />}
              {page === 'integrations' && <Integrations />}
            </>
          )}
        </main>
      </div>
      <Drawer />
      <Toast />
    </>
  )
}
