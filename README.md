# Child - Mongolian Anti-Bullying Mobile App

A React Native + Expo mobile application for reporting and tracking bullying incidents, with educational content and diary features.

## Features

- **Information Screen**: Educational articles about bullying prevention
- **Report Screen**: Multi-step form for reporting bullying incidents
- **Diary Screen**: Chat-style journal interface for daily entries

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Router for navigation
- Supabase for backend/database
- Expo Linear Gradient for UI

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Supabase (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions):

   - Create a `.env` file with your Supabase credentials
   - Run the SQL scripts to create database tables

4. Start the development server:
   ```bash
   npm run dev
   ```

## Supabase Setup

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete Supabase setup instructions.

Quick setup:

1. Create a Supabase project at https://app.supabase.com/
2. Copy your Project URL and anon key
3. Create a `.env` file:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your-project-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Run the SQL scripts in Supabase SQL Editor (see SUPABASE_SETUP.md)

## Available Scripts

- `npm run dev` - Start the Expo development server
- `npm run build:web` - Build for web platform
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   └── screens/           # Screen components
├── components/            # Reusable components
├── lib/                   # Utilities and services
│   ├── supabase.ts       # Supabase client setup
│   └── supabaseService.ts # Supabase service functions
├── types/                 # TypeScript type definitions
└── hooks/                 # Custom React hooks
```

## License

Private project
