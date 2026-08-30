'use client';

import { useState } from 'react';

export default function PriceCalculator() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 150;
  const total = quantity * pricePerItem;

  return (
    <div className="p-8">
      <input
        type="number"
        value={quantity}
        min={1}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full max-w-xs rounded border border-gray-300 px-3 py-2"
      />
      <p className="mt-4 text-lg font-semibold">ราคารวม: {total.toLocaleString()} บาท</p>
    </div>
  );
}
