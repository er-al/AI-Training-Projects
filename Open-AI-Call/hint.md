These are the steps you will need:

1. Create a new instance of OpenAI, remembering to set `dangerouslyAllowBrowser: true`.
2. Pass the API key from `import.meta.env.VITE_OPENAI_API_KEY`.
3. Set up an API call using the endpoint `chat.completions.create`.
4. Create system and user objects in a `messages` array.
5. Render the response text into the UI.
