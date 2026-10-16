import { useRef } from 'react'
import confetti from 'canvas-confetti'
import { gsap, useGSAP } from '../../../shared/lib/gsap'

const FRAME_COUNT = 36

// Roleta de nomes que desacelera até parar no vencedor.
export function useSpinReel() {
  const nameRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const { contextSafe } = useGSAP()

  const spin = contextSafe((pool: string[], winner: string, onDone: () => void) => {
    const frames = Array.from({ length: FRAME_COUNT }, () => pool[Math.floor(Math.random() * pool.length)])
    frames.push(winner)
    const el = nameRef.current
    if (!el) return onDone()
    const state = { i: 0 }
    el.textContent = frames[0]

    gsap
      .timeline()
      .to(boxRef.current, { borderColor: '#0f1115', duration: 0.3 })
      .to(state, {
        i: frames.length - 1,
        duration: 3,
        ease: 'power3.out',
        onUpdate() {
          const next = frames[Math.round(state.i)]
          if (el.textContent !== next) {
            el.textContent = next
            gsap.fromTo(el, { y: -10, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.12, overwrite: true })
          }
        },
      })
      .add(() => {
        onDone()
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.55 }, colors: ['#0f1115', '#1d6fd6', '#15803d', '#f5b700'] })
      })
  })

  return { nameRef, boxRef, spin }
}
