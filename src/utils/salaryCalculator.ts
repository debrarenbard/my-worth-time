interface SalaryData {
  monthlySalary: number;
  workStartTime: string;
  workEndTime: string;
  workDaysPerWeek: number;
}

export function calculatePerMinuteSalary(data: SalaryData): number {
  const [startHour, startMinute] = data.workStartTime.split(':').map(Number);
  const [endHour, endMinute] = data.workEndTime.split(':').map(Number);
  
  // 计算每日工作小时数
  const workHoursPerDay = (endHour - startHour) + (endMinute - startMinute) / 60;
  
  // 计算每月工作分钟数
  const workMinutesPerMonth = workHoursPerDay * data.workDaysPerWeek * 4 * 60;
  
  // 计算每分钟工资
  return data.monthlySalary / workMinutesPerMonth;
}

export function calculatePerSecondSalary(perMinuteSalary: number): number {
  return perMinuteSalary / 60;
}

export function calculatePerHourSalary(perMinuteSalary: number): number {
  return perMinuteSalary * 60;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
} 