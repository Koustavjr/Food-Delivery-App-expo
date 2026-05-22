# 🍔 Food Delivery App

A cross-platform mobile food delivery application built with **React Native + Expo**. Users can browse restaurants, explore menus, manage a cart, and place orders — all behind a mock authentication flow with persistent sessions.

---

## 📖 Project Overview

| Feature | Description |
|---|---|
| **Authentication** | Sign In / Sign Up with mock users, session persisted via AsyncStorage |
| **Restaurant Discovery** | Browse restaurants with images, ratings, delivery time & fees |
| **Menu Browsing** | Per-restaurant menu with category filtering and item details |
| **Cart Management** | Add / remove items, view totals, and pay (clear cart) |
| **Profile** | User info card, stats, and sign-out |
| **Settings & Help** | Notification toggles, privacy, FAQ accordion |
| **Drawer Navigation** | Swipe-out profile drawer with Settings, Help, and Orders links |

---

## Demo Video

## 🛠 Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | [Expo](https://expo.dev) `~55.0.26` |
| Language | TypeScript `~5.9.2` |
| UI | React Native `0.83.6` |
| Navigation | React Navigation v7 (Stack, Bottom Tabs, Drawer, Native Stack) |
| State Management | [Zustand](https://zustand-demo.pmnd.rs) `^5.0.13` with `persist` middleware |
| Persistence | `@react-native-async-storage/async-storage` |
| Icons | `@expo/vector-icons` (Ionicons, MaterialIcons) |
| Gestures | `react-native-gesture-handler`, `react-native-reanimated` |
| Keyboard handling | `react-native-keyboard-aware-scroll-view` |
| Fonts | `@expo-google-fonts/nunito`, `@expo-google-fonts/pacifico` |

---

## 🚀 How to Run Locally

### Prerequisites

- Node.js ≥ 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- [Expo Go](https://expo.dev/client) on your physical device **or** an Android/iOS simulator

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd food-delivery-app

# 2. Install dependencies
npm install

# 3a. Start with Expo Go (fastest — scan QR with Expo Go app)
npx expo start

# 3b. Start with tunnel (for physical devices on different networks)
npx expo start --tunnel

# 3c. Run on Android emulator
npm run android

# 3d. Run on iOS simulator (macOS only)
npm run ios
```

> **Note:** The app uses `--tunnel` with `@expo/ngrok` for testing on physical devices across networks.

### Mock Credentials

The app ships with two pre-seeded users for testing:

| Name | Email | Password |
|---|---|---|
| John Doe | `john@gmail.com` | `123456` |
| Jane Doe | `jane@gmail.com` | `123456` |

You can also register a new account via the Sign Up screen.

---

## 🗺 Navigation Structure

```
AppNavigator (Stack)
├── [Unauthenticated]
│   ├── GettingStarted       — Onboarding / landing screen
│   ├── SignIn               — Email + password login
│   └── SignUp               — Name, email, password registration
│
└── [Authenticated]
    └── HomeTab (Bottom Tabs)
        ├── HomeTab → RestaurantStack (Native Stack)
        │   ├── HomeScreen         — Food categories + restaurant list
        │   ├── RestaurantDetail   — Restaurant info, stats, popular items
        │   └── MenuList           — Full menu with category filter
        │
        ├── Search                 — Search screen
        ├── Orders                 — Cart / order summary with Pay Now
        └── Profile → ProfileDrawer (Drawer)
            ├── Profile            — User card, stats, account info
            ├── Settings           — Notification toggles, privacy
            ├── Help               — FAQ accordion + support actions
            └── Order              — Orders (also accessible from drawer)
```

### Auth Guard

`AppNavigator` reads `isSignedIn` from `useAuthStore`. When `true`, only the `Home` stack is registered; auth screens are unmounted entirely (no back-navigation to login after sign-in).

---

## 📸 Screenshots

> Screenshots will be added after the first physical device build. Use `npx expo start --tunnel` and scan with Expo Go to preview.

---

## ⚙️ Project Structure

```
food-delivery-app/
├── App.tsx                     Entry point
├── index.ts                    Expo entry registration
├── app.json                    Expo config
├── assets/                     Images, icons, splash
├── components/
│   ├── FoodCard.tsx            Food item card
│   ├── RestrauntCard.tsx       Restaurant card
│   └── ...
├── constants/
│   ├── Foods.ts                Static food items data
│   └── Restraunt.ts            Restaurants + menu data + CartItem type
└── src/
    ├── (Auth)/
    │   ├── GettingStarted.tsx
    │   ├── SignIn.tsx
    │   └── SignUp.tsx
    ├── (Main)/
    │   ├── Home.tsx
    │   ├── RestaurantDetail.tsx
    │   ├── MenuList.tsx
    │   ├── Order.tsx
    │   ├── Profile.tsx
    │   ├── Search.tsx
    │   ├── Settings.tsx
    │   ├── Help.tsx
    │   └── CustomDrawer.tsx
    ├── Navigator/
    │   ├── AppNavigator.tsx    Root navigator (auth guard)
    │   ├── HomeTab.tsx         Bottom tab navigator
    │   ├── RestaurantStack.tsx Native stack for restaurant flow
    │   └── ProfileDrawer.tsx   Drawer for profile section
    └── store/
        ├── AuthStore.ts        Zustand auth store (persisted)
        └── CartStore.ts        Zustand cart store
```

---

## 📝 Assumptions Made

1. **Mock backend** — Authentication and user data are entirely client-side. `MOCK_USERS` in `AuthStore.ts` simulates a database; newly registered users exist only in memory for that session (not written to AsyncStorage across app restarts).
2. **No real payments** — The "Pay Now" button clears the cart locally; no payment gateway is integrated.
3. **Static restaurant/menu data** — All restaurants and menu items are hardcoded in `constants/Restraunt.ts`. No API calls are made.
4. **Session persistence** — Auth state (`isSignedIn`, `user`) is persisted to AsyncStorage via Zustand's `persist` middleware, so the user stays logged in across app restarts.
5. **Android-first** — The app targets Android primarily (`newArchEnabled: false`). iOS is supported but hasn't been tested on a physical device.
6. **`oldArch` Reanimated** — `newArchEnabled: false` in `app.json` was chosen for compatibility with the version of `react-native-reanimated` and other libraries in use.
