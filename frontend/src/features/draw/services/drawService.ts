import { postForm } from '../../../shared/services/http'
import type { Winner } from '../types'

export function drawWinner(file: File, excluded: string[]) {
  const form = new FormData()
  form.append('file', file)
  form.append('excluded', JSON.stringify(excluded))
  return postForm<Winner>('/draw', form)
}
