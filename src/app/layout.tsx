import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Image from 'next/image';

import { WelcomeSection } from '@/components';

import MatemangLogo from '../../public/images/matemang_logo.jpeg';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Matemang - Pemesanan Makanan & Minuman',
  description:
    'Matemang adalah sistem pemesanan makanan dan minuman digital yang memudahkan pelanggan memesan langsung dari perangkat mereka.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen flex flex-col`}
      >
        {/* ===== Header ===== */}
        <header id="header" className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
            <div className="flex flex-row justify-center items-center gap-2 sm:gap-3">
              <Image
                src={MatemangLogo}
                alt="Logo Matemang"
                width={65} // lebih kecil default, biar pas di mobile
                className="w-12 sm:w-16 md:w-20 h-auto"
                priority
              />

              <div className="flex flex-col leading-tight">
                <h1 className="font-semibold tracking-tight text-primary text-xl sm:text-2xl md:text-2xl m-0 p-0 leading-[1.1]">
                  Mate
                </h1>
                <h1 className="font-semibold tracking-tight text-primary text-xl sm:text-2xl md:text-2xl m-0 p-0 leading-[1.1] -mt-1">
                  Mang
                </h1>
              </div>
            </div>

            {/* Tempat tombol keranjang / login / dsb */}
            <nav className="flex items-center gap-4">
              <button className="text-sm font-medium hover:text-primary transition">
                Menu
              </button>
              <button className="text-sm font-medium hover:text-primary transition">
                Pesanan Saya
              </button>
            </nav>
          </div>
        </header>

        {/* ===== Welcoming Page ===== */}
        <WelcomeSection />

        {/* ===== Main Content ===== */}
        <main
          id="main-content"
          className="flex-1 max-w-7xl mx-auto w-full px-2 pt-4 pb-8"
        >
          {children}
        </main>

        {/* ===== Footer ===== */}
        <footer className="w-full border-t mt-auto py-6 bg-white">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Matemang. Semua hak dilindungi.
          </div>
        </footer>
      </body>
    </html>
  );
}
