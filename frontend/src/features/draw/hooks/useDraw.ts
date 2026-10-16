import { useState } from 'react'
import { drawWinner } from '../services/drawService'
import type { Winner } from '../types'
import type { ParticipantsResponse } from '../../upload/types'
import { useSpinReel } from './useSpinReel'

const norm = (s: string) => s.toLocaleLowerCase('pt-BR')

export function useDraw(file: File | null, info: ParticipantsResponse | null) {
  const [spinning, setSpinning] = useState(false)
  const [winner, setWinner] = useState<Winner | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<Winner[]>([])
  const [noRepeat, setNoRepeat] = useState(true)
  const reel = useSpinReel()

  const loaded = info !== null
  const available = info ? (noRepeat ? info.unique - history.length : info.unique) : 0
  const canDraw = loaded && !spinning && available > 0

  const reset = () => {
    setWinner(null)
    setError(null)
    setHistory([])
  }

  const draw = async () => {
    if (!file || !info || !canDraw) return
    setSpinning(true)
    setWinner(null)
    setError(null)

    const excluded = noRepeat ? history.map((h) => h.name) : []
    let result: Winner
    try {
      result = await drawWinner(file, excluded)
    } catch (e) {
      setSpinning(false)
      setError((e as Error).message)
      return
    }

    const blocked = new Set(excluded.map(norm))
    const pool = info.participants.map((p) => p.name).filter((n) => !blocked.has(norm(n)))
    reel.spin(pool, result.name, () => {
      setSpinning(false)
      setWinner(result)
      setHistory((h) => [result, ...h])
    })
  }

  return { loaded, spinning, winner, error, history, noRepeat, setNoRepeat, available, canDraw, draw, reset, reel }
}

export type DrawState = ReturnType<typeof useDraw>
