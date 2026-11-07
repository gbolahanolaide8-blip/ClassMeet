import { CalendarDays, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import AppShell, { type NavItem } from '../../components/layout/AppShell'
import type { ClassRoom, NewClass, NewStudent, Student } from '../../types/classroom'
import type { Meeting, NewMeeting } from '../../types/meeting'
import { sampleClasses, sampleStudents } from './sampleData'
import { createSampleMeetings } from './sampleMeetings'
import type { LecturerData } from './useLecturerData'

const navItems: NavItem[] = [
  { to: '/lecturer/classes', label: 'Classes and students', icon: GraduationCap },
  { to: '/lecturer/meetings', label: 'Meetings', icon: CalendarDays },
]

export default function LecturerLayout() {
  const [initial] = useState(() => createSampleMeetings(sampleStudents))
  const [classes, setClasses] = useState<ClassRoom[]>(sampleClasses)
  const [students, setStudents] = useState<Student[]>(sampleStudents)
  const [meetings, setMeetings] = useState<Meeting[]>(initial.meetings)
  const [attendance] = useState(initial.attendance)

  const addClass = (values: NewClass) => {
    const created: ClassRoom = { id: crypto.randomUUID(), ...values }
    setClasses((prev) => [...prev, created])
    return created
  }

  const addStudents = (classId: string, list: NewStudent[]) => {
    setStudents((prev) => [
      ...prev,
      ...list.map((s) => ({ id: crypto.randomUUID(), classId, ...s })),
    ])
  }

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id))
  }

  const addMeeting = (values: NewMeeting) => {
    const created: Meeting = { id: crypto.randomUUID(), ...values }
    setMeetings((prev) => [...prev, created])
    return created
  }

  const data: LecturerData = {
    classes,
    students,
    meetings,
    attendance,
    addClass,
    addStudents,
    removeStudent,
    addMeeting,
  }

  return (
    <AppShell
      navItems={navItems}
      user={{ initials: 'AB', name: 'Dr. Adeyemi Bolanle', detail: 'Lecturer' }}
      outletContext={data}
    />
  )
}