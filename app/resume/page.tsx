import { Metadata } from 'next';
import { AnimatedBackground } from '@/components/ui/animated-background';

export const metadata: Metadata = {
    title: 'Resume - Shashank Gupta',
    description: 'Professional resume and work experience of Shashank Gupta, Full-Stack Software Engineer specializing in modern web technologies.',
};

export default function ResumePage() {
    return (
        <div className="min-h-screen relative overflow-hidden">
            <AnimatedBackground />

            <main className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">Shashank Gupta</h1>
                        <p className="text-xl text-muted-foreground mb-6">
                            Full-Stack Software Engineer specializing in Modern Web Technologies
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <span className="font-semibold min-w-[80px]">Location:</span>
                                    <span className="text-muted-foreground">London, United Kingdom</span>
                                </div>
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

                    {/* Professional Experience */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Professional Experience</h2>

                        {/* Mott MacDonald */}
                        <div className="mb-8">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold">IT Engineer</h3>
                                    <p className="text-lg text-muted-foreground">Mott MacDonald</p>
                                </div>
                                <div className="text-muted-foreground">
                                    <p>London, UK</p>
                                    <p>2023-Present</p>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Designed and developed a micro-frontend portal using Module Federation, Next.js, and Turborepo monorepo with pnpm workspaces, enabling 5+ independently deployable applications with shared Azure AD authentication and reducing build time and scaffolding by 50%.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Implemented comprehensive CI/CD pipeline using GitHub Actions and Turborepo caching, achieving 65% reduction in build times through intelligent dependency analysis and parallelized workflows, decreasing deployment time from 45 to 8 minutes.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Developed reusable component library using shadcn/ui and Tailwind CSS v4 with 30+ type-safe, accessible React components, eliminating CSS duplication across applications and reducing feature development time by 35%.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Optimized front-end performance through strategic code splitting, lazy loading, and caching strategies, reducing initial load times by 30% and API calls by 40% through intelligent stale-while-revalidate patterns.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Implemented modern state management using TanStack Query, Zustand, and Context API for complex React applications, and built type-safe forms with TanStack Form and Zod validation reducing form errors by 70%.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Created comprehensive technical documentation including ADRs and Storybook component library, enabling 10+ developers to onboard to complex codebase within 2 weeks and reducing knowledge transfer time by 60%.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Automated dynamic feed generation for geo-targeted user content, driving a 25% increase in engagement through personalized experiences and interactive front-end displays.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Utilized Next.js for several high-traffic projects, leveraging server-side rendering and static site generation to improve performance and deliver better user experience.</p>
                                </div>
                            </div>
                        </div>

                        {/* Infogain */}
                        <div className="mb-8">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold">Software Engineer</h3>
                                    <p className="text-lg text-muted-foreground">Infogain India Pvt. Ltd.</p>
                                </div>
                                <div className="text-muted-foreground">
                                    <p>Mumbai, India</p>
                                    <p>2022-2023</p>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Engineered front-end solutions using React and TypeScript, seamlessly integrating the Microsoft Graph API for secure data retrieval and improved user interactions using MSAL.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Developed a reusable and WCAG compliant component library improving UI standardization across organizational apps.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Implemented robust testing workflows with Jest and Mocha, reducing production defects by 45% and enhancing overall code reliability.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Collaborated with a 10+ developer team to design and deploy applications based on the repository pattern within micro-frontends, enabling modular and scalable architectures.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Implemented RabbitMQ messaging queues and Redis cache to enhance front-end responsiveness, resulting in a 45% improvement in performance and scalability.</p>
                                </div>
                            </div>
                        </div>

                        {/* Atidan Technologies */}
                        <div>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold">Technical Lead</h3>
                                    <p className="text-lg text-muted-foreground">Atidan Technologies Pvt. Ltd.</p>
                                </div>
                                <div className="text-muted-foreground">
                                    <p>Mumbai, India</p>
                                    <p>2017-2022</p>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Built and enhanced front-end solutions for multiple content management systems using React, AngularJS, and jQuery, integrating JavaScript, HTML, and CSS to create dynamic, user-friendly interfaces.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Collaborated with 5+ team members to modernize and optimize websites for over 30 clients, ensuring adherence to industry standards and best practices.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Streamlined deployments by managing CI/CD pipelines in Azure DevOps, boosting development productivity for projects involving 5+ contributors.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Improved performance through efficient handling of large data sets, employing techniques like viewport rendering and lazy loading to ensure speedy and responsive user experiences.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Led a team of 5+ developers through the entire project lifecycle-including requirements gathering, level-of-effort estimation, planning, development, and deployment-delivering organizational process improvements.</p>
                                </div>
                                <div className="flex gap-3 text-muted-foreground">
                                    <span className="text-primary flex-shrink-0">›</span>
                                    <p>Created and maintained component libraries using Storybook, enabling fast UI development, consistent design practices, and easy team-wide documentation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Skills</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Frontend Technologies</h3>
                                <p className="text-muted-foreground text-sm">
                                    React, Angular, Vue, TypeScript, JavaScript, HTML5, CSS, Next.js 15 (App Router, SSR, SSG), SASS/SCSS, Tailwind CSS, Blazor, Vite
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Backend & API Development</h3>
                                <p className="text-muted-foreground text-sm">
                                    Node.js, Express, RESTful APIs, Laravel, PHP, Prisma ORM, Postgres, SQL Server, GraphQL, .NET Framework and Core, Web APIs, Azure, AWS
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Micro-frontend Architecture</h3>
                                <p className="text-muted-foreground text-sm">
                                    Turborepo, pnpm, Module Federation
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">DevOps & CI/CD</h3>
                                <p className="text-muted-foreground text-sm">
                                    CI/CD, Azure DevOps, Jenkins, GitHub Actions, Webpack, Gulp, Docker, Bicep, Terraform, ARM Templates
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Performance & Scalability</h3>
                                <p className="text-muted-foreground text-sm">
                                    Redis, RabbitMQ, Web Vitals
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Additional Skills</h3>
                                <p className="text-muted-foreground text-sm">
                                    Blazor, Responsive Web Design, Team Management, Testing (Jest, Mocha, Cypress), ESLint, Prettier, Redux, Context API, Zustand
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Artificial Intelligence (AI)</h3>
                                <p className="text-muted-foreground text-sm">
                                    AI Foundry, Prompt engineering, Copilot Studio, OpenAI APIs
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="glass p-8 rounded-2xl mb-8">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Education</h2>

                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                                <div>
                                    <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
                                    <p className="text-lg text-muted-foreground">Bhavans College, Mumbai University</p>
                                </div>
                                <div className="text-muted-foreground">
                                    <p>Mumbai, India</p>
                                    <p>2014-2017</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
