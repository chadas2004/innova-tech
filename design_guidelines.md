# Design Guidelines: Africa Infotech Innovation - IT Services Website

## Design Approach
**Selected Approach:** Reference-Based (Marketing Site)
**Primary References:** Vercel, Stripe, GitHub, Microsoft Azure - modern tech marketing sites with clean professionalism and strong visual hierarchy

**Core Principles:**
- Professional authority meets African innovation
- Clear service communication
- Trust through modern design polish
- Strategic color usage for impact without overwhelm

## Color Palette

### Light Mode
- **Primary Brand:** 210 100% 45% (Deep professional blue - technology and trust)
- **Accent:** 160 60% 45% (Teal green - growth and innovation, African earth tones)
- **Background:** 0 0% 100% (Pure white)
- **Surface:** 210 20% 98% (Subtle blue-gray cards)
- **Border:** 210 15% 90% (Soft dividers)
- **Text Primary:** 210 40% 12% (Rich navy)
- **Text Secondary:** 210 15% 45% (Professional gray)

### Dark Mode
- **Primary Brand:** 210 100% 55% (Brighter blue for contrast)
- **Accent:** 160 55% 50% (Lifted teal)
- **Background:** 210 40% 8% (Deep navy-black)
- **Surface:** 210 30% 12% (Elevated cards)
- **Border:** 210 25% 20% (Subtle dividers)
- **Text Primary:** 0 0% 98% (Near white)
- **Text Secondary:** 210 15% 70% (Soft gray)

## Typography
**Font Families:** 
- Primary: 'Inter' (body, UI elements)
- Display: 'Space Grotesk' (headlines, impact text)

**Scale:**
- Hero Headline: text-5xl md:text-6xl font-bold (60px desktop)
- Page Titles: text-4xl font-bold (36px)
- Section Headers: text-3xl font-bold (30px)
- Service Titles: text-xl font-semibold (20px)
- Body Text: text-base md:text-lg (16-18px)
- Labels: text-sm font-medium (14px)

## Layout System
**Spacing Primitives:** Tailwind units: 4, 6, 8, 12, 16, 20, 24, 32
- Section padding: py-16 md:py-24 lg:py-32
- Container padding: px-6 md:px-8
- Component gaps: gap-8 to gap-12
- Card padding: p-6 to p-8

**Container Widths:**
- Full sections: w-full with max-w-7xl mx-auto
- Content areas: max-w-6xl
- Text content: max-w-3xl

## Page Structure & Sections

### Hero Section (100vh)
- **Layout:** Two-column split (40/60) - left content, right large hero image
- **Content:** Headline "Empowering African Businesses Through Technology Innovation", subheadline, dual CTAs (primary + WhatsApp)
- **Image:** Modern African tech professional or abstract tech visualization overlaid with subtle brand gradient
- **Height:** min-h-screen with centered content

### Services Grid (3-column desktop, 1-column mobile)
- Software Development card with code icon
- IT Consulting card with lightbulb icon  
- Network Solutions card with network diagram icon
- Each card: icon (size-12), title, description, "Learn More" link
- Hover effect: subtle lift and border glow

### Why Choose Us Section
- **Layout:** Alternating 2-column rows (image-text, text-image pattern)
- **Content:** 3-4 value propositions with supporting imagery
- Features: African market expertise, 24/7 support, cutting-edge solutions, proven track record
- Images: Team collaboration, technology infrastructure, client success stories

### Technology Stack Showcase
- Horizontal scrolling logo carousel or static grid
- Technologies: Cloud platforms, programming languages, frameworks
- Subtle grayscale logos with color on hover

### Contact Section
- **Layout:** Two-column (60/40) - form left, contact info right
- **Form:** Name, email, phone, service interest dropdown, message textarea
- **Contact Card:** Office address (Johannesburg or Cape Town), phone with click-to-call, email, business hours
- **WhatsApp CTA:** Prominent floating button (fixed bottom-right) + integrated in contact card with green accent
- Background: Subtle gradient or geometric pattern

### Footer
- **Layout:** Four-column grid
- Column 1: Logo, tagline, social media icons
- Column 2: Services links
- Column 3: Company (About, Careers, Blog)
- Column 4: Contact info, newsletter signup
- Bottom bar: Copyright, privacy policy, terms

## Component Library

### Navigation
- Sticky header with logo, center nav links (Services, Solutions, About, Contact), right-aligned WhatsApp button
- Mobile: Hamburger menu with slide-in panel
- Transparent on hero, solid background on scroll

### Buttons
- **Primary:** bg-primary text-white, px-8 py-3, rounded-lg, font-medium
- **WhatsApp:** bg-[#25D366] with WhatsApp icon, same sizing
- **Outline on images:** backdrop-blur-md bg-white/10 border border-white/20 (no custom hover states)
- **Secondary:** border-2 border-primary text-primary

### Cards
- Service cards: p-8, rounded-xl, border, hover:shadow-xl transition
- Info cards: bg-surface, subtle border, organized content hierarchy
- Testimonial cards (if used): quote icon, text, author name/title, company logo

### Icons
**Library:** Heroicons (outline style for consistency)
Core icons: Code, LightBulb, ServerStack, ChatBubble, Phone, Envelope, MapPin, WhatsApp (custom or Font Awesome)

## Images

### Hero Image
- **Type:** Professional African tech environment or abstract digital innovation visualization
- **Placement:** Right side of split hero (60% width), full height
- **Treatment:** Subtle overlay gradient (primary color at 10% opacity) for text legibility
- **Style:** Modern, aspirational, showing technology/people interaction

### Section Supporting Images
- **Why Choose Us:** Real photography - diverse team working, modern office environment, server rooms
- **Technology Stack:** Logo imagery for partner technologies
- **About/Team:** Professional headshots or team collaboration shots
- **Style:** Consistent color grading with slight blue tone to match brand

### Background Elements
- Subtle geometric patterns in hero and footer (SVG patterns at 5% opacity)
- Abstract tech lines/dots connecting services in services section
- No stock photography clichés - authentic African business environment

## Animations
- **Page Load:** Fade-up hero content (duration-700)
- **Scroll Reveals:** Services cards fade-in-up on scroll (stagger effect)
- **Hover:** Cards lift (translate-y-1), buttons scale subtle (scale-105)
- **Transitions:** duration-300 ease-out throughout
- **No:** Parallax, complex scroll animations, distracting motion

## Responsive Behavior
- **Desktop (lg:):** Full multi-column layouts, large hero image, expanded navigation
- **Tablet (md:):** Two-column grids, stacked content sections, condensed navigation
- **Mobile (base):** Single column, stacked hero (content then image), hamburger menu, touch-optimized spacing (min-h-14 for tap targets)

## WhatsApp Integration
- **Floating Button:** Fixed bottom-right (bottom-6 right-6), z-50, bg-[#25D366], size-14, shadow-lg
- **Hero CTA:** Secondary button with WhatsApp icon "Chat on WhatsApp"
- **Contact Section:** Dedicated WhatsApp contact card with QR code option
- **Click Action:** Opens WhatsApp with pre-filled message "Hello, I'm interested in your IT services"

## Accessibility
- Color contrast meets WCAG AA (4.5:1 minimum)
- All interactive elements keyboard accessible
- ARIA labels on icon buttons and navigation
- Form inputs with clear labels and error states
- Focus visible rings (ring-2 ring-primary offset-2)