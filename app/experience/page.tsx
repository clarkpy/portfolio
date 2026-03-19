'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import type { StaticImageData } from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Tilt from 'react-parallax-tilt'
import BreadcrumbNav from '../components/BreadcrumbNav'
import minecrush from '../../public/minecrush.png'
import akrylic from '../../public/akrylic.jpg'
import feather from '../../public/feather.png'
import dupecrush from '../../public/dupecrush.png'
import hardcore from '../../public/hardcore.png'

type WorkExperience = {
  title: string
  company: string
  period: string
  description: string
  image: StaticImageData
}

type ToastItem = {
  id: number
  remainingMs: number
  paused: boolean
}

const workExperiences: WorkExperience[] = [
  {
    title: "Staff Member",
    company: "Feather Client",
    period: "October 2024 - March 2025",
    description: "Handling user support requests and troubleshooting issues.",
    image: feather
  },
  {
    title: "Backend Developer",
    company: "Akrylic Entertainment",
    period: "October 2024 - March 2025",
    description: "Creating intuitive systems for Clients.",
    image: akrylic
  },
  {
    title: "Backend Developer",
    company: "Hardcore.rip",
    period: "March 2024 - Present",
    description: "Developed custom plugins and features for a Minecraft server.",
    image: hardcore
  },
  {
    title: "Systems Engineer",
    company: "MineCrush",
    period: "March 2024 - November 2024",
    description: "Developed numerous security systems to protect against foul play.",
    image: minecrush
  },
  {
    title: "Chief Executive Officer",
    company: "DupeCrush",
    period: "September 2023 - February 2024",
    description: "Created custom game mechanics and systems for a Minecraft server.",
    image: dupecrush
  }
]

export default function ExperiencePage() {
  const TOAST_DURATION_MS = 3600
  const TOAST_TICK_MS = 100
  const [educationToasts, setEducationToasts] = useState<ToastItem[]>([])
  const [showAllWork, setShowAllWork] = useState(false)
  const educationToastIdRef = useRef(0)

  const showEducationToast = () => {
    const nextId = educationToastIdRef.current + 1
    educationToastIdRef.current = nextId

    setEducationToasts((prev) => [
      {
        id: nextId,
        remainingMs: TOAST_DURATION_MS,
        paused: false
      },
      ...prev
    ])
  }

  const closeEducationToast = (id: number) => {
    setEducationToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const pauseEducationToastCountdown = (id: number) => {
    setEducationToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, paused: true } : toast))
    )
  }

  const resumeEducationToastCountdown = (id: number) => {
    setEducationToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, paused: false } : toast))
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setEducationToasts((prev) =>
        prev.flatMap((toast) => {
          if (toast.paused) {
            return [toast]
          }

          const remainingMs = toast.remainingMs - TOAST_TICK_MS

          if (remainingMs <= 0) {
            return []
          }

          return [{ ...toast, remainingMs }]
        })
      )
    }, TOAST_TICK_MS)

    return () => clearInterval(interval)
  }, [])

  const getToastProgressPercent = (remainingMs: number) =>
    Math.max(0, Math.min(100, (remainingMs / TOAST_DURATION_MS) * 100))

  const toggleShowMore = () => {
    setShowAllWork(prev => !prev)
  }

  const renderExperienceItem = (item: WorkExperience, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      layout
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        scale={1.02}
        transitionSpeed={2000}
        className="w-full"
      >
        <Card className="bg-[#1A1721]/80 border-white/10 mb-4 transform-gpu">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={`${item.company} logo`}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-[#DCB8B0] mb-2">{item.title}</h3>
                <p className="text-[#D2D2D4] mb-2">{item.company}</p>
                <p className="text-sm text-[#D2D2D4] mb-4">{item.period}</p>
                <p className="text-[#D2D2D4]">{item.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tilt>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative">
      <div className="fixed top-5 right-5 z-50 w-[min(92vw,22.5rem)] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence initial={false} mode="popLayout">
          {educationToasts.map((toast) => (
            <motion.div
              layout
              key={toast.id}
              initial={{ opacity: 0, y: -16, x: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 52, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="pointer-events-auto"
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-[#DCB8B0]/35 bg-[#1A1721]/95 shadow-[0_10px_24px_rgba(0,0,0,0.3)] px-4 py-3"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                onMouseEnter={() => pauseEducationToastCountdown(toast.id)}
                onMouseLeave={() => resumeEducationToastCountdown(toast.id)}
              >
                <motion.div
                  className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#DCB8B0]/7 blur-2xl"
                  animate={{ opacity: [0.22, 0.34, 0.22], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />

                <button
                  type="button"
                  onClick={() => closeEducationToast(toast.id)}
                  aria-label="Close notification"
                  className="absolute right-2.5 top-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#DCB8B0]/40 text-[#DCB8B0] hover:bg-[#DCB8B0]/15 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>

                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#DCB8B0] mb-1">Section Unavailable</p>
                <p className="font-mono text-base text-[#DCB8B0] mb-1">404 Not Found</p>
                <p className="text-xs text-[#D2D2D4] pr-7">the section was not found..</p>

                <div className="mt-2.5 h-0.5 rounded-full bg-[#DCB8B0]/15 overflow-hidden">
                  <div
                    className="h-full bg-[#DCB8B0]/65 transition-[width] duration-100 ease-linear"
                    style={{ width: `${getToastProgressPercent(toast.remainingMs)}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <BreadcrumbNav />
        </nav>

        <header className="space-y-4 max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold font-mono text-[#DCB8B0]">Work & Education</h1>
          <p className="text-[#D2D2D4] leading-relaxed">
            some of what i&apos;ve been up to.
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            onClick={showEducationToast}
            className="text-[#DCB8B0] border border-[#DCB8B0] bg-[#1A1721] hover:text-[#13111C] hover:bg-[#DCB8B0] transition-colors"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Switch to Education
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="work"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0] mb-6 flex items-center">
              <Briefcase className="mr-2" /> Experience
            </h2>

            <motion.div layout>
              {workExperiences.slice(0, showAllWork ? undefined : 3).map(renderExperienceItem)}
            </motion.div>

            {workExperiences.length > 3 && (
              <Button
                variant="outline"
                onClick={toggleShowMore}
                className="w-full mt-4 text-[#DCB8B0] border border-[#DCB8B0] bg-[#1A1721] hover:text-[#13111C] hover:bg-[#DCB8B0] transition-colors"
              >
                {showAllWork ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show More
                  </>
                )}
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}