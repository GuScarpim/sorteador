import { GridIcon } from '../../../shared/icons'
import { useHoverScale } from '../../../shared/hooks/useHoverScale'
import type { ParticipantsResponse } from '../../upload/types'
import { useDraw } from '../hooks/useDraw'
import { useDrawMotion } from '../hooks/useDrawMotion'
import { DrawHistory } from './DrawHistory'
import { ResultBox } from './ResultBox'

interface Props {
  file: File | null
  info: ParticipantsResponse | null
}

export function DrawCard({ file, info }: Props) {
  const d = useDraw(file, info);
  const scope = useDrawMotion({ loaded: d.loaded, winner: d.winner, historyLength: d.history.length });
  const hover = useHoverScale();

  return (
    <section className="card" ref={scope}>
      <div className="card-head">
        <span className="step">02</span>
        <div className="card-title">
          <h2>Sortear</h2>
          <p>Clique no botão para escolher um nome aleatório da lista carregada.</p>
        </div>
        <span className={`badge badge-draw ${d.loaded ? 'ok' : ''}`}>{d.loaded ? 'Pronto' : 'Bloqueado'}</span>
      </div>
      <div className="card-body">
        <ResultBox
          loaded={d.loaded}
          spinning={d.spinning}
          winner={d.winner}
          error={d.error}
          available={d.available}
          boxRef={d.reel.boxRef}
          nameRef={d.reel.nameRef}
        />

        <button className="btn-draw" disabled={!d.canDraw} onClick={d.draw} {...hover}>
          <GridIcon /> {d.spinning ? 'Sorteando…' : 'Sortear nome'}
        </button>

        <div className="row">
          <label className="check">
            <input type="checkbox" checked={d.noRepeat} onChange={(e) => d.setNoRepeat(e.target.checked)} />
            Não repetir nomes já sorteados
          </label>
          <span className="mono">{d.available} disponíveis</span>
        </div>

        <DrawHistory history={d.history} disabled={d.spinning} onReset={d.reset} />
      </div>
    </section>
  )
}
