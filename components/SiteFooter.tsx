import { Container } from "@/components/Container";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-surface bg-white">
      <Container className="py-8 text-sm text-gray-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Royal Service PTY</p>
        <p>
          WhatsApp: {SITE.whatsappDisplay} · Email: {SITE.email} · IG: @{SITE.instagram}
        </p>
      </Container>
    </footer>
  );
}
