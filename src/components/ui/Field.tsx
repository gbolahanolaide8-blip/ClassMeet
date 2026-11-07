import type { UseFormRegisterReturn } from 'react-hook-form'

const inputClass =
  'w-full rounded-lg border-[1.5px] border-[#aeb8d3] bg-white px-3 py-2.5 text-[15px] text-ink placeholder:text-muted/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-invalid:border-bad'

type FieldProps = {
  id: string
  label: string
  placeholder?: string
  type?: string
  error?: string
  registration: UseFormRegisterReturn
}

export default function Field({
  id,
  label,
  placeholder,
  type = 'text',
  error,
  registration,
}: FieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={inputClass}
        {...registration}
      />
      {error && (
        <p role="alert" className="text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  )
} 