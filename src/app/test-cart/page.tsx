'use client';

import { useEffect, useState } from 'react';

export default function TestCartPage() {
  const [cartData, setCartData] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('biharAcharCart');
    if (savedCart) {
      const cart = JSON.parse(savedCart);
      setCartData(cart);
    }
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Cart Debug</h1>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Cart Data:</h2>
        <pre className="text-xs overflow-auto">
          {JSON.stringify(cartData, null, 2)}
        </pre>
      </div>
      
      <div className="mt-4">
        <h2 className="font-bold mb-2">Image Test:</h2>
        {cartData.map((item, index) => (
          <div key={index} className="border p-4 mb-2">
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Image:</strong> {item.image}</p>
            <p><strong>ImageUrl:</strong> {item.imageUrl}</p>
            <p><strong>Images:</strong> {JSON.stringify(item.images)}</p>
            <div className="w-20 h-20 bg-gray-200 rounded mt-2 flex items-center justify-center">
              {(() => {
                const finalImage = item.image || item.imageUrl || item.images?.[0];
                if (finalImage) {
                  if (finalImage.startsWith('data:') || finalImage.startsWith('http')) {
                    return <img src={finalImage} alt={item.name} className="w-full h-full object-cover rounded" />;
                  } else {
                    return <span className="text-2xl">{finalImage}</span>;
                  }
                } else {
                  return <span className="text-2xl">🥭</span>;
                }
              })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}