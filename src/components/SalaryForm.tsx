import { useState } from 'react';
import ParticleEffect from './ParticleEffect';

interface SalaryFormProps {
  onSubmit: (data: {
    monthlySalary: number;
    workStartTime: string;
    workEndTime: string;
    workDaysPerWeek: number;
  }) => void;
}

export default function SalaryForm({ onSubmit }: SalaryFormProps) {
  const [monthlySalary, setMonthlySalary] = useState('');
  const [workStartTime, setWorkStartTime] = useState('09:00');
  const [workEndTime, setWorkEndTime] = useState('18:00');
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState('5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      monthlySalary: Number(monthlySalary),
      workStartTime,
      workEndTime,
      workDaysPerWeek: Number(workDaysPerWeek),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-box w-full space-y-8 p-8">
      <div>
        <label htmlFor="monthlySalary" className="handwriting-text block text-lg font-semibold mb-2 text-[#2d3748]">
          1. 你每月赚多少钱？
        </label>
        <input
          type="number"
          id="monthlySalary"
          value={monthlySalary}
          onChange={e => setMonthlySalary(e.target.value)}
          className="neon-input bg-white/80 text-[#2d3748] placeholder-gray-600 border-purple-400 handwriting-text"
          placeholder="请输入你的月薪"
          required
        />
      </div>

      <div>
        <label htmlFor="workTime" className="handwriting-text block text-lg font-semibold mb-2 text-[#2d3748]">
          2. 你每天上班几点到几点？
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="time"
            id="workStartTime"
            value={workStartTime}
            onChange={e => setWorkStartTime(e.target.value)}
            className="neon-input bg-white/80 text-[#2d3748] border-purple-400 w-1/2 handwriting-text"
            required
          />
          <span className="text-[#2d3748] font-bold handwriting-text">-</span>
          <input
            type="time"
            id="workEndTime"
            value={workEndTime}
            onChange={e => setWorkEndTime(e.target.value)}
            className="neon-input bg-white/80 text-[#2d3748] border-purple-400 w-1/2 handwriting-text"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="workDaysPerWeek" className="handwriting-text block text-lg font-semibold mb-2 text-[#2d3748]">
          3. 每周上班几天？
        </label>
        <input
          type="number"
          id="workDaysPerWeek"
          min="1"
          max="7"
          value={workDaysPerWeek}
          onChange={e => setWorkDaysPerWeek(e.target.value)}
          className="neon-input bg-white/80 text-[#2d3748] placeholder-gray-600 border-purple-400 handwriting-text"
          placeholder="5"
          required
        />
      </div>

      <button
        type="submit"
        className="glass-btn-3d w-full mt-4 handwriting-text relative"
      >
        <ParticleEffect count={12} />
        🚀开始计时，我要赚钱啦
      </button>
    </form>
  );
} 