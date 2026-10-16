import { useRef } from 'react'
import { gsap, useGSAP } from '../../../shared/lib/gsap'
import type { Winner } from '../types'

interface Options {
  loaded: boolean
  winner: Winner | null
  historyLength: number
}

export function useDrawMotion({ loaded, winner, historyLength }: Options) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo('.badge-draw', { scale: 0.7 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' })
    },
    { scope, dependencies: [loaded] },
  )

  useGSAP(
    () => {
      if (historyLength) {
        gsap.from('.history li:first-child', { x: -24, opacity: 0, duration: 0.5, ease: 'power3.out' })
      }
    },
    { scope, dependencies: [historyLength] },
  )

  useGSAP(
    () => {
      if (winner) {
        gsap.from('.result .name', { scale: 0.6, opacity: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
        gsap.from('.result .meta', { y: 10, opacity: 0, duration: 0.4, delay: 0.25 })
      }
    },
    { scope, dependencies: [winner] },
  )

  return scope
}
