type Role = {
  label: string
  title: string
  steps: string[]
  border: string
  text: string
}

const roles: Role[] = [
  {
    label: 'Super admin',
    title: 'Adds the lecturers',
    steps: [
      'Adds a lecturer with name, email and staff ID.',
      'The lecturer gets an email invite to set a password.',
      'Switches a lecturer off when they leave.',
    ],
    border: 'border-ink',
    text: 'text-ink',
  },
  {
    label: 'Lecturer',
    title: 'Sets up the class',
    steps: [
      'Adds students one by one, or imports a CSV file.',
      'Creates a meeting with a name, a reason, a date and a time.',
      'Every student is notified the moment it is saved.',
    ],
    border: 'border-brand',
    text: 'text-brand',
  },
  {
    label: 'Student',
    title: 'Joins in one click',
    steps: [
      'Sees the alert and the email with the date and time.',
      'Presses Join when the class opens.',
      'Time joined and time left are recorded for them.',
    ],
    border: 'border-good',
    text: 'text-good',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-y border-line bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-8">
        <h2 className="mb-3 font-display text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.1] tracking-tight">
          Three people, one flow
        </h2>
        <p className="mb-11 max-w-[620px] text-lg text-soft">
          Everyone has their own dashboard and sees only what belongs to them.
        </p>

        <div className="flex flex-wrap gap-x-12 gap-y-10">
          {roles.map((role) => (
            <div
              key={role.label}
              className={`min-w-0 flex-[1_1_300px] border-t-[3px] pt-5 ${role.border}`}
            >
              <p
                className={`mb-1.5 font-mono text-xs uppercase tracking-[0.08em] ${role.text}`}
              >
                {role.label}
              </p>
              <h3 className="mb-5 font-display text-2xl font-bold tracking-tight">
                {role.title}
              </h3>
              <ol className="flex flex-col gap-4">
                {role.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3.5">
                    <span
                      className={`grid size-7 flex-none place-items-center rounded-full border-[1.5px] font-mono text-[13px] ${role.border} ${role.text}`}
                    >
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}