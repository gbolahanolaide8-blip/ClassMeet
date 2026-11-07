import { Upload } from 'lucide-react'
import Papa from 'papaparse'
import { useRef, useState } from 'react'
import { z } from 'zod'
import type { NewStudent, Student } from '../../types/classroom'
import { plural } from '../../lib/plural'

const required = ['matric_no', 'full_name', 'email']

const rowSchema = z.object({
  matric_no: z.string().trim().min(1, 'Missing matric number'),
  full_name: z.string().trim().min(2, 'Missing name'),
  email: z.string().trim().min(1, 'Missing email').email('Invalid email'),
})

type PreviewRow = {
  line: number
  matricNo: string
  fullName: string
  email: string
  error?: string
}

const template =
  'matric_no,full_name,email\n2023010999,Example Student,example.student@school.edu.ng\n'
const templateHref = `data:text/csv;charset=utf-8,${encodeURIComponent(template)}`

type CsvImportProps = {
  existing: Student[]
  onImport: (students: NewStudent[]) => void
}

export default function CsvImport({ existing, onImport }: CsvImportProps) {
  const [rows, setRows] = useState<PreviewRow[]>([])
  const [fileError, setFileError] = useState('')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const validRows = rows.filter((row) => !row.error)

  const reset = () => {
    setRows([])
    setFileError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleFile = (file: File) => {
    setMessage('')
    setFileError('')
    setRows([])

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (result) => {
        const fields = result.meta.fields ?? []
        const missing = required.filter((name) => !fields.includes(name))
        if (missing.length > 0) {
          setFileError(
            `Missing columns: ${missing.join(', ')}. Download the template to see the right headers.`,
          )
          return
        }

        const seenMatric = new Set(existing.map((s) => s.matricNo.toLowerCase()))
        const seenEmail = new Set(existing.map((s) => s.email.toLowerCase()))

        const parsed: PreviewRow[] = result.data.map((raw, index) => {
          const line = index + 2
          const base = {
            line,
            matricNo: raw.matric_no ?? '',
            fullName: raw.full_name ?? '',
            email: raw.email ?? '',
          }

          const check = rowSchema.safeParse(raw)
          if (!check.success) {
            return { ...base, error: check.error.issues[0].message }
          }

          const matricKey = check.data.matric_no.toLowerCase()
          const emailKey = check.data.email.toLowerCase()
          if (seenMatric.has(matricKey)) {
            return { ...base, error: 'Already in this class (matric number)' }
          }
          if (seenEmail.has(emailKey)) {
            return { ...base, error: 'Already in this class (email)' }
          }

          seenMatric.add(matricKey)
          seenEmail.add(emailKey)
          return {
            line,
            matricNo: check.data.matric_no,
            fullName: check.data.full_name,
            email: check.data.email,
          }
        })

        if (parsed.length === 0) {
          setFileError('That file has no student rows.')
          return
        }
        setRows(parsed)
      },
      error: () => setFileError('That file could not be read.'),
    })
  }

  const handleImport = () => {
    onImport(
      validRows.map((row) => ({
        matricNo: row.matricNo,
        fullName: row.fullName,
        email: row.email,
      })),
    )
    setMessage(`Imported ${plural(validRows.length, 'student')}.`)
    reset()
  }

  return (
    <section className="flex flex-col gap-4 rounded-[10px] border border-line bg-white p-[22px]">
      <div>
        <h3 className="mb-1 font-display text-xl font-bold">Import from CSV</h3>
        <p className="text-sm text-muted">
          Add a whole class from a file with matric number, full name and email.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[#aeb8d3] p-6 text-center">
        <Upload className="size-6 text-brand" aria-hidden="true" />
        <input
          ref={inputRef}
          id="csv-file"
          type="file"
          accept=".csv,text/csv"
          className="peer sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
        <label
          htmlFor="csv-file"
          className="cursor-pointer rounded-lg border-[1.5px] border-ink px-4 py-2 text-sm font-semibold hover:bg-paper peer-focus-visible:ring-2 peer-focus-visible:ring-brand"
        >
          Choose a CSV file
        </label>
        <a
          href={templateHref}
          download="classmeet-students-template.csv"
          className="text-sm text-brand hover:text-brand-dark"
        >
          Download the template
        </a>
      </div>

      {fileError && (
        <p role="alert" className="rounded-lg bg-bad-bg px-4 py-3 text-sm text-bad">
          {fileError}
        </p>
      )}

      {message && (
        <p role="status" className="rounded-lg bg-good-bg px-4 py-3 text-sm text-good">
          {message}
        </p>
      )}

      {rows.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[13px] text-muted">
            {validRows.length} ready to import · {rows.length - validRows.length} with problems
          </p>

          <div className="max-h-72 overflow-auto rounded-lg border border-line">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-ink font-mono text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-3 py-2 font-medium">Row</th>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Matric no.</th>
                  <th className="px-3 py-2 font-medium">Check</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.line} className="border-b border-line last:border-b-0">
                    <td className="px-3 py-2 font-mono text-[13px]">{row.line}</td>
                    <td className="px-3 py-2">{row.fullName || '—'}</td>
                    <td className="px-3 py-2 font-mono text-[13px]">{row.matricNo || '—'}</td>
                    <td className="px-3 py-2">
                      {row.error ? (
                        <span className="text-bad">{row.error}</span>
                      ) : (
                        <span className="text-good">Ready</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleImport}
              disabled={validRows.length === 0}
              className="rounded-lg bg-brand px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-[#aeb8d3]"
            >
                Import {plural(validRows.length, 'student')}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border-[1.5px] border-ink px-5 py-2.5 text-[15px] font-semibold hover:bg-paper"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  )
}