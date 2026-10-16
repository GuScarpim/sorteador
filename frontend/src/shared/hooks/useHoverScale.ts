import type { MouseEvent } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export function useHoverScale(scale = 1.02) {
  const { contextSafe } = useGSAP()

  const animate = contextSafe((e: MouseEvent<HTMLElement>, enter: boolean) => {
    if ((e.currentTarget as HTMLButtonElement).disabled) return
    gsap.to(e.currentTarget, { scale: enter ? scale : 1, duration: 0.2, ease: 'power2.out' })
  })

  return {
    onMouseEnter: (e: MouseEvent<HTMLElement>) => animate(e, true),
    onMouseLeave: (e: MouseEvent<HTMLElement>) => animate(e, false),
  }
}
