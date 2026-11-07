import { useState } from 'react'
import Pill from '../../components/ui/Pill'
import { formatDay, formatTime, getMeetingStatus } from '../../lib/dates'
import AttendancePanel from './AttendancePanel'
import MeetingForm from './MeetingForm'
import { statusLabel, statusTone } from './meetingStatus'
import { useLecturerData } from './useLecturerData'

export default function MeetingsPage() {
  const { classes, students, meetings, attendance, addMeeting } = useLecturerData()

  const now = new Date()
  const items = meetings.map((meeting) => ({
    meeting,
    status: getMeetingStatus(meeting.startsAt, meeting.durationMin, now),
  }))
  const byStart = (a: (typeof items)[number], b: (typeof items)[number]) =>
    new Date(a.meeting.startsAt).getTime() - new Date(b.meeting.startsAt).getTime()

  const ordered = [
    ...items.filter((i) => i.status === 'live'),
    ...items.filter((i) => i.status === 'scheduled').sort(byStart),
    ...items.filter((i) => i.status === 'ended').sort((a, b) => byStart(b, a)),
  ]

  const [selectedId, setSelectedId] = useState(ordered[0]?.meeting.id ?? '')
  const selected = ordered.find((i) => i.meeting.id === selectedId)

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
          Meetings
        </h1>
        <p className="font-mono text-[13px] text-muted">Times shown in your local time</p>
      </div>

      <div className="flex flex-wrap items-start gap-6">
        <div className="min-w-0 flex-[1_1_380px]">
          <MeetingForm
            classes={classes}
            students={students}
            meetings={meetings}
            onCreate={(values) => {
              const created = addMeeting(values)
              setSelectedId(created.id)
              return created
            }}
          />
        </div>

        <section className="min-w-0 flex-[1_1_380px] rounded-[10px] border border-line bg-white p-[22px]">
          <h2 className="mb-3.5 font-display text-xl font-bold">Your meetings</h2>
          <div className="flex flex-col">
            {ordered.map(({ meeting, status }, index) => {
              const classRoom = classes.find((c) => c.id === meeting.classId)
              const active = meeting.id === selectedId
              return (
                <button
                  key={meeting.id}
                  type="button"
                  onClick={() => setSelectedId(meeting.id)}
                  aria-pressed={active}
                  className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-2 py-3.5 text-left ${
                    index === 0 ? 'border-t-2 border-ink' : 'border-line'
                  } ${active ? 'bg-paper' : 'hover:bg-paper'}`}
                >
                  <span className="min-w-0">
                    <span className="block font-semibold">{meeting.name}</span>
                    <span className="block font-mono text-xs text-muted">
                      {classRoom?.code} · {meeting.reason} · {formatDay(meeting.startsAt)} ·{' '}
                      {formatTime(meeting.startsAt)}
                    </span>
                  </span>
                  <Pill tone={statusTone[status]}>{statusLabel[status]}</Pill>
                </button>
              )
            })}
            {ordered.length === 0 && (
              <p className="py-6 text-center text-muted">No meetings yet.</p>
            )}
          </div>
        </section>
      </div>

      {selected && (
        <AttendancePanel
          meeting={selected.meeting}
          classRoom={classes.find((c) => c.id === selected.meeting.classId)}
          status={selected.status}
          rows={attendance[selected.meeting.id] ?? []}
        />
      )}
    </div>
  )
}