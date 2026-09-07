# Raja Shahi — Himalayan Field Journal

A responsive, high-performance portfolio and field journal website for **Raja Shahi** (Kathmandu, Nepal). Built with pure semantic HTML5, modern vanilla CSS3 with fluid aurora animations & glassmorphism, and lightweight ES6 JavaScript.

---

## 🌟 Features

- **Zero External Dependencies**: All original high-resolution imagery and assets are stored locally in `images/`. No reliance on Lovable CDN or external services.
- **Tibetan Prayer Flag Accents**: Distinctive cultural color stripes at the header and footer (`#33507a`, `#c96a9a`, `#9c3138`, `#4f9b74`, `#e6c94a`).
- **Atmospheric Aurora Lighting**: Multi-layered ambient background animation drifting smoothly across the viewport.
- **Scroll-Triggered Reveals**: IntersectionObserver-based animations for staggered narrative flow.
- **Interactive Story Reader**: Click on any field story card to open a full reading modal with rich typography.
- **Photo Moments Lightbox**: Click any gallery photo to view full-screen with caption, navigation buttons, and keyboard controls (`Esc`, `←`, `→`).
- **Mobile Responsive**: Smooth drawer menu and fluid layout tested across mobile, tablet, and ultra-wide screens.
- **SEO & Social Sharing Ready**: Full OpenGraph, Twitter Card, and description tags configured with `og-preview.png` and `favicon.ico`.

---

## 📁 Project Structure

```
My portfolio/
├── index.html              # Main HTML5 document with complete SEO & section markup
├── css/
│   └── style.css           # Design tokens, Aurora keyframes, typography & glass styles
├── js/
│   └── main.js             # Scroll observer, Lightbox & Story reader modal scripts
├── images/                 # All 11 high-res local image assets
│   ├── hero-portrait.jpg   # Main hero photograph
│   ├── story-annapurna.jpg # Annapurna story
│   ├── story-kathmandu.jpg # Kathmandu alley story
│   ├── story-gokyo.jpg     # Gokyo lakes story
│   ├── moment-flags.jpg    # Photo moment 1
│   ├── moment-yak.jpg      # Photo moment 2
│   ├── moment-tea.jpg      # Photo moment 3
│   ├── moment-stairs.jpg   # Photo moment 4
│   ├── moment-valley.jpg   # Photo moment 5
│   ├── about-darkroom.jpg  # About darkroom photo
│   └── og-preview.png      # Social sharing preview card
├── favicon.ico             # Browser tab icon
└── README.md               # Documentation & hosting guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Open
You can simply double-click `index.html` in your file explorer to open it in Chrome, Edge, Safari, or Firefox.

### Option 2: Local HTTP Server
Using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Using Node.js (npx):
```bash
npx serve .
```

---

## 🌐 How to Host on Your Own Custom Domain

You can host this website completely **free** on any modern hosting platform with zero server management:

### 1. Vercel (Recommended — Simplest with Custom Domains)
1. Push this folder to a GitHub repository.
2. Sign up / Log in to [vercel.com](https://vercel.com).
3. Click **Add New Project** and import your GitHub repository.
4. Click **Deploy**. Your site is instantly live!
5. Go to **Settings > Domains** in Vercel.
6. Enter your custom domain (e.g. `rajashahi.com` or `rajashahi.com.np`).
7. Update your domain DNS settings (add the `CNAME` or `A` record provided by Vercel).

### 2. Netlify
1. Log in to [netlify.com](https://netlify.com).
2. Drag and drop the `My portfolio` folder into the Netlify dashboard, or connect via GitHub.
3. In **Domain Management**, click **Add custom domain**.
4. Configure DNS records according to Netlify's instructions.

### 3. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `yourusername/portfolio`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Under **Custom domain**, enter your domain name.
5. In your domain registrar (e.g. Mercantile `.np` or Namecheap / Cloudflare), point the DNS records:
   - For apex domain (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - For `www`: CNAME to `yourusername.github.io`

### 4. Traditional Web Hosting (cPanel / Apache / Nginx)
- Simply upload the contents of this folder (`index.html`, `css/`, `js/`, `images/`, `favicon.ico`) to your server's `public_html` directory via FTP or File Manager.

---

## ✍️ Customizing Content

- **Change Stories / Text**: Edit `index.html` and the `storiesData` array in `js/main.js`.
- **Change Photos**: Replace the images in the `images/` directory with your own photos keeping the same filenames, or update the `src` attributes in `index.html` and `js/main.js`.
- **Update Contact Info**: Search for `shahiraja122@gmail.com` and `thakuri_15` in `index.html` and replace with your updated details.
