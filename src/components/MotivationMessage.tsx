import { useState, useEffect } from 'react';

interface MotivationMessageProps {
  totalEarned: number;
  onClose: () => void;
}

const MOTIVATION_MESSAGES = [
  { threshold: 10, message: '你可以买一杯口粮咖啡了☕️' },
  { threshold: 100, message: '你可以买一杯精品咖啡了！☕' },
  { threshold: 500, message: '已经可以买一顿不错的午餐了！🍱' },
  { threshold: 1000, message: '你已经值下一台 Kindle 了！📚' },
  { threshold: 2000, message: '可以买一双不错的运动鞋了！👟' },
  { threshold: 5000, message: '哇！已经可以买一部新手机了！📱' },
  { threshold: 10000, message: '太棒了！已经可以买一台笔记本电脑了！💻' },
];

export default function MotivationMessage({ totalEarned, onClose }: MotivationMessageProps) {
  const [message, setMessage] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [lastThreshold, setLastThreshold] = useState(0);

  useEffect(() => {
    const nextMessage = MOTIVATION_MESSAGES.find(
      msg => msg.threshold > lastThreshold && totalEarned >= msg.threshold
    );

    if (nextMessage) {
      setMessage(nextMessage.message);
      setLastThreshold(nextMessage.threshold);
      setIsVisible(true);

      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // 等待动画结束后调用 onClose
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [totalEarned, lastThreshold, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-up"
      style={{
        animation: 'fadeInUp 0.3s ease-out',
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900">{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">关闭</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 