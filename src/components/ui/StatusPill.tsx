export type Status = 'present' | 'late' | 'absent'

const styles: Record<Status, string> = {
  present: 'bg-good-bg text-good',
  late: 'bg-warn-bg text-warn',
  absent: 'bg-bad-bg text-bad',
}

const labels: Record<Status, string> = {
  present: 'Present',
  late: 'Late',
  absent: 'Absent',
}

export default function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 font-mono text-[11px] font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}