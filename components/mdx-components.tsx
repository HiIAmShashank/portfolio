import Image from 'next/image';
import type { ComponentProps } from 'react';

// Custom Image component for MDX
function MdxImage(props: ComponentProps<typeof Image>) {
    return (
        <div className="my-8 rounded-xl overflow-hidden border border-border shadow-2xl">
            <Image
                {...props}
                alt={props.alt || ''}
                width={props.width || 1200}
                height={props.height || 675}
                className="w-full h-auto"
            />
        </div>
    );
}

// Custom callout component
function Callout({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warning' | 'success' | 'error' }) {
    const styles = {
        info: 'border-primary/50 bg-primary/10 text-primary',
        warning: 'border-secondary/50 bg-secondary/10 text-secondary',
        success: 'border-primary/50 bg-primary/10 text-primary',
        error: 'border-destructive/50 bg-destructive/10 text-destructive',
    };

    const icons = {
        info: '💡',
        warning: '⚠️',
        success: '✅',
        error: '❌',
    };

    return (
        <div className={`my-6 p-4 rounded-lg border-l-4 ${styles[type]}`}>
            <div className="flex gap-3">
                <span className="text-xl">{icons[type]}</span>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}

// Custom code block wrapper
function CodeBlock({ children, ...props }: ComponentProps<'pre'>) {
    return (
        <div className="my-6 rounded-xl overflow-hidden border border-border shadow-lg">
            <pre {...props} className="!m-0 !bg-muted">
                {children}
            </pre>
        </div>
    );
}

// Custom components to use in MDX
export const mdxComponents = {
    img: MdxImage,
    Image: MdxImage,
    Callout,
    pre: CodeBlock,
};