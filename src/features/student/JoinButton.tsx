import { Video } from 'lucide-react'
import { JOIN_OPENS_MINUTES_BEFORE } from '../../lib/dates'

type JoinButtonProps = {
  canJoin: boolean
  large?: boolean
  onJoin: () => void
}

export default function JoinButton({ canJoin, large = false, onJoin }: JoinButtonProps) {
  if (!canJoin) {
    return (
      <button
        type="button"
        disabled
        className="rounded-lg bg-[#e8ebf3] px-3.5 py-2.5 text-sm font-semibold text-muted"
      >
        Opens {JOIN_OPENS_MINUTES_BEFORE} min before
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onJoin}
      className={`inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand font-semibold text-white hover:bg-brand-dark ${
        large ? 'px-6 py-4 text-[17px]' : 'px-4 py-2.5 text-sm'
      }`}
    >
      <Video className={large ? 'size-5' : 'size-4'} aria-hidden="true" />
      Join meeting
    </button>
  )
}