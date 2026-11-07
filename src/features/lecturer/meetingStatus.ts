import type { Tone } from '../../components/ui/Pill'
import type { MeetingStatus } from '../../types/meeting'

export const statusTone: Record<MeetingStatus, Tone> = {
  live: 'good',
  scheduled: 'info',
  ended: 'neutral',
}

export const statusLabel: Record<MeetingStatus, string> = {
  live: 'Live',
  scheduled: 'Upcoming',
  ended: 'Ended',
}