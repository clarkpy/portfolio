'use client'

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Mail, Telescope, X } from 'lucide-react'
import Typewriter from 'typewriter-effect/dist/core'
import BreadcrumbNav from './components/BreadcrumbNav'
import bannerImage from '../public/banner.png'
import lovac from '../public/lovac.png'
import superstudy from '../public/superstudy.png'
import artifacts from '../public/artifacts.png'
import portfolio from '../public/portfolio.png'

type ToastItem = {
  id: number
  remainingMs: number
  paused: boolean
}

const projects = [
  {
    title: "Lovac",
    description: "A ticket-based support system with cross compatibility.",
    image: lovac,
    tags: ["React", "Typescript", "Docker"],
    sourceUrl: "https://github.com/clarkpy/lovac-backend",
    visitUrl: "https://github.com/clarkpy/lovac-frontend"
  },
  {
    title: "SuperStudy",
    description: "A complex and reactive study system for students",
    image: superstudy,
    tags: ["React", "TailwindCSS", "Kotlin"],
    sourceUrl: "https://github.com/clarkpy/SuperStudy",
    visitUrl: "https://snowyjs.lol/projects/superstudy"
  },
  {
    title: "Artifacts",
    description: "An advanced and reliable Jitpack alternative",
    image: artifacts,
    tags: ["React", "NextJS", "TypeScript"],
    sourceUrl: "https://github.com/clarkpy/ByteStore-Frontend",
    visitUrl: "https://snowyjs.lol/projects/artifacts"
  },
  {
    title: "Portfolio",
    description: "The source code for this portfolio website",
    image: portfolio,
    tags: ["React", "NextJS", "TypeScript"],
    sourceUrl: "https://github.com/clarkpy/portfolio",
    visitUrl: "https://snowyjs.lol"
  }
]


function TypewriterEffect() {
  const typewriterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typewriterRef.current) {
      const typewriter = new Typewriter(typewriterRef.current, {
        loop: true,
        delay: 75,
      })

      typewriter
        .typeString("Hey! I'm AJ")
        .pauseFor(2000)
        .deleteChars(2)
        .typeString("clarkpy")
        .pauseFor(2000)
        .deleteChars(7)
        .typeString("snowy")
        .pauseFor(2000)
        .start()
    }
  }, [])

  return (
    <h1 className="text-4xl font-bold font-mono text-[#DCB8B0]">
      <div ref={typewriterRef} aria-hidden="true" />
      <span className="sr-only">Hi, I&apos;m AJ</span>
    </h1>
  )
}

export default function Home() {
  const BLOG_TOAST_DURATION_MS = 3600
  const BLOG_TOAST_TICK_MS = 100
  const [blogToasts, setBlogToasts] = useState<ToastItem[]>([])
  const blogToastIdRef = useRef(0)

  const showBlogRedevelopmentToast = () => {
    const nextId = blogToastIdRef.current + 1
    blogToastIdRef.current = nextId

    setBlogToasts((prev) => [
      {
        id: nextId,
        remainingMs: BLOG_TOAST_DURATION_MS,
        paused: false
      },
      ...prev
    ])
  }

  const closeBlogToast = (id: number) => {
    setBlogToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const pauseBlogToastCountdown = (id: number) => {
    setBlogToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, paused: true } : toast))
    )
  }

  const resumeBlogToastCountdown = (id: number) => {
    setBlogToasts((prev) =>
      prev.map((toast) => (toast.id === id ? { ...toast, paused: false } : toast))
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setBlogToasts((prev) =>
        prev.flatMap((toast) => {
          if (toast.paused) {
            return [toast]
          }

          const remainingMs = toast.remainingMs - BLOG_TOAST_TICK_MS

          if (remainingMs <= 0) {
            return []
          }

          return [{ ...toast, remainingMs }]
        })
      )
    }, BLOG_TOAST_TICK_MS)

    return () => clearInterval(interval)
  }, [])

  const getBlogToastProgressPercent = (remainingMs: number) =>
    Math.max(0, Math.min(100, (remainingMs / BLOG_TOAST_DURATION_MS) * 100))

  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative">
      <div className="fixed top-5 right-5 z-50 w-[min(92vw,22.5rem)] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence initial={false} mode="popLayout">
          {blogToasts.map((toast) => (
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
                onMouseEnter={() => pauseBlogToastCountdown(toast.id)}
                onMouseLeave={() => resumeBlogToastCountdown(toast.id)}
              >
                <motion.div
                  className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#DCB8B0]/7 blur-2xl"
                  animate={{ opacity: [0.22, 0.34, 0.22], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                />

                <button
                  type="button"
                  onClick={() => closeBlogToast(toast.id)}
                  aria-label="Close notification"
                  className="absolute right-2.5 top-2.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#DCB8B0]/40 text-[#DCB8B0] hover:bg-[#DCB8B0]/15 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>

                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#DCB8B0] mb-1">Section Unavailable</p>
                <p className="font-mono text-base text-[#DCB8B0] mb-1">Blogs Under Redevelopment</p>
                <p className="text-xs text-[#D2D2D4] pr-7">The blogs section is currently being rebuilt.</p>

                <div className="mt-2.5 h-0.5 rounded-full bg-[#DCB8B0]/15 overflow-hidden">
                  <div
                    className="h-full bg-[#DCB8B0]/65 transition-[width] duration-100 ease-linear"
                    style={{ width: `${getBlogToastProgressPercent(toast.remainingMs)}%` }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <BreadcrumbNav />
        </nav>

        <div className="mb-16 rounded-lg overflow-hidden">
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              alt="banner"
              className="w-full h-[300px] object-cover"
              height={300}
              width={1200}
              src={bannerImage}
            />
          </motion.div>
        </div>

        <header className="space-y-4 max-w-3xl mx-auto text-center mb-16">
          <div className="space-y-4">
            <TypewriterEffect />
            <div className="flex justify-center space-x-4">
              <Link
                className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors flex items-center space-x-2"
                href="mailto:me@snowyjs.lol"
              >
                <Mail className="h-4 w-4" />
                <span>me@snowyjs.lol</span>
              </Link>
              <Link
                className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors flex items-center space-x-2"
                href="https://github.com/clarkpy"
              >
                <Github className="h-4 w-4" />
                <span>@clarkpy</span>
              </Link>
            </div>
          </div>
          <p className="text-[#D2D2D4] leading-relaxed">
          I&apos;m studying cyber security alongside web development.
          </p>
          <div className="flex justify-center space-x-4">
            <Link className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="who">
              whoami
            </Link>
            <Link className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="experience">
              work
            </Link>
            <button
              type="button"
              onClick={showBlogRedevelopmentToast}
              className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
            >
              blog
            </button>
            <Link className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="projects">
              projects
            </Link>
            <Link className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="github">
              github
            </Link>
          </div>
        </header>

        <section className="mt-16">
          <h2 className="text-xl text-[#DCB8B0] font-mono mb-4"><b>showcase</b></h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
              
                whileHover={{ scale: 1.05, y: -10}}
                transition={{ type: "", stiffness: 300, damping: 20 }}
                key={index}
              >
                
                <div 
                  key={index}
                  className="bg-[#1A1721]/80 border border-white/10 rounded-lg overflow-hidden"
                >
                  <Link href={`project/${project.title.toLowerCase()}`}>
                    <div className="aspect-video relative cursor-pointer">
                      <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="p-4">
                    <h3 className="font-mono text-[#DCB8B0] text-lg mb-3 font-bold cursor-pointer"><Link href={`/project/${project.title.toLowerCase()}`}>{project.title}</Link></h3>
                    <p className="font-mono text-[#D2D2D4] text-sm mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1E1E1E] border border-[#333333] rounded text-xs font-mono text-[#D2D2D4]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D2D2D4]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 font-mono text-sm">
                      <Link 
                        href={project.sourceUrl}
                        className="inline-flex items-center text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        view source
                      </Link>

                      <div className="flex justify-end">
                        <Link 
                          href={project.visitUrl}
                          className="inline-flex items-center text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
                        >
                          <Telescope className="w-4 h-4 mr-2" />
                          visit
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 mb-0 text-center">
            <Link 
              href="projects" 
              className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors font-mono text-sm"
            >
              see more projects
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}