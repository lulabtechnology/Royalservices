import "./globals.css";

export const metadata = {
  title: "Royal Service PTY",
  description: "Catálogo profesional sin pasarela de pago"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
