# 🚀 v1.0 – OtoBotX-App

## 🎯 Goals

- Serve as a robust foundation for new Expo + Supabase apps
- Showcase best practices for architecture, auth, state, and sync
- Be developer-friendly, testable, and contributor-ready
- Function offline by design, with eventual consistency

## ✅ Core Features (v1.0)

### 🔐 Authentication

- [ ] Email/password login and signup via Supabase

### 🧾 Forms & Validation

- [ ] `react-hook-form` + `zod` form validation
- [ ] Custom input wrappers and validation messages

### 🧾 Relational Database

- [ ] Interact with relational database tables of Supabase
- [ ] Role based-data handling

### 🧱 State Management

- [ ] Legend-State for global state (theme, user etc.) and session cache

### 📶 Offline Support

- [ ] Queued writes and custom sync logic
- [ ] Support for handling write orders with conflict

### 🎨 Theming & UI

- [ ] Custom `theme.ts` extending Paper's MD3 theme
- [ ] Dark mode support
- [ ] Multi-language support EN & DE & TR

### ⚠️ Error Handling

- [ ] Snackbar-based error feedback
- [ ] Centralized error catcher for API calls
- [ ] Global loading and empty states

### 🔬 Testing

- [ ] Jest setup for unit testing
- [ ] React Native Testing Library for components
- [ ] Tests for auth flow, form validation, and sync logic

### ⚙ CI/CD & Deployment

- [ ] GitHub Actions CI for build/test/lint on PRs, only development builds

### 🧑‍💻 Developer Experience

- [ ] Prettier + ESLint + TypeScript setup with Github Actions

### 🧑‍💻 User Experience

- [ ] An app with offline-support to manage business data for mid-size enterprises

### 📚 Documentation

- [ ] README with setup instructions
- [ ] `architecture.md` for architectural decisions
- [ ] `structure.md` for explaining the folder structure
- [ ] `roadmap.md` with feature goals
- [ ] `contributing.md` for the community

## 🚀 Fork for Specific Use Case - OtoBotX-App

- [ ] Advanced Forms including images (utilizing Supabase Storage) and image processing (Google ML Kit)
- [ ] Advanced Relational DBs for complex data structures
- [ ] Advanced Components to display data
- [ ] QA and Production Builds with Deployment to App Stores

## 🧪 v2.+

- [ ] Push notifications on DB changes
- [ ] Deep linking and universal links

## 💡 Usage

This template is intended for developers looking to:

- Bootstrap a real-world offline-first mobile app
- Learn Expo + Supabase integration
- Contribute to a modern, open-source React Native starter
