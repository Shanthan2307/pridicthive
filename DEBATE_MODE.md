# Debate Mode - Galaga Visualizer

## Overview
Full-screen Galaga-inspired debate visualization using authentic sprite assets from the original Galaga game.

## What Changed

### Assets Imported
Copied from `Galaga/Galaga/Assets/Sprites/` to `predicthive/public/galaga/`:
- `Blue.png` - Blue bug enemy sprite
- `Green.png` - Green bug enemy sprite  
- `Red.png` - Red bug enemy sprite
- `Ship.png` - Player ship sprite
- `EnergyBeam.png` - Laser/shot sprite (for future use)
- `Explosion.png` - Explosion effect (for future use)
- `RocketBlue.png` & `RocketRed.png` - Rocket sprites (for future use)

### Component Updates

#### GalagaVisualizer (`components/chat/galaga-visualizer.tsx`)
- **Full-screen fixed layout** - Takes over entire viewport
- **Real sprite rendering** - Uses actual Galaga PNG assets instead of canvas drawings
- **Responsive canvas** - Adapts to window size
- **Animated bugs** - Wave motion and smooth formation movement
- **Enhanced visuals**:
  - Starfield background with scrolling stars
  - Gradient backgrounds
  - Glow effects on sprites based on HP
  - Scanline overlay for retro feel
  - HP bars with gradients
- **Status bar** - Bottom panel showing all candidates with HP percentages
- **Query display** - Top-right corner showing the prediction question

#### ChatInterface (`components/chat/chat-interface.tsx`)
- **Immediate mode switch** - Enters debate mode as soon as user submits first query
- **Full replacement** - Galaga visualizer completely replaces chat interface
- **No chat input in debate mode** - Input is hidden once debate starts

## User Flow

1. User lands on `/chat` → redirects to `/chat/[id]`
2. User sees welcome message with chat input
3. User types prediction question (e.g., "Who will win FIFA 2026?")
4. **Debate mode activates immediately**
5. Full-screen Galaga visualizer appears with:
   - 5 bug sprites representing candidates (Brazil, Argentina, France, Germany, Spain)
   - Player ship at bottom (autopilot)
   - Query displayed in top-right corner
   - Status bar at bottom with candidate HP tracking

## Demo Setup

Currently hardcoded for FIFA 2026 demo:
- 5 teams: Brazil, Argentina, France, Germany, Spain
- Each starts at 100% HP
- Bugs animate into formation with wave patterns
- Ship hovers at bottom with subtle animation

## Technical Details

- **Canvas rendering** at 60fps with requestAnimationFrame
- **Image preloading** with loading screen
- **Framer Motion** for UI animations
- **Monad color palette** throughout (purple, cyan, pink, green)
- **Responsive design** adapts to any screen size

## Next Steps

Ready for AI integration:
- Connect to ChatGPT API for debate logic
- Implement HP reduction based on arguments
- Add shooting mechanics (facts as bullets)
- Victory/defeat animations
- Return to chat after debate concludes
