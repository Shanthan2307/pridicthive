<<<<<<< HEAD
<<<<<<< HEAD
=======
# 🐝 PredictHive
=======
# PredictHive 🎮
>>>>>>> 22deb5f (docs: Add comprehensive README)

A Next.js-based prediction market platform with an innovative Galaga-style AI debate visualization. Watch AI agents battle it out in classic arcade game fashion to determine prediction outcomes!

![PredictHive Demo](https://img.shields.io/badge/Status-Demo-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🎯 Features

### Galaga-Style Debate Mode
- **Authentic Galaga Combat**: Based on original game mechanics
- **AI Agent Battles**: Candidates represented as bugs fighting for dominance
- **Real-time HP System**: Visual representation of argument strength
- **Auto-targeting Ship**: AI-controlled defense system
- **Dive Attacks**: Bugs perform swooping attacks with Bezier curve paths
- **Projectile Combat**: Ships and bugs shoot at each other

### Mobile Game Layout
- **Centered Interface**: Mobile game-style layout (500px max width)
- **Responsive Design**: Adapts to any screen size
- **Toggleable Sidebar**: Hamburger menu for clean viewing
- **Glass-morphism UI**: Modern, sleek interface design

### Tech Stack
- **Framework**: Next.js 15.5 with App Router
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom Monad theme
- **Animations**: Framer Motion
- **Canvas**: HTML5 Canvas for game rendering

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/predicthive.git
cd predicthive
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

1. **Navigate to Chat**: Go to `/chat` route
2. **Enter Prediction Query**: Type a prediction question (e.g., "Who will win FIFA 2026?")
3. **Watch the Battle**: Debate mode activates with Galaga-style combat
4. **Toggle Sidebar**: Click the hamburger menu (☰) to show/hide sidebar

## 📁 Project Structure

```
predicthive/
├── app/
│   ├── chat/
│   │   ├── [id]/          # Dynamic chat routes
│   │   ├── layout.tsx     # Chat layout with sidebar
│   │   └── page.tsx       # Chat landing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── chat/
│   │   ├── galaga-visualizer.tsx  # Main game component
│   │   ├── chat-interface.tsx     # Chat UI
│   │   ├── chat-messages.tsx      # Message display
│   │   ├── chat-input.tsx         # Input component
│   │   └── portfolio-panel.tsx    # Side panel
│   └── layout/
│       ├── sidebar.tsx            # Navigation sidebar
│       ├── sidebar-context.tsx    # Sidebar state management
│       └── top-bar.tsx            # Top navigation
├── public/
│   └── galaga/            # Game sprite assets
│       ├── Blue.png       # Blue bug sprite
│       ├── Green.png      # Green bug sprite
│       ├── Red.png        # Red bug sprite
│       ├── Ship.png       # Player ship sprite
│       └── ...            # Other assets
└── lib/
    └── utils.ts           # Utility functions
```

## 🎨 Design System

### Monad Color Palette
- **Background**: `#0E091C` (Dark purple)
- **Primary**: `#6E54FF` (Purple)
- **Cyan**: `#85E6FF` (Accent 1)
- **Pink**: `#FF8EE4` (Accent 2)
- **Green**: `#00FF88` (Success)

### Visual Effects
- Glass-morphism on UI cards
- Glow effects on sprites
- Scanline overlay for retro feel
- Smooth animations with Framer Motion
- Gradient HP bars

## 🎯 Galaga Mechanics

Based on the original Galaga Unity implementation:

### Bug States
- **Formation**: Bugs stay in grid with wave motion
- **Diving**: Bezier curve attack toward ship
- **Returning**: Smooth return to formation
- **Dead**: Eliminated from battle

### Combat System
- **Ship Auto-targeting**: Finds and shoots closest bug
- **Bug Dive Attacks**: Random bugs dive with curved paths
- **Projectile System**: Cyan (ship) and pink (bug) bullets
- **Collision Detection**: 30px radius hit detection
- **Damage System**: 20 HP per hit

### AI Behavior
- **HiveMind Pattern**: Random bug activation every 1.5-3.5s
- **Red Bugs**: Shoot during dive (0.5s cooldown)
- **Movement**: Smooth damping (SmoothDamp equivalent)
- **Formation Grid**: 3-column layout with wave motion

## 📚 Documentation

- [DEBATE_MODE.md](./DEBATE_MODE.md) - Debate mode implementation details
- [GALAGA_FIGHT_SIMULATION.md](./GALAGA_FIGHT_SIMULATION.md) - Combat mechanics
- [MOBILE_GAME_LAYOUT.md](./MOBILE_GAME_LAYOUT.md) - Layout design
- [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) - Visual design guide
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current project status

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

### Tech Details
- **Canvas Rendering**: 60 FPS with requestAnimationFrame
- **State Management**: React hooks + Context API
- **Image Preloading**: Loading screen while sprites load
- **Responsive Canvas**: Adapts to container dimensions

## 🚧 Roadmap

### Phase 1: Core Mechanics ✅
- [x] Galaga-style visualization
- [x] Bug dive attacks
- [x] Ship auto-targeting
- [x] Collision detection
- [x] HP system

### Phase 2: AI Integration (Coming Soon)
- [ ] ChatGPT API integration
- [ ] Real-time debate processing
- [ ] Argument strength → HP mapping
- [ ] Victory/defeat logic

### Phase 3: Enhanced Features
- [ ] Multiple dive patterns (loop, spiral)
- [ ] Boss bugs with special abilities
- [ ] Sound effects and music
- [ ] Power-ups and special weapons
- [ ] Combo multipliers

### Phase 4: Prediction Markets
- [ ] Wallet integration
- [ ] Token staking
- [ ] Market creation
- [ ] Outcome resolution

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Original Galaga game mechanics
- Monad blockchain for design inspiration
- Next.js team for the amazing framework

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

<<<<<<< HEAD
**Built with 💜 for Monad** | Powered by x402 Pay
>>>>>>> d6bae42 (Initial commit: PredictHive with Galaga-style AI debate mode)
=======
Built with ❤️ using Next.js, React, and TypeScript
>>>>>>> 22deb5f (docs: Add comprehensive README)
