// src/app/page.tsx
'use client';

import { useState } from 'react';
import {
  MenuCard,
  CartItem,
  Button,
  EmptyState,
  CategoryFilter,
} from '@/components';
import { menuItems, MenuItem } from '@/data/menuData';
import ModalAddOrder from '@/components/modal/ModalAddOrder';
import type { SelectionResult } from '@/components/modal/ModalAddOrder';

type CartItemType = MenuItem & {
  cartId: string; // unique per cart line
  quantity: number;
  selectedSize?: { label: string; addPrice?: number } | null;
  selectedTopping?: { label: string; addPrice: number } | null;
  selectedSugar?: string | null;
  finalUnitPrice: number; // price per unit including options
};

export default function HomePage() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  // Buat kategori dinamis dari data
  const categories = [
    'All',
    ...Array.from(new Set(menuItems.map((i) => i.category))),
  ];

  // Filter menu sesuai kategori aktif
  const filteredMenu =
    activeCategory === 'All'
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  // Group by category & subcategory
  const groupedMenu = filteredMenu.reduce(
    (groups: Record<string, Record<string, MenuItem[]>>, item) => {
      const cat = item.category;
      const sub = item.subcategory || '';
      if (!groups[cat]) groups[cat] = {};
      if (!groups[cat][sub]) groups[cat][sub] = [];
      groups[cat][sub].push(item);
      return groups;
    },
    {}
  );

  // ===== CART FUNCTIONS =====
  const openModal = (item: MenuItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalItem(null);
    setIsModalOpen(false);
  };

  const handleConfirmFromModal = (data: SelectionResult) => {
    if (!modalItem) return;

    const cartId = `${modalItem.id}-${Date.now()}`;
    const newCartItem: CartItemType = {
      ...modalItem,
      cartId,
      quantity: data.quantity,
      selectedSize: data.selectedSize ?? null,
      selectedTopping: data.selectedTopping ?? null,
      selectedSugar: data.selectedSugar ?? null,
      finalUnitPrice: data.finalUnitPrice,
    };

    setCart((prev) => [...prev, newCartItem]);
  };

  const increaseQty = (cartId: string) =>
    setCart((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

  const decreaseQty = (cartId: string) =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.cartId === cartId
            ? { ...i, quantity: Math.max(1, i.quantity - 1) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );

  const removeFromCart = (cartId: string) =>
    setCart((prev) => prev.filter((i) => i.cartId !== cartId));

  const totalPrice = cart.reduce(
    (sum, i) => sum + i.finalUnitPrice * i.quantity,
    0
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 pb-2 max-w-7xl mx-auto">
      {/* ===== LEFT: MENU LIST ===== */}
      <div className="flex-1">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="space-y-8">
          {Object.keys(groupedMenu).map((category) => (
            <div key={category}>
              {/* CATEGORY LABEL */}
              <h2 className="font-bold text-xl mb-3">
                {category.toUpperCase()}
              </h2>

              {/* SUBCATEGORY LOOP */}
              {Object.keys(groupedMenu[category]).map((sub) => (
                <div key={sub} className="mb-4">
                  {/* SUBCATEGORY LABEL */}
                  {sub && (
                    <h3 className="font-semibold text-lg mb-2">
                      {sub.toUpperCase()}
                    </h3>
                  )}

                  {/* ITEMS */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {groupedMenu[category][sub].map((item) => (
                      <MenuCard key={item.id} item={item} onAdd={openModal} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT: CART ===== */}
      <div className="md:w-1/3">
        <div className="sticky top-24 bg-white shadow rounded-2xl p-4 flex flex-col h-[80vh]">
          <h2 className="text-lg font-semibold mb-3 border-b pb-2">Pesanan</h2>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {cart.length === 0 ? (
              <EmptyState message="Belum ada item ditambahkan." />
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.cartId}
                  name={item.name}
                  price={item.finalUnitPrice * item.quantity}
                  image={item.image}
                  quantity={item.quantity}
                  // pass functions using cartId
                  onIncrease={() => increaseQty(item.cartId)}
                  onDecrease={() => decreaseQty(item.cartId)}
                  onRemove={() => removeFromCart(item.cartId)}
                />
              ))
            )}
          </div>

          {/* Total & Payment Button */}
          <div className="mt-4 border-t pt-3">
            <div className="flex justify-between font-medium text-gray-700 mb-2">
              <span>Total</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <Button
              disabled={cart.length === 0}
              variant="success"
              onClick={() => alert('Bayar Sekarang (integrasi Midtrans nanti)')}
            >
              Bayar Sekarang
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalAddOrder
        item={modalItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={(res) =>
          handleConfirmFromModal({
            quantity: res.quantity,
            selectedSize: res.selectedSize,
            selectedTopping: res.selectedTopping,
            selectedSugar: res.selectedSugar,
            finalUnitPrice: res.finalUnitPrice,
          })
        }
      />
    </div>
  );
}
