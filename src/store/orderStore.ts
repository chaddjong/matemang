import { create } from 'zustand';

export const useOrderStore = create((set) => ({
  orders: [],

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
