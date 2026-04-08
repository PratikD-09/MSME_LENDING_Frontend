import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const LoanForm = ({ onSubmit, loading, onBack, businessData }) => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    tenureMonths: '',
    loanPurpose: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.loanAmount || isNaN(formData.loanAmount) || formData.loanAmount <= 0) newErrors.loanAmount = 'Valid loan amount is required'
    if (!formData.tenureMonths || isNaN(formData.tenureMonths) || formData.tenureMonths <= 0 || formData.tenureMonths > 120) newErrors.tenureMonths = 'Valid tenure (1-120 months) is required'
    if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan purpose is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        ...formData,
        loanAmount: Number(formData.loanAmount),
        tenureMonths: Number(formData.tenureMonths)
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Loan Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="loanAmount">Loan Amount</Label>
          <Input
            id="loanAmount"
            type="number"
            value={formData.loanAmount}
            onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
          />
          {errors.loanAmount && <p className="text-red-500 text-sm">{errors.loanAmount}</p>}
        </div>
        <div>
          <Label htmlFor="tenureMonths">Tenure (Months)</Label>
          <Input
            id="tenureMonths"
            type="number"
            value={formData.tenureMonths}
            onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
          />
          {errors.tenureMonths && <p className="text-red-500 text-sm">{errors.tenureMonths}</p>}
        </div>
        <div>
          <Label htmlFor="loanPurpose">Loan Purpose</Label>
          <Input
            id="loanPurpose"
            value={formData.loanPurpose}
            onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
          />
          {errors.loanPurpose && <p className="text-red-500 text-sm">{errors.loanPurpose}</p>}
        </div>
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? 'Processing...' : 'Submit for Decision'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoanForm