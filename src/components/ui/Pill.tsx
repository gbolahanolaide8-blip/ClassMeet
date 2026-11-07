import type { ReactNode } from 'react'

export type Tone = 'good' | 'warn' | 'bad' | 'neutral' | 'info'

const tones: Record<Tone, string> = {
  good: 'bg-good-bg text-good',
  warn: 'bg-warn-bg text-warn',
  bad: 'bg-bad-bg text-bad',
    neutral: 'bg-[#e8ebf3] text-muted',
  info: 'bg-[#e3e8fb] text-brand-dark',
}


export default function Pill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 font-mono text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}