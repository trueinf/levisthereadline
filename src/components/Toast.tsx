import { useApp } from '../context'

export function Toast() {
  const { toastText, toastVisible } = useApp()
  return <div className={`toast ${toastVisible ? 'show' : ''}`}>{toastText}</div>
}
