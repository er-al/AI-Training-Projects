export default function ReportPanel({ isLoading, apiMessage, report }) {
  if (isLoading) {
    return (
      <section className="loading-panel">
        <div className="spinner" aria-label="Loading" />
        <div id="api-message">{apiMessage}</div>
      </section>
    )
  }

  if (!report) {
    return null
  }

  return (
    <section className="output-panel" aria-live="polite">
      <h2>Your Report 😜</h2>
      <p>{report}</p>
    </section>
  )
}
