import { addMinutes, format, subMinutes } from 'date-fns'
import type { MeetingStatus } from '../types/meeting'

export function formatDay(iso: string) {
  return format(new Date(iso), 'EEE d MMM')
}

export function formatTime(iso: string) {
  return format(new Date(iso), 'HH:mm')
}

export function getMeetingStatus(
  startsAt: string,
  durationMin: number,
  now = new Date(),
): MeetingStatus {
  const start = new Date(startsAt)
  const end = addMinutes(start, durationMin)
  if (now < start) return 'scheduled'
  if (now < end) return 'live'
  return 'ended'
}
export const JOIN_OPENS_MINUTES_BEFORE = 15

export function canJoinMeeting(startsAt: string, durationMin: number, now = new Date()) {
  const start = new Date(startsAt)
  const opens = subMinutes(start, JOIN_OPENS_MINUTES_BEFORE)
  const end = addMinutes(start, durationMin)
  return now >= opens && now < end
}