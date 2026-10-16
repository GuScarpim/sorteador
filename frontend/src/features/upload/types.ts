export interface Participant {
  name: string
  count: number
  chance: number
}

export interface ParticipantsResponse {
  total: number
  unique: number
  participants: Participant[]
}
