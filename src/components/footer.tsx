import { Link } from '@/i18n/routing';

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            &copy; 2025 JSON to TOON & TOON to JSON Converter (json2toon). All rights reserved.
          </p>
          <nav className="flex gap-6 text-sm">
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
