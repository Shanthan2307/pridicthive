# Galaga Visualizer Demo

## Overview
Stage 1 of PredictHive's Galaga-inspired AI debate visualization is now live!

## What's Built

### GalagaVisualizer Component
Location: `components/chat/galaga-visualizer.tsx`

Features:
- **Canvas-based rendering** (800x600px) with HTML5 Canvas
- **Monad color palette**: Purple (#6E54FF), Cyan (#85E6FF), Pink (#FF8EE4)
- **5 Bug/Enemy sprites** representing prediction candidates (e.g., FIFA teams)
- **Player ship** (autopilot) at bottom center with cyan glow
- **HP bars** for each bug (green → yellow → red based on health)
- **Galaga-style entry animations** using Framer Motion
- **Retro aesthetic** with grid background and scanline overlay
- **Query display** in corner showing the prediction question

### Integration
- Integrated into chat interface at `/chat/[id]`
- Activates "debate mode" when user submits first query
- Demo query: "Who will win FIFA 2026?"
- Shows 5 teams: Brazil, Argentina, France, Germany, Spain

## How to Test

1. Navigate to http://localhost:3000/chat
2. Enter any prediction query (e.g., "Who will win FIFA 2026?")
3. Watch the Galaga visualizer appear above the chat
4. See the bugs (teams) animate into formation

## Next Steps (Future Stages)

- Stage 2: Add AI agent integration with ChatGPT API
- Stage 3: Implement "shooting" mechanics (facts attacking bugs)
- Stage 4: Real-time HP updates based on AI debate arguments
- Stage 5: Victory/defeat animations and final predictions

## Technical Details

- Built with Next.js 15 + React 19 + TypeScript
- Uses Framer Motion for smooth animations
- Canvas rendering at 60fps
- Responsive design with Tailwind CSS
- Monad-themed color scheme throughout
