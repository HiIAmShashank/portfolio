/**
 * Icon Components using react-icons
 * Centralized icon system with react-icons library
 */

import {
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTailwindcss,
    SiDocker,
    SiPostgresql,
    SiVite,
    SiAngular,
    SiTurborepo,
    SiPnpm,
    SiGithub,
    SiLinkedin
} from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";

import { HiMail, HiArrowRight } from 'react-icons/hi';

// Re-export icons with consistent naming
export const TypeScriptIcon = SiTypescript;
export const ReactIcon = SiReact;
export const NextJsIcon = SiNextdotjs;
export const NodeJsIcon = SiNodedotjs;
export const TailwindIcon = SiTailwindcss;
export const AzureIcon = VscAzure;
export const DockerIcon = SiDocker;
export const PostgreSQLIcon = SiPostgresql;
export const ViteIcon = SiVite;
export const AngularIcon = SiAngular;
export const TurborepoIcon = SiTurborepo;
export const PnpmIcon = SiPnpm;
export const GitHubIcon = SiGithub;
export const LinkedInIcon = SiLinkedin;
export const EmailIcon = HiMail;
export const ArrowRightIcon = HiArrowRight;

// Icon mapping for dynamic rendering
export const ICON_MAP = {
    typescript: TypeScriptIcon,
    react: ReactIcon,
    nextjs: NextJsIcon,
    nodejs: NodeJsIcon,
    tailwind: TailwindIcon,
    azure: AzureIcon,
    docker: DockerIcon,
    postgres: PostgreSQLIcon,
    vite: ViteIcon,
    angular: AngularIcon,
    turborepo: TurborepoIcon,
    pnpm: PnpmIcon,
    github: GitHubIcon,
    linkedin: LinkedInIcon,
    email: EmailIcon,
    arrow: ArrowRightIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;
