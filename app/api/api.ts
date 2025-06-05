import { getSessionId } from "../utils/sessionId";
import Toastify from 'toastify-js'
const BASE_URL ="https://kilimogpt-backend.onrender.com/api/v1";

export async function askQuestion(question: string) {
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Session Id unaivailable");

  const res = await fetch(`${BASE_URL}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Session-Id": sessionId },
    body: JSON.stringify({ question }),
  });
  
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API Error: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  return data.answer;
}

export async function fetchHistory() {
  const sessionId = getSessionId();
  if (!sessionId) throw new Error("Session ID unavailable");
  const res = await fetch(`${BASE_URL}/history`, {
    headers: { "X-Session-Id": sessionId },
  });
 

  if (!res.ok) {
    throw new Error(`Failed to fetch chat history: ${res.status}`);
  }
  return await res.json();
}
