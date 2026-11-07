import type { Status } from '../components/ui/StatusPill'
import type { MeetingReason } from './meeting'

export type StudentMeeting = {
  id: string
  name: string
  courseCode: string
  reason: MeetingReason
  startsAt: string
  durationMin: number
  lecturer: string
}

export type AppNotification = {
  id: string
  title: string
  detail: string
  createdAt: string
  read: boolean
}

export type HistoryRow = {
  id: string
  meetingName: string
  courseCode: string
  date: string
  joined: string | null
  left: string | null
  status: Status
}