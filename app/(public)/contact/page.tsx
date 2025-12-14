import { Container } from "@/components/Container";
import { SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <Container className="py-10 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Contacto</h1>
        <p className="text-gray-600">Escríbenos y te atendemos rápido.</p>
      </div>

      <div className="rounded-2xl border border-surface p-5 space-y-3">
        <div>
          <p className="text-sm text-gray-500">WhatsApp</p>
          <p className="font-medium">{SITE.whatsappDisplay}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{SITE.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Instagram</p>
          <p className="font-medium">@{SITE.instagram}</p>
        </div>
      </div>
    </Container>
  );
}
