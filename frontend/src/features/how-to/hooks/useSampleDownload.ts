import { SAMPLE_TEXT } from '../constants'

export function useSampleDownload() {
  return () => {
    const url = URL.createObjectURL(new Blob([SAMPLE_TEXT], { type: 'text/plain;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'participantes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }
}
