import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const BusinessForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    pan: '',
    businessType: '',
    monthlyRevenue: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.ownerName) newErrors.ownerName = 'Owner name is required'
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = 'Invalid PAN format'
    if (!formData.businessType) newErrors.businessType = 'Business type is required'
    if (!formData.monthlyRevenue || isNaN(formData.monthlyRevenue) || formData.monthlyRevenue <= 0) newErrors.monthlyRevenue = 'Valid monthly revenue is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSubmit({
        ...formData,
        monthlyRevenue: Number(formData.monthlyRevenue)
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Business Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
          />
          {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
        </div>
        <div>
          <Label htmlFor="pan">PAN</Label>
          <Input
            id="pan"
            value={formData.pan}
            onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
          />
          {errors.pan && <p className="text-red-500 text-sm">{errors.pan}</p>}
        </div>
        <div>
          <Label htmlFor="businessType">Business Type</Label>
          <select
            id="businessType"
            value={formData.businessType}
            onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select business type</option>
            <option value="retail">Retail</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="services">Services</option>
            <option value="other">Other</option>
          </select>
          {errors.businessType && <p className="text-red-500 text-sm">{errors.businessType}</p>}
        </div>
        <div>
          <Label htmlFor="monthlyRevenue">Monthly Revenue</Label>
          <Input
            id="monthlyRevenue"
            type="number"
            value={formData.monthlyRevenue}
            onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
          />
          {errors.monthlyRevenue && <p className="text-red-500 text-sm">{errors.monthlyRevenue}</p>}
        </div>
        <Button type="submit" className="w-full">Next</Button>
      </form>
    </div>
  )
}

export default BusinessForm