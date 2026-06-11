'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: '/reviews', label: 'Reviews' },
    { href: '/rankings', label: 'Rankings' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className="editorial-nav">
        <Link href="/" className="editorial-wordmark">Best Hotels</Link>
        <button className="editorial-hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      {open && (
        <div className="editorial-overlay" role="dialog" aria-modal="true">
          <button className="editorial-overlay-close" onClick={() => setOpen(false)} aria-label="Close menu">✕</button>
          <nav className="editorial-overlay-nav">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`editorial-overlay-link${pathname.startsWith(href) ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
