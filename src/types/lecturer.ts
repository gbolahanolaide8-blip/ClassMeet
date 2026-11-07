export type LecturerStatus = 'active' | 'invited' | 'disabled'

export type Lecturer = {
  id: string
  name: string
  email: string
  staffId: string
  department: string
  classes: number
  status: LecturerStatus
}