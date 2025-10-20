# Dad Jokes App

A modern, TypeScript-based React application that fetches and displays dad jokes from the [icanhazdadjoke.com](https://icanhazdadjoke.com/) API. Vote on jokes and watch them change appearance based on popularity!

## What's New in v2.0

This project has been completely revamped with modern technologies and best practices:

### Major Updates

- **TypeScript**: Full TypeScript migration for type safety and better developer experience
- **React 18**: Updated to the latest React with functional components and hooks
- **Modern Hooks**: Migrated from class components to functional components using:
  - `useState` for state management
  - `useEffect` for side effects
  - `useCallback` for memoized callbacks
  - `useMemo` for performance optimization
  - `useRef` for persistent references

### Improvements

- **Better Error Handling**: Proper error states and user-friendly error messages
- **Accessibility**: Added ARIA labels, alt text, and semantic HTML
- **Performance**: Memoized expensive operations to prevent unnecessary re-renders
- **Code Quality**: Removed console.logs, fixed duplicate detection bug
- **Modern Styling**: Updated gradients, shadows, and animations
- **Bug Fixes**: Fixed the duplicate joke detection issue

### Dependencies

All dependencies have been updated to their latest stable versions:
- React 18.2.0
- TypeScript 4.9.5
- Axios 1.6.5
- UUID 9.0.1
- Testing Library (latest)

## Features

- 🎭 Fetches random dad jokes from icanhazdadjoke.com API
- 👍👎 Vote on jokes (upvote/downvote)
- 🎨 Dynamic emoji reactions based on vote count (8 different levels)
- 🎨 Color-coded joke cards reflecting popularity
- 💾 Persistent storage using localStorage
- ♿ Accessible interface with ARIA labels and semantic HTML
- 🔄 Smooth animations and transitions
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Available Scripts

- `npm start` - Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production to the `build` folder
- `npm run eject` - Ejects from Create React App (one-way operation)

## How It Works

1. **Initial Load**: The app checks localStorage for previously saved jokes
2. **Fetching Jokes**: If no jokes exist, it fetches 10 jokes from the API
3. **Duplicate Detection**: Uses a Set to track seen jokes and avoid duplicates
4. **Voting System**: Users can upvote/downvote jokes, affecting their display
5. **Dynamic UI**: Jokes display different emojis and colors based on vote count:
   - 15+ votes: 🤣 Green (Rolling on the floor laughing)
   - 12-14 votes: 😆 Light green (Laughing)
   - 9-11 votes: 😃 Yellow-green (Smiley)
   - 6-8 votes: 🙂 Yellow (Slightly smiling)
   - 3-5 votes: 😐 Orange (Neutral)
   - 0-2 votes: 😕 Orange-red (Confused)
   - Negative votes: 😠 Red (Angry)

## Technology Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 4.9
- **HTTP Client**: Axios
- **Testing**: React Testing Library, Jest
- **Build Tool**: Create React App 5.0
- **Styling**: CSS3 with modern features (Flexbox, Gradients, Transitions)
- **Icons**: Font Awesome 5.6
- **Fonts**: Google Fonts (Rubik)

## Project Structure

```
dad-jokes/
├── public/              # Static assets
├── src/
│   ├── App.tsx         # Main app component
│   ├── JokeList.tsx    # Container component with state/logic
│   ├── Joke.tsx        # Presentational joke card component
│   ├── types.ts        # TypeScript type definitions
│   ├── *.css          # Component styles
│   └── *.test.tsx     # Test files
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Browser Support

This app supports all modern browsers:
- Chrome (last version)
- Firefox (last version)
- Safari (last version)
- Edge (last version)

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Jokes provided by [icanhazdadjoke.com](https://icanhazdadjoke.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Built with [Create React App](https://create-react-app.dev/)
