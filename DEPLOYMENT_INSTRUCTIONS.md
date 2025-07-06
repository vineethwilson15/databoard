# DataBoard - GitHub Pages Deployment Instructions

## 📋 **What You Need to Do**

### **Step 1: Update package.json**
1. Open `package.json` in the project
2. Find line 6: `"homepage": "https://YOUR_GITHUB_USERNAME.github.io/databoard"`
3. Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
4. Save the file

### **Step 2: Upload to GitHub**
1. **Create new repository** on GitHub named `databoard`
2. **Upload all project files** (drag & drop the entire folder contents)
3. **Commit** with message: "Initial commit - DataBoard application"

### **Step 3: Build and Deploy**
Once files are uploaded to GitHub:

1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. Click **"set up a workflow yourself"**
4. Replace the default content with the deployment workflow (see below)
5. Commit the workflow file

### **Step 4: Enable GitHub Pages**
1. Go to repository **Settings**
2. Scroll down to **"Pages"** section
3. Under "Source", select **"GitHub Actions"**
4. Your site will be available at: `https://YOUR_USERNAME.github.io/databoard`

## 🔧 **Alternative: Manual Deployment**

If you prefer manual deployment:

1. Run `npm run build` locally
2. Create a new branch called `gh-pages`
3. Upload only the contents of the `dist/` folder to the `gh-pages` branch
4. Enable GitHub Pages to use the `gh-pages` branch

## 📁 **Files to Upload**
Upload ALL these files to your GitHub repository:
- All source files (src/ folder)
- package.json
- package-lock.json
- vite.config.js
- index.html
- eslint.config.js
- public/ folder
- .gitignore (create if needed)

## 🌐 **After Deployment**
Your DataBoard will be live at:
`https://YOUR_USERNAME.github.io/databoard`

The app features:
- 🌍 Country Explorer with World Bank data
- 📊 Happiness vs Development Indicators
- 🗺️ Regional happiness visualization
- 🇮🇳 Specialized India dashboard
- 🏆 Regional country comparisons
