import type { UseFormRegisterReturn } from 'react-hook-form'

type Option = { value: string; label: string }

type SelectFieldProps = {
  id: string
  label: string
  options: Option[]
  error?: string
  registration: UseFormRegisterReturn
}

export default function SelectField({
  id,
  label,
  options,
  error,
  registration,
}: SelectFieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={!!error}
        className="w-full rounded-lg border-[1.5px] border-[#aeb8d3] bg-white px-3 py-2.5 text-[15px] text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-invalid:border-bad"
        {...registration}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  )
}