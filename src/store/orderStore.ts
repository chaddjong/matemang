import { create } from 'zustand';

// src/store/orderStore.ts
export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[]; // ✅ tambahkan ini
  total: number;
  status: 'pending' | 'cooking' | 'ready' | 'done' | string;
  paymentMethod?: 'cash' | 'qris';
  createdAt?: string;
  timerStart?: number | null;
  timerEnd?: number;
}

interface OrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: string) => void;
  setCountdown: (id: string, endTime: number) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, { ...order, timerStart: null }],
    })),
  updateStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),
  setCountdown: (id, endTime) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, timerEnd: endTime } : o
      ),
    })),
}));
