import { useState, useEffect, useRef } from 'react';
import Coin from './Coin';

interface CoinAnimationProps {
  totalEarned: number;
  isRunning: boolean;
}

interface CoinState {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  speed: number;
}

export default function CoinAnimation({ totalEarned, isRunning }: CoinAnimationProps) {
  const [coins, setCoins] = useState<CoinState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTotalRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();

  // 创建新金币
  const createCoin = () => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const x = Math.random() * (containerWidth - 24); // 24是金币宽度
    const newCoin: CoinState = {
      id: Date.now(),
      x,
      y: -24,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      speed: 2 + Math.random() * 2,
    };
    
    setCoins(prev => [...prev, newCoin]);
  };

  // 更新金币位置
  const updateCoins = () => {
    setCoins(prev => {
      const containerHeight = containerRef.current?.clientHeight || 0;
      return prev
        .map(coin => ({
          ...coin,
          y: coin.y + coin.speed,
          rotation: coin.rotation + 2,
        }))
        .filter(coin => coin.y < containerHeight);
    });
  };

  // 动画循环
  useEffect(() => {
    if (!isRunning) return;

    const animate = () => {
      updateCoins();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning]);

  // 根据收入创建金币
  useEffect(() => {
    if (!isRunning) return;

    const earnedDiff = Math.floor(totalEarned - lastTotalRef.current);
    if (earnedDiff >= 1) {
      for (let i = 0; i < earnedDiff; i++) {
        createCoin();
      }
      lastTotalRef.current = totalEarned;
    }
  }, [totalEarned, isRunning]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 overflow-hidden bg-gradient-to-b from-blue-50 to-transparent"
    >
      {coins.map(coin => (
        <Coin
          key={coin.id}
          x={coin.x}
          y={coin.y}
          rotation={coin.rotation}
          scale={coin.scale}
        />
      ))}
    </div>
  );
} 