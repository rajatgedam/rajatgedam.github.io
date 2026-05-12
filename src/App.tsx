import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Contact2, Download, FolderGit2, Menu, X } from 'lucide-react'
import { BackgroundParticles } from './components/BackgroundParticles'
import { Section } from './components/common/Section'
import { AboutSection } from './components/sections/AboutSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { FunSection } from './components/sections/FunSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { experience } from './data/experience'
import { profile } from './data/profile'
import { projects } from './data/projects'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'fun', label: 'Fun' },
  { id: 'contact', label: 'Contact' },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.2, 0.5, 0.8] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const socialIcons = useMemo(
    () => ({
      github: FolderGit2,
      linkedin: Contact2,
    }),
    [],
  )

  return (
    <div className="app-shell">
      <BackgroundParticles />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Go to home section">
          {profile.name}
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'nav-link active' : 'nav-link'}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <main>
        <Section id="home" className="hero-section">
          <motion.div className="hero-grid" {...fadeInUp}>
            <div>
              <p className="eyebrow">Software Engineer</p>
              <h1>{profile.headline}</h1>
              <p className="lead">{profile.intro}</p>

              <div className="cta-row">
                <a className="btn btn-primary" href="#projects">
                  View Projects
                </a>
                <a className="btn btn-secondary" href={profile.resumeUrl}>
                  <Download size={16} />
                  Download Resume
                </a>
              </div>

              <ul className="quick-facts">
                {profile.quickFacts.map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </div>

            <div className="hero-illustration-wrap">
              <img
                src="/assets/illustrations/home-main.svg"
                alt="Illustration representing software engineering and cloud development"
                className="hero-illustration"
                loading="eager"
              />
            </div>
          </motion.div>
        </Section>

        <AboutSection profile={profile} />
        <ExperienceSection items={experience} />
        <ProjectsSection items={projects} />
        <FunSection />

        <Section id="contact" kicker="Contact" title="Let us connect">
          <motion.div className="contact-grid" {...fadeInUp}>
            <p className="contact-copy">{profile.contactMessage}</p>

            <div className="contact-links">
              <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                Email Me
              </a>
              {profile.phone ? (
                <a className="btn btn-secondary" href={`tel:${profile.phone}`}>
                  Call Me
                </a>
              ) : null}
              <a className="btn btn-secondary" href={profile.resumeUrl}>
                <Download size={16} />
                Resume PDF
              </a>
            </div>

            <div className="social-links">
              {profile.socials.map((social) => {
                const Icon = socialIcons[social.id as keyof typeof socialIcons]
                if (!Icon) {
                  return null
                }
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="social-link"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                    {social.label}
                  </a>
                )
              })}
            </div>
          </motion.div>
        </Section>
      </main>

      <footer className="site-footer">
        <p>Built with React, TypeScript, Vite, Tailwind, and Framer Motion.</p>
      </footer>
    </div>
  )
}

export default App
