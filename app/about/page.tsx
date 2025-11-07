import { Metadata } from 'next';
import { AnimatedBackground } from '@/components/ui/animated-background';

export const metadata: Metadata = {
    title: 'About Me - Shashank Gupta',
    description: 'Learn about my journey from medicine to software engineering, building modern micro-frontend platforms and scalable web apps.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <main className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">About Me</h1>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Hi, I&apos;m <span className="text-primary font-semibold">Shashank Gupta</span>,
                                    a <span className="font-semibold">Senior Frontend Engineer</span> based in{' '}
                                    <span className="font-semibold">London, UK</span>. I design and build modern,
                                    scalable front-end platforms - things like micro-frontend portals, shared component
                                    libraries, and high-performing web apps that other teams can plug into.
                                </p>
                                <p className="text-muted-foreground mt-4">
                                    Right now I work at <span className="font-semibold">Mott MacDonald</span> (2023-Present),
                                    where I&apos;ve been building an internal micro-frontend portal using Module Federation,
                                    Next.js, Turborepo, pnpm workspaces, and shared Azure AD auth - basically: one platform,
                                    many independently deployable apps.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* My Story */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">My Story</h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p>I didn&apos;t start in software.</p>

                            <p>
                                After school in India I tried to follow the &quot;stable career&quot; path. I explored
                                medicine, even did MBBS for a year, but discovered I had a phobia of blood - not super
                                compatible with clinical work. Before that I&apos;d tried pharmacy while prepping for
                                medical entrance exams. None of it felt right.
                            </p>

                            <p>
                                What did feel right was working with computers. So I joined <span className="font-semibold">Bhavan&apos;s
                                    College, Mumbai University</span> for a <span className="font-semibold">B.Sc. in Computer
                                        Science (2014-2017)</span>. That was the turning point. I found a group of classmates who
                                liked experimenting with tech, and I became one of the people who&apos;d lead practicals,
                                explore new tools, and help others clear exams. I even built an app for our family cable/internet
                                business to manage customers and payments, plus a few projects for classmates - which forced
                                me to learn multiple solutions quickly.
                            </p>

                            <p>
                                After graduating (with distinction), I hit an unexpected blocker: a lot of Indian MNCs
                                weren&apos;t taking candidates with education gaps. That rejection pushed me toward smaller,
                                more hands-on companies - which is where I actually learned the good stuff.
                            </p>

                            <div className="pl-4 border-l-2 border-primary/30 space-y-4 mt-6">
                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        Atidan Technologies (2017-2022)
                                    </h3>
                                    <p>
                                        I became the resident SharePoint/front-end person. I built and enhanced front-end
                                        solutions for multiple CMSes using React, AngularJS, jQuery, HTML, CSS, integrated
                                        SharePoint, and led 5+ devs through full SDLC. I also worked on performance (lazy
                                        loading, viewport rendering) and CI/CD in Azure DevOps, especially for multi-contributor
                                        projects.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        Infogain India (2022-2023)
                                    </h3>
                                    <p>
                                        I moved deeper into React + TypeScript, integrating Microsoft Graph (with MSAL),
                                        building WCAG-compliant component libraries, and improving quality with Jest/Mocha
                                        testing. I also worked in teams that were doing micro-frontends
                                        and repository-pattern-based apps - so modular, scalable architectures.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        Mott MacDonald (2023-Present)
                                    </h3>
                                    <p>
                                        Then I moved to London and joined Mott MacDonald, where I&apos;ve been building a
                                        micro-frontend portal using Next.js, Module Federation and Turborepo.
                                    </p>
                                </div>
                            </div>

                            <p className="pt-4">
                                So the throughline is: I didn&apos;t have a straight path, but I became the person teams
                                go to when they need a modern front-end setup that many people can build on.
                            </p>
                        </div>
                    </div>

                    {/* What I Do */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">What I Do</h2>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">Core Expertise</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                                <div>
                                    <span className="text-primary mr-2">›</span>
                                    <span className="font-semibold">Frontend:</span> React, Next.js (SSR/SSG, App Router),
                                    TypeScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query/Form
                                </div>
                                <div>
                                    <span className="text-primary mr-2">›</span>
                                    <span className="font-semibold">Architecture:</span> Micro-frontends with Module Federation,
                                    Turborepo monorepos, pnpm workspaces
                                </div>
                                <div>
                                    <span className="text-primary mr-2">›</span>
                                    <span className="font-semibold">Enterprise integration:</span>Azure, AWS, Google Workspaces
                                </div>
                                <div>
                                    <span className="text-primary mr-2">›</span>
                                    <span className="font-semibold">DevOps for FE:</span> GitHub Actions, Azure DevOps, CI/CD
                                    pipelines, caching, parallel builds
                                </div>
                                <div>
                                    <span className="text-primary mr-2">›</span>
                                    <span className="font-semibold">Accessibility & standards:</span> WCAG-compliant component
                                    libraries, Storybook-driven docs
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">Recent Wins (Mott MacDonald)</h3>
                            <div className="space-y-3">
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Built a micro-frontend portal with 5+ independently deployable apps, all sharing Azure AD auth</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Created a reusable component library (shadcn/ui + Tailwind v4) with 30+ accessible components</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Optimized performance via code splitting, lazy loading, Redis caching</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Wrote solid docs (ADRs, Storybook) → 10+ devs onboarded in 2 weeks</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Philosophy */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">How I Work</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p><span className="font-semibold">Platforms over one-offs:</span> I like building things other teams can reuse (component libraries, micro-frontends, shared auth).</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p><span className="font-semibold">Performance is a feature:</span> Code splitting, caching, and intelligent data fetching come in early, not at the end.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p><span className="font-semibold">DX matters:</span> Good docs, Storybook, ADRs - those make teams faster.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p><span className="font-semibold">Use the ecosystem:</span> If the org lives in Microsoft 365 / SharePoint / Azure / AWS / Google Workspaces, I integrate with it instead of fighting it.</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p><span className="font-semibold">Make UIs human:</span> Enterprise apps don&apos;t have to be ugly or confusing.</p>
                            </div>
                        </div>
                    </div>

                    {/* Outside of Work */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Outside of Work</h2>
                        <p className="text-muted-foreground">
                            I moved to London to be with someone I love and stayed because I enjoy the culture and the
                            tech scene. I like learning new front-end patterns, trying out new tooling (Next.js updates,
                            Tailwind changes, React libraries), and generally building things that reduce friction for teams.
                        </p>
                    </div>

                    {/* Current Focus */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Current Focus</h2>
                        <div className="space-y-3 text-muted-foreground">
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Getting better at front-end platform engineering: micro-frontends, monorepos, shared UI, and CI/CD</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Staying current with Next.js and React tooling for large teams</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Exploring AI-assisted tooling (Copilot Studio, OpenAI APIs) to speed up internal dev work</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Building experiences that are accessible and fast for large, global user bases</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Let&apos;s Connect</h2>
                        <p className="text-muted-foreground mb-6">I&apos;m open to:</p>
                        <div className="space-y-3 text-muted-foreground mb-6">
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Senior/Lead Frontend roles in product or internal-platform teams</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Projects that need micro-frontend setup, Next.js migration, or component library work</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Work that involves Microsoft 365 / Graph / SharePoint integration</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">Email:</span>
                                    <a
                                        href="mailto:shashankksgupta@gmail.com"
                                        className="text-primary hover:underline"
                                    >
                                        shashankksgupta@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">Location:</span>
                                    <span className="text-muted-foreground">London, UK</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">Phone:</span>
                                    <a
                                        href="tel:+447852870243"
                                        className="text-primary hover:underline"
                                    >
                                        +44 7852 870243
                                    </a>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">LinkedIn:</span>
                                    <a
                                        href="https://www.linkedin.com/in/shashankguptadev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        linkedin.com/in/shashankguptadev
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">GitHub:</span>
                                    <a
                                        href="https://github.com/HiIAmShashank"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        github.com/HiIAmShashank
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">Portfolio:</span>
                                    <a
                                        href="https://sgupta.dev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline"
                                    >
                                        sgupta.dev
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Facts */}
                    <div className="glass p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Quick Facts</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Senior Frontend Engineer based in London</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Built micro-frontend portal with 5+ apps and shared auth</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>65% CI/CD performance improvement via GitHub Actions + Turborepo</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Started in medicine, found my place in software</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Still like helping people learn - that started back in college</p>
                            </div>
                            <div className="flex gap-3">
                                <span className="text-primary flex-shrink-0">›</span>
                                <p>Graduated B.Sc. Computer Science with distinction (2014-2017)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
