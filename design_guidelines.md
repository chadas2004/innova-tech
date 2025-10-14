# Design Guidelines: Real Estate Meeting Management Tool

## Design Approach
**Selected Approach:** Design System (Utility-Focused)
**Justification:** This is a productivity tool where efficiency, clarity, and data organization are paramount. Real estate agents need quick access to information and streamlined workflows.

**Design Inspiration:** Modern SaaS business tools (Linear, Notion, Monday.com) - clean, professional, data-dense interfaces that prioritize function without sacrificing polish.

**Core Principles:**
- Clarity over decoration
- Information hierarchy through typography and spacing
- Efficient workflows with minimal clicks
- Professional trustworthiness

## Color Palette

### Light Mode
- **Primary Brand:** 217 91% 60% (Professional blue - trust and reliability)
- **Background:** 0 0% 100% (Pure white)
- **Surface:** 220 13% 97% (Subtle gray for cards)
- **Border:** 220 13% 91% (Soft dividers)
- **Text Primary:** 222 47% 11% (Near black)
- **Text Secondary:** 215 16% 47% (Muted gray)

### Dark Mode
- **Primary Brand:** 217 91% 65% (Slightly lighter blue)
- **Background:** 222 47% 11% (Deep charcoal)
- **Surface:** 217 19% 18% (Elevated cards)
- **Border:** 217 19% 27% (Subtle dividers)
- **Text Primary:** 0 0% 98% (Near white)
- **Text Secondary:** 215 20% 65% (Muted light gray)

### Status Colors
- **Success (Completed):** 142 71% 45%
- **Warning (Rescheduled):** 38 92% 50%
- **Error (Cancelled):** 0 72% 51%
- **Info (Scheduled):** 217 91% 60%

## Typography
**Font Family:** 'Inter' from Google Fonts (professional, highly legible)

**Scale:**
- Page Titles: text-3xl font-bold (30px)
- Section Headers: text-xl font-semibold (20px)
- Card Titles: text-lg font-semibold (18px)
- Body Text: text-base font-normal (16px)
- Labels/Meta: text-sm font-medium (14px)
- Captions: text-xs font-normal (12px)

## Layout System
**Spacing Primitives:** Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24
- Component padding: p-4 to p-6
- Section spacing: gap-6 to gap-8
- Page margins: px-6 to px-8
- Vertical rhythm: space-y-6 to space-y-8

**Grid System:**
- Dashboard: max-w-7xl mx-auto
- Content cards: grid grid-cols-1 lg:grid-cols-3 gap-6
- Forms: max-w-2xl single column
- Calendar: Full-width responsive grid

## Component Library

### Navigation
- **Top Navigation Bar:** Sticky header with logo, main navigation links, user profile
- **Sidebar (Desktop):** Collapsible left sidebar with primary actions (Dashboard, Calendar, Clients, Meetings, Backups)
- **Mobile Navigation:** Bottom tab bar with 4-5 core functions

### Core Components

**Meeting Cards:**
- Elevated surface with subtle border
- Client name (text-lg font-semibold)
- Meeting time and date with clock icon
- Property address with location icon
- Status badge (rounded-full px-3 py-1)
- Quick actions (Edit, Complete, Cancel)

**Calendar View:**
- Month/Week/Day toggles
- Color-coded meetings by status
- Click to view/edit meeting details
- Today indicator with primary brand color

**Client Management:**
- List view with avatar, name, contact info, property count
- Quick add client form (slide-over panel)
- Search and filter bar

**Data Tables:**
- Striped rows for readability
- Sortable columns with arrow indicators
- Hover state with subtle background change
- Action buttons aligned right

**Forms:**
- Clean input fields with floating labels
- Date/time pickers with calendar icons
- Client dropdown with search
- Primary action buttons (bg-primary)
- Secondary cancel buttons (variant outline)

**Backup Dashboard:**
- Last backup timestamp card
- Manual backup trigger button
- Backup history table
- Restore options with confirmation modal

**Status Indicators:**
- Dot indicators before status text
- Badge components for meeting status
- Progress bars for backup operations

**Modals & Overlays:**
- Centered modal with backdrop blur
- Slide-over panels for quick actions
- Toast notifications for confirmations
- Confirmation dialogs for destructive actions

## Iconography
**Icon Library:** Heroicons (outline for navigation, solid for actions)
- Calendar, Clock, Users, MapPin, Phone, Mail, Download, Upload, Archive, CheckCircle, XCircle

## Images
**Hero Section:** Not applicable - this is a business dashboard tool focused on data and functionality rather than marketing.

**Supporting Visuals:**
- Empty state illustrations for no meetings/clients
- User avatars with fallback initials
- Property thumbnail placeholders in meeting cards

## Interaction Patterns
- **Hover States:** Subtle background color change (opacity 5-10%)
- **Active States:** Slight scale reduction (scale-95)
- **Loading States:** Skeleton screens, not spinners
- **Transitions:** duration-200 ease-in-out for smooth interactions
- **Focus States:** Ring-2 ring-primary for accessibility

## Responsive Behavior
- **Desktop (lg:):** Three-column layouts, expanded sidebar
- **Tablet (md:):** Two-column layouts, collapsible sidebar
- **Mobile (base):** Single column, bottom navigation, full-width cards

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Color contrast ratios meet WCAG AA standards
- Screen reader friendly table structures
- Form validation with clear error messages