import type { ParticipantsResponse } from '../types'

interface Props {
  file: File
  info: ParticipantsResponse
  duplicates: number
  onSwap: () => void
}

export function FileSummary({ file, info, duplicates, onSwap }: Props) {
  return (
    <>
      <div className="file-panel file-row">
        <span className="file-name">{file.name}</span>
        <button className="btn-soft" onClick={onSwap}>Trocar arquivo</button>
      </div>
      <p className="file-panel stats">
        {info.total} linhas lidas · {info.unique} nomes únicos
        {duplicates > 0 && <span className="warn"> · {duplicates} repetidas (somam chances)</span>}
      </p>
      <ul className="file-panel preview">
        {info.participants.slice(0, 50).map((p) => (
          <li key={p.name}>
            <span>{p.name}</span>
            <span className="n">{p.count}× · {(p.chance * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </>
  )
}
