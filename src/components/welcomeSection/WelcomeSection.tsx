'use client';

import Image from 'next/image';
import WelcomeImage from '../../../public/images/WhatsApp Image 2025-10-21 at 20.56.23.jpeg'

export default function WelcomeSection() {
  const scrollToMain = () => {
    const section = document.getElementById('main-content');
    const header = document.getElementById('header');

    if (section) {
      const headerHeight = header?.offsetHeight || 80;
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  return (
    <section className="w-full bg-white pt-5 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-10">
        {/* ===== LEFT TEXT ===== */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block bg-[#FEF3E2] text-[#FA812F] text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Seni Meracik Kenikmatan
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-4">
            Dari Sumber Terbaik <br />
            <span className="text-[#FE0000]">Untuk Pecinta Rasa Sejati</span>
          </h1>

          <p className="text-gray-600 mb-6 max-w-lg mx-auto md:mx-0">
            Kami memadukan daun teh pilihan dengan teknik penyeduhan yang tepat,
            menciptakan harmoni rasa yang sempurna di dalam gelas. Sebuah
            penghormatan bagi Anda yang menghargai setiap detil kenikmatan.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center md:justify-start">
            <button
              onClick={scrollToMain}
              className="bg-[#FA812F] hover:bg-[#FAB12F] text-white font-medium px-5 py-3 rounded-lg shadow transition w-full sm:w-auto"
            >
              Pesan Sekarang →
            </button>
            {/* Stats */}
            <div className="flex gap-8 sm:gap-10 md:ml-4 text-sm font-semibold text-gray-700 justify-center md:justify-start">
              <div className="text-center md:text-left">
                <p className="text-xl font-bold">2.5K+</p>
                <span className="text-gray-500">Order</span>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl font-bold">80+</p>
                <span className="text-gray-500">Varietas</span>
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl font-bold">4.8 ⭐</p>
                <span className="text-gray-500">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== IMAGE ===== */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-[260px] h-[200px] sm:w-[340px] sm:h-[250px] md:w-[430px] md:h-[330px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={WelcomeImage}
              alt="Buah Tropis"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 text-white drop-shadow-sm">
              <p className="font-bold">Buah Tropis Premium</p>
              <small className="text-sm opacity-90">
                Dipetik fresh setiap hari
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
