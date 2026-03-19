import { FaJava } from "react-icons/fa"
import {
  SiKotlin,
  SiReact,
  SiJavascript,
  SiNextdotjs,
  SiTypescript,
  SiDeno,
  SiPython,
  SiTailwindcss
} from 'react-icons/si'
import { motion } from "framer-motion"

const techStack = [
  { name: 'Kotlin', Icon: SiKotlin },
  { name: 'Java', Icon: FaJava },
  { name: 'React', Icon: SiReact },
  { name: 'Javascript', Icon: SiJavascript },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'Deno', Icon: SiDeno },
  { name: 'Python', Icon: SiPython },
  { name: 'Tailwind CSS', Icon: SiTailwindcss }
]

interface TechStackProps {
  singleTech?: string
}

export function TechStack({ singleTech }: TechStackProps) {
  const items = singleTech
    ? techStack.filter(({ name }) => name === singleTech)
    : techStack

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute -left-24 -top-20 h-40 w-40 rounded-full bg-[#DCB8B0]/8 blur-3xl"
        animate={{ opacity: [0.18, 0.32, 0.18], scale: [1, 1.08, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <h2 className="text-2xl font-bold font-mono text-[#DCB8B0] mb-5">Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {items.map(({ name, Icon }, index) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, -2, 0] }}
            transition={{
              opacity: { duration: 0.35, delay: index * 0.06 },
              y: { duration: 2.7 + (index % 3) * 0.35, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }
            }}
            whileHover={{ y: -4, scale: 1.045 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono text-[#D2D2D4] border border-[#DCB8B0]/35 bg-[#DCB8B0]/7"
          >
            <Icon className="w-4 h-4 text-[#DCB8B0]/90" />
            {name}
          </motion.span>
        ))}
      </div>
    </div>
  )
}
