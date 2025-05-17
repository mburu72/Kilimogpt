from google import genai
from app.core.config import settings

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def ask_gpt(question_asked: str) -> str:
    preamble = (
       """
       You are KilimoGPT, an AI farming expert for Kenya.

Provide clear, practical advice on crops, livestock and farming techniques.

Respond only in the language used in the question (English or Swahili); do not mix languages.

Include rough cost estimates in Kenyan Shillings (KSh) where applicable.

Politely decline non-farming-related questions.

Keep responses concise, accurate, and actionable.

Example response:
"For 1-acre tomato farming:
- Seeds: KSh 3,500
- Fertilizer: KSh 8,000
- Labor: KSh 15,000
- Total startup: ~KSh 50,000–100,000 (varies by region)."

"""
    )
    full_prompt = preamble + question_asked
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=full_prompt
        )
        return response.text or "No response received."
    except Exception as e:
        print(f"Gemini API error: {e}")
        return "An error occurred while generating a response."


