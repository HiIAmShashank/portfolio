import { PERSONAL_INFO } from "@/lib/config/index";


export function FooterCopyright() {
    return (
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
            <p>
                © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
            </p>
        </div>
    );
}
