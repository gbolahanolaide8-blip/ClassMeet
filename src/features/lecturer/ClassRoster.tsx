import { zodResolver } from '@hookform/resolvers/zod'
import { Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Field from '../../components/ui/Field'
import type { ClassRoom, NewStudent, Student } from '../../types/classroom'
import CsvImport from './CsvImport'
import { plural } from '../../lib/plural'

const schema = z.object({
  matricNo: z.string().trim().min(1, 'Enter the matric number'),
  fullName: z.string().trim().min(2, 'Enter the full name'),
  email: z
    .string()
    .trim()
    .min(1, 'Enter an email')
    .email('Enter a valid email address'),
})

type StudentForm = z.infer<typeof schema>

type ClassRosterProps = {
  classRoom: ClassRoom
  students: Student[]
  onAddStudents: (students: NewStudent[]) => void
  onRemoveStudent: (id: string) => void
}

const columns = 'grid-cols-[130px_minmax(0,1fr)_minmax(0,1fr)_44px]'

export default function ClassRoster({
  classRoom,
  students,
  onAddStudents,
  onRemoveStudent,
}: ClassRosterProps) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<StudentForm>({ resolver: zodResolver(schema) })

  const onSubmit = (values: StudentForm) => {
    if (students.some((s) => s.matricNo.toLowerCase() === values.matricNo.toLowerCase())) {
      setError('matricNo', { message: 'This matric number is already in the class.' })
      return
    }
    if (students.some((s) => s.email.toLowerCase() === values.email.toLowerCase())) {
      setError('email', { message: 'This email is already in the class.' })
      return
    }
    onAddStudents([values])
    reset()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-display text-[26px] font-bold tracking-tight">
          {classRoom.code}: {classRoom.title}
        </h2>
        <p className="font-mono text-[13px] text-muted">
          {classRoom.session} · {plural(students.length, 'student')}
        </p>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-line bg-white">
        <div className="min-w-[600px]">
          <div
            className={`grid ${columns} gap-3 border-b-2 border-ink px-[18px] py-3 font-mono text-[11px] uppercase tracking-wider text-muted`}
          >
            <span>Matric no.</span>
            <span>Name</span>
            <span>Email</span>
            <span />
          </div>

          {students.map((student) => (
            <div
              key={student.id}
              className={`grid ${columns} items-center gap-3 border-b border-line px-[18px] py-3 last:border-b-0`}
            >
              <span className="font-mono text-[13px]">{student.matricNo}</span>
              <span className="min-w-0 truncate font-semibold">{student.fullName}</span>
              <span className="min-w-0 truncate text-sm text-muted">{student.email}</span>
              <button
                type="button"
                onClick={() => onRemoveStudent(student.id)}
                aria-label={`Remove ${student.fullName}`}
                className="grid size-9 place-items-center rounded-md text-muted hover:bg-bad-bg hover:text-bad"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </button>
            </div>
          ))}

          {students.length === 0 && (
            <p className="px-[18px] py-8 text-center text-muted">
              No students yet. Add one below or import a CSV file.
            </p>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 rounded-[10px] border-[1.5px] border-ink bg-white p-[22px]"
      >
        <h3 className="font-display text-xl font-bold">Add a student</h3>
        <div className="flex flex-wrap gap-4">
          <div className="min-w-0 flex-[1_1_140px]">
            <Field
              id="matricNo"
              label="Matric number"
              placeholder="2023010000"
              error={errors.matricNo?.message}
              registration={register('matricNo')}
            />
          </div>
          <div className="min-w-0 flex-[1_1_180px]">
            <Field
              id="studentName"
              label="Full name"
              placeholder="Adebayo Tolulope"
              error={errors.fullName?.message}
              registration={register('fullName')}
            />
          </div>
          <div className="min-w-0 flex-[1_1_220px]">
            <Field
              id="studentEmail"
              label="Email"
              placeholder="name@school.edu.ng"
              error={errors.email?.message}
              registration={register('email')}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="rounded-lg bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-brand"
          >
            Add student
          </button>
        </div>
      </form>

      <CsvImport existing={students} onImport={onAddStudents} />
    </div>
  )
}