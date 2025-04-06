# 📁 Folder Structure – Expo + Supabase Starter Template

This folder structure is designed to support a modular, scalable, and offline-capable React Native app using Expo Router and Supabase.

```bash
app/
  (auth)/                # Unauthenticated routes
  (tabs)/                 # Authenticated routes

components/              # Reusable UI components

hooks/                   # Custom React hooks

store/                   # Legend-State stores

services/                # Business logic and API wrappers

theme/                   # React Native Paper theme

utils/                   # Generic, reusable helpers
  date.ts
  debounce.ts
  format.ts

docs/                    # Project documentation

tests/                   # Jest & React Native Testing Library

assets/                  # Static assets
  fonts/
  images/
```

## 🧠 Folder Summary

| Folder        | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `app/`        | File-based navigation via Expo Router             |
| `components/` | Shared visual components with theming             |
| `hooks/`      | App-specific logic and abstraction for state/data |
| `store/`      | Legend-State stores and persistence               |
| `services/`   | Data fetch, write, and business logic layer       |
| `theme/`      | Paper theme customizations (colors, fonts)        |
| `utils/`      | Pure helper functions                             |
| `docs/`       | Markdown documentation for contributors           |
| `tests/`      | Unit and component tests                          |
| `assets/`     | Fonts, images, icons                              |

This structure is optimized for modularity, testability, and offline-first capability.
