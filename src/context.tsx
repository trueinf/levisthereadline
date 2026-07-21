import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import type { CampaignTabId, ChannelId, PageId } from './data'

type DrawerState = { type: 'variant'; variantId: string } | { type: 'create' } | null

interface AppState {
  page: PageId
  campaignTab: CampaignTabId
  createChannel: ChannelId
  drawer: DrawerState
  toastText: string
  toastVisible: boolean
  /** derived: which sidebar nav item is highlighted */
  activeNav: PageId
  navigate: (page: PageId, tab?: CampaignTabId) => void
  setCampaignTab: (tab: CampaignTabId) => void
  setCreateChannel: (channel: ChannelId) => void
  openVariant: (variantId: string) => void
  openCreate: () => void
  closeDrawer: () => void
  toast: (text: string) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>('home')
  const [campaignTab, setCampaignTabState] = useState<CampaignTabId>('overview')
  const [createChannel, setCreateChannel] = useState<ChannelId>('ecommerce')
  const [drawer, setDrawer] = useState<DrawerState>(null)
  const [toastText, setToastText] = useState('Action completed')
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<number | undefined>(undefined)

  const navigate = useCallback((next: PageId, tab?: CampaignTabId) => {
    setPage(next)
    if (tab) setCampaignTabState(tab)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const setCampaignTab = useCallback((tab: CampaignTabId) => {
    setPage('campaign')
    setCampaignTabState(tab)
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const openVariant = useCallback((variantId: string) => setDrawer({ type: 'variant', variantId }), [])
  const openCreate = useCallback(() => setDrawer({ type: 'create' }), [])
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
      toastText,
      toastVisible,
      activeNav,
      navigate,
      setCampaignTab,
      setCreateChannel,
      openVariant,
      openCreate,
      closeDrawer,
      toast,
    }),
    [page, campaignTab, createChannel, drawer, toastText, toastVisible, activeNav, navigate, setCampaignTab, openVariant, openCreate, closeDrawer, toast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppState {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
