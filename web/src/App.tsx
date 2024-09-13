import { useEffect, useState } from "react"
import { CreateGoal } from "./components/create-goal"
import { Summary } from "./components/summary"
import { EmptyGoals } from "./components/empty-goals"
import { Dialog } from "./components/ui/dialog"

export function App() {
const [summary, setSummary] = useState(null)

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
     {summary?.summary.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}

