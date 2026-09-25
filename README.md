# AccessAI

**Making Healthcare Information Accessible to Everyone**  
CodeGyaan’26 · Team Spartans · AI for Inclusive Digital Transformation

AccessAI is a hackathon prototype that turns pasted medical-document text into a plain-language summary, possible next steps, and questions a patient can discuss with a doctor or pharmacist. It is an information accessibility tool, not a diagnostic system.

## What the prototype includes

- React interface with a responsive, accessible layout
- Flask API endpoint for explanations
- Claude API integration, configured through an environment variable
- Browser text-to-speech for reading the generated guide aloud
- No database; pasted text is processed for the request and is not stored by this app

## Run locally

You need Node.js and Python 3.10 or newer.

### 1. Start the backend

```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `backend/.env` and set your Anthropic API key. Keep this file private; it is ignored by Git.

```powershell
python app.py
```

The API runs at `http://localhost:5000`.

### 2. Start the frontend

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local address printed by Vite (usually `http://localhost:5173`). To use a hosted backend, set `VITE_API_URL` to its URL before building the frontend.

## API

- `GET /api/health` — service status
- `POST /api/explain` — accepts `{ "text": "..." }` and returns `summary`, `next_steps`, `questions`, and `safety_note`

The endpoint limits submitted text to 12,000 characters. Configure allowed frontend origin with `FRONTEND_ORIGIN`.

## Privacy and safety

- This prototype does not include authentication, file upload, document storage, or a database.
- When the explainer is used, the pasted text is sent from the Flask backend to Anthropic's API. Do not use real patient information unless you have reviewed the provider's privacy terms, obtained the required consent, and configured the service appropriately. For demos, use synthetic or de-identified sample text.
- The generated explanation may be incomplete or incorrect. Confirm medication and care instructions with a qualified healthcare professional.
- This is a hackathon demonstration and is not validated or intended for clinical use.

## Stack

React · Vite · CSS · Python · Flask · Claude API · Browser SpeechSynthesis
