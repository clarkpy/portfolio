import Link from "next/link"
import { ArrowLeft, ShieldAlert } from 'lucide-react'
import BreadcrumbNav from '../components/BreadcrumbNav'


export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DCB8B0]/6 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#7f6ea1]/6 blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex items-center mb-16">
          <BreadcrumbNav />
        </nav>

        <section className="mx-auto max-w-1xl rounded-2xl border border-[#DCB8B0]/35 bg-[#1A1721]/92 p-8 sm:p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#DCB8B0]/35 bg-[#DCB8B0]/10">
            <ShieldAlert className="h-6 w-6 text-[#DCB8B0]" />
          </div>

          <p className="font-mono text-s uppercase tracking-[0.2em] text-[#DCB8B0] mb-2">blogs</p>
          <h1 className="font-mono text-4xl sm:text-5xl font-bold text-[#DCB8B0] mb-3">401</h1>
          <h2 className="font-mono text-xl text-[#DCB8B0] mb-4">this area is being redeveloped.</h2>
          <p className="text-[#D2D2D4] leading-relaxed mb-8">
            you can&apos;t see it right now, but it will be available soon.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#DCB8B0] px-5 py-2.5 text-sm font-mono text-[#DCB8B0] hover:bg-[#DCB8B0] hover:text-[#13111C] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            return home
          </Link>
        </section>
      </div>
    </div>
  )
}