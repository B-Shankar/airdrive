# Air Drive

```markdown
# AirDrive Frontend

The modern, intuitive React frontend for the AirDrive file sharing platform.

---

## 🚀 Features

- Lightning-fast UX (React + Vite)
- Auth via Clerk.dev
- File upload, download, public sharing
- Clean dashboard with real-time stats
- Credit & subscription UI
- Fully responsive/dark mode
- Modular components and hooks

---

## 🖥️ Tech Stack

- React (Vite)
- Tailwind CSS
- Clerk.dev for auth
- Axios
- React Router v6
- lucide-react (icons)

---

## ⚡ Getting Started

### 1. Install dependencies

```
cd frontend
yarn        # or npm install
```

### 2. Configure Environment

Copy the env example and edit as needed:

```
cp .env.example .env
```

Edit `.env` for:
- VITE_API_BASE_URL: Your backend API
- VITE_CLERK_PUBLISHABLE_KEY

### 3. Run the app

```
yarn dev   # or npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173).

---

## 📂 Structure

```
src/
  components/
  pages/
  api/
  layout/
  context/
public/
.env
```

---

## 🛠️ Scripts

- `yarn dev` – local dev server
- `yarn build` – production build
- `yarn lint` – code check

---

## 🧩 Customization

- Update theme using Tailwind config
- Swap icons/components easily
- Edit Clerk integration in `src/`

---

## 📝 Notes

- Backend must have CORS enabled for frontend URL.
- API endpoints are defined in `src/api/services`.

---

MIT License · © [Your Name]
```
