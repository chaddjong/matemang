// src/components/modal/ModalAddOrder.tsx
'use client';

import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import type { MenuItem, SizeOption, ToppingOption } from '@/data/menuData';

export type SelectionResult = {
  quantity: number;
  selectedSize?: SizeOption | null;
  selectedTopping?: ToppingOption | null;
  selectedSugar?: string | null;
  finalUnitPrice: number;
};

type Props = {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (result: SelectionResult) => void;
};

export default function ModalAddOrder({
  item,
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeIdx, setSizeIdx] = useState<number | null>(null);
  const [toppingIdx, setToppingIdx] = useState<number | null>(null);
  const [sugarIdx, setSugarIdx] = useState<number | null>(null);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);

  // Reset state whenever a new item opens — useEffect (side-effect)
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSizeIdx(null);
      setToppingIdx(null);
      setSugarIdx(null);
      setValidationMsg(null);
    }
  }, [isOpen, item?.id]);

  // Keep hooks above any early return
  // If modal closed or no item, don't render modal (but hooks already run)

  const sizes = useMemo(() => item?.sizes ?? [], [item]);
  const toppings = useMemo(() => item?.toppings ?? [], [item]);
  const sugars = useMemo(() => item?.sugarLevels ?? [], [item]);

  const unitPrice = useMemo(() => {
    if (!item) return 0;
    let p = item.price;

    if (sizeIdx !== null && sizes[sizeIdx]) {
      p += sizes[sizeIdx].addPrice ?? 0;
    }
    if (toppingIdx !== null && toppings[toppingIdx]) {
      p += toppings[toppingIdx].addPrice ?? 0;
    }

    return p;
  }, [item, sizeIdx, toppingIdx]); // ✅ `sizes` dan `toppings` tidak perlu jadi dependency

  const totalPrice = unitPrice * quantity;

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => q + 1);

  const handleConfirm = () => {
    // If sizes exist, require selection
    if (sizes.length > 0 && sizeIdx === null) {
      setValidationMsg('Silakan pilih ukuran.');
      return;
    }
    // Topping optional, sugar optional
    setValidationMsg(null);

    onConfirm({
      quantity,
      selectedSize: sizeIdx !== null ? sizes[sizeIdx] : null,
      selectedTopping: toppingIdx !== null ? toppings[toppingIdx] : null,
      selectedSugar: sugarIdx !== null ? sugars[sugarIdx] : null,
      finalUnitPrice: unitPrice,
    });

    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    // backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* modal box */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* header */}
        <div className="flex items-start justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 relative rounded-md overflow-hidden bg-gray-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="ml-2 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* quantity */}
          <div>
            <label className="text-sm font-medium text-gray-700">Jumlah</label>
            <div className="mt-2 inline-flex items-center gap-3">
              <button
                onClick={dec}
                className="w-9 h-9 flex items-center justify-center rounded-md border"
                aria-label="Kurangi"
              >
                −
              </button>
              <div className="min-w-[40px] text-center font-medium">
                {quantity}
              </div>
              <button
                onClick={inc}
                className="w-9 h-9 flex items-center justify-center rounded-md border"
                aria-label="Tambah"
              >
                +
              </button>
            </div>
          </div>

          {/* sizes */}
          {sizes.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Pilih Ukuran
              </p>
              <div className="space-y-2">
                {sizes.map((s, i) => (
                  <label
                    key={s.label}
                    className="flex items-center justify-between p-3 border rounded-md cursor-pointer"
                  >
                    <div>
                      <input
                        type="radio"
                        name="size"
                        checked={sizeIdx === i}
                        onChange={() => setSizeIdx(i)}
                        className="mr-3"
                      />
                      <span className="font-medium">{s.label}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {s.addPrice
                        ? `+ Rp ${s.addPrice.toLocaleString('id-ID')}`
                        : ''}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* sugar (optional) */}
          {sugars.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Sugar Level
              </p>
              <div className="space-y-2">
                {sugars.map((s, i) => (
                  <label
                    key={s}
                    className="flex items-center justify-start p-3 border rounded-md cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="sugar"
                      checked={sugarIdx === i}
                      onChange={() => setSugarIdx(i)}
                      className="mr-3"
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* toppings (single choice, optional) */}
          {toppings.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Topping</p>
              <div className="space-y-2">
                {toppings.map((t, i) => (
                  <label
                    key={t.label}
                    className="flex items-center justify-between p-3 border rounded-md cursor-pointer"
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="topping"
                        checked={toppingIdx === i}
                        onChange={() => setToppingIdx(i)}
                        className="mr-3"
                      />
                      <span>{t.label}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      + Rp {t.addPrice.toLocaleString('id-ID')}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* validation message */}
          {validationMsg && (
            <p className="text-sm text-red-600">{validationMsg}</p>
          )}
        </div>

        {/* footer */}
        <div className="p-4 border-t">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-lg font-semibold">
                Rp {totalPrice.toLocaleString('id-ID')}
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="ml-auto bg-[#FA812F] hover:bg-[#FAB12F] text-white font-medium px-5 py-3 rounded-lg shadow transition"
            >
              Tambah ({quantity}) — Rp {totalPrice.toLocaleString('id-ID')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
