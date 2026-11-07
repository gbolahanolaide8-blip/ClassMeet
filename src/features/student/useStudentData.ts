import { useOutletContext } from 'react-router-dom'
import type { AppNotification, HistoryRow, StudentMeeting } from '../../types/student'

export type StudentData = {
  firstName: string
  meetings: StudentMeeting[]
  notifications: AppNotification[]
  history: HistoryRow[]
  markAllRead: () => void
}

export function useStudentData() {
  return useOutletContext<StudentData>()
}