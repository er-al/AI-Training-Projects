import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
    
})

const messages = [
  {
    role: 'system',
    content: 'You are a helpful assistant that can answer questions and help with tasks.'
  },
  {
    role: 'user',
    content: 'What is the capital of Philippines?'
  }
]

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages
})

console.log(JSON.stringify(response, null, 2))