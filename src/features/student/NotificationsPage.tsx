import { formatDistanceToNowStrict } from 'date-fns'
import { useStudentData } from './useStudentData'

export default function NotificationsPage() {
  const { notifications, markAllRead } = useStudentData()
  const unread = notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
            Notifications
          </h1>
          <p className="font-mono text-[13px] text-muted">{unread} unread</p>
        </div>
        <button
          type="button"
          onClick={markAllRead}
          disabled={unread === 0}
          className="rounded-lg border-[1.5px] border-ink px-4 py-2 text-sm font-semibold hover:bg-white disabled:cursor-not-allowed disabled:border-[#aeb8d3] disabled:text-[#8591b3] disabled:hover:bg-transparent"
        >
          Mark all as read
        </button>
      </div>

      <div className="rounded-[10px] border border-line bg-white px-[22px]">
        {notifications.map((n, index) => (
          <div
            key={n.id}
            className={`flex items-start gap-3.5 py-4 ${
              index === 0 ? '' : 'border-t border-line'
            }`}
          >
            <span className="mt-0.5 w-12 flex-none">
              {!n.read && (
                <span className="rounded bg-[#e3e8fb] px-1.5 py-1 font-mono text-[11px] font-medium text-brand-dark">
                  New
                </span>
              )}
            </span>
            <div className="min-w-0">
              <div className={n.read ? 'font-medium text-soft' : 'font-semibold'}>
                {n.title}
              </div>
              <div className="text-sm text-soft">{n.detail}</div>
              <div className="font-mono text-xs text-muted">
                {formatDistanceToNowStrict(new Date(n.createdAt), { addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
        {notifications.length === 0 && (
          <p className="py-8 text-center text-muted">Nothing here yet.</p>
        )}
      </div>
    </div>
  )
}