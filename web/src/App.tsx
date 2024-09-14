import { CreateGoal } from "./components/create-goal"
import { Summary } from "./components/summary"
import { EmptyGoals } from "./components/empty-goals"
import { Dialog } from "./components/ui/dialog"
import { useQuery } from '@tanstack/react-query'

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

const { data } = useQuery<SummaryResponse>({
  queryKey: ['summary'],
  queryFn: async () =>{
    const response = await fetch('http://localhost:3333/summary')
    const data = await response.json()
    return data.summary
  },
  staleTime: 1000 * 60, // 60 seconds
})


  return ( 
    <Dialog>
      {/* <pre>{JSON.stringify(summary, null,2)}</pre> */}
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  )
}

