# Daily Reflection App 📔

A simple, distraction-free daily journaling application built to help users develop consistent reflection habits.

## Features

### Core Functionality

- **Daily Reflection Form**: Three structured questions to guide self-reflection

  - What went well today? 🌟
  - What made you anxious today? 😰
  - What could you improve tomorrow? 🚀

- **One Entry Per Day**: Enforces authentic daily practice by preventing multiple submissions
- **Historical Reflections**: View past reflections in reverse chronological order
- **Data Persistence**: All reflections are saved locally and persist across sessions

### User Experience

- **Mobile-First Design**: Responsive layout works seamlessly on mobile and desktop
- **Accessible Interface**: Following WCAG 2.1 AA guidelines with proper contrast and keyboard navigation
- **Real-time Validation**: Character limits and form validation with clear error messages
- **Visual Feedback**: Clear status indicators and completion states

### Technical Features

- **Fast Performance**: Loads in under 3 seconds, form submissions complete in <500ms
- **Local Storage**: Data persists across browser sessions
- **Error Handling**: Graceful error handling with user-friendly messages
- **TypeScript**: Full type safety for better development experience

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Build Tool**: Vite for fast development and building
- **Storage**: Browser localStorage for data persistence

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Usage

### First Time User

1. Navigate to the "Today" tab
2. Fill out the three reflection questions
3. Click "Save Today's Reflection"
4. Your reflection is saved and you'll see a completion screen

### Daily Usage

- **Today Tab**: Submit your daily reflection (once per day)
- **History Tab**: Browse and review past reflections

### Key Rules

- Only one reflection per day is allowed
- All three questions must be answered
- Character limit of 500 characters per question
- Data is automatically saved to your browser

## Architecture

### Component Structure

```
src/
├── components/
│   ├── Navigation.tsx       # Top navigation bar
│   ├── ReflectionForm.tsx   # Daily reflection form
│   ├── TodayComplete.tsx    # Post-submission view
│   └── ReflectionHistory.tsx # Historical reflections list
├── types.ts                 # TypeScript interfaces
├── utils.ts                # Utility functions
└── App.tsx                 # Main application component
```

### Key Design Decisions

- **Local Storage**: Day 1 scope uses browser localStorage for simplicity
- **Single Page App**: No routing needed for the simple two-view structure
- **Component-Based**: Modular React components for maintainability
- **Type Safety**: Full TypeScript coverage for better developer experience

## Requirements Fulfillment

### Functional Requirements ✅

- **FR001**: Three structured reflection questions ✅
- **FR002**: Prevents editing/multiple submissions per day ✅
- **FR003**: Historical reflections in reverse chronological order ✅
- **FR004**: Clear navigation between Today and History ✅
- **FR005**: Confirmation after submission + character limits ✅
- **FR006**: Mobile and desktop responsive ✅

### Technical Requirements ✅

- **TR001**: Fast loading (<3s) and quick interactions ✅
- **TR002**: Form validation for incomplete submissions ✅
- **TR003**: Data persistence across sessions ✅
- **TR004**: Graceful empty states ✅
- **TR005**: Simple, accessible UI ✅

### Business Requirements ✅

- **BR001**: Enables consistent daily journaling habit ✅
- **BR002**: Prevents data loss and overwrites ✅
- **BR003**: Distraction-free, simple interface ✅
- **BR004**: Encourages structured self-reflection ✅

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements (Out of Scope for Day 1)

- User authentication and cloud sync
- Push notifications and reminders
- Data export functionality
- Advanced analytics and insights
- Customizable reflection questions
- Multi-language support

## License

This project is for educational and personal use.

---

Built with ❤️ for fostering daily reflection habits.
