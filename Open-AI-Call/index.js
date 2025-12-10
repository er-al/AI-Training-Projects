import 'dotenv/config'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
    
})

const messages = [
  {
    role: 'system',
    content: 'You are a teacher that can explain complex concepts in a simple way, even to kids and old people'
  },
  {
    role: 'user',
    content: 'Explain quantum computing in a simple way'
  }
]

const response = await openai.chat.completions.create({
  model: 'gpt-4',
  messages
})

console.log(JSON.stringify(response, null, 2))
