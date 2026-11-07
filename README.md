# Todos frontend (React)

A Deeper Than Code frontend example by Arthur Bernier Jr: React 19, React Router 8 (declarative mode), Vite 8, served as a static build by `serve` on Railway.

Live: https://dtc-react-production.up.railway.app

It is the code from the React chapter, built exactly as written: list, show, create, edit and delete todos against a Todos API.

## Which backend it talks to

This deploy is pointed at the Python / Django REST framework API: https://api-production-02380.up.railway.app

The API origin comes from `VITE_API_URL` in `.env.production` (origin only, no path, no trailing slash). Vite reads it at build time, and the code builds `${API}/todos` and `${API}/todos/${id}` itself.

## Switch to another backend

Every Deeper Than Code backend serves the same contract, so any of them works:

| Language | Framework | Repo | Live API |
|---|---|---|---|
| Python | Django REST framework | https://github.com/arthurbernierjr/dtc-python-api | https://api-production-02380.up.railway.app |
| Ruby | Rails | https://github.com/arthurbernierjr/dtc-ruby-api | https://api-production-0197.up.railway.app |
| Go | chi | https://github.com/arthurbernierjr/dtc-go-api | https://api-production-a3ab.up.railway.app |
| Java | Spring Boot | https://github.com/arthurbernierjr/dtc-java-api | https://api-production-c419.up.railway.app |
| C# | ASP.NET Core | https://github.com/arthurbernierjr/dtc-cs-api | https://api-production-efe3.up.railway.app |
| PHP | Laravel | https://github.com/arthurbernierjr/dtc-php-api | https://api-production-2278d.up.railway.app |
| Rust | Axum | https://github.com/arthurbernierjr/dtc-rust-api | https://api-production-da990.up.railway.app |
| Dart | shelf | https://github.com/arthurbernierjr/dtc-dart-api | https://api-production-5f5ac.up.railway.app |

Change the value in `.env.production` and rebuild (`npm run build`), or redeploy and Railway rebuilds it for you.

## Run it locally

```
npm install
npm run dev
```

The dev server is on http://localhost:5173. Without a `VITE_API_URL` the app falls back to `http://localhost:8080`, so run any backend from the table on that port, or create `.env.local` with `VITE_API_URL=<origin>` to use a deployed one.

## Deploy

`npm run build` writes `dist/`. `npm start` runs `serve -s dist -l $PORT`, which is what Railway's Railpack builder runs after `npm ci` and `npm run build`. The `-s` flag rewrites unknown paths to `index.html` so `/post/:id` and `/edit/:id` survive a page refresh.

## Layout

- `src/main.jsx`: `createRoot` plus `BrowserRouter`.
- `src/App.jsx`: state, the fetch functions, the four routes.
- `src/pages/AllPosts.jsx`, `SinglePost.jsx`, `Form.jsx`, `EditForm.jsx`: the routed pages.
- `src/components/Post.jsx`: one todo in the list.
