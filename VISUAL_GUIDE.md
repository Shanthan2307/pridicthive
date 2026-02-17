# 🎨 PredictHive Visual Guide

## Color Palette Reference

### Primary Colors
```
Main Purple:     #6E54FF  ████████  (Buttons, borders, primary actions)
Light Purple:    #DDD7FE  ████████  (Text, labels, secondary elements)
Dark Background: #0E091C  ████████  (Main background)
Pure Black:      #000000  ████████  (Sidebar background)
White:           #FFFFFF  ████████  (Primary text)
```

### Accent Colors
```
Neon Cyan:       #85E6FF  ████████  (Active states, highlights)
Light Cyan:      #B9E3F9  ████████  (Secondary cyan)
Pink Accent:     #FF8EE4  ████████  (Accent elements)
Orange Accent:   #FFAE45  ████████  (Accent elements)
```

---

## Page Layouts

### 1. Landing Page (`/`)
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              [Animated Grid Background]            │
│                                                     │
│                  [Gradient Orbs]                   │
│                                                     │
│                   PredictHive                      │
│          AI-Powered Prediction Markets             │
│                                                     │
│              [Enter the Hive Button]               │
│                                                     │
│                                    [x402 Pay Badge]│
└─────────────────────────────────────────────────────┘
```

### 2. Chat Interface (`/chat/[id]`)
```
┌──────────┬────────────────────────────────┬──────────┐
│          │  [Search Bar]  [x402] [🔔] [U] │          │
│          ├────────────────────────────────┤          │
│          │                                │          │
│  [Logo]  │     Chat Messages Area         │ Portfolio│
│          │                                │          │
│  [New]   │  ┌──────────────────────┐     │ $1,247   │
│          │  │ AI: Welcome!         │     │ +15.3%   │
│  Agents: │  └──────────────────────┘     │          │
│  📊 MA   │                                │ Active:  │
│  🔮 PE   │  ┌──────────────────────┐     │ • ETH    │
│  🛡️ RM   │  │ User: Hello          │     │ • BTC    │
│  💼 PA   │  └──────────────────────┘     │ • Monad  │
│          │                                │          │
│          │  ┌──────────────────────┐     │ [Place]  │
│  [Wallet]│  │ [Type message...] [→]│     │ [Bet]    │
│  [Settings]│ └──────────────────────┘     │          │
└──────────┴────────────────────────────────┴──────────┘
```

---

## Component Styles

### Buttons

#### Primary Button (Gradient)
```css
Background: linear-gradient(135deg, #6E54FF 0%, #85E6FF 100%)
Text: White
Hover: Shadow glow (purple)
Border-radius: 0.5rem
```

#### Secondary Button (Outline)
```css
Background: Transparent
Border: 1px solid #6E54FF (30% opacity)
Text: #DDD7FE
Hover: Background #6E54FF (10% opacity)
```

### Message Bubbles

#### User Message
```css
Background: linear-gradient(135deg, #6E54FF 0%, #85E6FF 100%)
Text: White
Border-radius: 1rem
Padding: 1rem 1.5rem
Max-width: 32rem
Align: Right
```

#### Agent Message
```css
Background: #000000 (50% opacity)
Border: 1px solid #6E54FF (20% opacity)
Text: #DDD7FE
Border-radius: 1rem
Padding: 1rem 1.5rem
Max-width: 32rem
Align: Left
```

### Agent Avatars
```css
Size: 2.5rem × 2.5rem
Border: 2px solid #85E6FF
Box-shadow: 
  0 0 15px rgba(133, 230, 255, 0.4),
  0 0 30px rgba(110, 84, 255, 0.2)
Border-radius: 50%
Hover: Scale 1.1
```

### Input Fields
```css
Background: #000000 (50% opacity)
Border: 1px solid #6E54FF (20% opacity)
Text: White
Placeholder: #DDD7FE (50% opacity)
Focus Border: #85E6FF
Focus Shadow: Cyan glow
Border-radius: 0.75rem
```

---

## Animations

### Page Transitions
```javascript
Initial: { opacity: 0, y: 20 }
Animate: { opacity: 1, y: 0 }
Duration: 0.3s
Easing: ease-out
```

### Hover Effects
```css
Transition: all 300ms ease-out
Transform: translateY(-2px)
Box-shadow: Enhanced glow
```

### Loading Indicator
```
[●] [●] [●]  (Animated dots)
Colors: Cyan → Purple → Pink
Animation: Pulse with stagger
Delay: 0.2s between dots
```

### Gradient Orbs (Landing)
```css
Size: 24rem × 24rem
Blur: 3rem
Animation: Pulse 2s infinite
Colors: Purple (20%), Cyan (20%)
Position: Absolute, scattered
```

---

## Typography

### Headings
```css
Font: System UI, -apple-system, sans-serif
Weight: Bold (700)
Color: White or Gradient
```

### Body Text
```css
Font: System UI, -apple-system, sans-serif
Weight: Regular (400)
Color: #DDD7FE
Line-height: 1.5
```

### Labels
```css
Font-size: 0.75rem (12px)
Weight: Semibold (600)
Color: #DDD7FE
Text-transform: Uppercase
Letter-spacing: 0.05em
```

---

## Spacing System

```
xs:  0.25rem (4px)
sm:  0.5rem  (8px)
md:  1rem    (16px)
lg:  1.5rem  (24px)
xl:  2rem    (32px)
2xl: 3rem    (48px)
```

---

## Responsive Breakpoints

```css
sm:  640px   /* Mobile landscape */
md:  768px   /* Tablet */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large */
```

### Mobile Behavior
- Sidebar: Hidden by default, hamburger menu
- Portfolio: Hidden on mobile, accessible via tab
- Top bar: Compact with essential items only
- Chat: Full width with bottom input

---

## Shadow System

### Subtle Glow
```css
box-shadow: 
  0 0 20px rgba(110, 84, 255, 0.3),
  0 0 40px rgba(110, 84, 255, 0.15);
```

### Cyan Glow
```css
box-shadow: 
  0 0 20px rgba(133, 230, 255, 0.4),
  0 0 40px rgba(133, 230, 255, 0.2);
```

### Strong Glow
```css
box-shadow: 
  0 0 30px rgba(110, 84, 255, 0.5),
  0 0 60px rgba(110, 84, 255, 0.3);
```

---

## Icon Usage

### Lucide React Icons
```
Plus          → New chat/prediction
Send          → Send message
Search        → Search bar
Bell          → Notifications
Wallet        → Connect wallet
Settings      → Settings menu
Menu/X        → Mobile menu toggle
TrendingUp    → Positive change
TrendingDown  → Negative change
DollarSign    → Place bet
```

### Emoji Icons (Agents)
```
📊 → Market Analyst
🔮 → Prediction Expert
🛡️ → Risk Manager
💼 → Portfolio Advisor
🤖 → AI Agent indicator
```

---

## State Indicators

### Active State
```css
Border: #85E6FF
Background: #85E6FF (10% opacity)
Text: #85E6FF
```

### Hover State
```css
Border: Brighter
Shadow: Enhanced glow
Transform: Slight lift or scale
```

### Disabled State
```css
Opacity: 0.5
Cursor: not-allowed
Pointer-events: none
```

### Loading State
```css
Animated dots or spinner
Colors: Monad palette
Smooth transitions
```

---

## Best Practices

### Do's ✅
- Use gradient for primary actions
- Add glow effects on interactive elements
- Maintain consistent spacing
- Use smooth transitions (300ms)
- Keep text readable (#DDD7FE on dark)
- Add hover states to all clickable items

### Don'ts ❌
- Don't use colors outside Monad palette
- Don't make text too small (<12px)
- Don't overuse animations
- Don't forget mobile responsiveness
- Don't use harsh transitions
- Don't mix different purple shades

---

## Accessibility

### Contrast Ratios
- White on Dark BG: 21:1 ✅
- Light Purple on Dark: 12:1 ✅
- Cyan on Dark: 10:1 ✅

### Focus States
- Visible outline on keyboard navigation
- Cyan ring around focused elements
- Skip to main content link

### Screen Readers
- Semantic HTML elements
- ARIA labels where needed
- Alt text for images

---

**This visual guide ensures consistent Monad branding throughout PredictHive!** 🎨
