// src/components/menu/MenuCard.tsx
'use client';

import Image from 'next/image';
import { MenuItem } from '@/data/menuData';

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void; // now opens modal via parent
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition p-3 flex flex-col relative">
      {/* Gambar */}
      <div className="relative w-full h-32 rounded-lg overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      {/* Info Makanan */}
      <div className="mt-3">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
      </div>

      {/* Tombol + di kanan bawah */}
      <button
        onClick={() => onAdd(item)}
        className="absolute bottom-3 right-3 bg-[#DD0303] text-white rounded-lg p-2 hover:bg-red-400 transition"
        aria-label={`Tambah ${item.name} ke keranjang`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}
