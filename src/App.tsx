import { Navigate, Route, Routes } from 'react-router-dom'
import PageStub from './components/ui/PageStub'
import AdminLayout from './features/admin/AdminLayout'
import LecturersPage from './features/admin/LecturersPage'
import LoginPage from './features/auth/LoginPage'
import LandingPage from './features/landing/LandingPage'
import ClassesPage from './features/lecturer/ClassesPage'
import LecturerLayout from './features/lecturer/LecturerLayout'
import MeetingsPage from './features/lecturer/MeetingsPage'
import HistoryPage from './features/student/HistoryPage'
import MyMeetingsPage from './features/student/MyMeetingPage'
import NotificationsPage from './features/student/NotificationsPage'
import StudentLayout from './features/student/StudentLayout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="lecturers" replace />} />
        <Route path="lecturers" element={<LecturersPage />} />
        <Route path="meetings" element={<PageStub title="All meetings" />} />
      </Route>
            <Route path="/lecturer" element={<LecturerLayout />}>
        <Route index element={<Navigate to="classes" replace />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="meetings" element={<MeetingsPage />} />
      </Route>
        <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="meetings" replace />} />
        <Route path="meetings" element={<MyMeetingsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  )
}