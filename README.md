# New MC Landing Page

A production-ready Next.js 14 landing page for New MC, a wholesale sandal supplier in Indonesia. Built with static export support for deployment on Hostinger.

## Features

- 🌐 **Internationalization**: Bahasa Indonesia (default) and English support using next-intl
- 🎨 **Modern UI/UX**: Clean, elegant design inspired by jerusalemsandals.com
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- ✨ **Smooth Animations**: Framer Motion animations for enhanced user experience
- 🚀 **Static Export Ready**: Configured for static site generation
- 🎯 **B2B Focused**: Designed for wholesale business with professional messaging

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization
- **Framer Motion** - Animation library

## Project Structure

```
new-mc-landing-page/
├── app/
│   ├── [locale]/          # Locale-based routing (id, en)
│   │   ├── layout.tsx     # Locale layout with i18n provider
│   │   └── page.tsx       # Main landing page
│   ├── components/        # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── WhatsAppButton.tsx
│   ├── sections/         # Page sections
│   │   ├── Hero.tsx
│   │   ├── BrandCredibility.tsx
│   │   ├── CompanyStory.tsx
│   │   ├── ProductRange.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── globals.css        # Global styles
├── messages/             # Translation files
│   ├── id.json           # Indonesian translations
│   └── en.json           # English translations
├── public/
│   └── images/           # Image assets
├── styles/
│   └── globals.css       # Global CSS with fonts
└── routing.ts            # i18n routing configuration
```

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd R:\new-mc-landing-page
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The page will automatically redirect to the default locale (`/id`). You can access:
- Indonesian: `http://localhost:3000/id`
- English: `http://localhost:3000/en`

## Building for Production

### Static Export

Build the static site:

```bash
npm run build
```

This will create an `out/` directory with all static files ready for deployment.

### Preview Static Export

To preview the static export locally:

```bash
npm run build
npx serve out
```

## Deployment to Hostinger

### Option 1: Using File Manager

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **Upload files:**
   - Log in to your Hostinger control panel
   - Navigate to File Manager
   - Go to `public_html` directory (or your domain's root directory)
   - Upload all contents from the `out/` folder

3. **File structure on server:**
   ```
   public_html/
   ├── id/
   │   └── index.html
   ├── en/
   │   └── index.html
   ├── _next/
   ├── images/
   └── ...
   ```

### Option 2: Using FTP/SFTP

1. **Build the static site:**
   ```bash
   npm run build
   ```

2. **Connect via FTP:**
   - Use an FTP client (FileZilla, WinSCP, etc.)
   - Connect to your Hostinger server
   - Navigate to `public_html` directory

3. **Upload files:**
   - Upload all contents from the `out/` folder to `public_html`

### Option 3: Using Git (if available)

1. **Initialize git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to your repository and deploy via Hostinger's Git integration**

## Configuration

### WhatsApp Number

Update the WhatsApp phone number in:
- `app/components/WhatsAppButton.tsx` (default: `6281234567890`)
- `app/sections/Footer.tsx` (default: `6281234567890`)

Replace with your actual WhatsApp business number (format: country code + number, no + sign).

### Images

Replace placeholder images in `public/images/`:
- `hero-sandals.jpg` - Hero section image (recommended: 1200x800px)
- `company-story.jpg` - Company story section (recommended: 800x600px)
- Product images (recommended: 600x400px each):
  - `product-men.jpg`
  - `product-women.jpg`
  - `product-kids.jpg`
  - `product-flipflop.jpg`
  - `product-slipper.jpg`
  - `product-casual.jpg`

See `public/images/README.md` for detailed image guidelines.

### Email Address

Update the email address in `app/sections/Footer.tsx` (currently: `info@newmc.com`).

### Translations

Edit translation files in `messages/`:
- `messages/id.json` - Indonesian content
- `messages/en.json` - English content

## Customization

### Colors

Colors are defined in `tailwind.config.js`:
- `deep-brown`: #4A3424 (Primary brand color)
- `warm-sand`: #C9A66B (Accent color)
- `soft-beige`: #E6D8C3 (Background sections)
- `muted-brown`: #8C6E54 (Borders/icons)

### Typography

Fonts are configured in `styles/globals.css`:
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Spacing & Layout

- Max content width: 1200px (7xl in Tailwind)
- Section padding: `py-24` (96px vertical)
- Container padding: `px-6 md:px-12` (responsive horizontal)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Static export for optimal performance
- Optimized images (unoptimized flag for static export)
- Lazy loading for below-the-fold content
- Minimal JavaScript bundle size

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Ensure all dependencies are installed: `npm install`
2. Check that all image files exist in `public/images/`
3. Verify TypeScript types: `npm run build` (will show type errors)

### Language Switching Not Working

For static export, language switching uses full page navigation. Ensure:
- Both locale folders (`id/` and `en/`) are generated in the `out/` directory
- Server is configured to serve index.html for all routes (Hostinger usually handles this)

### Images Not Loading

1. Check image paths in components (should start with `/images/`)
2. Ensure images are in `public/images/` directory
3. Verify image file names match exactly (case-sensitive)

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [next-intl documentation](https://next-intl-docs.vercel.app/)
- Check [Tailwind CSS documentation](https://tailwindcss.com/docs)

## License

© 2024 New MC. All rights reserved.

