import type { Winner } from '../types'

interface Props {
  history: Winner[]
  disabled: boolean
  onReset: () => void
}

export function DrawHistory({ history, disabled, onReset }: Props) {
  return (
    <div className="history">
      <div className="row">
        <span className="mono">Histórico · {history.length}</span>
        <button className="btn-soft" disabled={!history.length || disabled} onClick={onReset}>
          Reiniciar sorteios
        </button>
      </div>
      {history.length ? (
        <ol>
          {history.map((h, i) => (
            <li key={history.length - i}>
              <span className="n">{String(history.length - i).padStart(2, '0')}</span>
              {h.name}
            </li>
          ))}
        </ol>
      ) : (
        <p className="empty">Nenhum sorteio realizado ainda.</p>
      )}
    </div>
  )
}
