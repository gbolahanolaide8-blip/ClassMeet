import { Bell, Clock, Download, Upload, type LucideIcon } from 'lucide-react'

type Feature = {
  icon: LucideIcon
  title: string
  text: string
}

const features: Feature[] = [
  {
    icon: Upload,
    title: 'Import a class from CSV',
    text: 'Drop in a file of matric numbers, names and emails. ClassMeet shows a preview and flags bad rows before saving.',
  },
  {
    icon: Bell,
    title: 'Everyone hears at once',
    text: 'Saving a meeting sends an alert in the app and an email to every student in that class.',
  },
  {
    icon: Clock,
    title: 'Join and leave times',
    text: "Each student's first join, last exit and total minutes appear in the table as the class happens.",
  },
  {
    icon: Download,
    title: 'Attendance you can export',
    text: "Download any meeting's register as a CSV for your records or for the department.",
  },
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
      <h2 className="mb-11 max-w-[640px] font-display text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.1] tracking-tight">
        Built around how a class actually runs
      </h2>
      <div className="flex flex-wrap gap-x-10 gap-y-9">
        {features.map((feature) => (
          <div key={feature.title} className="min-w-0 flex-[1_1_240px]">
            <span className="mb-4 grid size-11 place-items-center rounded-[10px] bg-[#e3e8fb]">
              <feature.icon className="size-[22px] text-brand" aria-hidden="true" />
            </span>
            <h3 className="mb-1.5 font-display text-xl font-bold">
              {feature.title}
            </h3>
            <p className="text-soft">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}