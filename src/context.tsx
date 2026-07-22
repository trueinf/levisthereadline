import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Campaign, CampaignTabId, ChannelId, PageId, SlotOverride } from './data'

/** builder view: null = closed, 'new' = create form, or an existing campaign id */
type BuilderId = string | 'new' | null

/** An image generated with OpenAI, viewable full-page. */
export interface GeneratedImage {
  id: string
  url: string
  prompt: string
  label: string
}

type DrawerState = { type: 'variant'; variantId: string } | null

interface AppState {
  page: PageId
  campaignTab: CampaignTabId
  createChannel: ChannelId
  drawer: DrawerState
  /** whether the full-page "Create content package" view is open */
  createOpen: boolean
  toastText: string
  toastVisible: boolean
  /** derived: which sidebar nav item is highlighted */
  activeNav: PageId
  /** selected OpenAI model for content generation */
  model: string
  /** generated content per slot, keyed by `${channel}:${item}` */
  overrides: Record<string, SlotOverride>
  /** user-created campaigns (newest first) */
  campaigns: Campaign[]
  /** which campaign builder view is open (null = closed) */
  builderId: BuilderId
  /** all generated images (newest first) */
  images: GeneratedImage[]
  /** id of the image shown in the full-page viewer (null = closed) */
  viewerImageId: string | null
  /** which portfolio campaign the workspace (Campaign page) is showing */
  workspaceCampaignId: string
  navigate: (page: PageId, tab?: CampaignTabId) => void
  setCampaignTab: (tab: CampaignTabId) => void
  setCreateChannel: (channel: ChannelId) => void
  setModel: (model: string) => void
  setOverride: (key: string, value: SlotOverride) => void
  addCampaign: (campaign: Campaign) => void
  updateCampaignContent: (id: string, key: string, value: string) => void
  openNewCampaign: () => void
  openCampaign: (id: string) => void
  closeBuilder: () => void
  addImage: (image: GeneratedImage) => void
  openImageViewer: (id: string) => void
  closeImageViewer: () => void
  openWorkspace: (id: string, tab?: CampaignTabId) => void
  openVariant: (variantId: string) => void
  openCreate: () => void
  closeCreate: () => void
  closeDrawer: () => void
  toast: (text: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('home')
  const [campaignTab, setCampaignTabState] = useState<CampaignTabId>('overview')
  const [createChannel, setCreateChannel] = useState<ChannelId>('ecommerce')
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [toastText, setToastText] = useState('Action completed')
  const [toastVisible, setToastVisible] = useState(false)
  const [model, setModel] = useState('gpt-4o-mini')
  const [overrides, setOverrides] = useState<Record<string, SlotOverride>>({})
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [builderId, setBuilderId] = useState<BuilderId>(null)
  const [images, setImages] = useState<GeneratedImage[]>([])
  const [viewerImageId, setViewerImageId] = useState<string | null>(null)
  const [workspaceCampaignId, setWorkspaceCampaignId] = useState<string>('beo')
  const toastTimer = useRef<number | undefined>(undefined)

  const addImage = useCallback((image: GeneratedImage) => setImages((prev) => [image, ...prev]), [])
  const openImageViewer = useCallback((id: string) => {
    setViewerImageId(id)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])
  const closeImageViewer = useCallback(() => setViewerImageId(null), [])
  const openWorkspace = useCallback((id: string, tab: CampaignTabId = 'overview') => {
    setWorkspaceCampaignId(id)
    setPage('campaign')
    setCampaignTabState(tab)
    setCreateOpen(false)
    setBuilderId(null)
    setViewerImageId(null)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const setOverride = useCallback((key: string, value: SlotOverride) => {
    setOverrides((prev) => ({ ...prev, [key]: value }))
  }, [])

  const addCampaign = useCallback((campaign: Campaign) => {
    setCampaigns((prev) => [campaign, ...prev])
  }, [])

  const updateCampaignContent = useCallback((id: string, key: string, value: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, generated: { ...c.generated, [key]: value } } : c)),
    )
  }, [])

  const openNewCampaign = useCallback(() => {
    setBuilderId('new')
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const openCampaign = useCallback((id: string) => {
    setBuilderId(id)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const closeBuilder = useCallback(() => setBuilderId(null), [])

  const navigate = useCallback((next: PageId, tab?: CampaignTabId) => {
    setPage(next)
    if (tab) setCampaignTabState(tab)
    setCreateOpen(false)
    setBuilderId(null)
    setViewerImageId(null)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const setCampaignTab = useCallback((tab: CampaignTabId) => {
    setPage('campaign')
    setCampaignTabState(tab)
    setCreateOpen(false)
    setBuilderId(null)
    setViewerImageId(null)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const openVariant = useCallback((variantId: string) => setDrawer({ type: 'variant', variantId }), [])
  const openCreate = useCallback(() => {
    setCreateOpen(true)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])
  const closeCreate = useCallback(() => setCreateOpen(false), [])
  const closeDrawer = useCallback(() => setDrawer(null), [])

  const toast = useCallback((text: string) => {
    setToastText(text)
    setToastVisible(true)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToastVisible(false), 2200)
  }, [])

  const activeNav: PageId = page === 'campaign' ? 'campaigns' : page

  const value = useMemo<AppState>(
    () => ({
      page,
      campaignTab,
      createChannel,
      drawer,
      createOpen,
      toastText,
      toastVisible,
      activeNav,
      model,
      overrides,
      campaigns,
      builderId,
      images,
      viewerImageId,
      workspaceCampaignId,
      navigate,
      setCampaignTab,
      setCreateChannel,
      setModel,
      setOverride,
      addCampaign,
      updateCampaignContent,
      openNewCampaign,
      openCampaign,
      closeBuilder,
      addImage,
      openImageViewer,
      closeImageViewer,
      openWorkspace,
      openVariant,
      openCreate,
      closeCreate,
      closeDrawer,
      toast,
    }),
    [page, campaignTab, createChannel, drawer, createOpen, toastText, toastVisible, activeNav, model, overrides, campaigns, builderId, images, viewerImageId, workspaceCampaignId, navigate, setCampaignTab, setOverride, addCampaign, updateCampaignContent, openNewCampaign, openCampaign, closeBuilder, addImage, openImageViewer, closeImageViewer, openWorkspace, openVariant, openCreate, closeCreate, closeDrawer, toast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
