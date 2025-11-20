import { create } from 'zustand';

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: string;
  // tambahkan field lain sesuai kebutuhan
}

interface OrderStore {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, { ...order, timerStart: null }],
    })),

  updateStatus: (id: string, status: string) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    })),

  setCountdown: (id: string, endTime: string) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, timerEnd: endTime } : o
      ),
    })),
}));
