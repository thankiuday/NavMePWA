# Deploy NavMe PWA — GitHub + Render

This app is a **static Vite build** (`dist/`). Use a **Render Static Site**, not a Web Service.

Repository: [https://github.com/thankiuday/NavMePWA](https://github.com/thankiuday/NavMePWA)

---

## 1. Push the code to GitHub

From your machine (replace paths if needed):

```powershell
cd C:\Users\Uday\OneDrive\Desktop\NavMePWA

git init
git branch -M main
git add .
git commit -m "Initial commit: NavMe PWA"

git remote add origin https://github.com/thankiuday/NavMePWA.git
git push -u origin main
```

If the remote already exists:

```powershell
git remote set-url origin https://github.com/thankiuday/NavMePWA.git
git push -u origin main
```

Use a [Personal Access Token](https://github.com/settings/tokens) as the password when Git asks, or [GitHub CLI](https://cli.github.com/) (`gh auth login`).

**Commit these assets:** `public/logo.png` and `public/icons/*.png` must be in the repo so the logo and PWA icons work on Render.

---

## 2. Create the site on Render

### Option A — Blueprint (`render.yaml`)

1. Open [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
2. Connect the **NavMePWA** GitHub repo and select the `main` branch.
3. Apply the blueprint. Render will use:

   | Setting | Value |
   |--------|--------|
   | **Build command** | `npm ci && npm run build` |
   | **Publish directory** | `dist` |

### Option B — Static Site (manual)

1. **New** → **Static Site** → connect `thankiuday/NavMePWA`.
2. Configure:

   | Field | Value |
   |--------|--------|
   | **Root directory** | *(leave empty if repo root is the app)* |
   | **Build command** | `npm ci && npm run build` |
   | **Publish directory** | `dist` |

3. **Environment** (optional): `NODE_VERSION` = `20.18.0` (or rely on `package.json` `engines`).

---

## 3. SPA routing (required for React Router)

Without this, refreshing `/discover` or `/about` can 404.

1. In Render, open your **static site** → **Redirects / Rewrites**.
2. Add:

   | Source | Destination | Action |
   |--------|-------------|--------|
   | `/*` | `/index.html` | **Rewrite** |

Save. See [Render: client-side routing](https://docs.render.com/deploy-create-react-app#using-client-side-routing).

---

## 4. After deploy

- Visit the `.onrender.com` URL and test **Home**, **Discover**, **direct URL refresh** on a nested route.
- **PWA install:** Render serves **HTTPS**, which is required for both **install** and **live geolocation**. After deploy, open the site in Chrome/Edge (Android or desktop): a built-in **Install** prompt or the banner’s **Install** button may appear once the browser’s installability checks pass (manifest + service worker + icons). **Safari (iOS):** use **Share → Add to Home Screen** (the in-app banner explains this). Installed mode uses `display: standalone` from the Web Manifest.
- **Geolocation:** `Discover` requests GPS through the browser’s **permission prompt** (or uses an existing **Allow** if the user already granted it). This only works on **https://** (or `localhost` in development)—not on plain `http://`.
- **Supabase later:** add `VITE_*` vars in Render **Environment** and reference them in code; never commit secrets.

---

## 5. Optional: custom domain

Render static site → **Settings** → **Custom Domain** → add your domain and follow DNS instructions.

Update `index.html` **Open Graph** / canonical URLs when the production domain is final.
