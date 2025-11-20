'use client';

import { useEffect, useState } from 'react';

export default function ModalSuccessOrder({ open, orderId, onClose, onCheck }) {
  const [show, setShow] = useState(open);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setShow(true);
      setTimeout(() => setAnimate(true), 20);
    } else {
      setAnimate(false);
      setTimeout(() => setShow(false), 250);
    }
  }, [open]);

  if (!show) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[999] flex items-center justify-center
        transition-all duration-300
        ${animate ? 'bg-black/40 opacity-100' : 'bg-black/0 opacity-0'}
      `}
    >
      <div
        className={`
          bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-sm text-center
          transition-all duration-300
          ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}
        `}
      >
        <h2 className="text-xl font-semibold text-green-600">
          Pesanan Berhasil Dibuat!
        </h2>

        <p className="text-gray-600 mt-2">Nomor pesanan Anda:</p>

        <p className="text-2xl font-bold text-primary mt-1">{orderId}</p>

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={onCheck}
            className="w-full py-2 bg-primary text-white rounded-lg font-semibold"
          >
            Lihat Status Pesanan
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 border border-gray-300 rounded-lg font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
