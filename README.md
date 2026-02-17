<<<<<<< HEAD
# pridicthive
=======
# 🐝 PredictHive

**AI-powered prediction markets on Monad** - A beautiful, Monad-branded prediction market interface with futuristic design.

![Monad Colors](https://img.shields.io/badge/Monad-6E54FF?style=for-the-badge&logo=ethereum&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🎨 Features

- ✨ **Monad Brand Colors** - Full integration of official Monad palette
  - Main Purple: `#6E54FF`
  - Neon Cyan: `#85E6FF`
  - Dark Background: `#0E091C`
  - Light Purple: `#DDD7FE`
  
- 🤖 **AI Agent System** - Multiple specialized agents with glowing avatars
  - Market Analyst 📊
  - Prediction Expert 🔮
  - Risk Manager 🛡️
  - Portfolio Advisor 💼

- 💬 **Beautiful Chat Interface**
  - User messages: Purple-to-cyan gradient
  - Agent messages: Dark with light purple text
  - Real-time typing indicators
  - Smooth animations with Framer Motion

- 📊 **Portfolio Dashboard**
  - Live portfolio tracking
  - Active predictions display
  - Win rate statistics
  - Quick bet placement

- 💳 **x402 Pay Integration** - Ready for payment integration
- 📱 **Fully Responsive** - Mobile-first design
- 🎭 **Futuristic UI** - Glowing borders, gradient buttons, animated backgrounds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Navigate to project
cd predicthive

# Install dependencies (already done)
npm install

# Run development server (already running!)
npm run dev
```

### Access the App

Open your browser to:
- **Local**: http://localhost:3000
- **Network**: http://100.70.92.226:3000

## 📁 Project Structure

```
predicthive/
├── app/
│   ├── page.tsx                    # Landing page with animated entry
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles with Monad colors
│   └── chat/
│       ├── page.tsx                # Chat redirect
│       ├── layout.tsx              # Chat layout with sidebar
│       └── [id]/
│           └── page.tsx            # Individual chat page
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx      # Main chat component
│   │   ├── chat-messages.tsx       # Message display with animations
│   │   ├── chat-input.tsx          # Message input with auto-resize
│   │   └── portfolio-panel.tsx     # Right sidebar portfolio
│   └── layout/
│       ├── sidebar.tsx             # Left sidebar with AI agents
│       └── top-bar.tsx             # Top navigation bar
├── lib/
│   └── utils.ts                    # Utility functions
├── tailwind.config.ts              # Tailwind with Monad colors
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

## 🎨 Monad Color Palette

All colors are defined in `tailwind.config.ts`:

```typescript
monad: {
  purple: '#6E54FF',        // Main brand color
  'light-purple': '#DDD7FE', // Text and accents
  'dark-bg': '#0E091C',      // Background
  black: '#000000',          // Sidebar
  white: '#FFFFFF',          // Text
  cyan: '#85E6FF',           // Highlights and active states
  'light-cyan': '#B9E3F9',   // Secondary cyan
  pink: '#FF8EE4',           // Accent
  orange: '#FFAE45',         // Accent
}
```

## 🛠️ Key Components

### Landing Page (`app/page.tsx`)
- Animated grid background
- Gradient orbs with pulse animation
- "Enter the Hive" button with shimmer effect
- x402 Pay badge

### Chat Interface (`components/chat/`)
- **Messages**: User messages in purple gradient, agent messages in dark theme
- **Agent Avatars**: Cyan glow border with purple shadow
- **Input**: Auto-resizing textarea with gradient send button
- **Loading**: Animated dots in Monad colors

### Sidebar (`components/layout/sidebar.tsx`)
- AI agent list with hover effects
- "New Prediction" button with gradient
- Connect Wallet integration
- Mobile-responsive with overlay

### Portfolio Panel (`components/chat/portfolio-panel.tsx`)
- Total portfolio value with gradient text
- Active bets tracking
- Win rate display
- Quick stats section

## 🎯 Custom Utilities

### Gradients
```css
.monad-gradient          /* Purple to cyan gradient */
.monad-gradient-text     /* Gradient text effect */
```

### Glows
```css
.monad-agent-glow        /* Cyan glow for agent avatars */
.monad-border-glow       /* Purple glow for borders */
```

### Shadows
```css
shadow-monad-glow        /* Subtle purple glow */
shadow-monad-cyan-glow   /* Cyan glow effect */
shadow-monad-strong      /* Strong purple glow */
```

### Scrollbars
```css
.monad-scrollbar         /* Purple scrollbar with cyan hover */
```

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 🌟 Features to Add

- [ ] Real AI agent integration
- [ ] Wallet connection (Privy/WalletConnect)
- [ ] x402 Pay payment processing
- [ ] Real-time market data
- [ ] Bet placement functionality
- [ ] User authentication
- [ ] Portfolio persistence
- [ ] Market creation
- [ ] Social features

## 📦 Dependencies

### Core
- Next.js 15.1.0
- React 19.0.0
- TypeScript 5

### UI
- Tailwind CSS 3.4.1
- Framer Motion 12.4.3
- Lucide React (icons)
- Radix UI (primitives)

### Utilities
- clsx & tailwind-merge
- react-textarea-autosize

## 🎭 Design Philosophy

PredictHive follows Monad's futuristic, high-performance aesthetic:

1. **Dark Mode First** - Deep blacks (#0E091C) with vibrant accents
2. **Glowing Elements** - Cyan and purple glows for interactive elements
3. **Smooth Animations** - Framer Motion for fluid transitions
4. **Gradient Accents** - Purple-to-cyan gradients for primary actions
5. **Clean Typography** - System fonts for optimal readability
6. **Responsive Design** - Mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow the Monad color palette and design system.

---

**Built with 💜 for Monad** | Powered by x402 Pay
>>>>>>> d6bae42 (Initial commit: PredictHive with Galaga-style AI debate mode)
