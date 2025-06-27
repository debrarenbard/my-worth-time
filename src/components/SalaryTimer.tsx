import { useState, useEffect, useCallback } from 'react';
import { calculatePerMinuteSalary, calculatePerSecondSalary, calculatePerHourSalary, formatCurrency } from '../utils/salaryCalculator';
import CoinAnimation from './CoinAnimation';
import MotivationMessage from './MotivationMessage';

interface SalaryTimerProps {
  salaryData: {
    monthlySalary: number;
    workStartTime: string;
    workEndTime: string;
    workDaysPerWeek: number;
  };
  onReset: () => void;
}

export default function SalaryTimer({ salaryData, onReset }: SalaryTimerProps) {
  const [isRunning, setIsRunning] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [showMotivation, setShowMotivation] = useState(true);

  const perMinuteSalary = calculatePerMinuteSalary(salaryData);
  const perSecondSalary = calculatePerSecondSalary(perMinuteSalary);
  const perHourSalary = calculatePerHourSalary(perMinuteSalary);

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setElapsedSeconds(0);
    setTotalEarned(0);
    setIsRunning(true);
    onReset();
  };

  useEffect(() => {
    let intervalId: number;

    if (isRunning) {
      intervalId = window.setInterval(() => {
        setElapsedSeconds(prev => {
          const newSeconds = prev + 1;
          const newTotal = perSecondSalary * newSeconds;
          setTotalEarned(newTotal);
          return newSeconds;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, perSecondSalary]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">每秒收入</h3>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">
              {formatCurrency(perSecondSalary)}
            </p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">每分钟收入</h3>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {formatCurrency(perMinuteSalary)}
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">每小时收入</h3>
            <p className="text-xl sm:text-2xl font-bold text-purple-600">
              {formatCurrency(perHourSalary)}
            </p>
          </div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500">累计已赚</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">
            {formatCurrency(totalEarned)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            已运行 {Math.floor(elapsedSeconds / 60)} 分 {elapsedSeconds % 60} 秒
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              暂停
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              继续
            </button>
          )}
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            重置
          </button>
        </div>
      </div>

      <div className="coin-animation-container">
        <CoinAnimation totalEarned={totalEarned} isRunning={isRunning} />
      </div>

      {showMotivation && (
        <MotivationMessage
          totalEarned={totalEarned}
          onClose={() => setShowMotivation(false)}
        />
      )}
    </div>
  );
} 