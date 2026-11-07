import type { ClassRoom, Student } from '../../types/classroom'

export const sampleClasses: ClassRoom[] = [
  { id: 'csc401', code: 'CSC 401', title: 'Software Engineering II', session: '2026/2027' },
  { id: 'csc403', code: 'CSC 403', title: 'Database Design', session: '2026/2027' },
]

export const sampleStudents: Student[] = [
  { id: 's1', classId: 'csc401', matricNo: '2023010112', fullName: 'Adebayo Tolulope', email: 't.adebayo@school.edu.ng' },
  { id: 's2', classId: 'csc401', matricNo: '2023010267', fullName: 'Okafor Chidinma', email: 'c.okafor@school.edu.ng' },
  { id: 's3', classId: 'csc401', matricNo: '2023010341', fullName: 'Ibrahim Aisha', email: 'a.ibrahim@school.edu.ng' },
  { id: 's4', classId: 'csc401', matricNo: '2023010455', fullName: 'Balogun Femi', email: 'f.balogun@school.edu.ng' },
  { id: 's5', classId: 'csc401', matricNo: '2023010590', fullName: 'Eze Chukwuemeka', email: 'c.eze@school.edu.ng' },
  { id: 's6', classId: 'csc401', matricNo: '2023010702', fullName: 'Salawu Mariam', email: 'm.salawu@school.edu.ng' },
  { id: 's7', classId: 'csc403', matricNo: '2023010112', fullName: 'Adebayo Tolulope', email: 't.adebayo@school.edu.ng' },
  { id: 's8', classId: 'csc403', matricNo: '2023010267', fullName: 'Okafor Chidinma', email: 'c.okafor@school.edu.ng' },
  { id: 's9', classId: 'csc403', matricNo: '2023010618', fullName: 'Okoro Ngozi', email: 'n.okoro@school.edu.ng' },
  { id: 's10', classId: 'csc403', matricNo: '2023010733', fullName: 'Adeleke Kunle', email: 'k.adeleke@school.edu.ng' },
]