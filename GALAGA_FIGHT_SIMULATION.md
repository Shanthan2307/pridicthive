# Galaga Fight Simulation - AI Debate Mode

## Overview
Implemented authentic Galaga-style combat mechanics based on the original game's logic, where bugs (candidates) fight against the autopilot ship in a visual debate simulation.

## Galaga Logic Analysis

From analyzing the original Galaga Unity project, I extracted these core mechanics:

### Enemy States (from BaseEnemy.cs)
1. **StayOnGrid** - Enemy in formation, waiting
2. **FlyToHero** - Diving attack toward player
3. **FlyToBottom** - Completing dive, flying to bottom
4. **Waiting** - Special state (Green enemies with tractor beam)

### Enemy Types & Behaviors

#### Blue Enemy (BlueEnemy.cs)
- Simple dive attack
- Flies toward hero's last position
- Switches to fly-to-bottom when close
- Respawns at top after reaching bottom

#### Red Enemy (RedEnemy.cs)
- Advanced dive attack with shooting
- Shoots projectiles during dive (0.5s reload time)
- Weapon count determines number of shots
- Flies directly toward hero (not last position)

#### Green Enemy (GreenEnemy.cs)
- Tractor beam attack
- Flies to hero's front line
- Deploys energy beam to freeze player
- Waits until beam expires, then returns

### Movement System (Follower.cs)
- Smooth damping movement (SmoothDamp)
- Configurable smooth time (0.3-3.0s based on speed)
- Tracks distance to target
- Can follow Transform or Vector3 position

### AI System (HiveMind.cs)
- Waits for all enemies to spawn
- Randomly activates enemies to attack
- Configurable timing (MinNextMonster - MaxNextMonster)
- Continues until level is clear

## Implemented Combat Mechanics

### 1. Bug Dive Attacks
Based on Galaga's dive patterns:
- **Formation state**: Bugs stay in grid with slight wave motion
- **Diving state**: Bezier curve path toward ship (mimics Galaga's swooping dives)
- **Returning state**: Smooth return to formation position
- **Random activation**: HiveMind-style random bug selection every 1.5-3.5 seconds

### 2. Bug Shooting (Red Bugs)
Replicates RedEnemy behavior:
- Shoots during dive (between 30%-70% of dive progress)
- 0.5s cooldown between shots
- Projectiles aimed at ship position
- Pink colored bullets for enemy fire

### 3. Ship Auto-Targeting
AI-controlled ship behavior:
- Automatically finds closest bug
- Calculates angle to target
- Shoots cyan bullets every 0.3s
- Bullets travel at 8 units/frame

### 4. Collision Detection
- Ship bullets hit bugs within 30 pixel radius
- Each hit deals 20 damage
- Bugs "die" when HP reaches 0
- Real-time HP bar updates

### 5. Movement Physics
- Bugs use Bezier curves for smooth dive paths
- Ship has subtle hover animation (sine wave)
- Bullets have velocity-based movement
- Formation bugs have wave motion

## Visual Feedback

### HP-Based Effects
- **>60% HP**: Green glow (healthy)
- **30-60% HP**: Cyan glow (damaged)
- **<30% HP**: Pink glow (critical)

### Combat Indicators
- Cyan bullets = Ship fire
- Pink bullets = Bug fire
- Glow effects on all sprites
- HP bars with gradient fills
- Real-time status updates

## Game Flow

1. **Initialization**: 5 bugs spawn in formation (FIFA teams)
2. **Formation Phase**: Bugs wave gently, ship aims
3. **Combat Phase**: 
   - Random bug dives toward ship
   - Ship auto-targets and shoots
   - Red bugs shoot back during dive
   - Bugs return to formation after dive
4. **HP Reduction**: Bugs lose 20 HP per hit
5. **Victory**: When all bugs reach 0 HP

## Technical Implementation

### State Management
```typescript
interface Bug {
  state: "formation" | "diving" | "returning" | "dead";
  diveProgress: number;
  shootCooldown: number;
  hp: number;
}
```

### Game Loop (60 FPS)
- Updates bug AI states
- Processes bullet physics
- Checks collisions
- Renders all entities
- Updates UI status bars

### AI Decision Making
- Ship: Target closest bug
- Bugs: Random dive timing (HiveMind pattern)
- Red Bugs: Shoot during optimal dive window

## Galaga Authenticity

✅ Dive attack patterns (Bezier curves)
✅ Formation grid with wave motion
✅ Enemy shooting during dives
✅ Smooth movement (SmoothDamp equivalent)
✅ Random enemy activation (HiveMind)
✅ Return to formation after attack
✅ Collision detection
✅ HP/damage system

## Future Enhancements

Ready for:
- Multiple dive patterns (loop, spiral)
- Boss bugs with special abilities
- Power-ups and special weapons
- Sound effects (pew pew!)
- Victory/defeat animations
- Combo multipliers
- AI debate integration (HP = argument strength)
