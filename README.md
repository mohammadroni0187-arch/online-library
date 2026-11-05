# BookNook – A Small Online Library

BookNook is a small online library where readers can explore a shared collection,
borrow books, return them and manage their own books. It is built with a Next.js
(App Router) frontend and a separate Express + MongoDB API, authenticated with
Better Auth (email/password + Google).

## Features

- **Home page**
  - Hero slider (Swiper) with autoplay and pagination
  - New Arrivals – the latest 6 books loaded from MongoDB
  - How It Works, Popular Categories and Why Choose BookNook sections
- **All Books** – responsive grid, search, category filter, loading / error / empty states
- **Book Details** – public page with cover, description, copy counts, who added it
  and a borrow confirmation modal (borrow & return dates)
- **Authentication** – Better Auth with email/password (min. 6 characters, upper +
  lowercase enforced on the client *and* the server) and Google sign-in
- **Private pages**
  - Add Book – image upload through ImgBB, saved together with the signed-in user
  - My Books – edit (prefilled dialog) and delete (confirmation dialog) your own books
  - My Borrows – return borrowed books with confirmation
- **Navbar** – logo, navigation, user avatar dropdown (name, My Profile, Logout),
  Login/Register for guests, responsive mobile menu
- **Custom 404 page**, toast notifications, loading spinners, page titles
- **Secured API** – every mutating request carries a Better Auth JWT that the
  Express server verifies against the Better Auth JWKS endpoint

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Lucide React, Swiper, react-toastify |
| Auth | Better Auth, MongoDB adapter, JWT plugin |
| Backend | Node.js, Express.js, MongoDB Native Driver, `jose` (JWT verification) |
| Database | MongoDB (Better Auth data and application data) |

## Project Structure

```
src/
  app/                 # App Router pages (/, /books, /books/[id], /login,
                       # /register, /add-book, /my-books, /my-borrows, ...)
  component/           # Application components (Navbar, NewArrivals, BorrowButton, ...)
  components/ui/       # shadcn/ui primitives
  lib/                 # auth config, auth client, API helper
```

The Express API lives in the sibling repository `online-library-server`.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root (never commit it):

```bash
# Better Auth
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_GOOGLE_ID=your-google-oauth-client-id
BETTER_AUTH_GOOGLE_SECRET=your-google-oauth-client-secret

# Database (shared with the API server)
MONGODB_URI=your-mongodb-connection-string

# Book cover uploads (ImgBB)
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key

# Optional: Express API url, defaults to http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> Use placeholder values only in documentation. Real values belong in `.env`,
> which is git-ignored.

### 3. Run the API server (separate terminal)

```bash
cd ../online-library-server
npm install
npm run dev     # http://localhost:8000
```

### 4. Run the frontend

```bash
npm run dev     # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## API Endpoints

The frontend calls the Express server (default `http://localhost:8000`):

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| GET | `/books` | – | All books (optional `?category=`) |
| GET | `/books/latest` | – | Latest 6 books |
| GET | `/books/:id` | – | Single book |
| POST | `/books` | JWT | Add a book |
| PATCH | `/books/:id` | JWT (owner) | Update a book |
| DELETE | `/books/:id` | JWT (owner) | Delete a book |
| GET | `/my-book` | JWT | Books of the signed-in user |
| POST | `/borrows` | JWT | Borrow a book |
| GET | `/borrows` | JWT | Borrow records of the signed-in user |
| GET | `/my-borrows` | JWT | Alias of `GET /borrows` |
| DELETE | `/borrows/:id` | JWT (owner) | Return a book |

Identity always comes from the verified JWT – the server ignores any
`userEmail` / `userName` sent in the request body.

## Deployment

No live deployment links are configured yet. When deploying, set
`NEXT_PUBLIC_API_URL` (and the matching `CLIENT_ORIGINS` / `BETTER_AUTH_URL`
on the API server) to the deployed URLs.

## Security Notes

- `.env` files are never committed and no secret is hard-coded in the source.
- The API verifies Better Auth JWTs (signature, expiry, issuer, audience)
  using the public JWKS published by the auth server.
- Books can only be edited or deleted by the user who added them.
- Borrow stock is updated with atomic MongoDB updates, so `availableCopies`
  can never become negative and a borrow can never be returned twice.
