import { Badge } from '../components/ui/badge'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'

const DecisionResult = ({ decision, onRestart }) => {
  if (!decision) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Decision Result</h2>
      <div className="text-center">
        {console.log(decision.status)}
        <Badge variant={decision.status === 'APPROVED' ? 'success' : 'destructive'}>
          {decision.status}
        </Badge>
      </div>
      <div>
        <Label>Credit Score</Label>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${decision.creditScore}%` }}></div>
        </div>
        <p className="text-sm text-gray-600">{decision.creditScore}/100</p>
      </div>
      <div>
        <Label>Reasons</Label>
        <div className="flex flex-wrap gap-2">
          {decision.reasons.length ? (
            decision.reasons.map((reason, index) => (
              <Badge key={index} variant="outline">{reason}</Badge>
            ))
          ) : (
            <Badge variant="secondary">No issues detected</Badge>
          )}
        </div>
      </div>
      <div className="text-center">
        <Button variant="outline" onClick={onRestart} className="mt-4">
          New Application
        </Button>
      </div>
    </div>
  )
}

export default DecisionResult