import { Link } from 'react-router-dom'
import Logo from '../../components/ui/logo'

export default function Navbar() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-8">
        <Logo />
        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <a href="#how" className="text-[15px] font-medium hover:text-brand">
            How it works
          </a>
          <a href="#features" className="text-[15px] font-medium hover:text-brand">
            Features
          </a>
          <a href="#faq" className="text-[15px] font-medium hover:text-brand">
            FAQ
          </a>
          <Link
            to="/login"
            className="rounded-lg bg-ink px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand"
          >
            Log in
          </Link>
        </nav>
      </div>
    </header>
  )
}