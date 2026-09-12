# Saheli AI

An AI companion for home-based women entrepreneurs in Pakistan. Built during the AuratTech AI Engineer Fellowship.

**har business ko chahiye aik saheli**

## Live

Frontend: https://saheli-ai-bay.vercel.app/saheli-ai
Backend API docs: https://saheli-ai-h9i2.onrender.com/docs

The backend link opens FastAPI's automatic API documentation, not a page meant for regular users, but it's a quick way to confirm the server is actually running and see every endpoint directly. The backend is on Render's free tier, so if nobody's used it in the last 15 minutes, the first request will take about a minute to wake up.

## Why this exists

Women own only 2.4% of Pakistan's 3.2 million registered businesses. Female entrepreneurship sits at around 1%, compared to 21% for men. When we talked to women actually running home-based businesses, jewelry sellers, home bakers, people making handmade crochet and craft items, the same problem kept coming up. They know their craft. What they don't have is anyone to ask about pricing, describing a product online, or figuring out what to do next.

The AI tools already out there don't help much. They're built for a different market, usually assume fluent English, and give advice with no connection to how selling actually works in Pakistan. Saheli is an attempt to fix that: a business companion that talks the way our users actually talk, in Urdu and Roman Urdu, and grounds its answers in real, curated local knowledge instead of guessing.

## What it does

**Ask Saheli**
A seller asks a real business question and gets an answer pulled from a curated knowledge base of Pakistani market guidance, not just whatever the model happens to remember from training.

**Dukan Ki Baat**
A seller uploads a photo of their product listing along with a title and description. Saheli reviews it the way a mentor would: one genuine strength, one or two specific improvements, and exactly one small goal for the week. Never a wall of criticism, never more than the seller can act on.

**Seller Registration**
A short onboarding form in the seller's own language, so setup never becomes the reason someone gives up before starting.

## How it's built

**Frontend:** React 19 with Vite, Tailwind CSS for styling, React Router for navigation.

**Backend:** FastAPI. Three main routes: `/chat` for Ask Saheli, `/dukan-ki-baat` for the photo review feature, and `/seller/create` for onboarding.

**Database:** PostgreSQL, hosted on Neon. Stores seller profiles, conversation history, and listing reviews.

**Retrieval:** ChromaDB running locally, holding a small knowledge base of `.txt` files covering pricing, photography, WhatsApp and Instagram selling, and category-specific guidance. Before answering, the backend searches this for relevant context and hands it to the model alongside the question.

**AI:** Groq, using `openai/gpt-oss-120b` for text conversations and `qwen/qwen3.6-27b` for the photo review feature, since that one needs a model that can actually look at an image.

**Deployment:** Live now. Frontend on Vercel, backend on Render, database on Neon. All three run on genuinely free tiers, no credit card required. The trade-off is that Render's free tier sleeps after 15 minutes of inactivity, so the first request after a quiet period takes about a minute to wake up.

## Project structure

```
Saheli-AI/
  backend/
    app/
      routes/          chat.py, seller.py, dukan_ki_baat.py
      services/         ai_service.py, knowledge_base.py
      models/           database tables (Seller, Conversation, Listing)
      schemas/          request/response validation
      knowledge_base/   curated .txt files used for retrieval
      main.py           app entry point, CORS, router registration
      database.py       database connection setup
    requirements.txt
  frontend/
    src/
      pages/            HomePage, AskSaheliPage, DukaanKiBaatPage, SellerRegistrationPage
      components/       Navbar, HeroSection, ChatbotDrawer, and others
      services/api.js    calls to the backend
    package.json
```

## Running it locally

You'll need Python 3.9+ and Node.js.

**Backend**
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The server runs on `http://127.0.0.1:8000`. Check it's alive with `GET /health`.

**Frontend**
```
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

You'll need a `.env` file in `backend/` with:
```
GROQ_API_KEY=your_key_here
DATABASE_URL=your_postgres_connection_string
```

Neither of those should ever be committed to the repository. Both are already excluded via `.gitignore`.

## What's not here yet

Being upfront about this matters more than pretending it's finished.

There's no real user authentication, just a session ID tied to each seller. That's fine for an MVP but wouldn't hold up if this went further. There's no automated test suite either, everything so far has been tested manually against the real database and real API calls. The knowledge base is small and hand-curated, so it covers common questions well but won't have an answer for everything. And because we're on free hosting, that cold start delay on the backend is a real, known limitation, not something we're hiding.

## Where this could go

Voice support in Urdu, Punjabi, Pashto, and Sindhi, for sellers who'd rather speak than type. Marketplace integration with Daraz and Instagram Shop, so listings sync automatically. A seller community feature with simple sales tracking, so growth becomes something people can actually see over time.

## Team

Anoosha, team lead and frontend
Zoya, frontend and UX
Haleema, backend
Rubab, backend
Aima, testing and integration

## License

MIT
