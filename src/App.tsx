import { useState } from 'react'
import SalaryForm from './components/SalaryForm'
import SalaryTimer from './components/SalaryTimer'
import PageLayout from './components/PageLayout'
import ThemeProvider from './components/ThemeProvider'

interface SalaryData {
  monthlySalary: number;
  workStartTime: string;
  workEndTime: string;
  workDaysPerWeek: number;
}

export default function App() {
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleSubmit = (data: SalaryData) => {
    setSalaryData(data)
    setIsCalculating(true)
  }

  const handleReset = () => {
    setSalaryData(null)
    setIsCalculating(false)
  }

  return (
    <ThemeProvider>
      <PageLayout>
        {!isCalculating ? (
          <SalaryForm onSubmit={handleSubmit} />
        ) : salaryData && (
          <SalaryTimer salaryData={salaryData} onReset={handleReset} />
        )}
      </PageLayout>
    </ThemeProvider>
  )
}
