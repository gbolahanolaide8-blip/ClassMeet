export default function PageStub({ title }: { title: string }) {
  return (
    <div>
      <h1 className="mb-1 font-display text-[34px] font-extrabold tracking-tight">
        {title}
      </h1>
      <p className="text-muted">This page is built in a later step.</p>
    </div>
  )
}