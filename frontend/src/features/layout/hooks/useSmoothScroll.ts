import type { MouseEvent } from 'react'
import { gsap, useGSAP } from '../../../shared/lib/gsap'

export function useSmoothScroll() {
  const { contextSafe } = useGSAP()

  return contextSafe((e: MouseEvent, target: string) => {
    e.preventDefault()
    gsap.to(window, { duration: 0.8, scrollTo: { y: target, offsetY: 72 }, ease: 'power3.inOut' })
  })
}
