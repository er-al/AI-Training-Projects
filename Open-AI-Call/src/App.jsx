import { useState } from 'react'
import TickerForm from './components/TickerForm'
import TickerList from './components/TickerList'
import ReportPanel from './components/ReportPanel'
import { fetchReport, fetchStockData } from './utils/api'

const MAX_TICKERS = 3

export default function App() {
  const [tickers, setTickers] = useState([])
  const [tickerInput, setTickerInput] = useState('')
  const [formError, setFormError] = useState('')
  const [report, setReport] = useState('')
  const [apiMessage, setApiMessage] = useState('Querying Stocks API...')
  const [statusMessage, setStatusMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddTicker = (event) => {
    event.preventDefault()
    const normalizedInput = tickerInput.trim().toUpperCase()

    if (normalizedInput.length < 3) {
      setFormError('Tickers must be at least 3 characters long.')
      return
    }

    if (tickers.includes(normalizedInput)) {
      setFormError('You already added that ticker.')
      return
    }

    if (tickers.length >= MAX_TICKERS) {
      setFormError(`You can only add up to ${MAX_TICKERS} tickers.`)
      return
    }

    setTickers((prev) => [...prev, normalizedInput])
    setTickerInput('')
    setFormError('')
  }

  const handleRemoveTicker = (ticker) => {
    setTickers((prev) => prev.filter((value) => value !== ticker))
  }

  const handleGenerateReport = async () => {
    try {
      setIsLoading(true)
      setReport('')
      setStatusMessage('')
      setApiMessage('Querying Stocks API...')

      const rawData = await fetchStockData(tickers)
      setApiMessage('Creating report...')
      const aiReport = await fetchReport(rawData, tickers)
      setReport(aiReport)
    } catch (error) {
      setStatusMessage(error.message || 'Something went wrong while generating the report.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Stock Predictions</h1>
      </header>
      <main>
        <section className="action-panel">
          <TickerForm
            value={tickerInput}
            onChange={setTickerInput}
            onSubmit={handleAddTicker}
            error={formError}
          />
          <TickerList tickers={tickers} onRemove={handleRemoveTicker} />
          <button
            className="generate-report-btn"
            type="button"
            disabled={!tickers.length || isLoading}
            onClick={handleGenerateReport}
          >
            {isLoading ? 'Working...' : 'Generate Report'}
          </button>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          <p className="tag-line">Always correct 15% of the time!</p>
        </section>
        <ReportPanel isLoading={isLoading} apiMessage={apiMessage} report={report} />
      </main>
      <footer>&copy; This is not real financial advice!</footer>
    </div>
  )
}
