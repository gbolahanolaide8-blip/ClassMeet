import { CalendarDays, Users } from 'lucide-react'
import AppShell, { type NavItem } from '../../components/layout/AppShell'

const navItems: NavItem[] = [
  { to: '/admin/lecturers', label: 'Lecturers', icon: Users },
  { to: '/admin/meetings', label: 'All meetings', icon: CalendarDays },
]

export default function AdminLayout() {
  return (
    <AppShell
      navItems={navItems}
      user={{ initials: 'SA', name: 'Super admin', detail: 'admin@school.edu.ng' }}
    />
  )
}