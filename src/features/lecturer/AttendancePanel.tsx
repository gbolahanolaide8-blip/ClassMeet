import { Download } from 'lucide-react'
import Papa from 'papaparse'
import Pill from '../../components/ui/Pill'
import StatusPill from '../../components/ui/StatusPill'
import { formatDay, formatTime } from '../../lib/dates'
import type { ClassRoom } from '../../types/classroom'
import type { AttendanceRow, Meeting, MeetingStatus } from '../../types/meeting'
import { statusLabel, statusTone } from './meetingStatus'

type AttendancePanelProps = {
  meeting: Meeting
  classRoom?: ClassRoom
  status: MeetingStatus
  rows: AttendanceRow[]
}

const columns = 'grid-cols-[minmax(0,1fr)_70px_80px_110px_90px]'

export default function AttendancePanel({
  meeting,
  classRoom,
  status,
  rows,
}: AttendancePanelProps) {
  const present = rows.filter((r) => r.status === 'present').length
  const late = rows.filter((r) => r.status === 'late').length
  const absent = rows.filter((r) => r.status === 'absent').length

  const exportCsv = () => {
    const csv = Papa.unparse(
      rows.map((r) => ({
        matric_no: r.matricNo,
        full_name: r.fullName,
        joined: r.joined ?? '',
        left: r.left ?? '',
        minutes: r.minutes,
        status: r.status,
      })),
    )
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${meeting.name.replace(/\s+/g, '-').toLowerCase()}-attendance.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="overflow-hidden rounded-[10px] border border-line bg-white">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-b-2 border-ink px-6 py-5">
        <div className="min-w-0">
          <h2 className="mb-0.5 font-display text-2xl font-bold tracking-tight">
            Attendance: {meeting.name}
          </h2>
          <p className="font-mono text-[13px] text-muted">
            {classRoom?.code} · {formatDay(meeting.startsAt)} · {formatTime(meeting.startsAt)}
            {rows.length > 0 &&
              ` · ${present} present · ${late} late · ${absent} absent`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Pill tone={statusTone[status]}>{statusLabel[status]}</Pill>
          <button
            type="button"
            onClick={exportCsv}
            disabled={rows.length === 0}
            className="inline-flex items-center gap-2 rounded-lg border-[1.5px] border-ink px-4 py-2 text-sm font-semibold hover:bg-paper disabled:cursor-not-allowed disabled:border-[#aeb8d3] disabled:text-[#8591b3] disabled:hover:bg-transparent"
          >
            <Download className="size-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="px-6 py-10 text-center text-muted">
          {status === 'scheduled'
            ? 'Attendance appears here once the class starts.'
            : 'Nobody has joined this meeting.'}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            <div
              className={`grid ${columns} gap-3 border-b border-line px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-muted`}
            >
              <span>Student</span>
              <span>Joined</span>
              <span>Left</span>
              <span>Time in class</span>
              <span>Status</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.studentId}
                className={`grid ${columns} items-center gap-3 border-b border-line px-6 py-3 last:border-b-0`}
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{row.fullName}</span>
                  <span className="block font-mono text-xs text-muted">{row.matricNo}</span>
                </span>
                <span className="font-mono text-sm">{row.joined ?? '—'}</span>
                <span className="font-mono text-sm">
                  {row.left ?? (status === 'live' && row.joined ? 'In class' : '—')}
                </span>
                <span className="font-mono text-sm">
                  {row.status === 'absent' ? '—' : `${row.minutes} min`}
                </span>
                <span>
                  <StatusPill status={row.status} />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}