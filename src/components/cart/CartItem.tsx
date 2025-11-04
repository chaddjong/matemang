import Image from 'next/image';

type CartItemProps = {
  name: string;
  price: number;
  image?: string;
  quantity?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  onRemove: () => void;
};

export default function CartItem({
  name,
  price,
  image = '/menu/default.jpg',
  quantity = 1,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <li className="relative bg-white border rounded-xl shadow-sm p-3 flex gap-3 items-center">
      {/* Gambar */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>

      {/* Info produk */}
      <div className="flex-1">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">
          Rp {price.toLocaleString('id-ID')}
        </p>

        {/* Tombol edit, quantity, dan harga */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={onDecrease}
            className="px-2 py-1 border rounded-md hover:bg-gray-100 text-gray-700"
          >
            −
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-2 py-1 border rounded-md hover:bg-gray-100 text-gray-700"
          >
            +
          </button>
        </div>
      </div>

      {/* Tombol hapus */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-md p-1 transition"
        aria-label="Hapus item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
