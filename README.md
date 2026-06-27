# TestCase AI Generator 🧪

An AI-powered test case generator that helps QA engineers automatically generate comprehensive test cases from user stories and mockup screenshots.

> Built with React + TypeScript + Tailwind CSS + Express.js + PostgreSQL + Claude AI API

---

## ✨ Features

- 📝 Input via User Story (text)
- 🖼️ Input via Mockup/Screenshot (image)
- ✨ Both combined for better results
- 🤖 AI generates positive & negative test cases automatically
- 📊 Customizable columns (like Zephyr)
- 📥 Export to Excel/CSV
- 💾 Save projects to database
- 📋 Test case history

---

## 🛠️ Tech Stack

**Frontend:**

- React 19
- TypeScript
- Tailwind CSS v4
- Vite

**Backend (coming soon):**

- Node.js
- Express.js
- PostgreSQL

**AI:**

- Claude API (claude-sonnet-4-6)

---

## 📁 Project Structure

```
testcase-generator/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable components (coming soon)
│   │   ├── pages/            # Page components (coming soon)
│   │   ├── App.tsx           # Main app component
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── index.html
│   ├── vite.config.ts        # Vite + Tailwind config
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                  # Express.js backend (coming soon)
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   └── models/           # Database models
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js v22+
- npm v11+
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/nurularifin83/testcase-generator.git
cd testcase-generator
```

**2. Setup Frontend**

```bash
cd frontend
npm install
```

**3. Configure Tailwind CSS (v4)**

Update `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Update `src/index.css`:

```css
@import "tailwindcss";
```

**4. Run Frontend**

```bash
npm run dev
```

Open browser: `http://localhost:5173`

---

## ⚙️ Environment Variables

Create `.env` file inside `frontend/`:

```
VITE_ANTHROPIC_API_KEY=your_claude_api_key_here
```

> ⚠️ Never commit your `.env` file to GitHub!

---

## 🗺️ Roadmap

- [x] Project setup (React + TypeScript + Tailwind CSS v4 + Vite)
- [ ] Build input form (User Story + Mockup upload)
- [ ] Integrate Claude AI API
- [ ] Display generated test cases in table
- [ ] Column customization (like Zephyr)
- [ ] Export to Excel
- [ ] Backend setup (Express.js + Node.js)
- [ ] PostgreSQL database integration
- [ ] User authentication
- [ ] Project management (save multiple projects)
- [ ] Deploy to Railway + Vercel

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

GPL v3 License — free to use personally and self-host, but cannot be sold commercially without permission from the author.

---

## 👨‍💻 Author

**Nurul Arifin**

- GitHub: [@nurularifin83](https://github.com/nurularifin83)
- LinkedIn: [Nurul Arifin](https://linkedin.com/in/nurularifin)

---

## 🙏 Acknowledgements

- [Anthropic Claude API](https://anthropic.com)
- [Vite](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React](https://react.dev)
