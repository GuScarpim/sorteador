import { useRef } from 'react'
import { gsap, useGSAP } from '../shared/lib/gsap'

export function usePageIntro() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.header', { y: -20, opacity: 0, duration: 0.5 })
          .from('.hero > *', { y: 24, opacity: 0, stagger: 0.1, duration: 0.7 }, '-=0.2')
          .from('.card', { y: 40, opacity: 0, stagger: 0.15, duration: 0.8 }, '-=0.4')
          .from('.how .reveal', { y: 30, opacity: 0, stagger: 0.1, duration: 0.7 }, '-=0.4')
      })
    },
    { scope: root },
  )

  return root
}
