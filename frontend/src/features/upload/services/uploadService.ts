import { postForm } from '../../../shared/services/http'
import type { ParticipantsResponse } from '../types'

export function uploadList(file: File) {
  const form = new FormData()
  form.append('file', file)
  return postForm<ParticipantsResponse>('/participants', form)
}
