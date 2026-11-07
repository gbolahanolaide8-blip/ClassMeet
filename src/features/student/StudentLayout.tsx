import { Bell, CalendarDays, Clock } from 'lucide-react'
import { useState } from 'react'
import AppShell, { type NavItem } from '../../components/layout/AppShell'
import type { AppNotification } from '../../types/student'
import { createStudentSample } from './sampleStudentData'
import type { StudentData } from './useStudentData'

export default function StudentLayout() {
  const [sample] = useState(createStudentSample)
  const [notifications, setNotifications] = useState<AppNotification[]>(
    sample.notifications,
  )

  const unread = notifications.filter((n) => !n.read).length

  const navItems: NavItem[] = [
    { to: '/student/meetings', label: 'My meetings', icon: CalendarDays },
    { to: '/student/history', label: 'Attendance history', icon: Clock },
    { to: '/student/notifications', label: 'Notifications', icon: Bell, badge: unread },
  ]

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const data: StudentData = {
    firstName: 'Tolulope',
    meetings: sample.meetings,
    notifications,
    history: sample.history,
    markAllRead,
  }

  return (
    <AppShell
      navItems={navItems}
      user={{ initials: 'AT', name: 'Adebayo Tolulope', detail: '2023010112' }}
      outletContext={data}
    />
  )
}