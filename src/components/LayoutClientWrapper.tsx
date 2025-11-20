'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WelcomeSection } from '@/components';
import OrderModal from '@/components/modal/OrderModal';
import MatemangLogo from '../../public/images/matemang_logo.jpeg';
import { usePathname, useRouter } from 'next/navigation';

export default function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmitOrder = (orderId: string) => {
    console.log('Nomor Pesanan:', orderId);
    setIsModalOpen(false);
  };

  const handleAdminClick = () => {
    setPasswordInput('');
    setPasswordError('');
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = () => {
    const correctPassword = 'mate123'; // Password hardcoded
    if (passwordInput === correctPassword) {
      setIsPasswordModalOpen(false);
      router.push('/admin');
    } else {
      setPasswordError('Password salah! Silakan coba lagi.');
    }
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
            <button
              onClick={handleAdminClick}
              className="text-sm font-medium hover:text-primary transition"
            >
              Admin
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

      {/* MODAL ORDER */}
      <OrderModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitOrder}
      />

      {/* MODAL PASSWORD */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">
              Masukkan Password Admin
            </h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-2"
              placeholder="Password"
            />
            {passwordError && (
              <p className="text-red-600 text-sm mb-2">{passwordError}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg text-sm"
              >
                Batal
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      )}

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
