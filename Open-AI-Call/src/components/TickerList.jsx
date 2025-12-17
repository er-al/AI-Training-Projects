export default function TickerList({ tickers, onRemove }) {
  if (!tickers.length) {
    return <p className="ticker-choice-display">Your tickers will appear here...</p>
  }

  return (
    <div className="ticker-choice-display" role="list" aria-label="Selected tickers">
      {tickers.map((ticker) => (
        <span
          key={ticker}
          className="ticker"
          role="listitem"
          onClick={() => onRemove?.(ticker)}
          title="Click to remove"
        >
          {ticker}
        </span>
      ))}
    </div>
  )
}
