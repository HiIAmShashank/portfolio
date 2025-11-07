# Developer Portfolio

A modern, animated portfolio website built with Next.js 16, featuring a blog with MDX support and a visually stunning hero section.

## 🚀 Features

- **Animated Hero Section**: Eye-catching landing page with Framer Motion animations, gradient text, and floating orbs
- **MDX Blog**: Full-featured blog system with markdown support, syntax highlighting, and frontmatter
- **Modern UI**: Built with Tailwind CSS 4 and custom animations
- **Type-Safe**: Fully typed with TypeScript
- **Responsive Design**: Optimized for all screen sizes
- **Dark Mode**: Beautiful dark theme with translucent navigation

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Content**: MDX with `next-mdx-remote`
- **Syntax Highlighting**: Highlight.js with rehype plugins
- **Package Manager**: pnpm

## 📦 Key Dependencies

- `next-mdx-remote` - Remote MDX content rendering
- `gray-matter` - Parse frontmatter from markdown files
- `framer-motion` - Animation library
- `rehype-highlight` - Code syntax highlighting
- `rehype-slug` & `rehype-autolink-headings` - Auto-generate heading IDs and links
- `remark-gfm` - GitHub Flavored Markdown support
- `@tailwindcss/typography` - Beautiful typography defaults

## 🏃 Getting Started

1. **Install dependencies**:

```bash
pnpm install
```

2. **Run the development server**:

```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Adding Blog Posts

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

## 📁 Project Structure

```
portfolio/
├── app/                  # Next.js app directory
│   ├── blog/            # Blog listing and individual posts
│   ├── layout.tsx       # Root layout with navigation
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── hero-animated.tsx    # Animated hero section
│   └── mdx-components.tsx   # Custom MDX components
├── content/             # Blog content
│   └── blog/           # Markdown blog posts
├── lib/                # Utility functions
│   └── blog.ts         # Blog post utilities
└── public/             # Static assets
    └── blog-images/    # Blog post images
```

## 🎨 Customization

- **Hero Section**: Edit `components/hero-animated.tsx` to customize the landing page
- **Navigation**: Modify `app/layout.tsx` for nav links and site metadata
- **Styling**: Update Tailwind configuration in `tailwind.config.ts`
- **Blog Components**: Customize MDX rendering in `components/mdx-components.tsx`

## 🚢 Deployment

Deploy easily on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/portfolio)

Or use the Vercel CLI:

```bash
pnpm build
vercel --prod
```

## 📄 License

This project is open source and available under the MIT License.
