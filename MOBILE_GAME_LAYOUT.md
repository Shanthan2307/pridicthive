# Mobile Game Layout - Debate Mode

## Overview
Debate mode now displays as a centered mobile game interface, similar to playing a mobile game on a laptop screen.

## Key Features

### 1. Centered Mobile Game Container
- **Max width**: 500px (mobile game size)
- **Centered**: Horizontally centered on screen
- **Proper spacing**: Matches sidebar width for visual balance
- **Full height**: Utilizes entire vertical space

### 2. Layout Structure
```
┌─────────────────────────────────────────────┐
│  [☰]  Query Display (Top)                  │
│                                             │
│  ┌───────────────────────────────────┐     │
│  │                                   │     │
│  │                                   │     │
│  │        Game Canvas Area           │     │
│  │      (Bugs, Ship, Stars)          │     │
│  │                                   │     │
│  │                                   │     │
│  └───────────────────────────────────┘     │
│                                             │
│  Status Bar (Bottom)                        │
│  - Candidate HP bars                        │
│  - Status indicators                        │
└─────────────────────────────────────────────┘
```

### 3. Hamburger Menu
- **Location**: Top-left corner (absolute positioned)
- **Function**: Toggles sidebar visibility
- **Styling**: Purple glass-morphism with cyan icon
- **Hover effect**: Cyan glow on hover

### 4. Sidebar Toggle System
- **Context-based**: Uses React Context for state management
- **Smooth transitions**: 300ms ease-in-out animation
- **Overlay**: Dark overlay when sidebar is open (mobile)
- **Persistent**: Sidebar state maintained across components

## Component Updates

### SidebarContext (`components/layout/sidebar-context.tsx`)
New context provider for managing sidebar state:
- `isOpen`: Boolean state
- `toggleSidebar()`: Toggle function
- `closeSidebar()`: Close function
- `openSidebar()`: Open function

### ChatLayout (`app/chat/layout.tsx`)
- Wrapped with `SidebarProvider`
- Enables sidebar state sharing across components

### Sidebar (`components/layout/sidebar.tsx`)
- Uses `useSidebar()` hook
- Smooth slide-in/out animation
- Overlay for mobile view

### ChatInterface (`components/chat/chat-interface.tsx`)
- Hamburger menu button in debate mode
- Calls `toggleSidebar()` from context
- Positioned absolutely in top-left

### GalagaVisualizer (`components/chat/galaga-visualizer.tsx`)
- **Centered container**: `max-w-[500px]` mobile game width
- **Flex layout**: Vertical flex with proper spacing
- **Query card**: Top section with glass-morphism
- **Game canvas**: Middle section with border and rounded corners
- **Status bar**: Bottom section with candidate HP tracking
- **Responsive**: Adapts to container size

## Visual Design

### Colors (Monad Palette)
- Background: `#0E091C` (dark purple)
- Primary: `#6E54FF` (purple)
- Accent 1: `#85E6FF` (cyan)
- Accent 2: `#FF8EE4` (pink)
- Success: `#00FF88` (green)

### Effects
- Glass-morphism on UI cards
- Glow effects on sprites
- Scanline overlay for retro feel
- Smooth animations with Framer Motion
- Gradient HP bars

## User Experience

1. **Enter chat** → See welcome message
2. **Type prediction** → "Who will win FIFA 2026?"
3. **Debate mode activates** → Full-screen mobile game layout
4. **Centered view** → Game appears in mobile-sized container
5. **Toggle sidebar** → Click hamburger menu (☰) to show/hide sidebar
6. **Watch debate** → Bugs animate, HP bars update

## Technical Details

- **Responsive canvas**: Adapts to container dimensions
- **Image preloading**: Shows loading screen while sprites load
- **60fps rendering**: Smooth animations with requestAnimationFrame
- **Context API**: Clean state management for sidebar
- **Tailwind CSS**: Utility-first styling with custom Monad theme

## Next Steps

Ready for:
- AI agent integration
- Real-time HP updates based on debate
- Shooting mechanics (facts as bullets)
- Victory/defeat animations
- Sound effects and music
