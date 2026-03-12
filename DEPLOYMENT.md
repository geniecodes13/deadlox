# Deadlox Deployment Guide

Deadlox is a React + TypeScript web app built with Vite. Deployment produces static files in the `dist/` directory, suitable for any static hosting service (GitHub Pages, Netlify, Vercel, etc.).

## Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun (already in project)
- Git repository (this is a GitHub repo: `deadlox`)
- GitHub account (for GitHub Pages)
- Accounts for Netlify/Vercel (optional, free tiers available)

## 1. Build the Project

Always build before deploying:

```bash
# Install dependencies (if needed)
npm install

# Build for production
npm run build
```

This creates optimized static files in `dist/`:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── ... (other assets)
```

**Preview locally**:
```bash
npm run preview
```
Opens at `http://localhost:4173` (production-like server).

## 2. Deploy to GitHub Pages (Recommended - Free)

### Option A: GitHub Pages with `gh-pages` branch (Automatic)

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   \"scripts\": {
     \"deploy\": \"gh-pages -d dist\"
   }
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

4. Enable GitHub Pages in repo Settings > Pages > Source: `gh-pages` branch.

**Live URL**: `https://yourusername.github.io/deadlox`

### Option B: GitHub Actions (CI/CD - Automatic on push)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - run: npm ci
      
      - run: npm run build
      
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      
      - uses: actions/deploy-pages@v4
```

**Live URL**: `https://yourusername.github.io/deadlox`

**Repo Settings**: Settings > Pages > Source: GitHub Actions.

## 3. Deploy to Netlify (Drag & Drop or CLI)

### Drag & Drop (Easiest)
1. Build: `npm run build`
2. Go to [netlify.com/drop](https://app.netlify.com/drop)
3. Drag `dist/` folder → Instant deploy!

**Custom Domain**: Site Settings > Domain management.

### Netlify CLI
1. Install: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Init: `netlify init` (connect to repo)
4. Build & deploy: `netlify deploy --prod --dir=dist`

**Live URL**: `https://your-app-name.netlify.app`

## 4. Deploy to Vercel (Git Integration)

1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy:
   ```bash
   vercel --prod
   ```
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

**Git Integration**: Connect GitHub repo → Auto-deploys on push to main.

**Live URL**: `https://deadlox.vercel.app` (or custom).

## 5. Other Platforms

| Platform | Command/Steps | Free Tier |
|----------|---------------|-----------|
| **Surge** | `npm i -g surge`<br>`npm run build`<br>`surge dist/` | Yes |
| **Firebase** | `npm i -g firebase-tools`<br>`firebase init hosting`<br>`npm run build`<br>`firebase deploy` | Yes |
| **Render** | Connect GitHub repo (Static Site) | Yes |
| **Cloudflare Pages** | Connect GitHub + Build: `npm run build`, Output: `dist` | Yes |

## Troubleshooting

- **404 on refresh**: Add to `vite.config.ts`:
  ```ts
  base: '/deadlox/',  // For GitHub Pages subpath
  ```
  Rebuild after changing `base`.

- **Assets 404**: Ensure `base` in `vite.config.ts` matches repo name (e.g., `/deadlox/`).

- **CORS issues**: Static sites don't have CORS; fine for client-side game.

- **Clean build**: `rm -rf dist/ && npm run build`

## Custom Domain

- **GitHub Pages**: Repo Settings > Pages > Custom domain
- **Netlify**: Site Settings > Domain > Add domain
- **Vercel**: Project Settings > Domains

## Monitoring & Updates

- Push to `main` → CI/CD auto-builds/deploys
- Manual: `npm run build && <deploy-command>`

**Congratulations! Your Deadlox game is now live worldwide 🚀**

For support, check [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html).

