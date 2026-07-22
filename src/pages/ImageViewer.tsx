import { useApp } from '../context'
import { s } from '../style'
import { PageHeader } from '../components/common'

export function ImageViewer() {
  const { images, viewerImageId, closeImageViewer } = useApp()
  const img = images.find((i) => i.id === viewerImageId)

  if (!img) {
    return (
      <div className="page">
        <button className="btn btn-light btn-sm" onClick={closeImageViewer}>← Back</button>
        <p style={s('margin-top:20px;color:var(--muted)')}>Image not found.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <button className="btn btn-light btn-sm" style={s('margin-bottom:16px')} onClick={closeImageViewer}>← Back</button>
      <PageHeader
        eyebrow="Generated image"
        title={img.label}
        sub={img.prompt}
        action={
          <a className="btn btn-primary" href={img.url} download={`${img.label.replace(/[^\w-]+/g, '-')}.png`}>
            Download
          </a>
        }
      />
      <div className="card card-pad" style={s('display:grid;place-items:center;background:var(--warm)')}>
        <img src={img.url} alt={img.label} style={s('max-width:100%;max-height:78vh;border-radius:14px;display:block')} />
      </div>
    </div>
  )
}
