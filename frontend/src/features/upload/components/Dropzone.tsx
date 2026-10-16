import { useRef } from 'react'
import { UploadIcon } from '../../../shared/icons'
import type { UploadState } from '../hooks/useUpload'
import { FileSummary } from './FileSummary'

type Props = Pick<UploadState, 'file' | 'info' | 'error' | 'dragOver' | 'duplicates' | 'handleFile' | 'swapFile' | 'dropHandlers'>

export function Dropzone({ file, info, error, dragOver, duplicates, handleFile, swapFile, dropHandlers }: Props) {
  const input = useRef<HTMLInputElement>(null)
  const filled = Boolean(info && file)

  return (
    <div
      className={`dropzone ${dragOver ? 'over' : ''} ${filled ? 'filled' : ''}`}
      onClick={() => !filled && input.current?.click()}
      {...dropHandlers}
    >
      <input
        ref={input}
        type="file"
        accept=".txt,text/plain"
        onChange={(e) => {
          handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />
      {info && file ? (
        <FileSummary file={file} info={info} duplicates={duplicates} onSwap={swapFile} />
      ) : (
        <>
          <div className="icon-box"><UploadIcon /></div>
          <strong>Arraste o arquivo .txt para cá</strong>
          <p className="sub">ou <u>clique para selecionar</u> no computador</p>
          <div className="chips">
            <span className="chip">Somente .txt</span>
            <span className="chip">Até 1 MB</span>
            <span className="chip">Um nome por linha</span>
          </div>
          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  )
}
