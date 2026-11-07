import { Link } from 'react-router-dom'

export default function Cta() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-10 gap-y-6 px-4 py-[72px] sm:px-8">
        <h2 className="min-w-0 flex-[1_1_400px] font-display text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.08] tracking-tight">
          Ready for your first class?
        </h2>
        <Link
          to="/login"
          className="rounded-lg bg-mark px-7 py-4 text-base font-semibold text-ink hover:bg-white"
        >
          Log in to ClassMeet
        </Link>
      </div>
    </section>
  )
}