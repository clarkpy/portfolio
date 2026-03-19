'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function ProjectDetailsNotFound() {
  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative flex items-center justify-center px-6 overflow-hidden">
      <motion.div
        className="absolute -top-28 -left-24 h-72 w-72 rounded-full bg-[#DCB8B0]/6 blur-3xl"
        animate={{ scale: [1, 1.05, 1], opacity: [0.16, 0.22, 0.16] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#7f6ea1]/6 blur-3xl"
        animate={{ scale: [1.03, 1, 1.03], opacity: [0.14, 0.2, 0.14] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-[#1A1721]/86 backdrop-blur-[2px] p-8 sm:p-10 text-center relative shadow-[0_8px_30px_rgba(0,0,0,0.22)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <motion.div
          className="absolute left-6 right-6 top-0 h-px bg-gradient-to-r from-transparent via-[#DCB8B0]/80 to-transparent"
          initial={{ scaleX: 0.3, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <p className="font-mono text-sm uppercase tracking-[0.22em] text-[#DCB8B0] mb-3">Project details</p>
        <h1 className="text-3xl sm:text-4xl font-bold font-mono text-[#DCB8B0] mb-4">details not found</h1>

        <div className="space-y-3 mb-8">
          <p className="text-[#D2D2D4] leading-relaxed">this project has no details to show at this time.</p>
          <motion.p
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DCB8B0]/35 bg-[#DCB8B0]/7 px-4 py-2 text-sm text-[#D2D2D4]"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-mono text-[#DCB8B0]">i.e.</span>
            <span>it is deprecated or has been removed.</span>
          </motion.p>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm border border-[#DCB8B0] text-[#DCB8B0] rounded-full hover:bg-[#DCB8B0] hover:text-[#13111C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          back to projects
        </Link>
      </motion.div>
    </div>
  )
}
