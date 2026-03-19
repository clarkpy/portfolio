'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, Music, Code, User, Wifi, ShieldCheck } from 'lucide-react'
import { useDiscordStatus } from './useDiscordStatus'
import { TechStack } from './components/TechStack'
import bannerImage from '../../public/banner.png'

type DiscordUser = {
  id: string
  username: string
  global_name: string | null
  avatar: string | null
}

type DiscordActivity = {
  type: number
  name: string
  details?: string
  state?: string
  timestamps?: {
    start?: number
  }
}

type DiscordPresence = {
  discord_user: DiscordUser
  activities: DiscordActivity[]
}

const ABOUT_PARAGRAPHS = [
  "Hello! I'm a 16 year old student developer from the United Kingdom.",
  "I specialize in Kotlin, React and JavaScript, and I'm always eager to learn new technologies.",
  "When I'm not coding, you can find me listening to music or tinkering with old tech."
]

const DISCORD_LOADING_MS = 2800

const DISCORD_LOADING_STEPS = [
  {
    icon: Code,
    label: 'opening websocket...'
  },
  {
    icon: Wifi,
    label: 'connecting to websocket...'
  },
  {
    icon: ShieldCheck,
    label: 'validating initial response...'
  }
]

function formatElapsedTime(startTimestamp: number) {
  const now = Date.now()
  const elapsedMs = now - startTimestamp
  const hours = Math.floor(elapsedMs / (1000 * 60 * 60))
  const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

function DiscordStatus({ status }: { status: DiscordPresence }) {
  const avatarUrl = status.discord_user.avatar
    ? `https://cdn.discordapp.com/avatars/${status.discord_user.id}/${status.discord_user.avatar}.png`
    : 'https://cdn.discordapp.com/embed/avatars/0.png'

  const customStatus = status.activities.find((activity) => activity.type === 4)
  const gameActivity = status.activities.find((activity) => activity.type === 0)
  const spotifyActivity = status.activities.find((activity) => activity.type === 2)
  const displayName = status.discord_user.global_name || status.discord_user.username

  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-4">
        <Image
          src={avatarUrl}
          alt="Discord Avatar"
          width={72}
          height={72}
          className="rounded-full ring-2 ring-[#DCB8B0]/25"
        />
        <div>
          <h3 className="text-2xl font-bold font-mono text-[#DCB8B0]">{displayName}</h3>
          <p className="text-sm text-[#D2D2D4]/85">@{status.discord_user.username}</p>
        </div>
      </div>

      {customStatus && (
        <div className="flex items-start space-x-3 text-[#D2D2D4]/85">
          <User className="w-5 h-5 text-[#DCB8B0] mt-0.5" />
          <p className="text-sm leading-relaxed">{customStatus.state}</p>
        </div>
      )}

      {gameActivity && (
        <div className="flex items-start space-x-3 text-[#D2D2D4]/85">
          <Code className="w-5 h-5 text-[#DCB8B0] mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm leading-relaxed">
              {gameActivity.name}{gameActivity.details ? `: ${gameActivity.details}` : ''}
            </p>
            {gameActivity.timestamps && gameActivity.timestamps.start && (
              <span className="text-xs flex items-center text-[#D2D2D4]/70">
                <Clock className="w-4 h-4 mr-1" />
                {formatElapsedTime(gameActivity.timestamps.start)}
              </span>
            )}
          </div>
        </div>
      )}

      {spotifyActivity && (
        <div className="flex items-start space-x-3 text-[#D2D2D4]/85">
          <Music className="w-5 h-5 text-[#DCB8B0] mt-0.5" />
          <p className="text-sm leading-relaxed">
            Listening to {spotifyActivity.details} by {spotifyActivity.state}
          </p>
        </div>
      )}
    </div>
  )
}

function DiscordLoadingCard({ stepIndex }: { stepIndex: number }) {
  const currentStep = DISCORD_LOADING_STEPS[stepIndex] ?? DISCORD_LOADING_STEPS[0]
  const StepIcon = currentStep.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-3 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center">
        <motion.span
          className="inline-block h-7 w-7 rounded-full border-[3px] border-[#DCB8B0]/35 border-t-[#DCB8B0]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <p className="text-[13px] font-mono uppercase tracking-[0.14em] text-[#DCB8B0]/80">presence gateway</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 text-xs text-[#D2D2D4]/80 font-mono"
        >
          <StepIcon className="w-4 h-4 text-[#DCB8B0]/90" />
          <span>{currentStep.label}</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default function WhoPage() {
  const [aboutParagraphLengths, setAboutParagraphLengths] = useState([0, 0, 0])
  const [showDiscordLoader, setShowDiscordLoader] = useState(true)
  const [discordLoadingStepIndex, setDiscordLoadingStepIndex] = useState(0)
  const discordStatus = useDiscordStatus('721017166652244018') as DiscordPresence | null

  useEffect(() => {
    setDiscordLoadingStepIndex(0)

    const stepIntervalMs = Math.floor(DISCORD_LOADING_MS / DISCORD_LOADING_STEPS.length)
    const stepTimer = setInterval(() => {
      setDiscordLoadingStepIndex((prev) => {
        if (prev >= DISCORD_LOADING_STEPS.length - 1) {
          clearInterval(stepTimer)
          return prev
        }

        return prev + 1
      })
    }, stepIntervalMs)

    const loaderTimer = setTimeout(() => {
      setShowDiscordLoader(false)
    }, DISCORD_LOADING_MS)

    return () => {
      clearTimeout(loaderTimer)
      clearInterval(stepTimer)
    }
  }, [])

  useEffect(() => {
    setAboutParagraphLengths([0, 0, 0])
    let paragraphIndex = 0

    const paragraphTypingInterval = setInterval(() => {
      setAboutParagraphLengths((prev) => {
        if (paragraphIndex >= ABOUT_PARAGRAPHS.length) {
          clearInterval(paragraphTypingInterval)
          return prev
        }

        const currentParagraph = ABOUT_PARAGRAPHS[paragraphIndex]
        const currentLength = prev[paragraphIndex]

        if (currentLength >= currentParagraph.length) {
          paragraphIndex += 1
          return prev
        }

        const next = [...prev]
        next[paragraphIndex] = currentLength + 2
        return next
      })
    }, 28)

    return () => clearInterval(paragraphTypingInterval)
  }, [])

  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <Link className="flex items-center space-x-2 text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="/">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-mono">back to home</span>
          </Link>
        </nav>

        <div className="mb-16 rounded-lg overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              alt="Whoami banner"
              className="w-full h-[300px] object-cover"
              height={300}
              width={1200}
              src={bannerImage}
            />
          </motion.div>
        </div>

        <header className="space-y-4 max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold font-mono text-[#DCB8B0]">whoami</h1>
          <p className="text-[#D2D2D4] leading-relaxed">
            A quick overview of who I am, what I use, and what I&apos;m currently up to.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="bg-[#1A1721]/80 border border-white/10 rounded-xl p-6 sm:p-8 min-h-[320px]"
          >
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0] mb-5">About Me</h2>
            <div className="space-y-4 text-[#D2D2D4]/90 leading-relaxed min-h-[170px]">
              {ABOUT_PARAGRAPHS.map((paragraph, index) => {
                const visibleText = paragraph.slice(0, aboutParagraphLengths[index])
                const showCursor = aboutParagraphLengths[index] < paragraph.length

                return (
                  <p key={index}>
                    {visibleText.replace(/'/g, "'")}
                    {showCursor && (
                      <motion.span
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.75, repeat: Infinity, ease: 'easeInOut' }}
                        className="ml-0.5"
                      >
                        _
                      </motion.span>
                    )}
                  </p>
                )
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="bg-[#1A1721]/80 border border-white/10 rounded-xl p-6 sm:p-8 min-h-[320px]"
          >
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0] mb-5">Discord Status</h2>
            <AnimatePresence mode="wait">
              {showDiscordLoader ? (
                <motion.div
                  key="discord-loader"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="min-h-[240px] flex items-center justify-center"
                >
                  <div className="w-full max-w-xs">
                    <DiscordLoadingCard stepIndex={discordLoadingStepIndex} />
                  </div>
                </motion.div>
              ) : discordStatus ? (
                <motion.div
                  key="discord-live"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <DiscordStatus status={discordStatus} />
                </motion.div>
              ) : (
                <motion.p
                  key="discord-fallback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-[#D2D2D4]/80"
                >
                  fetching discord status...
                </motion.p>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.005 }}
            className="lg:col-span-2 bg-[#1A1721]/80 border border-white/10 rounded-xl p-6 sm:p-8"
          >
            <TechStack />
          </motion.section>
        </div>
      </div>
    </div>
  )
}
