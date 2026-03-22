# Sameer Mann - Portfolio

A modern, fully responsive portfolio website showcasing software engineering projects and experience. Built with Next.js 16, Tailwind CSS, and optimized for Cloudflare Pages deployment.

## Features

- **Dark/Light Theme Toggle** - Seamless theme switching with themed scrollbar
- **Responsive Design** - Mobile-first design with adaptive sidebar navigation
- **Project Showcase** - Detailed project pages with metadata, testimonials, and tech stack
- **Smooth Animations** - Page transitions, component animations, and scroll-to-top button
- **Navigation Breadcrumbs** - Context-aware navigation history
- **Fast Performance** - Built with Next.js static generation and optimized images

## Local Development

### Prerequisites

- Node.js 18+ and pnpm

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# Required for AI chat feature
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional: Override the default model
# OPENROUTER_MODEL=google/gemini-2.0-flash-exp:free

# Optional: Override the site URL for OpenRouter headers
# NEXT_PUBLIC_SITE_URL=https://sameer.goneto.space
```

Get a free OpenRouter API key at: https://openrouter.ai/keys

The chat feature will work without the API key, but will show rate-limit errors.

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the portfolio.

## Deployment on Cloudflare Pages

This portfolio is optimized for Cloudflare Pages deployment. Follow these steps to deploy:

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   - Ensure your repository is on GitHub (public or private)

2. **Create Cloudflare Pages Project**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** in the sidebar
   - Click **Create a project** → **Connect to Git**
   - Select your GitHub repository

3. **Configure Build Settings**
   - **Project name**: Choose a name (e.g., `sameer-portfolio`)
   - **Production branch**: `master` (or your main branch)
   - **Framework preset**: Select `Next.js (Static HTML Export)`
   - **Build command**: `pnpm install && pnpm build`
   - **Build output directory**: `out`
   - **Root directory (advanced)**: `/` (default)

4. **Environment Variables**
   - Add the following environment variables in the Pages project settings:
     ```
     OPENROUTER_API_KEY=your_openrouter_api_key_here
     OPENROUTER_MODEL=google/gemini-2.0-flash-exp:free
     NEXT_PUBLIC_SITE_URL=https://your-domain.com
     ```
   - Get your API key at: https://openrouter.ai/keys
   - The chat feature will work without the API key but will show rate-limit errors

5. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will automatically build and deploy your site
   - Your portfolio will be live at `https://<project-name>.pages.dev`

### Method 2: Direct Wrangler CLI Deployment

1. **Install Wrangler** (Cloudflare's CLI tool):
```bash
npm install -g wrangler
# or
pnpm add -g wrangler
```

2. **Authenticate with Cloudflare**:
```bash
wrangler login
```

3. **Build the project**:
```bash
pnpm build
```

4. **Deploy using Wrangler**:
```bash
wrangler pages deploy out
```

### Custom Domain Setup

1. After deployment, go to your Pages project settings
2. Navigate to **Custom domains**
3. Add your custom domain and follow the DNS configuration steps
4. Update your domain's DNS records as instructed by Cloudflare

## Build Optimization

The project is pre-configured for Cloudflare Pages with the following optimizations:

- **Static Generation**: Pages are pre-rendered at build time for fast delivery
- **Image Optimization**: Next.js image component optimizes all images
- **Bundle Size**: Tree-shaking and code splitting for minimal payload
- **Cache Headers**: Configured for optimal edge caching

## Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with header and sidebar
│   ├── page.tsx             # Home/hero page
│   ├── globals.css          # Global styles and animations
│   ├── projects/
│   │   ├── page.tsx         # Projects overview
│   │   └── [slug]/page.tsx  # Individual project details
│   ├── experience/page.tsx   # Experience timeline
│   ├── contact/page.tsx      # Contact information
│   └── not-found.tsx         # 404 page
├── components/
│   ├── sidebar.tsx           # Main navigation sidebar
│   ├── header.tsx            # Top navigation bar
│   ├── breadcrumb.tsx        # Breadcrumb navigation
│   ├── project-card.tsx      # Project card component
│   ├── *-card.tsx            # Other card components
│   └── ...
├── lib/
│   └── data.ts               # Centralized project and content data
├── public/                   # Static assets
└── next.config.mjs          # Next.js configuration
```

## Customization

### Update Portfolio Content

All content is centralized in `lib/data.ts`. Edit this file to:
- Update personal information in `siteConfig`
- Add/remove projects in the `projects` array
- Modify experience in the `experience` array
- Update testimonials and stats

### Modify Styling

- **Colors**: Update CSS variables in `app/globals.css`
- **Typography**: Adjust font settings in `app/layout.tsx`
- **Components**: Customize individual components in `components/`

## Performance

- **Lighthouse Score**: Optimized for 90+ in all metrics
- **Core Web Vitals**: Excellent FCP, LCP, and CLS scores
- **Edge Caching**: All static assets cached globally on Cloudflare CDN

## Troubleshooting

### Build Fails on Cloudflare Pages

- Ensure `package.json` build command matches: `pnpm install && pnpm build`
- Check that `out` output directory is correct
- Verify all environment variables are set

### Styling Issues After Deploy

- Clear Cloudflare cache: Dashboard → Pages → project → Deployments → Purge cache
- Ensure `tailwindcss` and dependencies are in `package.json`

### Not Found (404) on Sub-routes

- Verify `next.config.mjs` has proper configuration for static generation
- Check that all project slugs in data.ts match the URL structure

## Technologies

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Theme**: next-themes
- **Hosting**: Cloudflare Pages
- **Animations**: CSS keyframes
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics (optional)

## License

This portfolio is personal and not open for redistribution without permission.

## Support

For issues or questions about deployment, refer to:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
