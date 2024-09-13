import { useEffect, useState } from "react"
import { CreateGoal } from "./components/create-goal"
import { Summary } from "./components/summary"
import { EmptyGoals } from "./components/empty-goals"
import { Dialog } from "./components/ui/dialog"

type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export function App() {
const [summary, setSummary] = useState<SummaryResponse | null>(null)

  useEffect(() => {
    fetch('http://localhost:3333/summary')
      .then (response => {
      return response.json()
    })
      .then(data => {    
      setSummary(data.summary)
    })
  }, [])

  return ( 
    <Dialog>
      {/* <pre>{JSON.stringify(summary, null,2)}</pre> */}
     {summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}

