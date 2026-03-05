## ONE Ecosystem - [expl.one](https://expl.one)

**ONE box** is part of the ONE Ecosystem
// powered by [EXPL Nodes](https://node.expl.one)

# ONE Box

Something mysterious is coming to the ONE ecosystem. Stay tuned for the reveal.

## Features

- Mystery experience platform (coming soon)
- Animated teaser landing page
- ONE ecosystem integration
- Ecosystem navigation dropdown

## Technology Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Bun, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Phosphor Icons
- **SSG**: Puppeteer pre-rendering
- **Deployment**: AWS S3 + CloudFront

## Project Structure

```
src/
├── App.tsx                 # Main application
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── Footer.tsx          # Footer with social links
│   ├── PoweredByExplNodes.tsx  # EXPL Nodes badge
│   └── EcosystemDropdown.tsx   # ONE ecosystem navigation
├── assets/
│   └── images/
│       └── logo.png        # ONE box logo
├── index.css               # Theme configuration
└── main.tsx                # Entry point
public/
├── robots.txt              # SEO crawler rules
├── sitemap.xml             # Search engine sitemap
├── site.webmanifest        # PWA manifest
├── llms.txt                # AI-readable docs
├── llms-full.txt           # AI-readable full docs
└── favicon.png             # Favicon
scripts/
└── prerender.ts            # SSG pre-render script
```

## Development

### Prerequisites
- **Bun v1.3+** ([Installation Guide](https://bun.sh))

### Setup

```bash
# Install Bun (if not already installed)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Start development server
bun dev

# Build for production (includes SSG pre-render)
bun run build

# Build without pre-render
bun run build:csr

# Type checking
bun run type-check

# Lint
bun run lint

# Preview production build
bun run preview
```

## License

MIT

---

## ONE Ecosystem - [expl.one](https://expl.one)

**ONE box** is part of the ONE Ecosystem
// powered by [EXPL Nodes](https://node.expl.one)
