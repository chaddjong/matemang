'use client';

import React, { useState, useEffect } from 'react';
import { useOrderStore } from '@/store/orderStore';

// ==========================
// TYPES
// ==========================
interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderStore {
  orders: Order[];
  // tambahkan state/fungsi lain jika ada
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'cooking' | 'ready' | 'done' | string;
  timerEnd?: number;
}

interface OrderModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (orderId: string) => void;
}

interface OrderDetailViewProps {
  order: Order;
}

// ==========================
// BADGE WARNA UNTUK STATUS
// ==========================
function StatusBadge({ status }: { status: string }) {
  const color =
    {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      cooking: 'bg-orange-100 text-orange-700 border-orange-300',
      ready: 'bg-green-100 text-green-700 border-green-300',
      done: 'bg-blue-100 text-blue-700 border-blue-300',
    }[status] || 'bg-gray-100 text-gray-700 border-gray-300';

  return (
    <span
      className={`px-3 py-1 text-xs border rounded-full font-semibold ${color}`}
    >
      {statusText(status)}
    </span>
  );
}

// ==========================
// MODAL UTAMA
// ==========================
export default function OrderModal({
  open,
  onClose,
  onSubmit,
}: OrderModalProps) {
  const { orders } = useOrderStore() as unknown as OrderStore;

  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<Order | 'not-found' | null>(null);

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

  const handleCheckOrder = () => {
    const found = orders.find((o: Order) => o.id === orderId.trim());
    setOrderData(found || 'not-found');

    if (found) {
      // trigger callback ke parent
      onSubmit?.(found.id);
    }
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[999]
        transition-opacity duration-300
        ${animate ? 'bg-black/40 opacity-100' : 'bg-black/0 opacity-0'}
      `}
    >
      <div
        className={`
          bg-white w-11/12 max-w-md rounded-2xl shadow-xl p-6 relative
          transform transition-all duration-300
          ${
            animate
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-6 scale-95'
          }
        `}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Cek Status Pesanan
        </h2>

        {/* INPUT ORDER ID */}
        <label className="block text-sm font-medium mb-1">Nomor Pesanan</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-green-500"
            placeholder="Contoh: ORD12345"
          />

          {/* TOMBOL CEK */}
          <button
            onClick={handleCheckOrder}
            className="px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-sm"
          >
            Cek
          </button>
        </div>

        {/* HASIL */}
        <div className="mt-5">
          {orderData === null && (
            <p className="text-gray-500 text-center text-sm">
              Masukkan nomor pesanan untuk melihat status.
            </p>
          )}

          {orderData === 'not-found' && (
            <p className="text-red-500 text-center text-sm">
              Pesanan tidak ditemukan.
            </p>
          )}

          {orderData && orderData !== 'not-found' && (
            <OrderDetailView order={orderData} />
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================
// DETAIL ORDER (Card Style)
// ==========================
function OrderDetailView({ order }: OrderDetailViewProps) {
  const [remaining, setRemaining] = useState(0);

  // Hitung mundur
  useEffect(() => {
    if (!order?.timerEnd) {
      setRemaining(0);
      return;
    }

    const tick = () => {
      const diff = order.timerEnd! - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [order?.timerEnd]);

  const formatTime = (ms: number) => {
    if (!ms || ms <= 0) return '00:00';

    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="border rounded-xl p-5 mt-3 shadow-sm bg-gray-50">
      <h3 className="font-bold text-lg mb-2">Pesanan #{order.id}</h3>

      {/* ITEMS */}
      <div className="space-y-2">
        {order.items.map((item: OrderItem, i: number) => (
          <div
            key={i}
            className="flex justify-between text-sm text-gray-700 border-b pb-1"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span className="font-medium">
              Rp {(item.price * item.qty).toLocaleString('id-ID')}
            </span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-3 flex justify-between items-center">
        <span className="font-semibold text-gray-700">Total</span>
        <span className="font-bold text-green-700">
          Rp {order.total.toLocaleString('id-ID')}
        </span>
      </div>

      {/* STATUS */}
      <div className="mt-4">
        <p className="text-sm font-semibold mb-1">Status Pesanan</p>
        <StatusBadge status={order.status} />
      </div>

      {/* COUNTDOWN */}
      <div className="mt-4">
        <p className="text-sm font-semibold mb-1">Sisa Waktu</p>

        {order.timerEnd ? (
          <p
            className={`text-xl font-bold ${
              remaining <= 0 ? 'text-red-600' : 'text-green-700'
            }`}
          >
            {formatTime(remaining)}
          </p>
        ) : (
          <p className="text-gray-500 text-sm">Belum ada timer</p>
        )}
      </div>
    </div>
  );
}

// ==========================
// STATUS TEXT
// ==========================
function statusText(status: string) {
  switch (status) {
    case 'pending':
      return 'Menunggu Diproses';
    case 'cooking':
      return 'Sedang Dimasak/Dibuat';
    case 'ready':
      return 'Siap Diambil';
    case 'done':
      return 'Selesai';
    default:
      return 'Tidak Diketahui';
  }
}
