const questions = [
  {
    q: 'Who creates the accounts?',
    a: 'The super admin adds lecturers. Lecturers add their own students. Nobody signs up on their own.',
  },
  {
    q: 'Do students need a Zoom account?',
    a: 'No. Students press Join in ClassMeet and Zoom opens in the browser or the app.',
  },
  {
    q: 'How is attendance counted?',
    a: 'Zoom reports when each person joins and leaves. ClassMeet saves both times and adds up the minutes, including if someone drops and rejoins.',
  },
  {
    q: 'What counts as late?',
    a: 'Joining after the grace period set by the lecturer, for example 15 minutes after the start time.',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-x-16 gap-y-10 px-4 py-20 sm:px-8">
        <h2 className="min-w-0 flex-[1_1_280px] self-start font-display text-[clamp(30px,3.6vw,44px)] font-bold leading-[1.1] tracking-tight">
          Questions people ask
        </h2>
        <div className="flex min-w-0 flex-[2_1_520px] flex-col">
          {questions.map((item, index) => (
            <div
              key={item.q}
              className={`py-5 ${
                index === 0 ? 'border-t-2 border-ink' : 'border-t border-line'
              }`}
            >
              <h3 className="mb-1.5 text-lg font-semibold">{item.q}</h3>
              <p className="text-soft">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}