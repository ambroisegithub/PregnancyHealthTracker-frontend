# 🤱 Pregnancy Health Tracker

A comprehensive React Native mobile application for pregnancy tracking and support, built with Expo, TypeScript, and modern development practices.

## 📱 Features

### 🔐 Authentication & Onboarding
- User registration and login
- Secure JWT authentication
- Guided onboarding flow
- Pregnancy form setup

### 🏠 Dashboard & Tracking
- Personalized pregnancy status dashboard
- Real-time gestational age calculation
- Trimester tracking and milestones
- AI-powered pregnancy insights

### 📚 Educational Content
- Personalized articles based on pregnancy stage
- Daily pregnancy tips and advice
- Weekly pregnancy content
- Trimester-specific information

### 💬 AI Assistant
- 24/7 AI-powered pregnancy chat support
- Personalized responses based on user data
- Pregnancy Q&A and guidance
- Chat history management

### 📱 WhatsApp Integration
- WhatsApp notifications and reminders
- Daily tips via WhatsApp
- Milestone alerts
- Emergency contact support

### 👤 Profile Management
- User profile customization
- Pregnancy settings management
- WhatsApp integration setup
- Notification preferences

## 🛠 Tech Stack

### Frontend (React Native)
- **Framework**: Expo SDK 53
- **Language**: TypeScript
- **Navigation**: Expo Router (File-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Redux Toolkit
- **Data Persistence**: Redux Persist + AsyncStorage
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind CSS

### Backend Integration
- **API**: RESTful API with Node.js/Express
- **Database**: PostgreSQL with TypeORM
- **AI**: Google Gemini API for chat responses
- **Notifications**: Twilio WhatsApp Business API
- **Authentication**: JWT tokens

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/pregnancy-health-tracker.git
   cd pregnancy-health-tracker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update `.env` with your configuration:
   \`\`\`env
   EXPO_PUBLIC_BASE_URL=https://your-backend-url.com
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npx expo start
   \`\`\`

5. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 📁 Project Structure

\`\`\`
pregnancy-health-app/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Authentication screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (onboarding)/             # Onboarding flow
│   │   ├── welcome.tsx
│   │   ├── pregnancy-form.tsx
│   │   └── setup-complete.tsx
│   ├── (dashboard)/              # Main app screens
│   │   ├── (home)/               # Home tab
│   │   ├── (articles)/           # Articles tab
│   │   ├── (chat)/               # Chat tab
│   │   └── (profile)/            # Profile tab
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point
├── redux/                        # State management
│   ├── store.ts                  # Redux store configuration
│   └── slices/                   # Redux slices
│       ├── authSlice.ts
│       ├── pregnancySlice.ts
│       ├── articlesSlice.ts
│       ├── chatSlice.ts
│       └── profileSlice.ts
├── components/                   # Reusable components
│   ├── ui/                       # UI components
│   ├── forms/                    # Form components
│   └── common/                   # Common components
├── types/                        # TypeScript type definitions
├── utils/                        # Utility functions
├── constants/                    # App constants
└── assets/                       # Images, fonts, icons
\`\`\`

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green (`#10b981`) - Health, growth, vitality
- **Secondary**: Pink (`#ec4899`) - Femininity, care, warmth
- **Accent**: Blue (`#3b82f6`) - Trust, reliability, calm
- **Neutral**: Gray shades for text and backgrounds

### Typography
- **Primary Font**: Urbanist (Bold, Medium, Regular)
- **Sizes**: Responsive text sizing with Tailwind classes

### Components
- Rounded corners (12px, 16px, 24px)
- Soft shadows for depth
- Consistent spacing (4px grid system)
- Accessible color contrasts

## 🔧 Configuration Files

### Core Configuration
- `app.json` - Expo app configuration
- `babel.config.js` - Babel configuration for NativeWind
- `metro.config.js` - Metro bundler configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Development Tools
- `prettier.config.js` - Code formatting rules
- `eslint.config.js` - Code linting rules
- `.env.example` - Environment variables template

## 📱 App Flow

### 1. Authentication Flow
\`\`\`
Launch → Check Auth → Login/Register → Dashboard
\`\`\`

### 2. Onboarding Flow
\`\`\`
Register → Welcome → Pregnancy Form → Setup Complete → Dashboard
\`\`\`

### 3. Main App Flow
\`\`\`
Dashboard → Home/Articles/Chat/Profile → Sub-screens
\`\`\`

## 🔌 API Integration

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Pregnancy Endpoints
- `POST /api/form` - Submit pregnancy form
- `GET /api/status` - Get pregnancy status
- `GET /api/pregnancy/status-with-ai` - Get status with AI insights
- `PUT /api/form` - Update pregnancy form

### Articles Endpoints
- `GET /api/my-articles` - Get personalized articles
- `GET /api/daily` - Get daily article

### Chat Endpoints
- `POST /api/chat` - Send chat message to AI

### WhatsApp Endpoints
- `POST /api/whatsapp/link-whatsapp` - Link WhatsApp number
- `POST /api/whatsapp/send-test` - Send test message

## 🧪 Testing

\`\`\`bash
# Run linting
npm run lint

# Format code
npm run format

# Type checking
npx tsc --noEmit
\`\`\`

## 📦 Building for Production

### Android
\`\`\`bash
# Build APK
npx expo build:android

# Build AAB (recommended for Play Store)
npx expo build:android --type app-bundle
\`\`\`

### iOS
\`\`\`bash
# Build for App Store
npx expo build:ios --type archive
\`\`\`

## 🚀 Deployment

### Using EAS Build (Recommended)
\`\`\`bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for production
eas build --platform all
\`\`\`

### Manual Deployment
1. Build the app using Expo CLI
2. Upload to respective app stores
3. Configure app store listings
4. Submit for review

## 🔒 Environment Variables

Create a `.env` file in the root directory:

\`\`\`env
# Backend API URL
EXPO_PUBLIC_BASE_URL=https://your-backend-api.com

# Optional: Analytics, crash reporting, etc.
EXPO_PUBLIC_ANALYTICS_KEY=your_analytics_key
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add proper error handling
- Test on both iOS and Android

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Metro bundler issues:**
\`\`\`bash
npx expo start -c
\`\`\`

**Package conflicts:**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**TypeScript errors:**
\`\`\`bash
npx tsc --noEmit
\`\`\`

### Getting Help
- 📧 Email: support@pregnancytracker.com
- 💬 Discord: [Join our community](https://discord.gg/pregnancytracker)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/pregnancy-health-tracker/issues)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [NativeWind](https://www.nativewind.dev/) for Tailwind CSS in React Native
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Twilio](https://www.twilio.com/) for WhatsApp integration
- [Google Gemini](https://ai.google.dev/) for AI chat capabilities

## 📊 Project Status

- ✅ Authentication & User Management
- ✅ Pregnancy Tracking & Calculations
- ✅ AI Chat Integration
- ✅ WhatsApp Notifications
- ✅ Article Management
- ✅ Profile Management
- 🚧 Push Notifications (In Progress)
- 🚧 Offline Support (Planned)
- 🚧 Multi-language Support (Planned)

---

**Made with ❤️ for expecting mothers everywhere**

*Version 1.0.0 - Built with React Native, Expo, and modern web technologies*
