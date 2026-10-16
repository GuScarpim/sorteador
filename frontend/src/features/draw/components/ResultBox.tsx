import type { RefObject } from 'react'
import type { Winner } from '../types'

interface Props {
  loaded: boolean
  spinning: boolean
  winner: Winner | null
  error: string | null
  available: number
  boxRef: RefObject<HTMLDivElement | null>
  nameRef: RefObject<HTMLDivElement | null>
}

function idleMessage(loaded: boolean, available: number) {
  if (!loaded) return 'Carregue uma lista no passo 01 para liberar o sorteio.'
  if (available === 0) return 'Todos os nomes já foram sorteados. Reinicie os sorteios.'
  return 'Tudo pronto. Clique em “Sortear nome”.'
}

export function ResultBox({ loaded, spinning, winner, error, available, boxRef, nameRef }: Props) {
  return (
    <div ref={boxRef} className={`result ${winner ? 'win' : ''}`}>
      <span className="label">Resultado</span>
      {spinning ? (
        <div ref={nameRef} className="name" />
      ) : winner ? (
        <>
          <div className="name">{winner.name}</div>
          <div className="meta">
            {winner.count} {winner.count === 1 ? 'participação' : 'participações'} · {(winner.chance * 100).toFixed(1)}% de chance
          </div>
        </>
      ) : (
        <p className="msg">{error ?? idleMessage(loaded, available)}</p>
      )}
    </div>
  )
}
