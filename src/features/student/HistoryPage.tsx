import StatusPill from '../../components/ui/StatusPill'
import { formatDay } from '../../lib/dates'
import { useStudentData } from './useStudentData'

const columns = 'grid-cols-[minmax(0,1fr)_110px_70px_70px_90px]'

export default function HistoryPage() {
  const { history } = useStudentData()

  const present = history.filter((h) => h.status === 'present').length
  const late = history.filter((h) => h.status === 'late').length
  const absent = history.filter((h) => h.status === 'absent').length

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
          Attendance history
        </h1>
        <p className="font-mono text-[13px] text-muted">
          {history.length} meetings · {present} present · {late} late · {absent} absent
        </p>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-line bg-white">
        <div className="min-w-[620px]">
          <div
            className={`grid ${columns} gap-3 border-b-2 border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-wider text-muted`}
          >
            <span>Meeting</span>
            <span>Date</span>
            <span>Joined</span>
            <span>Left</span>
            <span>Status</span>
          </div>
          {history.map((row) => (
            <div
              key={row.id}
              className={`grid ${columns} items-center gap-3 border-b border-line px-6 py-3.5 last:border-b-0`}
            >
              <span className="min-w-0">
                <span className="block truncate font-semibold">{row.meetingName}</span>
                <span className="block text-[13px] text-muted">{row.courseCode}</span>
              </span>
              <span className="text-sm">{formatDay(row.date)}</span>
              <span className="font-mono text-sm">{row.joined ?? '—'}</span>
              <span className="font-mono text-sm">{row.left ?? '—'}</span>
              <span>
                <StatusPill status={row.status} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}