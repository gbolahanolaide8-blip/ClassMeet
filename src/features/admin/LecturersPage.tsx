import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { z } from 'zod'
import Pill, { type Tone } from '../../components/ui/Pill'
import type { Lecturer, LecturerStatus } from '../../types/lecturer'
import { sampleLecturers } from './sampleLecturers'

const schema = z.object({
  name: z.string().min(2, 'Enter the full name'),
  email: z
    .string()
    .min(1, 'Enter an email')
    .email('Enter a valid email address'),
  staffId: z.string().min(1, 'Enter the staff ID'),
  department: z.string().min(1, 'Enter the department'),
})

type LecturerForm = z.infer<typeof schema>

const statusTone: Record<LecturerStatus, Tone> = {
  active: 'good',
  invited: 'warn',
  disabled: 'neutral',
}

const statusLabel: Record<LecturerStatus, string> = {
  active: 'Active',
  invited: 'Invited',
  disabled: 'Disabled',
}

const inputClass =
  'w-full rounded-lg border-[1.5px] border-[#aeb8d3] bg-white px-3 py-2.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-invalid:border-bad'

type FieldProps = {
  id: string
  label: string
  placeholder: string
  error?: string
  registration: UseFormRegisterReturn
}

function Field({ id, label, placeholder, error, registration }: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={inputClass}
        {...registration}
      />
      {error && (
        <p role="alert" className="text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  )
}

const columns = 'grid-cols-[minmax(0,1fr)_140px_64px_90px_96px]'

export default function LecturersPage() {
  const [lecturers, setLecturers] = useState<Lecturer[]>(sampleLecturers)
  const [query, setQuery] = useState('')

    const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LecturerForm>({ resolver: zodResolver(schema) })

  const visible = lecturers.filter((lecturer) =>
    `${lecturer.name} ${lecturer.email} ${lecturer.staffId}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  )
  const totalClasses = lecturers.reduce((sum, l) => sum + l.classes, 0)

    const onSubmit = (values: LecturerForm) => {
    const name = values.name.trim()
    const email = values.email.trim()
    const staffId = values.staffId.trim()
    const department = values.department.trim()

    const sameEmail = lecturers.find(
      (l) => l.email.toLowerCase() === email.toLowerCase(),
    )
    if (sameEmail) {
      setError('email', {
        message:
          sameEmail.status === 'invited'
            ? 'This person has already been invited.'
            : 'A lecturer with this email already exists.',
      })
      return
    }

    const sameStaffId = lecturers.find(
      (l) => l.staffId.toLowerCase() === staffId.toLowerCase(),
    )
    if (sameStaffId) {
      setError('staffId', {
        message: 'This staff ID belongs to another lecturer.',
      })
      return
    }

    // Saved for real in the Firebase step.
    setLecturers((prev) => [
      {
        id: crypto.randomUUID(),
        name,
        email,
        staffId,
        department,
        classes: 0,
        status: 'invited',
      },
      ...prev,
    ])
    reset()
  }
  const toggleDisabled = (id: string) => {
    setLecturers((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status: l.status === 'disabled' ? 'active' : 'disabled' }
          : l,
      ),
    )
  }

  const removeLecturer = (id: string) => {
    setLecturers((prev) => prev.filter((l) => l.id !== id))
  }

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
          Lecturers
        </h1>
        <p className="font-mono text-[13px] text-muted">
          {lecturers.length} lecturers · {totalClasses} classes
        </p>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-3.5">
          <div className="flex items-center gap-2.5 rounded-lg border-[1.5px] border-[#aeb8d3] bg-white px-3.5">
            <Search className="size-[18px] text-muted" aria-hidden="true" />
            <label htmlFor="search" className="sr-only">
              Search lecturers
            </label>
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, email or staff ID"
              className="min-w-0 flex-1 bg-transparent py-3 text-[15px] outline-none placeholder:text-muted/70"
            />
          </div>

          <div className="overflow-x-auto rounded-[10px] border border-line bg-white">
            <div className="min-w-[640px]">
              <div
                className={`grid ${columns} gap-3 border-b-2 border-ink px-[18px] py-3 font-mono text-[11px] uppercase tracking-wider text-muted`}
              >
                <span>Lecturer</span>
                <span>Department</span>
                <span>Classes</span>
                <span>Status</span>
                <span />
              </div>

              {visible.map((lecturer) => (
                <div
                  key={lecturer.id}
                  className={`grid ${columns} items-center gap-3 border-b border-line px-[18px] py-3.5 last:border-b-0`}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">
                      {lecturer.name}
                    </span>
                    <span className="block truncate text-[13px] text-muted">
                      {lecturer.email} · {lecturer.staffId}
                    </span>
                  </span>
                  <span className="text-sm">{lecturer.department}</span>
                  <span className="font-mono text-sm">{lecturer.classes}</span>
                  <span>
                    <Pill tone={statusTone[lecturer.status]}>
                      {statusLabel[lecturer.status]}
                    </Pill>
                  </span>
                  <span>
                    {lecturer.status === 'invited' ? (
                      <button
                        type="button"
                        onClick={() => removeLecturer(lecturer.id)}
                        className="text-sm font-semibold text-brand hover:text-brand-dark"
                      >
                        Cancel invite
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleDisabled(lecturer.id)}
                        className="text-sm font-semibold text-brand hover:text-brand-dark"
                      >
                        {lecturer.status === 'disabled' ? 'Enable' : 'Disable'}
                      </button>
                    )}
                  </span>
                </div>
              ))}

              {visible.length === 0 && (
                <p className="px-[18px] py-8 text-center text-muted">
                  No lecturers match your search.
                </p>
              )}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-[10px] border-[1.5px] border-ink bg-white p-[22px]"
        >
          <div>
            <h2 className="mb-1 font-display text-[22px] font-bold">
              Add a lecturer
            </h2>
            <p className="text-sm text-muted">
              They receive an email invite to set their own password.
            </p>
          </div>

          <Field
            id="name"
            label="Full name"
            placeholder="Dr. Adeyemi Bolanle"
            error={errors.name?.message}
            registration={register('name')}
          />
          <Field
            id="email"
            label="Email"
            placeholder="name@school.edu.ng"
            error={errors.email?.message}
            registration={register('email')}
          />
          <div className="flex flex-wrap gap-4">
            <div className="min-w-0 flex-[1_1_110px]">
              <Field
                id="staffId"
                label="Staff ID"
                placeholder="ST-0000"
                error={errors.staffId?.message}
                registration={register('staffId')}
              />
            </div>
            <div className="min-w-0 flex-[1_1_150px]">
              <Field
                id="department"
                label="Department"
                placeholder="Computer Science"
                error={errors.department?.message}
                registration={register('department')}
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-lg bg-ink px-5 py-3 text-[15px] font-semibold text-white hover:bg-brand"
          >
            Create and send invite
          </button>
        </form>
      </div>
    </div>
  )
}