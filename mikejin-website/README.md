# MIKEJIN WEBSITE

## 🎵 Features

- **TV Static Background Effect**: Animated noise pattern with scan lines for authentic retro TV aesthetic
- **Fixed Sidebar Navigation**: Vertical menu with smooth scrolling to sections
- **Music Section**: Links to all major streaming platforms (Spotify, Apple Music, TIDAL, Google Play, iTunes, Amazon)
- **Videos Section**: Embedded YouTube videos with custom overlays
- **Store Section**: Product carousel with sold-out merchandise items
- **Shows Section**: Tour dates and locations display
- **Sign Up Modal**: Newsletter subscription form
- **Legal Pages**: Complete Terms & Conditions and Privacy Policy pages

## 🎨 Design Aesthetic

- **Color Scheme**: Black & white with yellow (#FFD700) accents
- **Typography**: Monospace fonts (Courier New) for body, Permanent Marker for handwritten logo
- **Visual Style**: TV static, scan lines, radiation symbol motif
- **Mood**: Edgy, underground, nostalgic with modern glitch aesthetic

## 📁 File Structure

```
tstng.co/
├── index.html          # Main single-page application
├── styles.css          # Complete styling with animations
├── script.js           # Interactive functionality
├── terms.html          # Terms and Conditions page
├── privacy.html        # Privacy Policy page
└── README.md           # This file
```

## 🚀 How to View

### Option 1: Direct File Opening
1. Navigate to the project folder
2. Double-click `index.html` to open in your default browser

### Option 2: Local Server (Recommended)
Using Python:
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

Using Node.js:
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server

# Then open: http://localhost:8080
```

Using PHP:
```bash
php -S localhost:8000

# Then open: http://localhost:8000
```

## 🎯 Sections Overview

### Footer
- Copyright notice: © 2026 MIKEJIN
- Links to Terms and Privacy Policy

## ⚙️ Interactive Features

1. **Smooth Scrolling**: Click navigation items to smoothly scroll to sections
2. **Modal System**: Sign-up form appears as overlay
3. **Product Carousel**: Auto-advances every 5 seconds, manual controls available
4. **Keyboard Navigation**: Arrow keys control carousel when in view
5. **Video Overlays**: Click to play embedded videos
6. **Size Selection**: Click size buttons to select (visual feedback)
7. **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🎨 CSS Animations

- **TV Static**: Continuous noise animation
- **Scan Lines**: Vertical scrolling effect
- **Radiation Symbol**: Rotating animation
- **Scroll Indicator**: Pulsing and bouncing
- **Arrow Accents**: Pulsing scale effect
- **Hover Effects**: Transform and color transitions on interactive elements

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (full sidebar)
- **Tablet**: 768px - 1024px (narrower sidebar)
- **Mobile**: < 768px (horizontal navigation bar)
- **Small Mobile**: < 480px (optimized spacing)

## 🔧 Technical Details

### HTML5 Features
- Semantic elements (nav, section, footer)
- Proper meta tags for SEO
- Accessible form labels
- Video iframe embeds

### CSS Features
- CSS Grid and Flexbox layouts
- CSS animations and keyframes
- Custom properties for consistency
- Media queries for responsiveness
- Backdrop filters and overlays

### JavaScript Features
- Event delegation
- Intersection Observer API for lazy loading
- Debounce and throttle utilities
- Keyboard event handling
- Form validation and submission
- Carousel state management

## 🎯 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📝 Customization

### Changing Colors
Edit the CSS variables or search/replace:
- Primary Yellow: `#FFD700`
- Background Black: `#000000`
- Text White: `#FFFFFF`

### Adding Products
In `index.html`, duplicate a `.product-card` div and update:
- Product counter
- Product name
- Price
- Image/placeholder

### Adding Videos
In `index.html`, duplicate a `.video-card` div and update:
- Video title
- YouTube embed URL

### Modifying TV Static
In `styles.css`, adjust `.tv-static` properties:
- `opacity`: Control intensity
- `animation` duration: Speed of effect

## 🚀 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push all files
3. Enable GitHub Pages in repository settings
4. Site will be live at: `https://username.github.io/repo-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Site deploys automatically
3. Get custom domain or use Netlify subdomain

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project folder
3. Follow prompts for deployment

## 📄 License

© 2020 AMG. All rights reserved.

## 🎵 Credits

Design inspired by the official MIKEJIN website aesthetic.
Built with HTML, CSS, and vanilla JavaScript.

---

**Enjoy the retro vibes! 📺✨**
