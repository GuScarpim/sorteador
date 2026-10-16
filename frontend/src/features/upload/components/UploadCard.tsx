import type { UploadState } from '../hooks/useUpload'
import { useUploadMotion } from '../hooks/useUploadMotion'
import { Dropzone } from './Dropzone'

export function UploadCard({ upload }: { upload: UploadState }) {
  const scope = useUploadMotion({ dragOver: upload.dragOver, error: upload.error, loaded: upload.loaded })

  return (
    <section className="card" ref={scope}>
      <div className="card-head">
        <span className="step">01</span>
        <div className="card-title">
          <h2>Carregar lista</h2>
          <p>Selecione o arquivo .txt com os nomes que participam do sorteio.</p>
        </div>
        <span className={`badge badge-upload ${upload.loaded ? 'ok' : ''}`}>
          {upload.loaded ? 'Carregado' : 'Aguardando'}
        </span>
      </div>
      <div className="card-body">
        <Dropzone {...upload} />
      </div>
    </section>
  )
}
