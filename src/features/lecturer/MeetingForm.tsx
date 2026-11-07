import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, addMinutes, format } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Field from '../../components/ui/Field'
import SelectField from '../../components/ui/SelectField'
import { formatDay, formatTime } from '../../lib/dates'
import { plural } from '../../lib/plural'
import type { ClassRoom, Student } from '../../types/classroom'
import type { Meeting, NewMeeting } from '../../types/meeting'

const schema = z.object({
  classId: z.string().min(1, 'Choose a class'),
  name: z.string().trim().min(2, 'Enter a meeting name'),
  reason: z.enum(['Class', 'Revision', 'Test', 'Other']),
  date: z.string().min(1, 'Choose a date'),
  time: z.string().min(1, 'Choose a time'),
  duration: z.enum(['30', '60', '90', '120']),
})

type MeetingFormValues = z.infer<typeof schema>

const reasonOptions = ['Class', 'Revision', 'Test', 'Other'].map((value) => ({
  value,
  label: value,
}))

const durationOptions = [
  { value: '30', label: '30 minutes' },
  { value: '60', label: '1 hour' },
  { value: '90', label: '1 hour 30 minutes' },
  { value: '120', label: '2 hours' },
]

function makeDefaults(classId: string): MeetingFormValues {
  return {
    classId,
    name: '',
    reason: 'Class',
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '10:00',
    duration: '60',
  }
}

type MeetingFormProps = {
  classes: ClassRoom[]
  students: Student[]
  meetings: Meeting[]
  onCreate: (values: NewMeeting) => Meeting
}

export default function MeetingForm({
  classes,
  students,
  meetings,
  onCreate,
}: MeetingFormProps) {
  const [notice, setNotice] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm<MeetingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: makeDefaults(classes[0]?.id ?? ''),
  })

  const classId = watch('classId')
  const studentCount = students.filter((s) => s.classId === classId).length

  const onSubmit = (values: MeetingFormValues) => {
    setNotice('')

    const start = new Date(`${values.date}T${values.time}`)
    const durationMin = Number(values.duration)
    const end = addMinutes(start, durationMin)

    if (start <= new Date()) {
      setError('time', { message: 'Choose a time in the future.' })
      return
    }

    const clash = meetings.find((m) => {
      const otherStart = new Date(m.startsAt)
      const otherEnd = addMinutes(otherStart, m.durationMin)
      return start < otherEnd && end > otherStart
    })
    if (clash) {
      setError('time', {
        message: `This overlaps with "${clash.name}" on ${formatDay(clash.startsAt)} at ${formatTime(clash.startsAt)}.`,
      })
      return
    }

    // Students are really notified in a later step.
    const created = onCreate({
      classId: values.classId,
      name: values.name,
      reason: values.reason,
      startsAt: start.toISOString(),
      durationMin,
    })
    setNotice(`"${created.name}" is saved. ${plural(studentCount, 'student')} notified.`)
    reset(makeDefaults(values.classId))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex min-w-0 flex-col gap-4 rounded-[10px] border-[1.5px] border-ink bg-white p-6"
    >
      <div>
        <h2 className="mb-1 font-display text-[22px] font-bold">New meeting</h2>
        <p className="text-sm text-muted">
          A Zoom link is created when you save. This is connected in the Zoom step.
        </p>
      </div>

      <SelectField
        id="meetingClass"
        label="Class"
        options={classes.map((c) => ({ value: c.id, label: `${c.code} · ${c.title}` }))}
        error={errors.classId?.message}
        registration={register('classId')}
      />

      <Field
        id="meetingName"
        label="Meeting name"
        placeholder="Revision class"
        error={errors.name?.message}
        registration={register('name')}
      />

      <SelectField
        id="meetingReason"
        label="Reason"
        options={reasonOptions}
        error={errors.reason?.message}
        registration={register('reason')}
      />

      <div className="flex flex-wrap gap-4">
        <div className="min-w-0 flex-[1_1_150px]">
          <Field
            id="meetingDate"
            label="Date"
            type="date"
            error={errors.date?.message}
            registration={register('date')}
          />
        </div>
        <div className="min-w-0 flex-[1_1_110px]">
          <Field
            id="meetingTime"
            label="Time"
            type="time"
            error={errors.time?.message}
            registration={register('time')}
          />
        </div>
        <div className="min-w-0 flex-[1_1_140px]">
          <SelectField
            id="meetingLength"
            label="Length"
            options={durationOptions}
            error={errors.duration?.message}
            registration={register('duration')}
          />
        </div>
      </div>

      {studentCount === 0 && (
        <p className="rounded-lg bg-warn-bg px-4 py-3 text-sm text-warn">
          This class has no students yet. Add students first so they can be notified.
        </p>
      )}

      <button
        type="submit"
        disabled={studentCount === 0}
        className="rounded-lg bg-brand px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-[#aeb8d3]"
      >
        Save and notify {plural(studentCount, 'student')}
      </button>

      {notice && (
        <p role="status" className="rounded-lg bg-good-bg px-4 py-3 text-sm text-good">
          {notice}
        </p>
      )}
    </form>
  )
}