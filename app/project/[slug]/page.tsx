import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Github, ArrowLeft, Calendar, Clock } from 'lucide-react'
import taskify from '../../../public/taskify.png'
import superstudy from '../../../public/superstudy.png'
import bytestore from '../../../public/bytestore.png'
import portfolio from '../../../public/portfolio.png'
import weathero from '../../../public/weathero.png'

const projects = [
  {
    title: "Taskify",
    description: "A simple task manager built with vanilla JavaScript and CSS.",
    image: taskify,
    tags: ["Javascript", "CSS", "HTML"],
    sourceUrl: "https://github.com/clarkpy/taskify",
    visitUrl: "https://taskify.snowyjs.lol",
    duration: "3 days",
    startDate: "18th November 2024",
    details: "Taskify is a straightforward task management system to help users organize their activities. It has a clean interface that allows for task creation, editing, and deletion. The project was an opportunity to get better at vanilla JavaScript and experiment with CSS techniques for creating layouts.",
    challenges: "One of the challenges was implementing a drag-and-drop feature for reordering tasks without relying on external libraries. This pushed me to use the HTML5 Drag and Drop API and improve some of my skills.",
    learnings: "Through this project, I gained an understanding of DOM manipulation and local storage for data. It also helped me appreciate the value of thorough planning before diving in.",
    futureImprovements: "Future improvements could include adding some sort of  to save tasks across devices and implementing a notification system for reminders."
  },
  {
    title: "SuperStudy",
    description: "A complex and reactive study system for students",
    image: superstudy,
    tags: ["React", "TailwindCSS", "Kotlin"],
    sourceUrl: "https://github.com/clarkpy/SuperStudy",
    visitUrl: "https://superstudy.snowy.codes",
    duration: "Unfinished",
    startDate: "20th November 2024",
    details: "SuperStudy is a study management system made to help students with their learning process. It features a React-based frontend for a responsive user interface, coupled with a Kotlin backend for data management and processing. The application includes features such as study scheduling, progress tracking, and personalized study recommendations based on user performance.",
    challenges: "The main challenge was integrating the React frontend with the Kotlin backend. Additionally, implementing the algorithm for personalized study recommendations required research and testing.",
    learnings: "This project improved my skills in full-stack development, particularly in creating RESTful APIs with Kotlin and managing state in React applications. I also gained experience in implementing authentication and authorization.",
    futureImprovements: "Future plans include adding a mobile app version using React Native and implementing a collaborative study feature for group projects."
  },
  {
    title: "ByteStore",
    description: "An advanced and reliable Jitpack alternative",
    image: bytestore,
    tags: ["React", "NextJS", "TypeScript", "Kotlin"],
    sourceUrl: "https://github.com/clarkpy/ByteStore-Frontend",
    visitUrl: "https://bytestore.snowy.codes",
    duration: "Unfinished",
    startDate: "17th November 2024",
    details: "ByteStore is a package repository system designed as an alternative to Jitpack. It provides developers with a platform for hosting and sharing Java and Kotlin libraries. The frontend is built with Next.js and TypeScript for type-safe, server-side rendered React applications, while the backend uses Kotlin for package management and distribution.",
    challenges: "The biggest challenge was designing an architecture that could handle a number of package uploads and downloads simultaneously. Implementing proper versioning and dependency resolution also required planning.",
    learnings: "This project has improved my understanding of package management systems, CI/CD pipelines, and distributed systems. I gained experience in database queries for large datasets and implementing caching mechanisms to improve performance.",
    futureImprovements: "Future plans include adding support for more programming languages, implementing a plugin system for custom build processes, and creating a CLI tool for easier package publishing and management."
  },
  {
    title: "Portfolio",
    description: "The source code for this portfolio website",
    image: portfolio,
    tags: ["React", "NextJS", "TypeScript"],
    sourceUrl: "https://github.com/clarkpy/portfolio",
    visitUrl: "#",
    duration: "1 week",
    startDate: "17th November 2024",
    details: "This portfolio website showcases my projects for HighSeas. It features a clean, responsive design with animations and transitions. The site is designed to be easily updatable, allowing me to add new projects and blog posts as I progress.",
    challenges: "One of the main challenges was creating a design that effectively showcased my projects while maintaining a visually pleasing layout. Adding the typewriter effect and smooth animations across different devices also required consideration.",
    learnings: "Through this project, I improved my skills in responsive web design and accessibility. I also gained experience in deploying and managing a Next.js application on Vercel.",
    futureImprovements: "Future improvements include adding a detailed blog section, implementing a dark/light mode toggle, and creating a more interactive project showcase with 3D elements (Three.js)." 
  },
  {
    title: "Weathero",
    description: "A weather app that uses the free Weather API",
    image: weathero,
    tags: ["React", "NextJS", "TypeScript"],
    sourceUrl: "https://github.com/clarkpy/Weathero",
    visitUrl: "https://weathero.snowy.codes",
    duration: "<1 day",
    startDate: "21st November 2024",
    details: "Weathero is a super simple, user friendly weather site that provides real-time weather information using a free Weather API. Built with Next.js and TypeScript, it has a design that works across desktop and mobile devices. The app has current weather conditions for any location worldwide.",
    challenges: "The main challenge was handling API rate limits and implementing caching to minimize API calls. Additionally, creating an UI that could display a large amount of weather data without overwhelming the user required several design iterations.",
    learnings: "This project enhanced my skills in working with external APIs and implementing error handling for requests. I also gained experience in using geolocation services to provide location-based weather information.",
    futureImprovements: "Future plans include adding weather maps, implementing push notifications for severe weather alerts, and creating a PWA version of the app for offline access."
  }
]

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.title.toLowerCase() === params.slug.toLowerCase())

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#13111C] text-[#D2D2D4] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <nav className="flex justify-between items-center mb-16">
          <Link className="flex items-center space-x-2 text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors" href="/projects">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-mono">back to projects</span>
          </Link>
        </nav>

        <div>
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold font-mono text-[#DCB8B0] mb-4">{project.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-mono text-[#D2D2D4] border border-[#DCB8B0]/35 bg-[#DCB8B0]/7"
              >
                <span className="w-2 h-2 rounded-full bg-[#DCB8B0]/90" />
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center space-x-2 text-[#D2D2D4]">
              <Calendar className="h-5 w-5" />
              <span>Started: {project.startDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-[#D2D2D4]">
              <Clock className="h-5 w-5" />
              <span>Duration: {project.duration}</span>
            </div>
          </div>

          <div className="space-y-6 text-[#D2D2D4]">
            <p>{project.description}</p>
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0]">Project Details</h2>
            <p>{project.details}</p>
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0]">Challenges</h2>
            <p>{project.challenges}</p>
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0]">Learnings</h2>
            <p>{project.learnings}</p>
            <h2 className="text-2xl font-bold font-mono text-[#DCB8B0]">Future Improvements</h2>
            <p>{project.futureImprovements}</p>
          </div>

          <div className="mt-8 flex items-center gap-4 font-mono text-sm">
            <Link 
              href={project.sourceUrl}
              className="inline-flex items-center text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
            >
              <Github className="w-5 h-5 mr-2" />
              View Source
            </Link>
            <Link 
              href={project.visitUrl}
              className="text-[#DCB8B0] hover:text-[#D2D2D4] transition-colors"
            >
              Visit Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}