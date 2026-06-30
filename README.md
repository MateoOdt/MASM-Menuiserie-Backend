# MASM Menuiserie — Opinions API

Minimal Node.js + Express + MongoDB API to collect website opinions.
Each opinion has a **name**, a **note** (0 to 5) and a **comment**.

## Stack

- Node.js (ES modules)
- Express
- MongoDB via Mongoose

## Setup

```bash
npm install
cp .env.example .env   # then edit values if needed
npm run dev            # or: npm start
```

You need a running MongoDB instance (local or hosted, e.g. MongoDB Atlas).
Set the connection string in `.env` via `MONGODB_URI`.

## Endpoints

Base path: `/api/opinions`

### POST `/api/opinions`

Create a new opinion.

Body (JSON):

```json
{
  "name": "Jean Dupont",
  "note": 4,
  "comment": "Très bon travail, je recommande."
}
```

- `name` — string, required
- `note` — number between 0 and 5, required
- `comment` — string, optional

Responses:
- `201` — `{ "data": { ...opinion } }`
- `400` — `{ "error": "Validation failed", "details": [...] }`

Example:

```bash
curl -X POST http://localhost:3000/api/opinions \
  -H "Content-Type: application/json" \
  -d '{"name":"Jean Dupont","note":4,"comment":"Très bon travail"}'
```

### GET `/api/opinions`

List all opinions (newest first).

Response `200`:

```json
{
  "count": 1,
  "data": [
    {
      "_id": "...",
      "name": "Jean Dupont",
      "note": 4,
      "comment": "Très bon travail",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

```bash
curl http://localhost:3000/api/opinions
```

### GET `/health`

Health check — returns `{ "status": "ok" }`.
