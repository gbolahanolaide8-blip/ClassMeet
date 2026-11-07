import { useOutletContext } from 'react-router-dom'
import type { ClassRoom, NewClass, NewStudent, Student } from '../../types/classroom'
import type { AttendanceRow, Meeting, NewMeeting } from '../../types/meeting'

export type LecturerData = {
  classes: ClassRoom[]
  students: Student[]
  meetings: Meeting[]
  attendance: Record<string, AttendanceRow[]>
  addClass: (values: NewClass) => ClassRoom
  addStudents: (classId: string, students: NewStudent[]) => void
  removeStudent: (id: string) => void
  addMeeting: (values: NewMeeting) => Meeting
}

export function useLecturerData() {
  return useOutletContext<LecturerData>()
}