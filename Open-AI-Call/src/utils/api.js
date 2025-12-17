import OpenAI from 'openai'
import { dates } from './dates'

const polygonKey = import.meta.env.VITE_POLYGON_API_KEY
const openAIKey = import.meta.env.VITE_OPENAI_API_KEY

function buildPolygonUrl(ticker) {
  return `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${polygonKey}`
}

export async function fetchStockData(tickers) {
  if (tickers.length === 0) {
    throw new Error('Please add at least one ticker symbol.')
  }

  if (!polygonKey) {
    return `Mock data for: ${tickers.join(', ')}`
  }

  const responses = await Promise.all(
    tickers.map(async (ticker) => {
      const response = await fetch(buildPolygonUrl(ticker))
      const body = await response.text()
      if (!response.ok) {
        throw new Error(`Polygon request failed for ${ticker}`)
      }
      return body
    })
  )

  return responses.join('')
}

export async function fetchReport(stockData, tickers) {
  if (!openAIKey) {
    return `Mock analysis for ${tickers.join(', ')} using placeholder stock data.`
  }

  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true,
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    temperature: 2,
    messages: [
      {
        role: 'system',
        content:
          'You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.',
      },
      {
        role: 'user',
        content: stockData,
      },
    ],
  })

  const report = response.choices?.[0]?.message?.content?.trim()

  if (!report) {
    throw new Error('OpenAI returned an empty response')
  }

  return report
}
