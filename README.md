# KilimoGPT 

KilimoGPT is an AI-powered chatbot specialized in answering agriculture-related questions relevant to Kenyan farmers. It wraps around the Gemini API to provide practical advice on crops, livestock and farming techniques in English or Swahili.

##  Live Links

- 🔗 Live App: [https://kilimogpt.netlify.app](https://kilimogpt.netlify.app)
- 📘 API Docs: [https://kilimogpt-backend.onrender.com/docs](https://kilimogpt-backend.onrender.com/docs)
- 💻 GitHub Repo: [https://github.com/mburu72/Kilimogpt](https://github.com/mburu72/Kilimogpt)

---

##  Backend Setup (Docker)

```bash
# Clone the repo
git clone https://github.com/mburu72/Kilimogpt-Assesment.git
cd Kilimogpt

# Create your .env file with required variables
.env

# Build and run with Docker
docker build -t kilimogpt-backend .
docker run -p 8000:8000 --env-file .env kilimogpt-backend
```

##  Backend Setup (Python without Docker)

```bash
# Clone the repo and navigate into it
git clone https://github.com/mburu72/Kilimogpt.git
cd Kilimogpt

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create your .env file with required variables
.env

# Run the app
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## Frontend Setup (Next.js)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create your .env.local file
env.local
# Add your API base URL to the file
# Example:
NEXT_PUBLIC_API_URL=https://kilimogpt-backend.onrender.com/api/v1/

# Run the dev server
npm run dev
```

To build for production and export static files:

```bash
npm run build
```

---

## API Overview

### `GET /api/v1/history`

Returns chat history for a given session.

**Headers:**

```
X-Session-Id: <your-session-id>
```

**Response:**

```json
[
     {
        "question": "hello",
        "answer": "Hello! I am KilimoGPT, ready to assist you with your farming questions related to Kenya. Ask away!"
    }
]
```

### `POST /api/v1/ask`

Handles user queries related to agriculture using the Gemini AI model.

**Headers:**

```
X-Session-Id: string – A unique session identifier (used to track chat history).
```

**Request Body (JSON):**

```json
[
  {
  {
  "question": "How do I grow maize in Kenya?"
}

  }
]


```
**Response (JSON):**

```json
[
{
    "question": "How do I grow maize in Kenya?",
    "answer": "Okay, here's a guide to growing maize in Kenya:Key Considerations:..."
}
]
```
---

## Tech Stack

- Backend: FastAPI + Gemini AI + SQLite + Docker
- Frontend: Next.js + Tailwind CSS

---

## Contributions

Contributions, issues and feature requests are welcome!

---

## License

MIT License © 2025 KilimoGPT
