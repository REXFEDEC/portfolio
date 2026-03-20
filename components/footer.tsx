import { siteConfig } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border lg:pl-56">
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            aria-label={siteConfig.name}
          >
            <img
              src="/standard.png"
              alt={siteConfig.name}
              className="h-7 sm:h-8 md:h-9 w-auto"
            />
            <span className="font-semibold text-foreground hidden sm:inline">{siteConfig.name}</span>
          </a>

          <div className="text-sm text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

