import { useRef, type RefObject } from 'react'
import { gsap, useGSAP } from '../../../shared/lib/gsap'

interface Options {
  dragOver: boolean
  error: string | null
  loaded: boolean
}

export function useUploadMotion({ dragOver, error, loaded }: Options) {
  const scope = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('.dropzone', { scale: dragOver ? 1.015 : 1, duration: 0.25, ease: 'power2.out' })
    },
    { scope, dependencies: [dragOver] },
  )

  useGSAP(
    () => {
      if (error) gsap.fromTo('.dropzone', { x: -8 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.25)' })
    },
    { scope, dependencies: [error] },
  )

  useGSAP(
    () => {
      gsap.fromTo('.badge-upload', { scale: 0.7 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' })
      if (loaded) {
        gsap.from('.preview li', { x: -12, opacity: 0, stagger: 0.03, duration: 0.35, ease: 'power2.out' })
        gsap.from('.file-panel', { y: 12, opacity: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out' })
      } else {
        gsap.from('.icon-box', { scale: 0.6, rotate: -12, duration: 0.5, ease: 'back.out(2.5)' })
      }
    },
    { scope, dependencies: [loaded] },
  )

  return scope as RefObject<HTMLDivElement>
}
