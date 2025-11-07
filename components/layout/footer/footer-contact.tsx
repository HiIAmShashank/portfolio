import { PERSONAL_INFO } from "@/lib/config/index";


export function FooterContact() {
    return (
        <div className="space-y-4">
            <h4 className="text-foreground font-semibold text-lg">Get In Touch</h4>
            <div className="space-y-3">
                <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors block"
                >
                    {PERSONAL_INFO.email}
                </a>
                {PERSONAL_INFO.availableForWork && (
                    <div className="glass px-4 py-3 rounded-xl inline-flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">Available for opportunities</span>
                    </div>
                )}
            </div>
        </div>
    );
}
