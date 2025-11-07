'use client';

import { useEffect, useRef } from 'react';

interface PhonePeQRCodeProps {
  upiId: string;
  amount: number;
  merchantName?: string;
  size?: number;
}

export default function PhonePeQRCode({ 
  upiId, 
  amount, 
  merchantName = "Bihar Achar Store", 
  size = 200 
}: PhonePeQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawPhonePeQR();
    }
  }, [upiId, amount, merchantName]);

  const drawPhonePeQR = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);

    // Draw PhonePe branded header
    const headerHeight = size * 0.15;
    ctx.fillStyle = '#5B21B6'; // PhonePe purple color
    ctx.fillRect(0, 0, size, headerHeight);

    // Draw PhonePe logo text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size * 0.06}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('PhonePe', size / 2, headerHeight * 0.7);

    // Draw "ACCEPTED HERE" text
    ctx.font = `${size * 0.03}px Arial`;
    ctx.fillText('ACCEPTED HERE', size / 2, headerHeight * 0.95);

    // Draw QR code placeholder (simulated)
    const qrSize = size * 0.5;
    const qrX = (size - qrSize) / 2;
    const qrY = headerHeight + (size - headerHeight - qrSize - size * 0.15) / 2;
    
    // White background for QR
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrSize, qrSize);

    // Draw QR pattern (simplified simulation)
    ctx.fillStyle = '#000000';
    const cellSize = qrSize / 25;
    
    // Create a pattern that looks like a QR code
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        if (Math.random() > 0.5 || 
            (i < 7 && j < 7) || 
            (i < 7 && j > 17) || 
            (i > 17 && j < 7)) {
          ctx.fillRect(qrX + i * cellSize, qrY + j * cellSize, cellSize - 1, cellSize - 1);
        }
      }
    }

    // Draw PhonePe logo in center of QR
    const logoSize = qrSize * 0.2;
    const logoX = qrX + (qrSize - logoSize) / 2;
    const logoY = qrY + (qrSize - logoSize) / 2;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
    
    ctx.fillStyle = '#5B21B6';
    ctx.beginPath();
    ctx.arc(logoX + logoSize/2, logoY + logoSize/2, logoSize/2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw merchant name
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${size * 0.04}px Arial`;
    ctx.fillText(merchantName.toUpperCase(), size / 2, size - size * 0.08);

    // Draw UPI ID
    ctx.font = `${size * 0.03}px Arial`;
    ctx.fillText(upiId, size / 2, size - size * 0.03);
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <canvas
        ref={canvasRef}
        className="border-2 border-gray-300 rounded-lg shadow-lg"
        style={{ width: size, height: size }}
      />
      <p className="text-xs text-gray-600 text-center">
        Scan QR using PhonePe App
      </p>
    </div>
  );
}