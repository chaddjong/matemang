'use client';

import { useEffect, useState } from 'react';
import { useOrderStore } from '@/store/orderStore';

export default function OrderCard({ order }) {
  const { updateStatus, setCountdown } = useOrderStore();

  const [remaining, setRemaining] = useState(0);

  // Hitung mundur
  useEffect(() => {
    if (!order?.timerEnd) {
      setRemaining(0);
      return;
    }

    const tick = () => {
      const diff = order.timerEnd - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [order?.timerEnd]);

  const handleSetTimer = () => {
    const minutes = prompt('Set timer berapa menit?', '2');
    if (!minutes) return;

    const ms = parseInt(minutes) * 60000;
    const endTime = Date.now() + ms;

    setCountdown(order.id, endTime);
  };

  const handleChangeStatus = (e) => {
    updateStatus(order.id, e.target.value);
  };

  const formatTime = (ms) => {
    if (!ms || ms <= 0) return '00:00';

    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold">Pesanan #{order.id}</h2>

      {/* ITEMS */}
      <div className="mt-3">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="mb-3 pb-2 border-b last:border-none last:pb-0"
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                {item.name} × {item.qty}
              </span>
              <span className="font-medium">Rp {item.price * item.qty}</span>
            </div>

            <div className="mt-1 ml-1 text-xs text-gray-600 space-y-1">
              {item.selectedSize && <p>• Ukuran: {item.selectedSize.label}</p>}
              {item.selectedTopping && (
                <p>• Topping: {item.selectedTopping.label}</p>
              )}
              {item.selectedSugar && <p>• Gula: {item.selectedSugar}</p>}
              {item.notes && (
                <p className="text-gray-500">• Catatan: {item.notes}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-3 pt-2 border-t font-semibold">
        Total: Rp {order.total}
      </div>

      {/* PAYMENT METHOD */}
      <div className="mt-2 text-sm text-gray-600">
        Metode Pembayaran:
        <span className="font-semibold ml-1">
          {order.paymentMethod === 'cash' ? 'Tunai' : 'QRIS / VA Bank'}
        </span>
      </div>

      {/* STATUS */}
      <div className="mt-3">
        <label className="block text-sm mb-1">Status Pesanan:</label>
        <select
          value={order.status}
          onChange={handleChangeStatus}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="pending">Menunggu</option>
          <option value="cooking">Sedang Dimasak</option>
          <option value="ready">Sudah Siap</option>
          <option value="done">Selesai</option>
        </select>
      </div>

      {/* COUNTDOWN TIMER */}
      <div className="mt-3 pt-2 border-t">
        <p className="text-sm font-medium">Timer:</p>

        {order?.timerEnd ? (
          <p
            className={`text-lg font-bold ${
              remaining <= 0 ? 'text-red-600' : 'text-green-700'
            }`}
          >
            {formatTime(remaining)}
          </p>
        ) : (
          <button
            onClick={handleSetTimer}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg mt-1"
          >
            Set Timer
          </button>
        )}
      </div>
    </div>
  );
}
