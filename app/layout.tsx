import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Kurtuluş Yolu: Atatürk ile Sohbet',
  description: 'Mustafa Kemal Atatürk ile Kurtuluş Savaşı dönemi üzerine interaktif ve eğitici bir sohbet.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="min-h-screen bg-[#f8f5f0] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
