import type { Status } from '../components/ui/StatusPill'

export type MeetingReason = 'Class' | 'Revision' | 'Test' | 'Other'

export type MeetingStatus = 'scheduled' | 'live' | 'ended'

export type Meeting = {
  id: string
  classId: string
  name: string
  reason: MeetingReason
  startsAt: string
  durationMin: number
}

export type NewMeeting = Omit<Meeting, 'id'>

export type AttendanceRow = {
  studentId: string
  matricNo: string
  fullName: string
  joined: string | null
  left: string | null
  minutes: number
  status: Status
}