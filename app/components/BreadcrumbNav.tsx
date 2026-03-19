'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Terminal } from 'lucide-react'

import { cn } from '@/lib/utils'

type BreadcrumbItem = {
  label: string
  href: string
}

const STATIC_SEGMENT_LABELS: Record<string, string> = {
  who: 'whoami',
  experience: 'work',
  github: 'github',
  blogs: 'blogs',
  projects: 'projects',
  project: 'projects'
}

function formatSegmentLabel(segment: string) {
  const normalizedSegment = segment.toLowerCase()
  const staticLabel = STATIC_SEGMENT_LABELS[normalizedSegment]

  if (staticLabel) {
    return staticLabel
  }

  return decodeURIComponent(segment)
    .replace(/[-_]/g, ' ')
    .trim()
    .toLowerCase()
}

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'home', href: '/' }]
  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`

    if (segment.toLowerCase() === 'project') {
      breadcrumbs.push({ label: 'projects', href: '/projects' })
      continue
    }

    breadcrumbs.push({
      label: formatSegmentLabel(segment),
      href: currentPath
    })
  }

  return breadcrumbs
}

type BreadcrumbNavProps = {
  className?: string
}

export default function BreadcrumbNav({ className }: BreadcrumbNavProps) {
  const pathname = usePathname()
  const breadcrumbs = buildBreadcrumbs(pathname)

  return (
    <div className={cn('flex items-center gap-2 text-[#DCB8B0]', className)}>
      <Terminal className="h-5 w-5" />
      <ol className="flex items-center flex-wrap font-mono text-sm sm:text-base">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLastItem = index === breadcrumbs.length - 1

          return (
            <li key={breadcrumb.href} className="flex items-center">
              {isLastItem ? (
                <span className="text-[#DCB8B0]">{breadcrumb.label}</span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="text-[#DCB8B0] hover:opacity-80 transition-opacity"
                >
                  {breadcrumb.label}
                </Link>
              )}

              {!isLastItem && <ChevronRight className="mx-2 h-3.5 w-3.5 text-[#DCB8B0]/70" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}