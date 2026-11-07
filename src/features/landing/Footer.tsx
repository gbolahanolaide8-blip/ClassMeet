export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-x-6 gap-y-2 px-4 pb-9 pt-7 text-sm text-muted sm:px-8">
      <span className="font-display text-base font-extrabold text-ink">
        ClassMeet
      </span>
      <span>&copy; {new Date().getFullYear()} ClassMeet. All rights reserved.</span>
    </footer>
  )
}