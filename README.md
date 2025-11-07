# Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat&logo=framer)
![MDX](https://img.shields.io/badge/MDX-3-1B1F24?style=flat&logo=mdx)
![pnpm](https://img.shields.io/badge/pnpm-9-F69220?style=flat&logo=pnpm)

A modern, professional portfolio website showcasing projects, blog posts, and professional experience. Built with Next.js 16 using the App Router, featuring a component-based architecture with glass-morphism design, animated backgrounds, and full TypeScript support.

## Features

**Core Pages**
- Home page with animated hero section, featured projects, and latest blog posts
- Projects showcase with detailed individual project pages
- Blog system with MDX support for rich content
- Professional resume page with comprehensive work experience
- Responsive navigation with theme toggle (light/dark/system)

**Design & UX**
- Glass-morphism UI with animated gradient backgrounds
- Framer Motion animations throughout
- Responsive design optimized for all screen sizes
- Accessible components following WCAG guidelines
- Modern typography with Tailwind CSS prose styles

**Architecture**
- Component-based architecture with single responsibility principle
- Centralized configuration management split by concern
- Reusable card components for projects and blog posts
- Modular section components for composition
- Type-safe throughout with TypeScript strict mode

## Tech Stack

**Framework & Language**
- Next.js 16 with App Router (SSR, SSG, and client-side rendering)
- TypeScript with strict mode enabled
- React 19 with server and client components

**Styling & Animation**
- Tailwind CSS v4 with custom design tokens
- Framer Motion for animations and transitions
- Glass-morphism effects with backdrop blur
- Custom animated backgrounds with blob gradients

**Content Management**
- MDX support with next-mdx-remote
- Gray-matter for frontmatter parsing
- Rehype plugins for syntax highlighting and heading links
- Remark-gfm for GitHub Flavored Markdown

**Development Tools**
- pnpm for package management
- ESLint and Prettier for code quality
- TypeScript for type safety
- Git for version control

## Getting Started

**Prerequisites**
- Node.js 22 or higher
- pnpm package manager

**Installation**

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

1. Create a new `.md` file in `content/blog/` with the desired slug as filename
2. Add frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
date: "2025-01-01"
description: "A brief description of the post"
tags: ["tag1", "tag2"]
---

Your content here with full MDX support...
```

3. Place related images in `public/blog-images/[post-slug]/`
4. Reference images in your post: `![Alt text](/blog-images/post-slug/image.png)`

**Adding Projects**

Edit `lib/config/projects.ts` to add new projects:

```typescript
{
    id: 'project-slug',
    name: 'Project Name',
    tagline: 'Short tagline',
    description: 'Detailed description',
    url: 'https://project-url.com',
    tags: ['Tag1', 'Tag2'],
    status: 'live', // or 'beta' or 'coming-soon'
    features: [
        'Feature 1',
        'Feature 2'
    ]
}
```

**Updating Personal Information**

Modify `lib/config/personal.ts` to update:
- Name and contact information
- Professional title and tagline
- Availability status
- Email address

**Customizing Tech Stack**

Edit `lib/config/tech-stack.ts` to add or remove technologies displayed on the home page.

**Managing Navigation**

Update `lib/config/navigation.ts` to add, remove, or reorder navigation menu items.

## Customization - Technology stack
  - `social-links.ts` - Social media links
  - `navigation.ts` - Navigation menu items
  - `projects.ts` - Projects data
  - `index.ts` - Barrel export

**Content & Utilities**
- `content/blog/` - MDX blog posts with frontmatter
- `lib/blog.ts` - Blog post utilities (fetching, parsing, sorting)
- `public/blog-images/` - Blog post images organized by slug

**Component Design Patterns**

The codebase follows these key patterns:
- Single Responsibility Principle - Each component has one clear purpose
- Composition over inheritance - Complex components built from smaller ones
- Props drilling avoidance - Configuration data centralized and imported as needed
- Server and client component separation - Proper use of "use client" directive
- Type safety - All components fully typed with TypeScript interfaces

## Content Management

**Adding Blog Posts

Create markdown files in `content/blog/` with frontmatter:

```md
---
title: "Your Post Title"
date: "2025-01-01"
description: "A brief description"
tags: ["tag1", "tag2"]
---

Your content here...
```

Images for posts should be placed in `public/blog-images/[post-slug]/`.

## Project Structure

**Styling & Theming**
- Tailwind configuration: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Theme colors defined in CSS variables supporting light and dark modes
- Custom animations and keyframes in component files

**Hero Section**
**Vercel (Recommended)**

The application is optimized for Vercel deployment:

```bash
# Build the project
pnpm build

# Deploy using Vercel CLI
vercel --prod
```

Alternatively, connect your GitHub repository to Vercel for automatic deployments on push.

**Environment Variables**

No environment variables required for basic functionality. If adding external services, create a `.env.local` file:

```
# Example for future integrations
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

**Build Optimization**

The application uses:
- Static generation for blog posts and project pages
- Server-side rendering for dynamic content
- Image optimization through Next.js Image component
- Code splitting and lazy loading for optimal performance
- Incremental Static Regeneration where appropriate

## Performance Considerations

**Optimizations Implemented**
- Component code splitting with dynamic imports
- Lazy loading for below-the-fold content
- Optimized animations with Framer Motion
- Minimal JavaScript bundles through tree-shaking
- Static generation for blog and project pages
- Responsive images with next/image

**Bundle Size Management**
- Modular architecture reduces code duplication
- Shared components imported from centralized locations
- Configuration data split by concern for better tree-shaking
- Icons and assets optimized

## Development Workflow

**Code Organization**
- Components follow single responsibility principle
- Average component size: 20-60 lines
- Clear separation between server and client components
- Centralized configuration management
- Type-safe props and interfaces

**Best Practices**
- Strict TypeScript mode enabled
- ESLint for code quality
- Prettier for consistent formatting
- Component composition over prop drilling
- Accessible HTML semantics
- SEO-friendly metadata on all pages

## License

MIT License - feel free to use this project as a template for your own portfolio.