import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import Logo from '../../components/ui/logo'

const schema = z.object({
  email: z
    .string()
    .min(1, 'Enter your email')
    .email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
})

type LoginValues = z.infer<typeof schema>

const inputClass =
  'w-full rounded-lg border-[1.5px] border-[#aeb8d3] bg-white px-3.5 py-3 text-base text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-invalid:border-bad'

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(schema) })

  const onSubmit = () => {
    // Real sign in is added in the Firebase step.
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-wrap">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col justify-between gap-12 bg-ink px-8 py-10 text-white sm:px-14 sm:py-12">
        <Logo light />
        <div>
          <h1 className="mb-4 font-display text-[clamp(34px,4vw,52px)] font-extrabold leading-[1.05] tracking-tight">
            Your class is waiting{' '}
            <span className="rounded-sm bg-mark px-2 text-ink">
              on the other side.
            </span>
          </h1>
          <p className="max-w-[440px] text-lg text-[#c5cdea]">
            Log in to see your meetings, your students and your attendance.
          </p>
        </div>
        <p className="font-mono text-xs text-[#9aa6cf]">
          Accounts are created by invitation only.
        </p>
      </div>

      <div className="grid min-w-0 flex-[1_1_440px] place-items-center px-4 py-12 sm:px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full max-w-[400px] flex-col gap-5"
        >
          <div>
            <h2 className="mb-1.5 font-display text-[32px] font-bold tracking-tight">
              Log in
            </h2>
            <p className="text-muted">Use the email your invite was sent to.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@school.edu.ng"
              aria-invalid={!!errors.email}
              className={inputClass}
              {...register('email')}
            />
            {errors.email && (
              <p role="alert" className="text-sm text-bad">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <a href="#" className="text-sm text-brand hover:text-brand-dark">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              aria-invalid={!!errors.password}
              className={inputClass}
              {...register('password')}
            />
            {errors.password && (
              <p role="alert" className="text-sm text-bad">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-lg bg-brand px-5 py-4 text-base font-semibold text-white hover:bg-brand-dark"
          >
            Log in
          </button>

          {submitted && (
            <p
              role="status"
              className="rounded-lg bg-warn-bg px-4 py-3 text-sm text-warn"
            >
              Your details look fine. Real sign in is connected in the Firebase
              step.
            </p>
          )}
                  <div className="border-t border-line pt-4 text-sm text-muted">
            <span className="mb-2 block">Preview the dashboards as:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-semibold">
              <Link to="/admin" className="text-brand hover:text-brand-dark">
                Super admin
              </Link>
              <Link to="/lecturer" className="text-brand hover:text-brand-dark">
                Lecturer
              </Link>
              <Link to="/student" className="text-brand hover:text-brand-dark">
                Student
              </Link>
            </div>
          </div>
          <Link to="/" className="text-sm text-muted hover:text-brand">
            &larr; Back to the home page
          </Link>
        </form> 
      </div>
    </div>
  )
}