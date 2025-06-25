import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tu Oráculo de Confianza | Mensajes Espirituales Diarios',
  description: 'Descubre tu mensaje espiritual diario basado en astrología, diseño humano y sabiduría ancestral.',
  keywords: 'oráculo, mensajes espirituales, astrología, diseño humano, espiritualidad',
  openGraph: {
    title: 'Tu Oráculo de Confianza',
    description: 'Mensajes espirituales diarios que guían tu camino',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}