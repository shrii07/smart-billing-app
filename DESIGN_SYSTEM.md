# 🎨 Visual Design Reference Guide

## Smart Billing App - Complete Design System

---

## 🎯 Color Palette

### Primary Colors
```
Blue-50:   #eff6ff
Blue-100:  #dbeafe
Blue-200:  #bfdbfe
Blue-300:  #93c5fd
Blue-400:  #60a5fa
Blue-500:  #3b82f6
Blue-600:  #2563eb  ← Primary Action
Blue-700:  #1d4ed8  ← Primary Hover
```

### Secondary Colors
```
Purple-600: #9333ea  ← Secondary Action
Purple-700: #7e22ce  ← Secondary Hover
Indigo-600: #4f46e5  ← Accent
```

### Status Colors
```
Green-50:  #f0fdf4
Green-100: #dcfce7
Green-600: #16a34a  ← Success, Growth

Orange-50:  #fef3c7
Orange-100: #fde68a
Orange-600: #ea580c  ← Warning, Tax

Red-50:   #fef2f2
Red-100:  #fee2e2
Red-600:  #dc2626  ← Destructive, Delete

Gray-50:  #f9fafb
Gray-100: #f3f4f6
Gray-200: #e5e7eb
Gray-600: #4b5563  ← Text
Gray-900: #111827  ← Headings
```

---

## 🔤 Typography

### Font Family
- All text: Inter, system-ui, -apple-system

### Font Weights
```
Regular:   400
Semibold:  600
Bold:      700
Black:     900
```

### Font Sizes & Usage
```
H1 (3xl):      text-3xl  → Page headers
H2 (2xl):      text-2xl  → Section headers
H3 (lg):       text-lg   → Subsection headers
Body:          text-base → Regular content
Small:         text-sm   → Labels, hints
Extra Small:   text-xs   → Badges, tags
```

### Text Colors
```
Headings:     text-gray-900 (900)
Body:         text-gray-600 (600)
Muted:        text-gray-500 (500)
Subtle:       text-gray-400 (400)
Links:        text-blue-600
Success:      text-green-600
Warning:      text-orange-600
Error:        text-red-600
```

---

## 📦 Component Styles

### Buttons

#### Primary Button (Create, Submit)
```css
bg-gradient-to-r from-blue-600 to-blue-700
text-white font-bold
px-6 py-3 rounded-lg
hover:shadow-lg transform hover:scale-105
transition-all duration-300
```

#### Secondary Button (View, View All)
```css
bg-gradient-to-r from-purple-600 to-purple-700
text-white font-bold
px-6 py-3 rounded-2xl
hover:shadow-lg transform hover:scale-105
transition-all duration-300
```

#### Ghost Button (Cancel, Skip)
```css
bg-gray-100
text-gray-700 font-semibold
px-4 py-2 rounded-lg
hover:bg-gray-200
transition-colors
```

#### Icon Button
```css
p-2 rounded-lg
hover:bg-gray-100
text-gray-600 hover:text-gray-900
transition-all
```

### Cards

#### Standard Card
```css
bg-white
rounded-2xl
border border-gray-100
shadow-sm
hover:shadow-lg transition-shadow
```

#### Stat Card
```css
bg-white
rounded-2xl
p-6
border border-gray-100 hover:border-blue-200
shadow-sm hover:shadow-xl
transform hover:scale-105
transition-all duration-300
```

### Form Inputs

#### Text Input
```css
px-4 py-3
rounded-lg
border-2 border-gray-200
focus:border-blue-500
focus:ring-2 focus:ring-blue-200
outline-none
transition-all
bg-white text-gray-900
placeholder-gray-500
```

#### Focus State
```css
border-blue-500
ring-2 ring-blue-200
shadow-md
```

### Badges & Tags

#### Growth Badge
```css
flex items-center gap-1
text-green-600 font-semibold text-sm
bg-green-50 px-3 py-1
rounded-full
```

#### Status Badge
```css
text-blue-600 font-mono
bg-blue-50 px-3 py-1
rounded-lg text-sm
```

---

## 🎨 Gradient Combinations

### Page Backgrounds
```
from-slate-50 via-blue-50 to-slate-50
→ Subtle blue-tinted white background
```

### Section Headers
```
from-blue-50 to-indigo-50
→ Soft blue gradient header
```

### Action Buttons
```
from-blue-600 to-blue-700
from-purple-600 to-purple-700
→ Vibrant, professional gradients
```

### Icon Backgrounds
```
from-blue-100 to-blue-50      (Primary)
from-green-100 to-green-50    (Success)
from-purple-100 to-purple-50  (Secondary)
from-orange-100 to-orange-50  (Warning)
```

### Totals Card
```
from-gray-50 to-blue-50
→ Subtle background for important information
```

---

## 🔄 Spacing System (8px Grid)

```
1:   0.25rem (4px)   → Not used
2:   0.5rem  (8px)   → Tight spacing
3:   0.75rem (12px)  → Small gaps
4:   1rem    (16px)  → Default padding
6:   1.5rem  (24px)  → Medium spacing
8:   2rem    (32px)  → Large spacing
```

### Padding
```
p-2   → 8px (buttons)
p-3   → 12px (form inputs)
p-4   → 16px (card content)
p-6   → 24px (section padding)
p-8   → 32px (large sections)
```

### Margin
```
mb-4  → 16px (between sections)
mb-6  → 24px (larger spacing)
mb-8  → 32px (section breaks)
mt-2  → 8px (small spacing)
```

---

## 🎭 Border Radius

```
rounded-lg    → 8px      (buttons, small inputs)
rounded-xl    → 12px     (medium components)
rounded-2xl   → 16px     (cards, large elements)
rounded-full  → 9999px   (circles, pills)
```

### By Component
- **Buttons**: rounded-lg, rounded-xl, rounded-2xl
- **Cards**: rounded-2xl
- **Inputs**: rounded-lg
- **Badges**: rounded-full (pill shape)
- **Icons**: rounded-xl

---

## 🌟 Shadows & Elevation

### Shadow Levels
```
shadow-sm     → Light shadow (cards at rest)
shadow       → Medium shadow (default)
shadow-lg    → Large shadow (hover state)
shadow-xl    → Extra large shadow (modals)
```

### Implementation
```css
/* Card */
shadow-sm hover:shadow-xl transition-shadow

/* Button Hover */
hover:shadow-lg

/* Input Focus */
focus:shadow-md
```

---

## ⚡ Animations & Transitions

### Transition Durations
```
transition-all       → All properties
duration-200         → 200ms (fast)
duration-300         → 300ms (standard)
duration-500         → 500ms (slow)
```

### Common Animations
```css
/* Hover Scale */
transform hover:scale-105

/* Shadow Elevation */
hover:shadow-xl transition-shadow

/* Color Change */
hover:bg-blue-700 transition-colors

/* Smooth Color */
hover:text-blue-600 transition-colors

/* Full Smooth */
hover:shadow-lg transform hover:scale-105 transition-all duration-300
```

### Pulse Animation (Background Elements)
```css
animate-pulse → Used on decorative blur elements
```

---

## 📱 Responsive Breakpoints

```
Mobile First    → Default (< 768px)
sm: 640px      → (< 1024px)
md: 768px      → Tablet
lg: 1024px     → Desktop
xl: 1280px     → Large desktop
2xl: 1536px    → Extra large
```

### Common Responsive Patterns

#### Grid Columns
```
grid-cols-1      → Mobile (1 column)
md:grid-cols-2   → Tablet (2 columns)
lg:grid-cols-4   → Desktop (4 columns)
```

#### Display Hiding
```
hidden md:block   → Hidden mobile, visible tablet+
md:hidden         → Visible mobile, hidden tablet+
```

#### Padding/Spacing
```
px-4 md:px-6 lg:px-8   → Increasing padding
py-4 md:py-8           → Increasing vertical spacing
```

---

## 🎯 Component Specifications

### Dashboard Stat Card
```
Width:        Full responsive (1 → 2 → 4 columns)
Height:       Auto/min-height
Padding:      p-6
Background:   white
Border:       2px gray-100, hover blue-200
Shadow:       shadow-sm, hover:shadow-xl
Hover:        scale-105, color change
Border Radius: rounded-2xl
```

### Form Input
```
Width:        Full width in container
Height:       h-auto (py-3)
Padding:      px-4 py-3
Border:       2px gray-200, focus blue-500
Ring:         focus:ring-2 blue-200
Radius:       rounded-lg
Transition:   all 200-300ms
```

### Table Header
```
Background:   gray-50 gradient to gray-100
Border:       border-b-2 gray-200
Padding:      px-6 py-4
Typography:   text-xs font-bold uppercase
Color:        text-gray-700
```

### Table Row
```
Border:       border-b gray-100
Hover:        bg-blue-50
Transition:   transition-colors
Padding:      px-6 py-4
```

---

## 🎨 Icon Usage

### Icon Sizes
```
text-lg     → Regular UI (18px)
text-2xl    → Large UI (24px)
text-3xl    → Extra large (30px)
text-4xl    → Huge (36px)
```

### Icon Colors
```
text-blue-600      → Primary actions
text-gray-400      → Muted/disabled
text-white         → On colored backgrounds
text-green-600     → Success/positive
text-red-600       → Destructive
text-orange-600    → Warnings
```

### Icon Integration
- **Navigation**: text-lg text-gray-600 hover:text-gray-900
- **Buttons**: Inline with text, gap-2 spacing
- **Headers**: Wrapped in gradient background px-3 py-3 rounded-xl
- **Tables**: text-lg for action buttons

---

## 🔐 Accessibility

### Color Contrast
```
Black on White:   AAA (7:1)
White on Blue:    AAA (6:1)
Gray-600 on White: AA (4.5:1)
```

### Focus States
```
All interactive elements:
focus:outline-none
focus:ring-2 focus:ring-blue-500
focus:ring-offset-2
```

### Keyboard Navigation
```
Tab order:    Natural DOM flow
Skip link:    First element (if needed)
Focus visible: Blue ring + 2px offset
```

---

## 🎓 Design Do's & Don'ts

### ✅ DO
- Use consistent spacing
- Apply hover states consistently
- Use semantic colors (green=success, red=error)
- Maintain contrast ratios
- Test on mobile devices
- Keep animations under 300ms
- Use proper heading hierarchy

### ❌ DON'T
- Mix inconsistent border radius
- Use multiple shadow levels on same component
- Ignore focus states
- Create animations over 1 second
- Use colors outside the palette
- Mix too many different font sizes
- Ignore responsive design

---

## 📐 Grid System

### Container Max Width
```
max-w-7xl    → 80rem (1280px) - Standard page width
max-w-5xl    → 64rem (1024px) - Form width
max-w-4xl    → 56rem (896px)  - Narrow content
```

### Column Gaps
```
gap-4        → 16px (default)
gap-6        → 24px (spacious)
gap-8        → 32px (very spacious)
```

---

## 🖼️ Visual Examples

### Stat Card Layout
```
┌────────────────────────────┐
│ 📊(gradient bg)    ↑ 12.5% │
│                             │
│ Total Bills                │
│ 24                          │
│ Bills created this month   │
└────────────────────────────┘
```

### Form Input Layout
```
┌─────────────────────────────┐
│ Customer Name *             │
│ ┌───────────────────────────┐│
│ │ John Doe              ✏️   ││  ← Input with icon
│ └───────────────────────────┘│
└─────────────────────────────┘
```

### Action Button
```
┌───────────────────────────┐
│  🚀  Create New Invoice  │  ← Icon + Text
└───────────────────────────┘
  Gradient: blue-600→blue-700
  On hover: scale 105%, shadow-lg
```

---

## 📊 Color Usage by Page

### Login Page
- Background: Gradient blue→purple→pink
- Buttons: Blue & Green
- Text: White on gradients, gray on light backgrounds

### Dashboard
- Icons: Blue, Green, Purple, Orange
- Badges: Green (growth), Gray (info)
- Buttons: Blue (create), Purple (view all)

### Bills List
- Headers: Gradient gray-50→gray-100
- Links: Blue
- Search icon: Gray-400
- Hover rows: Blue-50

### Create Invoice
- Headers: Gradient blue-50→indigo-50
- Inputs: Blue focus borders
- Totals: Large blue gradient text
- Submit: Blue→indigo gradient

---

## 🎁 Complete Export

All colors, fonts, sizes, and styles are:
- ✅ Consistent across the application
- ✅ Documented in this guide
- ✅ Implemented in Tailwind CSS
- ✅ Responsive and accessible
- ✅ Professional and modern

---

**Last Updated**: December 2024
**Design System Version**: 1.0
**Created For**: Smart Billing Application v1.1.0
