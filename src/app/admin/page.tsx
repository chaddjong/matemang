'use client';

import { useOrderStore } from '@/store/orderStore'; // nanti kita buat
import OrderCard from '@/components/admin/OrderCard';

export default function AdminPage() {
  const { orders } = useOrderStore();

  return (
    <div className="w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Daftar Pesanan Masuk</h1>

      {orders.length === 0 && (
        <p className="text-gray-500 text-sm">Belum ada pesanan masuk.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
