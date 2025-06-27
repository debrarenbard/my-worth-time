interface CoinProps {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

export default function Coin({ x, y, rotation, scale }: CoinProps) {
  return (
    <div
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transition: 'transform 0.1s linear',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-yellow-400"
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path
          d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z"
          fill="white"
          fillOpacity="0.3"
        />
        <path
          d="M12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
} 