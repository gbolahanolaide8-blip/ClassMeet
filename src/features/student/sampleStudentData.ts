import { addDays, addMinutes, set } from 'date-fns'
import { formatDay, formatTime } from '../../lib/dates'
import type { AppNotification, HistoryRow, StudentMeeting } from '../../types/student'

export function createStudentSample() {
  const now = new Date()
  const at = (days: number, hours: number) =>
    set(addDays(now, days), { hours, minutes: 0, seconds: 0, milliseconds: 0 })

  const meetings: StudentMeeting[] = [
    { id: 'sm1', name: 'Revision class', courseCode: 'CSC 401', reason: 'Revision', startsAt: addMinutes(now, 8).toISOString(), durationMin: 60, lecturer: 'Dr. Adeyemi Bolanle' },
    { id: 'sm2', name: 'Tutorial: Database design', courseCode: 'CSC 403', reason: 'Class', startsAt: at(1, 14).toISOString(), durationMin: 60, lecturer: 'Prof. Ogundipe Tunde' },
    { id: 'sm3', name: 'Mid-semester test', courseCode: 'CSC 401', reason: 'Test', startsAt: at(4, 9).toISOString(), durationMin: 90, lecturer: 'Dr. Adeyemi Bolanle' },
  ]

  const detail = (m: StudentMeeting) =>
    `${m.courseCode} · ${formatDay(m.startsAt)} · ${formatTime(m.startsAt)}`

  const notifications: AppNotification[] = [
    { id: 'n1', title: `New meeting: ${meetings[2].name}`, detail: detail(meetings[2]), createdAt: addMinutes(now, -120).toISOString(), read: false },
    { id: 'n2', title: `New meeting: ${meetings[1].name}`, detail: detail(meetings[1]), createdAt: addDays(now, -1).toISOString(), read: false },
    { id: 'n3', title: `Meeting time changed: ${meetings[0].name}`, detail: detail(meetings[0]), createdAt: addDays(now, -3).toISOString(), read: true },
  ]

  const history: HistoryRow[] = [
    { id: 'h1', meetingName: 'Lab session', courseCode: 'CSC 401', date: at(-3, 9).toISOString(), joined: '09:02', left: '10:58', status: 'present' },
    { id: 'h2', meetingName: 'Tutorial', courseCode: 'CSC 403', date: at(-5, 14).toISOString(), joined: '14:21', left: '15:30', status: 'late' },
    { id: 'h3', meetingName: 'Revision class', courseCode: 'CSC 401', date: at(-6, 10).toISOString(), joined: '09:58', left: '11:03', status: 'present' },
    { id: 'h4', meetingName: 'Introduction and revision', courseCode: 'CSC 401', date: at(-8, 9).toISOString(), joined: null, left: null, status: 'absent' },
  ]

  return { meetings, notifications, history }
}