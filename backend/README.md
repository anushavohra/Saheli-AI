# Saheli AI 🌸

**Saheli AI** is an AI-powered assistant designed to support Pakistani women running small, home-based businesses.

Many women run businesses from home while balancing family responsibilities, limited time, limited budgets, and little access to formal business guidance. Saheli aims to provide practical, personalized support that helps sellers make better decisions about their businesses, instead of simply giving generic advice.

This document explains, in simple terms, what Saheli is, what's been built so far, and exactly how to get it running on your own computer. No prior backend experience needed, just follow the steps in order.

---

## 🎯 The Problem

Home-based sellers often know how to make their products but struggle with the business side of selling them.

Common challenges include:

* Pricing products fairly
* Understanding costs and profit
* Finding and reaching customers
* Improving product listings
* Presenting products effectively
* Making business decisions with limited resources
* Knowing what to do when sales are slow
* Feeling uncertain or discouraged about their business

Saheli is designed to make this kind of support more accessible through a simple, conversational AI assistant.

---

## 💡 What Saheli Does

Saheli has two main features.

### Ask Saheli

A conversational feature where sellers can ask business questions and get answers grounded in a real knowledge base, not just generic AI guesses.

Saheli is designed to:

* Understand the seller's specific situation, not answer generically
* Use information the seller has already shared (shop name, category, past conversation)
* Ask for missing information when needed, instead of over-explaining
* Perform calculations using the seller's actual numbers
* Help the seller complete a task, rather than just explaining how to do it

**Example — the difference this makes:**

❌ Less useful:
> Seller: "How should I price my crochet keychain?"
> Saheli: "Add the material cost, labor cost, and profit margin using this formula..."

This leaves the seller to do the work herself.

✅ Intended behavior:
> Seller: "My yarn costs Rs. 300, packaging is Rs. 80, and it takes me 2 hours."
> Saheli uses those actual numbers, calculates the real cost and a suggested price, and explains it simply, no homework left for the seller.

### Dukan Ki Baat

A shop and product review feature. A seller uploads a photo, title, description, and shop bio, and gets a focused, structured review:

1. **One genuine strength**
2. **One or two specific improvements** — each with 2 ready-to-use rewrite options the seller can copy directly, not just advice on what to change
3. **One small, achievable weekly goal**

If the uploaded photo doesn't actually match the listing (wrong item, or no product visible), Saheli won't force a fake review, she'll simply point that out and ask for the right photo.

---

## 🧠 How Saheli Actually Works (Architecture)

```text
Seller
   │
   ▼
Frontend
   │
   ▼
FastAPI Backend
   │
   ├──────────────► Ask Saheli / Dukan Ki Baat logic
   │                    │
   │                    ▼
   │              Groq (LLM + Vision)
   │
   ├──────────────► Knowledge Base
   │                    │
   │                    ▼
   │                Embeddings
   │                    │
   │                    ▼
   │                ChromaDB
   │
   ▼
Postgres Database (Neon)
(Conversations, Sellers, Listings)
```

**In plain terms:**
- **FastAPI** is the "reception desk," it receives requests from the app and sends replies back.
- **Groq** is where the actual AI thinking happens, we use it for both plain text chat and reading product photos.
- **ChromaDB** stores our written business guidance so Saheli's answers are grounded in real information, not guesses.
- **Postgres (via Neon)** is where we permanently save conversations, seller profiles, and product review history.

---

## 🛠️ Technology Stack

### Backend
- **Python**
- **FastAPI**
- **SQLAlchemy**
- **PostgreSQL** (hosted on Neon) — used instead of SQLite so data is shared across the team and persists reliably
- **python-dotenv**

### AI / RAG
- **Groq API** — hosts both the text model and the vision (photo-reading) model, free tier, no billing required
- **ChromaDB** — vector database for our knowledge base
- Retrieval-Augmented Generation (RAG) — Saheli looks up relevant guidance before answering, instead of relying purely on the AI's general training

### Development
- Git & GitHub
- Python virtual environment
- VS Code

---

## 🤖 A Note on Which AI Models We Use, and Why

We originally planned to use **Google's Gemini** for reading product photos in Dukan Ki Baat, since it handles images directly. However, Gemini's free tier requires billing to be enabled to keep using it, so we switched to **Groq** instead, which is genuinely free.

Groq now powers both features, using two different models for two different jobs:

| Feature | Model | Why |
|---|---|---|
| Ask Saheli (text only) | `openai/gpt-oss-120b` | General-purpose, handles our detailed persona and instructions well |
| Dukan Ki Baat (needs to read photos) | `qwen/qwen3.6-27b` | One of the few models on Groq that can actually understand images |

*(Note: our very first model choice, `llama-3.3-70b-versatile`, was deprecated by Groq partway through development, this is why the code now uses `openai/gpt-oss-120b` instead.)*

Gemini's API key is still kept in the project for future use, in case billing gets enabled later or the team wants image quality closer to Gemini's.

---

## 🧾 Saheli's Personality (System Prompt)

A significant part of development has gone into designing how Saheli actually talks. She's built to be:

- Warm, but not falsely cheerful or over-the-top ("my dear," excessive exclamation marks, etc. are deliberately avoided)
- Beginner-friendly, no business jargon
- Specific to the seller's actual situation, never a copy-paste answer that could apply to anyone
- Honest, she doesn't promise success or say "everything will be fine" without basis
- Focused, she doesn't turn every message into a checklist or force a weekly goal onto a casual question

**Design principle:** *Listen first. Understand the seller's actual problem. Then help them solve it — don't just explain how she could solve it herself.*

Before every response, the system is designed to ask: what did the seller actually say, what do we already know about her, and what's the smallest useful thing we can do right now?

---

## 📁 Project Structure

```text
backend/
│
├── app/
│   ├── models/
│   │   ├── conversation.py       # chat message history
│   │   └── seller_listing.py     # seller profiles + product listing reviews
│   │
│   ├── knowledge_base/           # plain text guidance files (pricing, photography, etc.)
│   ├── database.py               # database connection setup
│   ├── load_knowledge_base.py    # loads knowledge_base/ files into ChromaDB
│   └── main.py                   # the actual FastAPI app and endpoints
│
├── .env                          # your API keys (never shared publicly)
├── .gitignore
├── requirements.txt
└── venv/                         # your local virtual environment (not shared/committed)
```

---

## 🗄️ Database

We use **PostgreSQL**, hosted for free on **Neon**, accessed through **SQLAlchemy**.

Three tables currently exist:
- **`conversations`** — every message sent in Ask Saheli, tied to a `session_id`
- **`sellers`** — one profile per seller (shop name, category, bio), tied to a `session_id`
- **`listings`** — one row per product reviewed through Dukan Ki Baat, tied to a `session_id`

### A note on `session_id`
Every seller is identified by a `session_id`, a text label you choose (like `"zara123"`). One seller can have many chat messages AND many product listings, all tied together under the same ID. Always reuse the same `session_id` for the same seller, that's what lets Saheli remember her across requests.

---

## 🔎 Knowledge Base & ChromaDB

We've written detailed, fact-based guidance covering:
- Pricing
- Product photography
- Product listings/descriptions
- WhatsApp selling
- Instagram selling
- Category-specific guidance: jewelry, baked goods, embroidery, candles, crochet & knitting, and clay crafts

This lives in `backend/app/knowledge_base/` as plain text files. The RAG (retrieval) pipeline works like this:

```text
Knowledge Documents → Chunking → Embeddings → ChromaDB → Relevant Info → LLM → Saheli's Response
```

To load or refresh this content into ChromaDB (only needed once, or after editing guidance content):
```bash
python -m app.load_knowledge_base
```

---

## 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_shared_neon_database_url
```

**Never commit `.env` to GitHub.** Your `.gitignore` should include:
```text
.env
__pycache__/
*.pyc
venv/
```

### Getting a Groq API key
1. Go to **console.groq.com**, sign in (Google or email, no card needed)
2. Find "API Keys," create one, copy it

### Getting a Gemini API key
1. Go to **Google AI Studio** (aistudio.google.com)
2. Sign in, create an API key, copy it

### Getting the database URL
Ask a teammate for the shared `DATABASE_URL`, don't create a separate database unless specifically asked to.

---

## 🚀 Running the Backend

### 1. Clone the repository
```bash
git clone <repository-url>
cd Saheli-AI/backend
```

### 2. Create a virtual environment
A virtual environment keeps this project's tools separate from everything else on your computer. Only needs to be done once.
```bash
python -m venv venv
```

### 3. Activate it
Do this every time you start working:
```bash
venv\Scripts\activate
```
You'll see `(venv)` appear at the start of your terminal line when it's active.

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Set up your `.env` file
See the Environment Variables section above.

### 6. Run the server
```bash
python -m uvicorn app.main:app --reload
```
You should see "Uvicorn running on http://127.0.0.1:8000"

### 7. Test it
Open your browser to **http://127.0.0.1:8000/docs**. This page lets you test every feature directly, no frontend needed.

To stop the server: click into the terminal and press `Ctrl + C`.

---

## 📡 What Each Endpoint Does

| Endpoint | What it does |
|---|---|
| `/chat` | Ask Saheli — send a question and a `session_id`, get a grounded, personalized answer. Remembers the full conversation for that session. |
| `/seller/create` | Save a seller's shop info (name, category, bio) so future chats and reviews are personalized. |
| `/dukan-ki-baat` | Upload a product photo + title + description + bio, get a structured review back, saved to the database. |

---

## 🔀 Git Workflow

We work on separate branches so changes can be tested before merging into `main`.

```bash
git checkout -b your-branch-name
```

After making changes:
```bash
git status
git add .
git commit -m "Describe what you changed"
git push origin your-branch-name
```

If the branch doesn't exist on GitHub yet:
```bash
git push -u origin your-branch-name
```

**Note on our repo history:** the local and GitHub repositories were initially created separately, so their histories didn't match. This was resolved with:
```bash
git pull origin main --allow-unrelated-histories
```
This caused a `.gitignore` conflict, which was fixed manually before committing. If you ever hit this same error on a fresh setup, this is why, and this is the fix.

---

## 🧪 Testing Notes

Saheli has been tested with real seller-style messages, including practical questions ("Hi, I need help pricing my blanket crochet") and emotional ones ("I'm worried my business will fail"), and with Dukan Ki Baat reviews using real and deliberately mismatched photos (to confirm she handles a wrong photo gracefully instead of faking a review).

Testing surfaced a few real issues along the way, since fixed:
- Saheli was initially just explaining formulas instead of calculating actual answers, fixed by explicitly instructing her to do the math using the seller's real numbers.
- Responses were sometimes too "cheerleader"-ish (excessive exclamation marks, "my dear"), fixed with explicit tone calibration instructions.
- Longer responses were occasionally cut off mid-sentence, fixed by adjusting the AI's output length settings.
- A model's internal "thinking" text was leaking into responses, fixed by hiding reasoning output at the API level.

---

## 📌 Current Development Status

**Done:**
- [x] FastAPI backend, running and connected to Postgres (Neon)
- [x] Python virtual environment and `requirements.txt`
- [x] Groq integration (text model + vision model)
- [x] Conversation, Seller, and Listing database models
- [x] ChromaDB integration, knowledge base loaded and confirmed working
- [x] Ask Saheli — grounded, personalized, remembers conversation history
- [x] Seller profile creation and automatic personalization
- [x] Dukan Ki Baat — full structured reviews, saved to the database, handles mismatched photos
- [x] Saheli's system prompt, refined through real testing

**Still in progress:**
- [ ] Validating that every review always strictly follows the required structure (not just trusting the prompt)
- [ ] Friendlier handling when the AI service itself fails or times out
- [ ] Checking uploaded files are genuinely valid images before processing
- [ ] Thorough testing in Urdu and Roman Urdu
- [ ] Saving the actual photo file permanently (currently only the review text is saved, not the image itself)
- [ ] Frontend–backend integration
- [ ] End-to-end testing

---

## 🎯 Future Goals

1. **Deeper personalization** — remember more seller context over time, connect past goals to new reviews
2. **Stronger grounding** — keep expanding and refining the knowledge base
3. **More reliable Dukan Ki Baat** — structure validation, better error handling
4. **Full integration** — connect frontend, backend, database, and AI into one smooth experience

---

## 👩‍💻 Project Goal

Saheli's goal is not to tell women how to run a business in theory.

It's to make practical business support genuinely accessible to women who are already doing the work.

**Listen to the seller. Understand the problem. Help with the work.**