# Product Requirements Document: New MC Grosir Sandal - MVP

## Overview

**Product Name:** New MC - Etalase Digital Grosir Sandal  
**Problem Statement:** Membantu pembeli grosir dan reseller sandal menemukan katalog produk New MC, Mc Polo, dan Baiyo secara online 24/7 dan langsung memesan via WhatsApp tanpa harus datang ke lokasi fisik.  
**MVP Goal:** Kehadiran online yang kuat dengan konversi inquiry WhatsApp terukur  
**Target Launch:** 4 hari (accelerated dengan AI coding assistant)

## Target Users

### Primary User Profile
**Who:** Reseller/pedagang sandal (toko kecil, online shop)  
**Location:** Luar kota yang tidak bisa datang langsung ke toko fisik  
**Problem:** Butuh lihat katalog lengkap, cek harga grosir, dan order cepat tanpa harus visit lokasi  
**Current Solution:** Chat WhatsApp langsung atau datang ke lokasi fisik  
**Why They'll Switch:** Katalog online yang selalu available 24/7 dengan info lengkap dan proses order yang cepat

### User Persona: Budi - Reseller Sandal
- **Demographics:** 25-45 tahun, pemilik toko/online shop, berbasis di kota tier 2-3
- **Tech Level:** Intermediate (comfortable dengan WhatsApp, social media, website browsing)
- **Goals:** 
  - Cari supplier sandal grosir yang reliable
  - Lihat katalog produk dengan harga jelas
  - Order cepat tanpa ribet
- **Frustrations:** 
  - Harus tanya satu-satu via chat untuk lihat produk
  - Tidak tahu produk apa saja yang available
  - Susah compare produk dan harga

### Secondary User Profile
**Who:** Pembeli grosir dalam jumlah besar (distributor, toko retail chain)  
**Need:** Visibility produk dan kontak langsung untuk nego harga bulk

## User Journey

### The Story
Budi adalah reseller sandal yang punya toko kecil di Surabaya. Dia sedang cari supplier baru karena stok lama mulai kurang variatif. Suatu hari dia search "grosir sandal murah" di Google dan menemukan website New MC.

**Journey Flow:**

1. **Discovery:** 
   - Budi menemukan website New MC via Google search atau referral dari grup WhatsApp reseller
   - Landing page langsung show katalog sandal dengan gambar jelas dan harga

2. **First Contact:** 
   - Budi browse katalog dalam grid view yang rapi
   - Melihat 3 brand: Mc Polo, New MC, Baiyo dengan berbagai model
   - Semua harga grosir sudah tertera jelas

3. **Onboarding:** 
   - Budi klik salah satu produk yang menarik (misalnya: Sandal Gunung New MC)
   - Masuk ke halaman detail dengan info lengkap: deskripsi, pilihan warna, harga, gambar lebih besar

4. **Core Loop:** 
   - Budi tertarik dan klik tombol "Pesan via WhatsApp"
   - WhatsApp terbuka otomatis dengan pesan pre-filled berisi:
     - Nama produk
     - ID produk
     - Request info stok dan harga grosir
   - Budi tinggal klik send

5. **Retention:** 
   - Budi save nomor WhatsApp New MC
   - Bookmark website untuk cek produk baru next time
   - Jika transaksi OK, dia akan balik lagi untuk restock

## MVP Features

### Core Features (Must Have) ✅

#### 1. Product Catalog Grid
- **Description:** Grid responsif menampilkan semua produk sandal dengan layout yang clean
- **User Value:** User bisa langsung lihat semua available products dalam satu view
- **Success Criteria:** 
  - Grid responsive: 2 kolom (mobile), 3 kolom (tablet), 5 kolom (desktop)
  - Setiap card menampilkan: gambar produk, nama, brand, harga
  - Hover effect smooth untuk better UX
  - Load time < 3 detik
- **Priority:** Critical (P0)

#### 2. Product Detail Page
- **Description:** Halaman detail individual untuk setiap produk dengan routing dinamis
- **User Value:** User mendapat informasi lengkap sebelum memutuskan untuk inquiry
- **Success Criteria:**
  - Dynamic routing: /produk/[id]
  - Display: gambar besar, nama lengkap, brand, harga, deskripsi, pilihan warna
  - Mobile-optimized layout
  - Integration dengan WhatsApp button
- **Priority:** Critical (P0)

#### 3. WhatsApp Order Button
- **Description:** Tombol "Pesan via WhatsApp" dengan auto-generated message
- **User Value:** One-click untuk mulai inquiry tanpa harus ketik manual
- **Success Criteria:**
  - Button muncul di setiap product detail page
  - Generate WhatsApp link dengan format: `wa.me/[phone]?text=[encoded_message]`
  - Message includes: product name, product ID, stock inquiry
  - Opens in new tab untuk mobile & desktop
  - URL-encoded properly untuk special characters
- **Priority:** Critical (P0)

#### 4. Mobile-First Responsive Design
- **Description:** Layout yang perfect di semua device sizes
- **User Value:** Mayoritas user (reseller) mengakses via mobile - experience harus flawless
- **Success Criteria:**
  - Touch-friendly tap targets (min 44px)
  - Readable font sizes tanpa zoom
  - Optimized images untuk mobile bandwidth
  - Smooth transitions antara breakpoints
  - Tested di iOS Safari & Android Chrome
- **Priority:** Critical (P0)

#### 5. Basic SEO Setup
- **Description:** On-page SEO untuk discoverability di search engines
- **User Value:** Organic traffic dari Google search
- **Success Criteria:**
  - Meta title & description per page
  - Semantic HTML structure
  - Alt text untuk semua images
  - Sitemap.xml generated
  - Fast loading (Core Web Vitals green)
- **Priority:** Critical (P0)

### Supporting Features (Important) ✅

#### 6. Company Profile / About Us
- **Description:** Halaman "Tentang Kami" dengan cerita dan info bisnis
- **User Value:** Build trust dan kredibilitas dengan buyer baru
- **Success Criteria:**
  - Brief history/story New MC
  - Info kontak lengkap (alamat fisik, jam buka, nomor WhatsApp)
  - Keunggulan/value proposition
  - Professional yet approachable tone
- **Priority:** High (P1)

#### 7. FAQ Page
- **Description:** Halaman Frequently Asked Questions
- **User Value:** Pre-answer common questions, save time untuk seller & buyer
- **Success Criteria:**
  - Cover topics: MOQ, area pengiriman, payment terms, return policy, cara order
  - Collapsible/expandable format untuk readability
  - Easy to scan structure
  - Link to contact untuk pertanyaan lain
- **Priority:** High (P1)

#### 8. Contact Page
- **Description:** Dedicated contact page dengan multiple touchpoints
- **User Value:** Flexibility untuk berbagai tipe buyer (some prefer form, some prefer direct call)
- **Success Criteria:**
  - Display: WhatsApp, Phone, Email (if any), Alamat
  - Optional: Embedded Google Maps untuk lokasi toko
  - Simple contact form atau direct links
  - Clear call-to-action
- **Priority:** High (P1)

### Future Features (Not in MVP) ⏳

| Feature | Why Wait | Planned For |
|---------|----------|-------------|
| Search & Filter Function | Katalog masih manageable tanpa search (< 100 produk) | Version 2 - setelah produk 100+ |
| Shopping Cart / Multi-product Order | Current flow (1 produk → 1 WA) cukup untuk grosir model | Version 2 - jika user request bulk order feature |
| CMS / Admin Dashboard | products.json lebih cepat untuk MVP | Version 2 - ketika update produk 3+ kali/hari |
| Multi-language (EN/ID) | Focus domestik dulu | Version 2 - jika ada demand internasional |
| Advanced Analytics Dashboard | Google Analytics basic sudah cukup | Version 2 - setelah 3 bulan data collection |
| User Accounts / Login | Over-engineering untuk katalog sederhana | Version 3+ - jika berkembang jadi marketplace |
| Product Gallery / Brand Showcase | Nice-to-have tapi tidak critical untuk konversi | Version 2 - untuk brand storytelling |
| Testimonials / Reviews | Perlu collect dulu dari customer | Version 2 - setelah ada base customers |

## Success Metrics

### Primary Metrics

#### Short Term (Month 1)
1. **WhatsApp Button Clicks:** 50+ klik
   - How to measure: Google Analytics event tracking pada button
   - Why it matters: Direct indicator of purchase intent

2. **WhatsApp Inquiries Received:** 20+ chat masuk
   - How to measure: Manual count di WhatsApp Business
   - Why it matters: Conversion dari klik ke actual inquiry

3. **Page Load Speed:** < 3 seconds
   - How to measure: Google PageSpeed Insights, Lighthouse
   - Why it matters: Speed = SEO ranking + user retention

#### Medium Term (Month 2-3)
1. **Unique Visitors:** 100+ per bulan
   - How to measure: Google Analytics
   - Why it matters: Growing awareness dan reach

2. **Confirmed Transactions:** 5+ deals closed
   - How to measure: Manual sales tracking
   - Why it matters: ROI dari online presence

3. **Bounce Rate:** < 60%
   - How to measure: Google Analytics
   - Why it matters: Content engagement quality

### Secondary Metrics
- **Most Viewed Products:** Track untuk stock planning
- **Traffic Sources:** Organic search vs direct vs referral
- **Device Breakdown:** Mobile vs desktop usage
- **FAQ Page Views:** Indicator of information seeking

### Qualitative Metrics
- Feedback dari reseller yang contact via WhatsApp
- Common questions yang muncul (untuk improve FAQ)
- User behavior patterns (which products paired together)

## UI/UX Direction

**Design Feel:** Clean, modern, professional, mobile-first, trust-building

### Design Principles (2025 Web Standards)

1. **Minimalist Layout:** Whitespace yang cukup, tidak cramped, let products breathe
2. **Bold Typography:** Product names & prices are hero elements - must be immediately scannable
3. **Image-First:** High-quality product photos as focal point, minimal text overlay
4. **Smooth Interactions:** Subtle hover effects, smooth page transitions, no jarring animations
5. **Accessible Design:** WCAG 2.1 AA color contrast, readable fonts, semantic HTML
6. **Performance-Optimized:** Lazy loading images, optimized assets, fast paint times

### Key Screens

#### 1. Homepage / Landing Page
- **Purpose:** First impression + showcase katalog
- **Key Elements:**
  - Clean header with logo + navigation (Home, About, FAQ, Contact)
  - Hero section (optional): Brief tagline + CTA
  - Product catalog grid (main content)
  - Footer with contact info
- **User Actions:** 
  - Browse products
  - Click product card → detail page
  - Navigate to supporting pages

#### 2. Product Detail Page
- **Purpose:** Provide complete product information + conversion point
- **Key Elements:**
  - Large product image (with zoom on hover - optional)
  - Product name + brand badge
  - Price (highlighted)
  - Description paragraph
  - Available colors (if applicable)
  - WhatsApp button (prominent, green, CTA-style)
- **User Actions:**
  - View details
  - Click WhatsApp button
  - Navigate back to catalog

#### 3. About Us Page
- **Purpose:** Build trust and credibility
- **Key Elements:**
  - Company story (brief, authentic)
  - Value propositions (why choose New MC)
  - Contact information
  - Optional: Team photo or warehouse photo
- **User Actions:**
  - Learn about company
  - Contact via listed methods

#### 4. FAQ Page
- **Purpose:** Self-service information
- **Key Elements:**
  - Categorized questions (Ordering, Shipping, Payment, Returns)
  - Collapsible accordions for each Q&A
  - Search function (future enhancement)
  - Link to contact for unlisted questions
- **User Actions:**
  - Find answers to common questions
  - Contact if question not covered

#### 5. Contact Page
- **Purpose:** Multiple contact touchpoints
- **Key Elements:**
  - Contact methods (WhatsApp, Phone, Email, Address)
  - Optional: Embedded Google Maps
  - Business hours
  - Simple contact form (optional for MVP)
- **User Actions:**
  - Get contact information
  - Reach out via preferred method

### Simple Wireframe - Homepage

```
┌─────────────────────────────────────────┐
│  [LOGO: New MC]    [Home│About│FAQ│Contact] │
├─────────────────────────────────────────┤
│                                         │
│   Hero (Optional):                      │
│   "Grosir Sandal Berkualitas"          │
│   [Browse Katalog ↓]                    │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Product Grid (Responsive):             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ IMG  │ │ IMG  │ │ IMG  │ │ IMG  │  │
│  │ Name │ │ Name │ │ Name │ │ Name │  │
│  │ Price│ │ Price│ │ Price│ │ Price│  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ IMG  │ │ IMG  │ │ IMG  │ │ IMG  │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
├─────────────────────────────────────────┤
│  Footer:                                │
│  © New MC | Contact: [WA] [Phone]      │
└─────────────────────────────────────────┘
```

## Technical Considerations

**Platform:** Web (Static Site Generation)  
**Tech Stack:** Astro + React + Tailwind CSS  
**Data Source:** products.json (static file for MVP)  
**Responsive:** Mobile-First approach  

### Performance Goals
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Time to Interactive (TTI): < 3s
- Overall page load: < 3 seconds

### Browser/Device Support
- **Desktop Browsers:** Chrome, Safari, Firefox, Edge (latest 2 versions)
- **Mobile Browsers:** iOS Safari 14+, Chrome Android 10+
- **Devices:** Responsive from 320px (mobile) to 1920px (desktop)
- **Tablet:** Optimized for iPad and Android tablets

### Accessibility Standards
- WCAG 2.1 Level AA compliance
- Semantic HTML5 structure
- Proper heading hierarchy (h1-h6)
- Alt text for all product images
- Keyboard navigation support
- Sufficient color contrast ratios

## Constraints & Requirements

### Budget
- **Development Tools:** $0 (Astro, React, Tailwind, VS Code, Git - all free)
- **Hosting:** $0 (Vercel/Netlify free tier)
- **Domain:** ~$12/year (if new .com domain needed)
- **Total Monthly:** $0-1 (only domain amortized)

### Timeline
- **Target Launch:** 4 days (accelerated with AI coding assistant)
  - Day 1: Setup + Core Structure + Basic Components
  - Day 2: Main Features (Catalog, Detail Pages, WhatsApp Button)
  - Day 3: Supporting Pages (About, FAQ, Contact) + SEO
  - Day 4: Testing, Polish, Deploy
- **Buffer:** +1-2 days for iteration/fixes if needed

### Technical Constraints
- **Hosting Platform:** Vercel (priority) or Netlify
- **Data Management:** products.json for MVP (migrate to CMS later)
- **No Backend:** Pure static site generation (SSG)
- **Version Control:** Git + GitHub for deployment integration
- **AI Tools:** GitHub Copilot or Cursor for accelerated development

### Future Migration Path
- **CMS Integration:** Ready to migrate to Sanity.io when needed
- **Triggers for CMS Migration:**
  - Product count > 100
  - Update frequency > 3 times/day
  - Non-technical staff need to manage content
- **Scalability:** Architecture supports 10x growth without major refactor

## Risk Mitigation

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Product images tidak ready | High | Prepare placeholder images, prioritize getting real images before launch |
| WhatsApp number tidak di-setting | High | Test WA link thoroughly, ensure number format correct (62xxx) |
| Website tidak mobile-friendly | High | Mobile-first development, test on real devices early |
| Slow loading di mobile network | Medium | Optimize images (WebP format), lazy loading, CDN via Vercel |
| Tidak muncul di Google search | Medium | Submit sitemap, basic SEO checklist, patience (takes 2-4 weeks) |
| products.json susah di-maintain | Low | Document clear format, prepare for CMS migration path |

## MVP Completion Checklist

### Development Complete
- [ ] All core features working (catalog, detail page, WA button)
- [ ] All supporting pages complete (about, FAQ, contact)
- [ ] Basic error handling (404 page, broken links)
- [ ] Mobile responsive tested on real devices
- [ ] Cross-browser tested (Chrome, Safari, Firefox)

### Launch Ready
- [ ] Google Analytics configured
- [ ] Basic SEO setup (meta tags, sitemap)
- [ ] Contact methods verified (WA number tested)
- [ ] Privacy policy & terms (if needed)
- [ ] Domain connected (if custom domain)

### Quality Checks
- [ ] Friends & family testing completed
- [ ] Core user journey works end-to-end (browse → detail → WA)
- [ ] No critical bugs
- [ ] Performance acceptable (Lighthouse score 90+)
- [ ] All links working
- [ ] All images loading properly

### Post-Launch (Week 1)
- [ ] Monitor Google Analytics for traffic
- [ ] Track WhatsApp inquiries manually
- [ ] Collect feedback from first customers
- [ ] Fix any reported bugs immediately
- [ ] Plan v2 features based on feedback

## Next Steps

After this PRD is approved:

1. **Immediate:** Review and approve this PRD
2. **Next (Day 1):** Create Technical Design Document (Part III)
3. **Then:** Set up development environment (Astro + Git + Vercel)
4. **Build (Day 1-3):** Implement with AI coding assistant
5. **Test (Day 4):** Testing + fixes
6. **Launch (Day 4):** Deploy to production
7. **Monitor (Week 1-4):** Track metrics and iterate

---

## Appendix A: Product Data Structure

### products.json Format
```json
[
  {
    "id": "mc-polo-001",
    "name": "Sandal Jepit Mc Polo Classic",
    "brand": "Mc Polo",
    "price": 85000,
    "description": "Sandal jepit klasik Mc Polo dengan bahan berkualitas tinggi, nyaman untuk dipakai sehari-hari.",
    "imageUrls": [
      "/images/mc-polo-001-1.jpg"
    ],
    "colors": ["Hitam", "Coklat", "Abu-abu"]
  }
]
```

### Required Fields
- `id`: Unique identifier (string, kebab-case)
- `name`: Product name (string)
- `brand`: Brand name (string: "Mc Polo" | "New MC" | "Baiyo")
- `price`: Price in IDR (number)
- `description`: Product description (string, 1-2 sentences)
- `imageUrls`: Array of image paths (array of strings)
- `colors`: Available colors (array of strings)

---

## Appendix B: WhatsApp Integration Specs

### WhatsApp Link Format
```
https://wa.me/[PHONE_NUMBER]?text=[ENCODED_MESSAGE]
```

### Message Template
```
Halo, saya tertarik dengan grosir sandal:

Nama Produk: [PRODUCT_NAME]
ID Produk: [PRODUCT_ID]

Mohon info ketersediaan stok dan harga grosirnya. Terima kasih.
```

### Implementation Notes
- Phone number format: `62XXXXXXXXXX` (no spaces, dashes, or leading zero)
- Message must be URL-encoded using `encodeURIComponent()`
- Link opens in new tab: `target="_blank" rel="noopener noreferrer"`
- Button style: Green background (WhatsApp brand color), prominent CTA

---

*Document created: November 5, 2025*  
*Status: Ready for Technical Design*  
*Owner: New MC Development Team*  
*Version: 1.0 - MVP*