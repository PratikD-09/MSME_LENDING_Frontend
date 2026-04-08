import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import BusinessForm from './pages/BusinessForm'
import LoanForm from './pages/LoanForm'
import DecisionResult from './pages/DecisionResult'
import { submitBusiness, submitLoan, getDecision } from './services/api'

function App() {
  const [businessData, setBusinessData] = useState(null)
  const [loanData, setLoanData] = useState(null)
  const [decision, setDecision] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleBusinessSubmit = async (data) => {
    setError(null)
    setLoading(true)
    try {
      const savedBusiness = await submitBusiness(data)
      setBusinessData(savedBusiness)
      navigate('/loan')
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Unable to save business data'
      if (errorMessage.includes('duplicate key') || errorMessage.includes('PAN')) {
        setError('This PAN is already registered. Please use a different PAN or contact support.')
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLoanSubmit = async (data) => {
    setError(null)
    setLoading(true)
    try {
      const savedLoan = await submitLoan(data)
      setLoanData(savedLoan)
      const result = await getDecision(businessData, savedLoan)
      setDecision(result)
      navigate('/decision')
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to process decision')
    } finally {
      setLoading(false)
    }
  }

  const handleRestart = () => {
    setBusinessData(null)
    setLoanData(null)
    setDecision(null)
    setError(null)
    navigate('/')
  }

  const handleBackToBusiness = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full rounded-3xl border border-gray-200 bg-white p-8 shadow-sm relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 rounded-3xl bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-gray-700 font-medium">Processing your request...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 mb-4">
            <p className="text-sm text-red-700 mb-2">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Try Again
            </button>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <BusinessForm
                onSubmit={handleBusinessSubmit}
                loading={loading}
              />
            }
          />
          <Route
            path="/loan"
            element={
              <LoanForm
                onSubmit={handleLoanSubmit}
                loading={loading}
                onBack={handleBackToBusiness}
                businessData={businessData}
              />
            }
          />
          <Route
            path="/decision"
            element={
              <DecisionResult
                decision={decision}
                onRestart={handleRestart}
                businessData={businessData}
                loanData={loanData}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App