import { Link } from 'react-router-dom'
import StatusPill, { type Status } from '../../components/ui/StatusPill'

type Row = {
  name: string
  joined: string
  left: string
  status: Status
}

const rows: Row[] = [
  { name: 'Adebayo Tolulope', joined: '09:58', left: '11:03', status: 'present' },
  { name: 'Okafor Chidinma', joined: '10:02', left: '11:04', status: 'present' },
  { name: 'Ibrahim Aisha', joined: '10:19', left: '11:01', status: 'late' },
  { name: 'Eze Chukwuemeka', joined: '—', left: '—', status: 'absent' },
  { name: 'Salawu Mariam', joined: '10:05', left: '11:00', status: 'present' },
]

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-14 px-4 pb-20 pt-16 sm:px-8 sm:pt-[72px]">
      <div className="min-w-0 flex-[1_1_480px]">
        <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
          Online classes for one school
        </p>
        <h1 className="mb-6 font-display text-[clamp(40px,5.2vw,68px)] font-extrabold leading-[1.02] tracking-tight">
          Schedule the class. The register{' '}
          <span className="rounded-sm bg-mark px-2">fills itself.</span>
        </h1>
        <p className="mb-8 max-w-[540px] text-[19px] text-soft">
          Lecturers set a meeting name, reason, date and time. Students are
          told straight away, join with one click, and their time in and out
          lands in the lecturer's attendance table.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/login"
            className="rounded-lg bg-brand px-6 py-4 text-base font-semibold text-white hover:bg-brand-dark"
          >
            Log in to ClassMeet
          </Link>
          <a
            href="#how"
            className="rounded-lg border-[1.5px] border-ink px-6 py-[14px] text-base font-semibold hover:bg-white"
          >
            See how it works
          </a>
        </div>
        <p className="mt-5 text-sm text-muted">
          Meetings run on Zoom. Times are shown in WAT.
        </p>
      </div>

      <div className="min-w-0 flex-[1_1_440px] overflow-hidden rounded-xl border-[1.5px] border-ink bg-white">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b-2 border-ink px-[18px] py-3.5">
          <div>
            <div className="font-display text-lg font-bold">
              CSC 401: Revision class
            </div>
            <div className="font-mono text-xs text-muted">
              Mon 9 Nov · 10:00 WAT · Dr. Adeyemi Bolanle
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-good-bg px-2.5 py-1.5 font-mono text-xs font-medium text-good">
            <span className="size-2 rounded-full bg-good" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-[1fr_52px_52px_76px] gap-x-2.5 border-b border-line px-[18px] py-2.5 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span>Student</span>
          <span>In</span>
          <span>Out</span>
          <span>Status</span>
        </div>

        {rows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[1fr_52px_52px_76px] items-center gap-x-2.5 border-b border-line px-[18px] py-3 text-sm"
          >
            <span className="min-w-0 font-semibold">{row.name}</span>
            <span className="font-mono text-[13px]">{row.joined}</span>
            <span className="font-mono text-[13px]">{row.left}</span>
            <span>
              <StatusPill status={row.status} />
            </span>
          </div>
        ))}

        <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-t-2 border-ink px-[18px] py-3 font-mono text-xs text-muted">
          <span>3 present · 1 late · 1 absent</span>
          <span>Sample data</span>
        </div>
      </div>
    </section>
  )
}