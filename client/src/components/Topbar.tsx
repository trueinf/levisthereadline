import { useEffect, useRef } from 'react'
import { useApp } from '../context'
import { Icon } from '../icons'

export function Topbar() {
  const { openVariant, toast } = useApp()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const q = e.currentTarget.value.toLowerCase()
    if (q.includes('japan') || q.includes('rights')) openVariant('VAR-010')
    else if (q.includes('thermodapt') || q.includes('claim')) openVariant('VAR-017')
    else if (q.includes('france') || q.includes('story')) openVariant('VAR-006')
    else toast(`Search results prepared for “${e.currentTarget.value}”`)
  }

  return (
    <header className="topbar">
      <div className="campaign-switcher">
        <div className="mini-mark" />
        <div><b>Behind Every Original</b><span>Global campaign · 2026</span></div>
      </div>
      <div className="search">
        <Icon name="search" />
        <input ref={inputRef} id="globalSearch" placeholder="Search campaigns, assets, variants or issues" onKeyDown={onSearch} />
        <span className="kbd">⌘ K</span>
      </div>
      <div className="top-actions">
        <button className="icon-btn" onClick={() => toast('Help centre opened')}><Icon name="help" /></button>
        <button className="icon-btn" onClick={() => toast('No new notifications')}><Icon name="bell" /></button>
      </div>
    </header>
  )
}
