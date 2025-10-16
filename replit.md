# Africa Infotech Innovation - IT Services Website

## Overview

This is a professional IT services marketing website for Africa Infotech Innovation, a company providing comprehensive technology solutions including web development, mobile applications, SEO, hosting, security audits, maintenance, and consulting services. The application features a public-facing marketing site with service showcases, contact forms, and an administrative backend for managing content and inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and data fetching
- Tailwind CSS for utility-first styling with shadcn/ui component library

**Design System:**
- Custom color palette with light/dark mode support using CSS variables
- Typography based on Inter (body) and Space Grotesk (display) fonts
- Responsive design with mobile-first approach
- Component library follows shadcn/ui "new-york" style with customized theming

**Key Components:**
- Modular section-based architecture (Header, Hero, Services, About, Contact, Footer)
- Reusable UI components from shadcn/ui (buttons, cards, forms, dialogs, etc.)
- Theme toggle for dark/light mode switching with localStorage persistence
- WhatsApp integration for direct customer communication

**State Management:**
- React Query for API data fetching and caching
- React Context (AuthContext) for authentication state
- React Hook Form with Zod validation for form handling
- Local state with useState/useEffect for UI interactions

### Backend Architecture

**Server Stack:**
- Express.js server with TypeScript
- Session-based authentication using Passport.js with LocalStrategy
- Express session middleware with configurable session storage
- RESTful API design pattern

**Authentication & Authorization:**
- Passport.js local strategy for username/password authentication
- Session-based authentication with HTTP-only cookies
- `requireAuth` middleware for protecting admin routes
- User serialization/deserialization for session management

**API Routes:**
- `/api/auth/*` - Authentication endpoints (login, logout, register, session check)
- `/api/contact` - Contact message management (create, read, update, delete)
- `/api/features` - Site feature toggles and content management

**Storage Layer:**
- Abstracted storage interface (IStorage) for data operations
- In-memory storage implementation (MemStorage) as default
- Drizzle ORM configuration ready for PostgreSQL migration
- Default admin user created on initialization (username: "admin", password: "admin123")

### Data Storage Solutions

**Current Implementation:**
- In-memory storage using Map data structures
- Default seed data for admin user and site features (announcement banner)
- Storage interface designed for easy database backend swap

**Database Schema (Prepared for PostgreSQL):**
- `users` table: id, username, password
- `contact_messages` table: id, name, email, phone, company, service, message, isRead, createdAt
- `site_features` table: id, name, title, description, content, isEnabled, updatedAt

**ORM Configuration:**
- Drizzle ORM with PostgreSQL dialect configured
- Schema validation using Zod with drizzle-zod integration
- Migration support with drizzle-kit
- Neon serverless driver ready for deployment

### External Dependencies

**Third-Party Services:**
- WhatsApp Business API integration for customer communication (wa.me links)
- Google Fonts CDN for Inter and Space Grotesk typefaces

**UI Libraries:**
- Radix UI primitives for accessible component foundations
- Embla Carousel for image/content carousels
- Lucide React for iconography
- class-variance-authority for component variant styling

**Development Tools:**
- Replit-specific plugins for development environment (vite-plugin-runtime-error-modal, cartographer, dev-banner)
- TypeScript for type safety across client and server
- ESBuild for server-side bundling in production

**Form & Validation:**
- React Hook Form for performant form handling
- Zod for schema validation on both client and server
- @hookform/resolvers for Zod integration

**Date Handling:**
- date-fns library with French locale support for date formatting and manipulation

**Notable Configurations:**
- Environment-based session secret with fallback
- CORS and credential handling configured for API requests
- Path aliases configured for clean imports (@/, @shared/, @assets/)
- Tailwind CSS custom color system with HSL values and CSS variables