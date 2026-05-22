# Dice Pop

A fun and engaging dice game for two players or play against an intelligent bot. Dice Pop brings the classic dice game to life with stunning 3D graphics, smooth animations, and immersive sound effects.

> **⚠️ Disclaimer**: This project was generated with assistance from AI and is an **experimental project**. The code and functionality may contain errors, limitations, or unexpected behavior. Use at your own risk. The developer does not guarantee complete reliability or fitness for any particular purpose.

## Features

- **3D Dice Animation**: Realistic 3D dice with smooth rolling animations
- **Two Game Modes**: Play against a friend or challenge the intelligent bot
- **Immersive Sound Effects**: Background music and dynamic sound effects for rolls, wins, and losses
- **Lottie Animations**: Beautiful confetti and trophy animations for wins, sad animation for losses
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Portrait Mode Support**: Automatic rotation prompt for mobile devices
- **Fullscreen Mode**: Immersive fullscreen gaming experience
- **Theme**: Modern, sleek interface with plastic-style design
- **Real-time Score Updates**: Watch your scores update as you play
- **Bot**: Smart bot that makes strategic decisions based on game state

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AshwetHarde/DicePop.git
cd DicePop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Deployment

The game is deployed at: **[dicepop.vercel.app](https://dicepop.vercel.app)**

## Usage

### Game Rules

- **Objective**: First player to reach 100 points wins
- **Rolling**: Click the dice or press the Roll button to roll
- **Scoring**: Accumulate points by rolling the dice
- **Rolling a 1**: If you roll a 1, you lose all current points and your turn ends
- **Holding**: Click the Hold button to bank your points and end your turn
- **Bot Mode**: The bot plays automatically with strategic decision-making

### Game Modes

#### 2 Players
- Take turns rolling the dice
- Player 1 starts first
- First to reach 100 points wins

#### Bot Mode
- Play against an intelligent AI bot
- Bot makes strategic decisions based on current score and game state
- Bot holds when it has 20+ points or is close to winning
- First to reach 100 points wins

### Controls

- **Roll Dice**: Click the dice or Roll button
- **Hold**: Click the Hold button to bank your points
- **Settings**: Click the settings icon to toggle sound or restart game
- **Back**: Click the back icon to quit the game

### Winning and Losing

- **Win**: Reach 100 points first
- **Loss**: Opponent reaches 100 points first
- **Win Overlay**: Shows confetti and trophy animation with "You Won the Game!" (bot mode) or "Player X Wins the Game!" (2 players)
- **Loss Overlay**: Shows sad animation with "You lost the game!" (bot mode only)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI**: TailwindCSS for styling
- **3D Graphics**: React Three Fiber (Three.js)
- **Animations**: Lottie React for overlay animations
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Geist, Geist Mono, Jua)
- **Audio**: HTML5 Audio API

## Project Structure

```
DicePop/
├── public/
│   ├── background.jpg          # Home page background
│   ├── dice.glb                # 3D dice model
│   ├── lottie/
│   │   ├── Confetti.json       # Confetti animation
│   │   ├── Trophy.json         # Trophy animation
│   │   └── Sad.json            # Sad animation
│   ├── sound-effects/
│   │   ├── play-bgm.mp3        # Background music
│   │   ├── win.mp3             # Win sound effect
│   │   └── loss.mp3            # Loss sound effect
│   └── favicon.png             # App favicon
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── GameWrapper.jsx # Main game component
│   │   │   ├── Home.jsx         # Home page component
│   │   │   ├── WinOverlay.jsx   # Win overlay component
│   │   │   ├── LossOverlay.jsx  # Loss overlay component
│   │   │   ├── Dice3D.jsx       # 3D dice component
│   │   │   ├── Controls.jsx     # Game controls component
│   │   │   ├── Scoreboard.jsx   # Score display component
│   │   │   └── Player.jsx       # Player info component
│   │   ├── hooks/
│   │   │   ├── useGameLogic.js  # Game state management
│   │   │   ├── useSoundEffects.js # Sound effects hook
│   │   │   └── useIconSize.js   # Responsive icon sizing
│   │   ├── globals.css          # Global styles
│   │   ├── layout.js            # Root layout
│   │   └── page.js              # Home page
│   └── ...
├── .gitignore
├── next.config.mjs
├── package.json
├── tailwind.config.js
└── README.md
```

## Browser Support

- Chrome/Edge (Recommended for best 3D graphics and audio support)
- Firefox
- Safari (limited 3D support)

**Note**: 3D graphics and audio work best in Chrome/Edge browsers.

## Performance Notes

- **3D Dice**: Uses React Three Fiber for smooth 3D rendering
- **Animations**: Lottie animations are loaded asynchronously
- **Audio**: Audio files are preloaded for instant playback
- **Fullscreen**: Automatically requests fullscreen for immersive experience
- **Tab Visibility**: Background music pauses when tab is hidden to save resources

## Troubleshooting

### 3D Dice not showing
- Ensure WebGL is enabled in your browser
- Update your browser to the latest version
- Check browser console for WebGL errors

### Sound not playing
- Ensure sound is enabled in settings
- Check browser audio permissions
- Ensure audio files are in the public/sound-effects directory

### Bot not responding
- Check if bot mode is selected
- Ensure game is not in a winning state
- Refresh the page if bot is stuck

### Build issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`
- Clear browser cache

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for 3D graphics
- [Lottie](https://airbnb.io/lottie/) for animations
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [Google Fonts](https://fonts.google.com/) for typography

## Support

For issues and questions, please open an issue on GitHub.

## Live Demo

Play the game at: **[dicepop.vercel.app](https://dicepop.vercel.app)**
