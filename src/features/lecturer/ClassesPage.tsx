import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Field from '../../components/ui/Field'
import ClassRoster from './ClassRoster'
import { useLecturerData } from './useLecturerData'
import { plural } from '../../lib/plural'

const schema = z.object({
  code: z.string().trim().min(1, 'Enter the course code'),
  title: z.string().trim().min(2, 'Enter the course title'),
  session: z.string().trim().min(1, 'Enter the session'),
})

type ClassForm = z.infer<typeof schema>

export default function ClassesPage() {
  const { classes, students, addClass, addStudents, removeStudent } = useLecturerData()
  const [selectedId, setSelectedId] = useState(classes[0]?.id ?? '')

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ClassForm>({ resolver: zodResolver(schema) })

  const selected = classes.find((c) => c.id === selectedId)
  const rosterStudents = students.filter((s) => s.classId === selectedId)

  const onSubmit = (values: ClassForm) => {
    if (classes.some((c) => c.code.toLowerCase() === values.code.toLowerCase())) {
      setError('code', { message: 'You already have a class with this code.' })
      return
    }
    const created = addClass(values)
    setSelectedId(created.id)
    reset()
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
          Classes and students
        </h1>
        <p className="font-mono text-[13px] text-muted">
          {classes.length} classes · {students.length} student records
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            {classes.map((c) => {
              const count = students.filter((s) => s.classId === c.id).length
              const active = c.id === selectedId
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  aria-pressed={active}
                  className={`rounded-[10px] border-[1.5px] px-4 py-3 text-left ${
                    active
                      ? 'border-brand bg-white'
                      : 'border-line bg-white hover:border-ink'
                  }`}
                >
                  <span className="block font-semibold">
                    {c.code}: {c.title}
                  </span>
                  <span className="block font-mono text-xs text-muted">
                    {c.session} · {plural(count, 'student')}
                  </span>
                </button>
              )
            })}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4 rounded-[10px] border-[1.5px] border-ink bg-white p-[22px]"
          >
            <h2 className="font-display text-xl font-bold">New class</h2>
            <Field
              id="classCode"
              label="Course code"
              placeholder="CSC 405"
              error={errors.code?.message}
              registration={register('code')}
            />
            <Field
              id="classTitle"
              label="Course title"
              placeholder="Computer Networks"
              error={errors.title?.message}
              registration={register('title')}
            />
            <Field
              id="classSession"
              label="Session"
              placeholder="2026/2027"
              error={errors.session?.message}
              registration={register('session')}
            />
            <button
              type="submit"
              className="rounded-lg bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-brand"
            >
              Create class
            </button>
          </form>
        </div>

        <div className="min-w-0 flex-[2_1_520px]">
          {selected ? (
            <ClassRoster
              classRoom={selected}
              students={rosterStudents}
              onAddStudents={(list) => addStudents(selected.id, list)}
              onRemoveStudent={removeStudent}
            />
          ) : (
            <p className="text-muted">Create a class to start adding students.</p>
          )}
        </div>
      </div>
    </div>
  )
}