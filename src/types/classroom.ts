export type ClassRoom = {
  id: string
  code: string
  title: string
  session: string
}

export type NewClass = Omit<ClassRoom, 'id'>

export type Student = {
  id: string
  classId: string
  matricNo: string
  fullName: string
  email: string
}

export type NewStudent = Omit<Student, 'id' | 'classId'>