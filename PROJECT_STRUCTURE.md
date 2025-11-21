# Mongolian Anti-Bullying Mobile App

A complete React Native + Expo mobile application with three main sections: Information, Report, and Journal/Diary.

## Features

### 1. Information Screen (Мэдээлэл)
- Displays 4 educational articles with thumbnail images
- Clean card-based layout with article titles and descriptions
- Tap to view full articles (placeholder navigation)

### 2. Report Screen (Мэдэгдэх)
Multi-step form with 6 sequential steps:
1. **Initial Confirmation** - Large pink button to start reporting
2. **Mood Level** - 5 colorful intensity buttons (1-5)
3. **Action Type** - 3 options: Verbal, Physical, Cyber
4. **Location** - 4 locations: School, Street, Family, Public Space
5. **Role Selection** - 2 options: Child, Reporter
6. **Personal Info Form** - Fields for gender, age, school, phone

### 3. Diary Screen (Өдрийн тэмдэглэл)
- Chat-style journal interface
- Yellow header badge with star icon ("Сайн уу?")
- Message bubbles in mint green
- Text input with send button
- Timestamps for all entries

## Design System

### Colors
- **Primary**: Dark Blue (#1A3A73)
- **Accent Buttons**:
  - Pink: #E9A3A7
  - Mint: #A8D8C5
  - Light Blue: #CBE7E8
  - Pastel Yellow: #EEDC72
  - Dark Blue: #1A3A73

### Background
- Vertical gradient: #FFFFFF → #F6E89A

### Typography
- Font: Nunito (modern, kid-friendly)
- Title: 24-26px, weight 600, dark blue
- Body: 16px, weight 400-600

### Components

#### ScreenContainer
- Provides gradient background
- Supports scrollable content
- Responsive padding

#### TitleText
- Centered titles with consistent styling
- Dark blue color (#1A3A73)

#### RoundedButton
- Soft, rounded design (border-radius: 40)
- 4 sizes: small (44), medium (54), large (60)
- 5 color options: pink, mint, blue, yellow, darkBlue

#### InputField
- White background with light grey border
- Placeholder text in grey (#999)
- Support for different keyboard types

#### BackButton
- Chevron icon navigation
- Returns to previous step

#### IconButton
- Flexible sizing
- For bottom navigation

#### InformationCard
- Article card with thumbnail
- Title and description
- Right-aligned image

#### ChatBubble
- Own messages in mint green
- Other messages in light grey
- Timestamp display

#### BottomNavigation
- 3 tabs: Home, Report, Diary
- Active tab highlighted in dark blue
- Icons from lucide-react-native

## File Structure

```
project/
├── app/
│   ├── _layout.tsx          # Root layout with font loading
│   └── index.tsx            # Main app with tab navigation
├── components/
│   ├── ScreenContainer.tsx
│   ├── TitleText.tsx
│   ├── RoundedButton.tsx
│   ├── InputField.tsx
│   ├── BackButton.tsx
│   ├── IconButton.tsx
│   ├── InformationCard.tsx
│   ├── ChatBubble.tsx
│   └── BottomNavigation.tsx
├── screens/
│   ├── InformationScreen.tsx
│   ├── ReportScreen.tsx
│   └── DiaryScreen.tsx
├── types/
│   └── index.ts             # Type definitions
├── hooks/
│   └── useFrameworkReady.ts # Framework setup
└── package.json
```

## Dependencies

- `react-native` - Core UI framework
- `expo` - Development platform
- `expo-router` - Navigation
- `expo-linear-gradient` - Gradient backgrounds
- `@expo-google-fonts/nunito` - Google Fonts
- `lucide-react-native` - Icons
- `@react-native-picker/picker` - Gender select dropdown

## Running the App

Development:
```bash
npm run dev
```

Build for web:
```bash
npm run build:web
```

Type checking:
```bash
npm run typecheck
```

Linting:
```bash
npm run lint
```

## UI Specifications

### Buttons
- Height: 54-60px
- Border radius: 40px
- Pastel colors with white text
- Press opacity: 0.7

### Forms
- Input height: 44px
- Border radius: 12px
- Border color: #D9D9D9
- Placeholder color: #999

### Navigation
- Bottom bar height: 70px
- Tab icons: 28px
- Active icon color: #1A3A73
- Inactive icon color: #B0B0B0

### Spacing
- Container padding: 24px horizontal
- Card margin: 16px bottom
- Gap between elements: 12-16px

## Notes

- All content is in Mongolian (Cyrillic)
- Images are from Pexels (free stock photos)
- Form data is stored in local state (can integrate with Supabase)
- Fully responsive for mobile devices
- Kid-friendly and accessible design
