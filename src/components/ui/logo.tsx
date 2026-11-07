import { Video } from 'lucide-react'
import { Link } from 'react-router-dom'

type LogoProps = {
  light?: boolean
}

export default function Logo({ light = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 ${light ? 'text-white' : 'text-ink'}`}
    >
      <span className="grid size-9 place-items-center rounded-lg bg-brand">
        <Video className="size-5 text-white" aria-hidden="true" />
      </span>
      <span className="font-display text-[22px] font-extrabold tracking-tight">
        ClassMeet
      </span>
    </Link>
  )
}