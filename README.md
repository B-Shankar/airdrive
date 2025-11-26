# Air Drive
```markdown
<div align="center">
  <h1>AirDrive Frontend</h1>
  <p>
    🚀 <b>Next-gen cloud file drive UI – Seamless uploads, sharing, & credits</b>
    <br/>
    <img src="https://img.shields.io/badge/-React-222C37?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=fff"/>
    <img src="https://img.shields.io/badge/-Clerk-24292E?style=for-the-badge&logo=clerk&logoColor=white"/>
    <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
    <img src="https://img.shields.io/badge/-Dark/Lite%20Theme-000?style=for-the-badge"/>
    <img src="https://img.shields.io/badge/-Lucide-18181B?style=for-the-badge&logo=lucide&logoColor=white"/>
  </p>
</div>

---

## ✨ Features

- 🚀 Lightning-fast & mobile-friendly UI (Vite + React)
- 🔐 Clerk.dev authentication
- ☁️ File uploads, downloads, and public sharing
- 🎨 Beautiful dashboard with credits, recent files, and subscriptions
- 🌓 Modern dark/light mode, accessible & responsive
- 📤 One-click public links, copy-to-clipboard
- 🛡️ Production-ready: clean code, async APIs, custom hooks

---

## ⚡ Quick Start

**Requirements:**  
Node.js v18+, Yarn _or_ npm, Backend API running (see AirDrive backend README)

1. **Install dependencies**
   ```
   cd frontend
   yarn         # or npm install
   ```

2. **Setup environment variables**
   ```
   cp .env.example .env
   ```
   Edit `.env` with your Clerk keys and backend API base URL.

3. **Run dev server**
   ```
   yarn dev     # or npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧩 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Clerk.dev](https://clerk.com/) (Auth)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- Axios, React Router v6

---

## 📂 Directory Structure

```
/frontend
  ├── /public
  ├── /src
  │   ├── /api
  │   ├── /components
  │   ├── /pages
  │   ├── /layout
  │   ├── /context
  │   ├── App.jsx
  │   └── main.jsx
  ├── tailwind.config.js
  ├── vite.config.js
  ├── .env.example
  └── ...
```

---

## 🔑 Environment Variables

Edit `.env`:

```
VITE_API_BASE_URL=http://localhost:8080/api/v1.0
VITE_CLERK_PUBLISHABLE_KEY=xxx
```

---

## 🗂️ Core Pages

- **Dashboard:** Overview, credits, recent files
- **Upload:** Drag/drop file uploader with progress
- **My Files:** File manager and sharing toggles
- **Public File View:** Shareable landing (with dark/light theme)
- **Subscription:** Buy credits, view history
- **Transactions:** Credits and usage
- **Auth:** Clerk login/signup flow

---

## 📦 Scripts

- `yarn dev` — Start development server
- `yarn build` — Production build to `/dist`
- `yarn lint` — Lint with ESLint & Prettier

---

## 📝 Customization

- All major config in `src/context/` & `.env`
- Tailwind theme in `tailwind.config.js`  
- Swap out Clerk for custom auth if needed
- Extend components with Lucide/React UI icons

---

## 🙋 FAQ

- **Why can't I upload or toggle file privacy?**  
  Make sure the backend CORS is enabled for your frontend URL.
- **Can I use my own auth?**  
  Yes! See `/src/context/AuthContext.jsx` for swaps.
- **Where are the API endpoints?**  
  See `/src/api/services/`.

---

## Screenshots

<img width="1346" height="906" alt="Screenshot 2025-11-21 195544" src="https://github.com/user-attachments/assets/25d5c3a8-7a10-4383-86ce-e41fe2ed908e" />

<img width="1343" height="906" alt="Screenshot 2025-11-21 200147" src="https://github.com/user-attachments/assets/dca6cc9c-1504-4e75-8ed4-fac342954638" />


---

MIT License · © [Your Name or Team]
```

***

- **Swap badges for your real technologies/tools**
- Add gif/image next to the heading if desired
- Place in your `/frontend` directory  
- Tweak page/component names as per your actual code

This structure is instantly recognizable and highly skimmable, just like your reference![1][3][8][9]

[1](https://github.com/evelinsteiger/README-template)
[2](https://www.reddit.com/r/reactjs/comments/cjimv5/excellent_readme_examples/)
[3](https://www.freecodecamp.org/news/how-to-structure-your-readme-file/)
[4](https://www.makeareadme.com)
[5](https://create-react-app.dev/docs/custom-templates/)
[6](https://gist.github.com/martensonbj/6bf2ec2ed55f5be723415ea73c4557c4)
[7](https://dev.to/documatic/how-to-write-an-awesome-readme-cfl)
[8](https://www.linkedin.com/pulse/readme-template-ai-code-generators-mohamed-a-elsayed-w8ouf)
[9](https://www.surajon.dev/awesome-readme-examples-for-writing-better-readmes)
