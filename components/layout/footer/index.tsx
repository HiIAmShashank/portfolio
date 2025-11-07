import { FooterAbout } from './footer-about';
import { FooterLinks } from './footer-links';
import { FooterContact } from './footer-contact';
import { FooterCopyright } from './footer-copyright';

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-border">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    <FooterAbout />
                    <FooterLinks />
                    <FooterContact />
                </div>
                <FooterCopyright />
            </div>
        </footer>
    );
}
