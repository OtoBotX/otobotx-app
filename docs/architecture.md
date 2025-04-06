# 🏗 App Architecture Overview

This document outlines the key architectural decisions for the project. It uses modern standards in the React Native + Expo ecosystem with a focus on modularity, maintainability, and offline-first support.

## 🧱 Tech Stack

| Layer            | Choice                              |
| ---------------- | ----------------------------------- |
| Platform         | Expo (with Expo Router)             |
| Navigation       | Expo Router (file-based routing)    |
| Backend          | Supabase (Auth, DB, Storage)        |
| State Management | Legend-State                        |
| UI Kit           | React Native Paper                  |
| Forms            | React Hook Form + Zod               |
| Testing          | Jest + React Native Testing Library |
| Deployment       | EAS Build + GitHub Actions CI       |
| Offline Support  | Custom sync logic + Legend-State    |
| Styling          | Custom React Native Paper theme     |

## ⚙ Architectural Decisions

### 1. API Handling

- Supabase client is wrapped in custom **services** and **hooks**.
- This decouples the backend from UI and improves testability.

```ts
// services/user.ts
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};
```

### 2. Auth Flow

- Auth is implemented using **Expo Router layouts** and guards.
- Folder structure:

```
app/
  (auth)/         → login, register
  (app)/          → protected content
  _layout.tsx     → handles redirection based on auth
```

- A custom `useAuth()` hook listens to Supabase auth state.
- Uses `<Redirect />` from Expo Router to handle protected routes.

### 3. Environment & Secrets

- Uses `.env` files accessed via `expo-constants`.
- Supports multiple environments (`development`, `preview`, `production`).

```ts
import Constants from 'expo-constants';
const supabaseUrl = Constants.expoConfig?.extra?.SUPABASE_URL;
```

### 4. Forms & Validation

- Uses `react-hook-form` + `zod` for form handling and schema validation.

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { control, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

### 5. Theming & Styling

- Uses `React Native Paper` with a custom `theme.ts`.
- App is wrapped with `PaperProvider` to apply the theme globally.

```ts
export const theme: MD3LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
  },
};
```

### 6. Offline Support

- Offline-first design is integral to the app.
- Legend-State will cache auth tokens and application data.
- A custom sync layer will be written to queue and reconcile changes when connectivity returns.

### 7. Error Handling

- User-facing errors are shown using `Snackbar` from React Native Paper.
- Basic `try/catch` blocks and console logging in development.

### 8. Testing

- **Jest** is used for unit testing.
- **React Native Testing Library** is used for UI/component testing.

### 9. Deployment & CI/CD

- CI: GitHub Actions is used to validate builds before merging to `main`.
- Deployment: Initially development-only via EAS Build (no Apple/Google dev accounts yet).
- The app is open source for:
  - Portfolio showcase
  - GitHub-based automation and visibility
