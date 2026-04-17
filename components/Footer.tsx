import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-logo">Best Hotels</div>
      <ul className="footer-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/reviews">Reviews</Link></li>
        <li><Link href="/rankings">Rankings</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><a href="https://www.instagram.com/besthotels/" target="_blank" rel="noreferrer">Instagram</a></li>
      </ul>
      <span className="footer-copy">© 2026 Best Hotels. All Rights Reserved.</span>
    </footer>
  )
}
