# 🧠 Tetra 3D Advanced

سیستم پیشرفته پردازش مدل‌های سه‌بعدی با الگوریتم‌های مبتنی بر ریاضیات گسسته

## 🚀 ویژگی‌ها

- **تبدیل هوشمند 2D به 3D** با الگوریتم‌های اختصاصی
- **کاهش پیچیدگی** مبتنی بر کره گسسته
- **پردازش ریاضی** با سیستم‌های پیشامد
- **بهینه‌سازی خودکار** توپولوژی

## 🛠️ تکنولوژی‌ها

- Three.js برای رندرینگ سه‌بعدی
- Vite برای build و development
- Vercel برای deployment
- ریاضیات گسسته برای الگوریتم‌ها

## 📦 نصب و راه‌اندازی

```bash
git clone https://github.com/your-username/tetra-3d-advanced.git
cd tetra-3d-advanced
npm install
npm run dev
npm run build
# آپلود فایل‌های dist به GitHub Pages
npm run build
vercel --prod
src/
├── components/          # کامپوننت‌های اصلی
│   ├── converter.js    # مبدل 2D به 3D
│   └── reducer.js      # کاهش دهنده پیچیدگی
├── styles/             # استایل‌ها
│   └── main.css        # استایل اصلی
├── utils/              # توابع کمکی
└── main.js             # فایل اصلی

### 10. فایل Gitignore
```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build outputs
dist/
build/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
