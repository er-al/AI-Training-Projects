const helperText = 'Add up to 3 stock tickers below to get a super accurate stock predictions report👇'

export default function TickerForm({ value, onChange, onSubmit, error }) {
  return (
    <form className="ticker-form" onSubmit={onSubmit}>
      <label className={error ? 'error' : ''} htmlFor="ticker-input">
        {error || helperText}
      </label>
      <div className="form-input-control">
        <input
          id="ticker-input"
          type="text"
          placeholder="MSFT"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          maxLength={5}
        />
        <button className="add-ticker-btn" type="submit" aria-label="Add ticker">
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </form>
  )
}
