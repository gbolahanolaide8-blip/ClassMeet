import { format, formatDistanceToNowStrict } from 'date-fns'
import { useState } from 'react'
import { useNow } from '../../hooks/useNow'
import { canJoinMeeting, formatDay, formatTime, getMeetingStatus } from '../../lib/dates'
import JoinButton from './JoinButton'
import { useStudentData } from './useStudentData'

export default function MyMeetingsPage() {
  const { firstName, meetings } = useStudentData()
  const now = useNow()
  const [joinedAt, setJoinedAt] = useState<Record<string, string>>({})

  const upcoming = meetings
    .filter((m) => getMeetingStatus(m.startsAt, m.durationMin, now) !== 'ended')
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())

  const next = upcoming[0]
  const rest = upcoming.slice(1)

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const join = (id: string) => {
    // The real join and Zoom link come in the Zoom step.
    setJoinedAt((prev) => ({ ...prev, [id]: format(new Date(), 'HH:mm') }))
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
          {greeting}, {firstName}
        </h1>
        <p className="font-mono text-[13px] text-muted">
          {format(now, 'EEE d MMM · HH:mm')}
        </p>
      </div>

      {next ? (
        <section className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 rounded-[10px] border-[1.5px] border-ink bg-white p-7">
          <div className="min-w-0 flex-[1_1_360px]">
            {getMeetingStatus(next.startsAt, next.durationMin, now) === 'live' ? (
              <span className="mb-3.5 inline-block rounded-full bg-good-bg px-2.5 py-1.5 font-mono text-xs font-medium text-good">
                In progress
              </span>
            ) : (
              <span className="mb-3.5 inline-block rounded-full bg-mark px-2.5 py-1.5 font-mono text-xs font-medium text-ink">
                Starts {formatDistanceToNowStrict(new Date(next.startsAt), { addSuffix: true })}
              </span>
            )}
            <h2 className="mb-1.5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight">
              {next.name}
            </h2>
            <p className="mb-1 text-soft">
              {next.courseCode} · {next.reason}
            </p>
            <p className="font-mono text-[13px] text-muted">
              {formatDay(next.startsAt)} · {formatTime(next.startsAt)} · {next.lecturer}
            </p>
          </div>

          <div className="flex min-w-0 flex-[0_1_260px] flex-col gap-2.5">
            <JoinButton
              large
              canJoin={canJoinMeeting(next.startsAt, next.durationMin, now)}
              onJoin={() => join(next.id)}
            />
            {joinedAt[next.id] ? (
              <p role="status" className="rounded-lg bg-good-bg px-3 py-2.5 text-center text-sm text-good">
                Your join time ({joinedAt[next.id]}) is recorded. Zoom opens here in
                the Zoom step.
              </p>
            ) : (
              <p className="text-center text-[13px] text-muted">
                Opens Zoom. Your join time is recorded.
              </p>
            )}
          </div>
        </section>
      ) : (
        <p className="rounded-[10px] border border-line bg-white p-7 text-muted">
          No meetings coming up. You will be notified when a lecturer schedules one.
        </p>
      )}

      {rest.length > 0 && (
        <section className="rounded-[10px] border border-line bg-white p-[22px]">
          <h2 className="mb-3.5 font-display text-xl font-bold">Coming up</h2>
          <div className="flex flex-col">
            {rest.map((meeting, index) => (
              <div
                key={meeting.id}
                className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5 py-4 ${
                  index === 0 ? 'border-t-2 border-ink' : 'border-t border-line'
                }`}
              >
                <div className="min-w-0">
                  <div className="font-semibold">{meeting.name}</div>
                  <div className="font-mono text-xs text-muted">
                    {meeting.courseCode} · {meeting.reason} · {formatDay(meeting.startsAt)} ·{' '}
                    {formatTime(meeting.startsAt)}
                  </div>
                </div>
                <JoinButton
                  canJoin={canJoinMeeting(meeting.startsAt, meeting.durationMin, now)}
                  onJoin={() => join(meeting.id)}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}