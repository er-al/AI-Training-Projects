## Open-AI-Call (React + Vite)

### Setup

- **Install**:

```bash
npm install
```

- **Environment variables**: create `Open-AI-Call/.env` (it is gitignored) with:

```bash
VITE_POLYGON_API_KEY=your_polygon_key
VITE_OPENAI_API_KEY=your_openai_key
```

### Run

```bash
npm run dev
```

Then open `http://127.0.0.1:5173/`.

### Build

```bash
npm run build
npm run preview
```

### Notes

- The OpenAI key is used from the browser (same as the original project). This is **not recommended for real apps**.
- If keys are missing, the app will return mock data so you can still test the UI.
