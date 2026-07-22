import { useState } from 'react'
import { useApp, type GeneratedImage } from '../context'
import { s } from '../style'
import { Icon } from '../icons'
import { generateImage } from '../api'

/**
 * Generate on-brand campaign images with OpenAI. Each generated image opens
 * full-page in the ImageViewer; thumbnails let you reopen them. Generated
 * images live in the global store (keyed by `label`) so they survive the
 * viewer opening/closing.
 */
export function ImageStudio({ label, defaultPrompt }: { label: string; defaultPrompt: string }) {
  const { images, addImage, openImageViewer, toast } = useApp()
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [busy, setBusy] = useState(false)
  const [editing, setEditing] = useState(false)

  const mine = images.filter((i) => i.label === label)

  async function gen() {
    if (!prompt.trim()) {
      toast('Describe the image first')
      return
    }
    setBusy(true)
    try {
      const url = await generateImage({ prompt: prompt.trim() })
      const img: GeneratedImage = { id: `img-${Date.now()}`, url, prompt: prompt.trim(), label }
      addImage(img)
      openImageViewer(img.id) // open the generated image on its own page
    } catch (err) {
      toast(`Image generation failed — ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card card-pad">
      <div className="card-head">
        <div style={s('display:flex;gap:12px;align-items:flex-start')}>
          <div className="studio-icon"><Icon name="image" /></div>
          <div><h2>Campaign visual</h2><p>Generate an on-brand image. It opens on its own page.</p></div>
        </div>
        {mine.length > 0 && <span className="status ready">{mine.length}</span>}
      </div>

      <button className="btn btn-primary" style={s('width:100%;justify-content:center')} disabled={busy} onClick={gen}>
        <Icon name="sparkle" /> {busy ? 'Generating image…' : mine.length ? 'Generate another' : 'Generate image'}
      </button>

      {!editing ? (
        <button className="btn btn-ghost btn-sm" style={s('margin-top:10px')} onClick={() => setEditing(true)}>Customize prompt</button>
      ) : (
        <>
          <textarea
            className="tl-field"
            style={s('margin-top:12px;min-height:96px')}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div style={s('display:flex;justify-content:flex-end;margin-top:8px')}>
            <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Done</button>
          </div>
        </>
      )}

      {busy && <div className="img-loading">Generating image…<br />this can take 10–20 seconds.</div>}

      {mine.length > 0 && (
        <div className="img-grid">
          {mine.map((img) => (
            <img key={img.id} src={img.url} alt={img.label} onClick={() => openImageViewer(img.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
