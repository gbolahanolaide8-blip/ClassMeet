import { addDays, addMinutes, differenceInMinutes, format, set, subMinutes } from 'date-fns'
import type { Student } from '../../types/classroom'
import type { AttendanceRow, Meeting } from '../../types/meeting'

const patterns: { offset: number | null; status: AttendanceRow['status'] }[] = [
  { offset: -2, status: 'present' },
  { offset: 2, status: 'present' },
  { offset: 19, status: 'late' },
  { offset: 0, status: 'present' },
  { offset: null, status: 'absent' },
  { offset: 5, status: 'present' },
]

function buildAttendance(
  students: Student[],
  start: Date,
  durationMin: number,
  live: boolean,
): AttendanceRow[] {
  const end = addMinutes(start, durationMin)

  return students.map((student, index): AttendanceRow => {
    const pattern = patterns[index % patterns.length]
    const base = {
      studentId: student.id,
      matricNo: student.matricNo,
      fullName: student.fullName,
    }

    if (pattern.offset === null) {
      return { ...base, joined: null, left: null, minutes: 0, status: 'absent' }
    }

    const joinedAt = addMinutes(start, pattern.offset)
    if (live) {
      return {
        ...base,
        joined: format(joinedAt, 'HH:mm'),
        left: null,
        minutes: Math.max(0, differenceInMinutes(new Date(), joinedAt)),
        status: pattern.status,
      }
    }

    const leftAt = addMinutes(end, (index % 3) - 1)
    return {
      ...base,
      joined: format(joinedAt, 'HH:mm'),
      left: format(leftAt, 'HH:mm'),
      minutes: differenceInMinutes(leftAt, joinedAt),
      status: pattern.status,
    }
  })
}

export function createSampleMeetings(students: Student[]) {
  const now = new Date()
  const live = subMinutes(now, 25)
  const yesterday = set(addDays(now, -1), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 })
  const tomorrow = set(addDays(now, 1), { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 })
  const later = set(addDays(now, 4), { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 })

  const meetings: Meeting[] = [
    { id: 'm1', classId: 'csc401', name: 'Revision class', reason: 'Revision', startsAt: live.toISOString(), durationMin: 60 },
    { id: 'm2', classId: 'csc403', name: 'Tutorial: Database design', reason: 'Class', startsAt: tomorrow.toISOString(), durationMin: 60 },
    { id: 'm3', classId: 'csc401', name: 'Mid-semester test', reason: 'Test', startsAt: later.toISOString(), durationMin: 90 },
    { id: 'm4', classId: 'csc401', name: 'Lab session', reason: 'Class', startsAt: yesterday.toISOString(), durationMin: 60 },
  ]

  const csc401 = students.filter((s) => s.classId === 'csc401')
  const attendance: Record<string, AttendanceRow[]> = {
    m1: buildAttendance(csc401, live, 60, true),
    m4: buildAttendance(csc401, yesterday, 60, false),
  }

  return { meetings, attendance }
}