'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WelcomeSection } from '@/components';
import OrderModal from '@/components/modal/OrderModal';
import MatemangLogo from '../../public/images/matemang_logo.jpeg';
import { usePathname } from 'next/navigation';

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const handleSubmitOrder = (orderId: string) => {
    console.log('Nomor Pesanan:', orderId);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex flex-row justify-center items-center gap-2 sm:gap-3">
            <Image
              src={MatemangLogo}
              alt="Logo Matemang"
              width={65}
              className="w-12 sm:w-16 md:w-20 h-auto"
              priority
            />

            <div className="flex flex-col leading-tight">
              <h1 className="font-semibold tracking-tight text-primary text-xl sm:text-2xl md:text-2xl">
                Mate
              </h1>
              <h1 className="font-semibold tracking-tight text-primary text-xl sm:text-2xl md:text-2xl -mt-1">
                Mang
              </h1>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-primary transition">
              <Link href="/admin">Admin</Link>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium hover:text-primary transition"
            >
              Pesanan Saya
            </button>
          </nav>
        </div>
      </header>

      {/* MODAL */}
      <OrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitOrder}
      />

      {/* WELCOME SECTION - hanya tampil di halaman user, bukan admin */}
      {pathname !== '/admin' && <WelcomeSection />}

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-2 pt-4 pb-8">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t mt-auto py-6 bg-white">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Matemang. Semua hak dilindungi.
        </div>
      </footer>
    </>
  );
}
