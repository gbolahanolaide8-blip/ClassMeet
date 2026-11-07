import { LogOut, type LucideIcon } from 'lucide-react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Logo from '../ui/logo'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  badge?: number
}

type AppShellProps = {
  navItems: NavItem[]
  user: { initials: string; name: string; detail: string }
  outletContext?: unknown
}

export default function AppShell({ navItems, user, outletContext }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col gap-6 bg-ink px-4 py-5 text-[#c5cdea] md:w-64 md:flex-none md:gap-7 md:py-6">
        <div className="px-2">
          <Logo light />
        </div>

        <nav className="flex flex-wrap gap-1 md:flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] ${
                  isActive
                    ? 'bg-[#222f63] font-semibold text-white'
                    : 'font-medium hover:bg-[#1a2550]'
                }`
              }
            >
              <item.icon className="size-[18px]" aria-hidden="true" />
              {item.label}
              {item.badge ? (
                <span className="ml-auto rounded-full bg-mark px-2 py-0.5 font-mono text-xs font-medium text-ink">
                  {item.badge} new
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 border-t border-[#2a3768] px-2 pt-4 md:mt-auto">
          <span className="grid size-10 flex-none place-items-center rounded-full bg-mark text-sm font-bold text-ink">
            {user.initials}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">
              {user.name}
            </div>
            <div className="truncate text-[13px]">{user.detail}</div>
          </div>
          <Link
            to="/login"
            aria-label="Log out"
            className="rounded-md p-2 hover:bg-[#1a2550]"
          >
            <LogOut className="size-[18px]" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-8 sm:px-10">
        <Outlet context={outletContext} />
      </main>
    </div>
  )
}