# Smart Billing - UI/UX Visual Guide

## 🎨 Design System Overview

This document provides visual descriptions of all UI components and pages.

---

## 🎯 Color Palette

### Primary Colors
```
Sky Blue 500    #0ea5e9    Main action color
Sky Blue 600    #0284c7    Hover state
Sky Blue 700    #0369a1    Pressed state
```

### Neutral Colors
```
Slate 50        #f8fafc    Background
Slate 100       #f1f5f9    Secondary background
Slate 200       #e2e8f0    Borders
Slate 700       #334155    Text
Slate 900       #0f172a    Dark text
```

### Status Colors
```
Red 600         #dc2626    Danger/Delete
Green 600       #16a34a    Success
Yellow 500      #eab308    Warning
Blue 500        #3b82f6    Info
```

---

## 📐 Component Specifications

### Buttons

#### Primary Button
- **Style**: Filled blue background
- **Text**: White, medium weight
- **Padding**: 8px horizontal, 10px vertical
- **Border Radius**: 8px
- **Hover**: Darker blue (#0284c7)
- **Active**: Darkest blue (#0369a1)
- **Shadow**: Soft shadow on hover
- **Transition**: 200ms ease

**Example Usage**: "Create Bill", "Save"

#### Secondary Button
- **Style**: Border only, gray border
- **Text**: Dark gray, medium weight
- **Padding**: 8px horizontal, 10px vertical
- **Border**: 1px solid #cbd5e1
- **Border Radius**: 8px
- **Hover**: Light gray background
- **Transition**: 200ms ease

**Example Usage**: "Cancel", "Close"

#### Danger Button
- **Style**: Filled red background
- **Text**: White, medium weight
- **Padding**: 8px horizontal, 10px vertical
- **Border Radius**: 8px
- **Hover**: Darker red
- **Transition**: 200ms ease

**Example Usage**: "Delete"

### Input Fields

#### Text Input
```
┌─────────────────────────┐
│ Customer name...        │
└─────────────────────────┘
```
- **Background**: White (#ffffff)
- **Border**: 1px solid #e2e8f0
- **Padding**: 8px
- **Border Radius**: 8px
- **Focus**: Blue ring (2px #0ea5e9)
- **Font**: 14px, system font

#### Number Input
- Same as text input
- Right-aligned text
- Step controls visible

### Cards

```
┌──────────────────────────────┐
│                              │
│  Card Content                │
│                              │
└──────────────────────────────┘
```

- **Background**: White (#ffffff)
- **Border Radius**: 12px
- **Padding**: 24px
- **Shadow**: 0 4px 6px rgba(0,0,0,0.1)
- **Hover**: Shadow increases to 0 10px 15px
- **Transition**: 200ms ease

---

## 📱 Page Layouts

### 1. Navbar (Sticky Top)

```
╔════════════════════════════════════════════════════════════════╗
║ 🔵 Smart Billing  │  Dashboard   Bills   New Bill             ║
╚════════════════════════════════════════════════════════════════╝
```

**Structure**:
- **Left**: Logo + Brand name
- **Center**: Navigation links
- **Right**: User menu (future)
- **Height**: 64px (h-16)
- **Background**: White with soft shadow
- **Sticky**: Stays at top while scrolling

**Elements**:
- Logo: 40px × 40px circular blue gradient
- Brand: "Smart Billing" bold text
- Links: 14px with hover underline
- Active: Blue text + bottom border

---

### 2. Dashboard Page

```
┌─ Welcome Section ────────────────────────────────────────────┐
│ Dashboard                                                    │
│ Welcome to Smart Billing System                            │
└────────────────────────────────────────────────────────────┘

┌─ Stats Grid (4 Cards) ───────────────────────────────────────┐
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐
│ │ 📄 Bills     │ │ 💰 Revenue   │ │ 📊 Tax       │ │ 📈 Avg │
│ │ 5 bills      │ │ $5,500       │ │ $500         │ │ $1,100 │
│ └──────────────┘ └──────────────┘ └──────────────┘ └────────┘
└────────────────────────────────────────────────────────────┘

┌─ Recent Bills Card ──────────────────────────────────────────┐
│ Recent Bills                                 View All →      │
│ ┌──────────────┬─────────────┬────────────┬────────────────┐
│ │ Bill #       │ Customer    │ Amount     │ Date           │
│ ├──────────────┼─────────────┼────────────┼────────────────┤
│ │ BILL-001     │ John Doe    │ $550.00    │ Jan 8, 2024   │
│ │ BILL-002     │ ABC Corp    │ $2,100.00  │ Jan 7, 2024   │
│ └──────────────┴─────────────┴────────────┴────────────────┘
└────────────────────────────────────────────────────────────┘

              [🔵 Create New Bill]
```

**Stats Cards (4x grid)**:
- Icon on right (40px, colored)
- Label on left (gray)
- Value large and bold (blue on hover)
- Optional trend text (green)

---

### 3. Create Bill Page

```
┌─────────────────────────────────────────────────────────────┐
│ Create New Bill                                             │
│ Add customer details and items to create an invoice         │
└─────────────────────────────────────────────────────────────┘

┌─ Form Card ──────────────────────────────────────────────────┐
│                                                              │
│ Customer Name *                                             │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ Enter customer name                                     ││
│ └─────────────────────────────────────────────────────────┘│
│                                                              │
│ Items                                              + Add Item│
│ ┌──────────┬─────┬────────┬─────────┬──────────────────┐   │
│ │ Product  │ Qty │ Price  │ Total   │ Action           │   │
│ ├──────────┼─────┼────────┼─────────┼──────────────────┤   │
│ │ ┌──────┐ │ ┌─┐ │ ┌────┐ │ $500.00 │ 🗑️ Delete       │   │
│ └─┴──────┘─┴─┴─┴─┴─┴────┴─┴─────────┴──────────────────┘   │
│                                                              │
│ Tax Percentage          Notes                              │
│ ┌──────────────┐        ┌─────────────────────────────┐   │
│ │ 10           │        │ Thank you...                 │   │
│ └──────────────┘        └─────────────────────────────┘   │
│                                                              │
│ ┌───────────────────────────────────────────────────────┐  │
│ │ Subtotal:           $500.00                           │  │
│ │ Tax (10%):          $50.00                            │  │
│ │ ─────────────────────────────────────                 │  │
│ │ Grand Total:        $550.00                           │  │
│ └───────────────────────────────────────────────────────┘  │
│                                                              │
│           [🔵 Create Bill]                                  │
└─────────────────────────────────────────────────────────────┘
```

**Form Elements**:
- **Labels**: Small gray text above inputs
- **Inputs**: Full width with padding
- **Focus Ring**: Blue 2px ring
- **Items Table**: Scrollable on mobile
- **Totals Box**: Light gray background, highlighted
- **Button**: Full width, blue

---

### 4. Bills List Page

```
┌─ Page Header ────────────────────────────────────────────────┐
│ Bills                        [🔵 + New Bill]                │
│ Manage and view all your invoices                          │
└────────────────────────────────────────────────────────────┘

┌─ Bills Table Card ───────────────────────────────────────────┐
│ ┌────────────┬──────────────┬─────────────┬───────────┬────┐
│ │ Bill #     │ Customer     │ Amount      │ Date      │ Act│
│ ├────────────┼──────────────┼─────────────┼───────────┼────┤
│ │ BILL-001   │ John Doe     │ $550.00     │ Jan 8     │ 👁️🖨️🗑️│
│ ├────────────┼──────────────┼─────────────┼───────────┼────┤
│ │ BILL-002   │ ABC Corp     │ $2,100.00   │ Jan 7     │ 👁️🖨️🗑️│
│ ├────────────┼──────────────┼─────────────┼───────────┼────┤
│ │ BILL-003   │ Jane Smith   │ $1,200.00   │ Jan 6     │ 👁️🖨️🗑️│
│ └────────────┴──────────────┴─────────────┴───────────┴────┘
└────────────────────────────────────────────────────────────┘
```

**Table Features**:
- **Header**: Bold, dark text on light background
- **Rows**: Hover effect (light gray background)
- **Actions**: Icons (view, print, delete)
- **Responsive**: Horizontal scroll on mobile
- **Borders**: Soft bottom border between rows

---

### 5. Bill Details Page

```
[← Go Back]

┌─ Bill Header ────────────────────────────────────────────────┐
│ BILL-001                                  [Print] [Delete]   │
│ John Doe                                                    │
│ Created: Jan 8, 2024                                        │
└────────────────────────────────────────────────────────────┘

┌─ Bill Details Card ──────────────────────────────────────────┐
│                                                              │
│ Items                                                        │
│ ┌────────────────────┬──────┬────────┬────────────────────┐│
│ │ Product            │ Qty  │ Price  │ Total              ││
│ ├────────────────────┼──────┼────────┼────────────────────┤│
│ │ Web Design         │ 1    │ $500   │ $500.00            ││
│ └────────────────────┴──────┴────────┴────────────────────┘│
│                                                              │
│                                                    ┌──────────┐│
│                                                    │Subtotal  ││
│                                                    │$500.00   ││
│                                                    │Tax (10%) ││
│                                                    │$50.00    ││
│                                                    ├──────────┤│
│                                                    │Grand Total││
│                                                    │$550.00   ││
│                                                    └──────────┘│
│                                                              │
│ Notes                                                        │
│ Thank you for your business!                                │
│                                                              │
└────────────────────────────────────────────────────────────┘
```

**Layout**:
- **Back Button**: Top left with arrow icon
- **Header Card**: Bill number, customer, date
- **Details Card**: Items table, totals section
- **Action Buttons**: Print, Delete
- **Notes**: Bottom section with border

---

### 6. Print Invoice Page

```
╔════════════════════════════════════════════════════════════╗
║                       INVOICE                              ║
║                    BILL-001                                ║
║                                                            ║
║              Smart Billing System                          ║
║         Professional Invoice Management                   ║
║                                                            ║
║ BILL TO:                                  DATE:            ║
║ John Doe                                  Jan 8, 2024      ║
║                                                            ║
╠═══════════════════════════════════════════════════════════╣
║ Description        │ Qty │ Unit Price │ Amount             ║
╠═══════════════════════════════════════════════════════════╣
║ Web Design         │ 1   │ $500.00    │ $500.00            ║
╠═══════════════════════════════════════════════════════════╣
║                                       Subtotal  $500.00   ║
║                                       Tax (10%) $50.00    ║
║                                       ─────────────────── ║
║                                  TOTAL DUE     $550.00    ║
║                                                            ║
║ NOTES:                                                     ║
║ Thank you for your business!                              ║
║                                                            ║
║ Generated on Jan 8, 2024 - Smart Billing System           ║
╚════════════════════════════════════════════════════════════╝
```

**Print Features**:
- **Professional Layout**: Clean, centered
- **Company Branding**: Top section
- **Customer Info**: Left side
- **Date**: Right side
- **Items Table**: Clear borders
- **Totals**: Right-aligned, boxed
- **Print Optimized**: B&W friendly
- **Footer**: Company info and timestamp

---

## 🎯 Typography

### Headings
```
H1: 36px bold   - Page titles
H2: 28px bold   - Section titles  
H3: 24px bold   - Subsection titles
H4: 20px semibold - Card titles
```

### Body Text
```
Base: 16px      - Regular text
Small: 14px     - Labels, helper text
Smaller: 12px   - Captions
```

### Font Family
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
```

---

## 🔄 Interactions

### Hover States
- **Buttons**: Background darkens, shadow increases
- **Links**: Text color changes to blue
- **Cards**: Shadow increases, slight scale
- **Table Rows**: Background lightens

### Focus States
- **Inputs**: Blue border ring (2px)
- **Buttons**: Outline visible
- **Links**: Underline appears

### Active States
- **Buttons**: Darker color, pressed appearance
- **Nav Links**: Blue color with underline
- **Tabs**: Underline appears

---

## 📊 Spacing System

```
4px   - xs (small gaps)
8px   - sm (small padding)
12px  - base (standard gap)
16px  - md (padding)
24px  - lg (large padding)
32px  - xl (section gap)
48px  - 2xl (major gap)
```

---

## 🎨 Shadow Elevation

### Level 1 (Soft)
```css
0 1px 3px rgba(0,0,0,0.1)
```
Used for: Inputs, small elements

### Level 2 (Card)
```css
0 4px 6px rgba(0,0,0,0.1)
```
Used for: Cards, containers

### Level 3 (Hover)
```css
0 10px 15px rgba(0,0,0,0.1)
```
Used for: Hover states, dropdowns

---

## 📐 Responsive Breakpoints

### Mobile (< 640px)
- Single column layout
- Full-width components
- Stacked cards
- Hamburger menu (future)

### Tablet (640px - 1024px)
- 2-column grid
- Side-by-side cards
- Readable tables

### Desktop (> 1024px)
- 4-column grid
- Full layouts
- Optimal spacing

---

## ✅ Accessibility

- High contrast colors (WCAG AA)
- Focus visible on all interactive elements
- Semantic HTML structure
- ARIA labels ready
- Touch-friendly sizes (48px minimum)

---

## 🎬 Animations

### Transitions
- **Duration**: 200ms standard
- **Easing**: ease (default)
- **Properties**: color, background, shadow, transform

### Loading
```
Rotating spinner:
- Diameter: 48px
- Color: Blue (#0ea5e9)
- Duration: 1s continuous rotation
```

---

## 📱 Mobile Optimizations

- **Safe Area**: Respects notches/safe areas
- **Touch Targets**: 44px minimum (48px recommended)
- **Tap Feedback**: Visual feedback on touch
- **Scrolling**: Smooth, momentum-based
- **Forms**: Large inputs, easy to tap
- **Typography**: Readable at 1x zoom

---

## 🔐 User Feedback

### Success Message
```
✓ Bill created successfully
```
- Green text
- White background
- Blue border left
- Auto-dismiss: 3 seconds

### Error Message
```
✗ Failed to create bill
```
- Red text
- Light red background
- Red border left
- Auto-dismiss: 4 seconds

### Loading
```
[Spinning circle]
```
- Center screen
- Blue spinner
- No auto-dismiss

---

This visual guide ensures consistent, professional UI across the application. All components follow this specification.
