'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { CalendarDays, ChevronDown, ChevronUp, Cpu, Github, LoaderCircle, ShieldCheck, Sparkles, Star, Telescope, Wifi } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import BreadcrumbNav from '../components/BreadcrumbNav'

interface Repo {
  id: number
  name: string
  description: string
  stargazers_count: number
  updated_at: string
  html_url: string
  topics: string[]
  homepage: string
}

type SortOption = 'updated' | 'stars' | 'name'
type RepoCardTone = 'compact' | 'balanced' | 'expanded'

const INITIAL_REPO_LIMIT = 6
const GITHUB_LOADING_MS = 2800

const GITHUB_LOADING_STEPS = [
  {
    icon: Cpu,
    label: 'booting github indexer...'
  },
  {
    icon: Wifi,
    label: 'connecting to api.github.com...'
  },
  {
    icon: ShieldCheck,
    label: 'hydrating repository cards...'
  }
]

function getRepoCardTone(repo: Repo): RepoCardTone {
  const descriptionLength = (repo.description ?? '').trim().length
  const topicCount = repo.topics?.length ?? 0
  const linkWeight = repo.homepage ? 2 : 1
  const detailsScore = descriptionLength / 28 + topicCount * 1.1 + linkWeight

  if (detailsScore >= 10) {
    return 'expanded'
  }

  if (detailsScore >= 6) {
    return 'balanced'
  }

  return 'compact'
}

function getRepoCardSpanClass(tone: RepoCardTone) {
  if (tone === 'expanded') {
    return 'lg:col-span-2'
  }

  return ''
}

function getDescriptionForTone(description: string | null | undefined, tone: RepoCardTone) {
  const fallback = 'No description available'
  const content = (description ?? '').trim() || fallback

  if (tone === 'compact' && content.length > 110) {
    return `${content.slice(0, 107)}...`
  }

  if (tone === 'balanced' && content.length > 190) {
    return `${content.slice(0, 187)}...`
  }

  return content
}

function GitHubLoadingCard({ stepIndex }: { stepIndex: number }) {
  const currentStep = GITHUB_LOADING_STEPS[stepIndex] ?? GITHUB_LOADING_STEPS[0]
  const StepIcon = currentStep.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-3 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#DCB8B0]/30 bg-[#DCB8B0]/8">
        <LoaderCircle className="h-7 w-7 text-[#DCB8B0] animate-spin" />
      </div>

      <p className="text-[13px] font-mono uppercase tracking-[0.14em] text-[#DCB8B0]/80">repository gateway</p>

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

export default function GitHubPage() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingStepIndex, setLoadingStepIndex] = useState(0)
  const [showAllRepos, setShowAllRepos] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>('updated')

  useEffect(() => {
    let isMounted = true
    const loadStartTime = Date.now()

    setLoadingStepIndex(0)

    const stepIntervalMs = Math.floor(GITHUB_LOADING_MS / GITHUB_LOADING_STEPS.length)
    const stepTimer = setInterval(() => {
      setLoadingStepIndex((prev) => {
        if (prev >= GITHUB_LOADING_STEPS.length - 1) {
          clearInterval(stepTimer)
          return prev
        }

        return prev + 1
      })
    }, stepIntervalMs)

    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/clarkpy/repos')

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`)
        }

        const data = await response.json()

        if (isMounted) {
          setRepos(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error fetching repos:', error)
      } finally {
        const elapsedTime = Date.now() - loadStartTime
        const remainingLoadingTime = Math.max(0, GITHUB_LOADING_MS - elapsedTime)

        setTimeout(() => {
          if (isMounted) {
            setLoading(false)
          }
        }, remainingLoadingTime)
      }
    }

    fetchRepos()

    return () => {
      isMounted = false
      clearInterval(stepTimer)
    }
  }, [])

  const sortedRepos = [...repos].sort((a, b) => {
    switch (sortBy) {
      case 'updated':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      case 'stars':
        return b.stargazers_count - a.stargazers_count
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const formatUpdatedAt = (updatedAt: string) => {
    return new Date(updatedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const sortedRepoCount = sortedRepos.length
  const visibleRepos = showAllRepos ? sortedRepos : sortedRepos.slice(0, INITIAL_REPO_LIMIT)
  const hiddenRepoCount = Math.max(sortedRepoCount - INITIAL_REPO_LIMIT, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DCB8B0]/8 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#DCB8B0]/6 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <nav className="flex justify-between items-center mb-16">
            <BreadcrumbNav />
            <div className="w-[180px] h-10 rounded-md border border-[#DCB8B0]/20 bg-[#1A1721]/80 animate-pulse" />
          </nav>

          <div className="mb-16 rounded-xl overflow-hidden border border-[#DCB8B0]/25 shadow-[0_8px_26px_rgba(0,0,0,0.34)]">
            <Image
              alt="banner"
              className="w-full h-[300px] object-cover"
              height={300}
              width={1200}
              src="/banner.png"
              priority
            />
          </div>

          <header className="space-y-4 max-w-3xl mx-auto text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#DCB8B0]/80">live github feed</p>
            <h1 className="text-4xl font-bold font-mono text-[#DCB8B0]">GitHub Repositories</h1>
            <p className="text-[#D2D2D4]/90 leading-relaxed">Fetching and shaping repository content...</p>
          </header>

          <section className="space-y-8">
            <div className="mx-auto max-w-md">
              <GitHubLoadingCard stepIndex={loadingStepIndex} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: INITIAL_REPO_LIMIT }).map((_, index) => (
                <div
                  key={index}
                  className="bg-[#1A1721]/80 border border-white/10 rounded-lg overflow-hidden h-full flex flex-col relative"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_25%,rgba(220,184,176,0.08)_50%,transparent_75%)] animate-[shimmer_2.6s_linear_infinite]" />

                  <div className="relative p-4 flex-grow flex flex-col animate-pulse">
                    <div className="h-5 w-1/2 rounded bg-[#DCB8B0]/22 mb-3" />
                    <div className="h-4 w-full rounded bg-[#D2D2D4]/15 mb-2" />
                    <div className="h-4 w-3/4 rounded bg-[#D2D2D4]/15 mb-5" />

                    <div className="flex gap-2 mb-5">
                      <div className="h-5 w-14 rounded bg-[#1E1E1E] border border-[#333333]" />
                      <div className="h-5 w-14 rounded bg-[#1E1E1E] border border-[#333333]" />
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="h-4 w-20 rounded bg-[#DCB8B0]/20" />
                      <div className="h-4 w-20 rounded bg-[#DCB8B0]/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#DCB8B0]/8 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-[#DCB8B0]/6 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <BreadcrumbNav />
          <Select defaultValue={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px] bg-[#1A1721]/95 border border-[#DCB8B0]/25 text-[#D2D2D4] font-mono rounded-lg focus:ring-[#DCB8B0]/40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1721] border border-[#DCB8B0]/25 text-[#D2D2D4]">
              <SelectItem value="updated">Last Updated</SelectItem>
              <SelectItem value="stars">Most Stars</SelectItem>
              <SelectItem value="name">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </nav>

        <div className="mb-16 rounded-xl overflow-hidden border border-[#DCB8B0]/25 shadow-[0_8px_26px_rgba(0,0,0,0.34)]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              alt="banner"
              className="w-full h-[300px] object-cover"
              height={300}
              width={1200}
              src="/banner.png"
            />
          </motion.div>
        </div>

        <header className="space-y-4 max-w-3xl mx-auto text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#DCB8B0]/80">live github feed</p>
          <h1 className="text-4xl font-bold font-mono text-[#DCB8B0]">GitHub Repositories</h1>
          <p className="text-[#D2D2D4]/90 leading-relaxed">
            A collection of my open source projects and contributions.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCB8B0]/30 bg-[#1A1721]/85 px-4 py-1.5 text-xs font-mono text-[#DCB8B0]">
            <Sparkles className="w-3.5 h-3.5" />
            {sortedRepoCount} repos loaded
          </div>
        </header>

        <motion.section 
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.045,
                  delayChildren: 0.02
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {visibleRepos.map((repo, index) => {
              const cardTone = getRepoCardTone(repo)
              const shownTopics = (repo.topics ?? []).slice(0, cardTone === 'expanded' ? 5 : cardTone === 'balanced' ? 3 : 2)
              const remainingTopicCount = Math.max((repo.topics?.length ?? 0) - shownTopics.length, 0)
              const cardSpanClass = getRepoCardSpanClass(cardTone)
              const description = getDescriptionForTone(repo.description, cardTone)

              return (
              <motion.div
                key={repo.id}
                whileHover={{ scale: 1.05, y: -10, zIndex: 20 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: index * 0.03
                }}
                className={`relative transform-gpu ${cardSpanClass}`}
              >
                <article className="bg-[#1A1721]/80 border border-white/10 rounded-lg overflow-hidden h-full flex flex-col relative">
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-mono text-[#DCB8B0] text-lg mb-2 font-bold break-words">
                      {repo.name}
                    </h3>

                    <p
                      className={`font-mono text-[#D2D2D4] text-sm mb-4 leading-relaxed ${cardTone === 'expanded' ? 'min-h-[5.5rem]' : cardTone === 'balanced' ? 'min-h-[4.5rem]' : 'min-h-[3rem]'}`}
                    >
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1E1E1E] border border-[#333333] rounded text-xs font-mono text-[#D2D2D4]">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>

                      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1E1E1E] border border-[#333333] rounded text-xs font-mono text-[#D2D2D4]">
                        <CalendarDays className="w-3 h-3" />
                        {formatUpdatedAt(repo.updated_at)}
                      </span>

                      {shownTopics.map((topic) => (
                        <span
                          key={`${repo.id}-${topic}`}
                          className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1E1E1E] border border-[#333333] rounded text-xs font-mono text-[#D2D2D4]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D2D2D4]" />
                          {topic}
                        </span>
                      ))}

                      {remainingTopicCount > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#1E1E1E] border border-[#333333] rounded text-xs font-mono text-[#D2D2D4]">
                          +{remainingTopicCount} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between font-mono text-sm mt-auto">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        view source
                      </a>

                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
                        >
                          <Telescope className="w-4 h-4 mr-2" />
                          visit
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </motion.div>
            )})}
          </motion.div>

          {sortedRepoCount > INITIAL_REPO_LIMIT && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllRepos((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-full border border-[#DCB8B0]/35 bg-[#1A1721]/90 px-5 py-2.5 text-sm font-mono text-[#DCB8B0] hover:opacity-85 transition-opacity"
              >
                {showAllRepos ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    show fewer
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    show {hiddenRepoCount} more
                  </>
                )}
              </button>
            </div>
          )}
        </motion.section>

        {!sortedRepoCount && (
          <div className="mt-10 rounded-xl border border-[#DCB8B0]/25 bg-[#1A1721]/92 p-8 text-center">
            <p className="font-mono text-[#DCB8B0] mb-2">No repositories found</p>
            <p className="text-sm text-[#D2D2D4]/85">Try refreshing in a moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

