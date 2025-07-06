# DataBoard - Global Happiness & Development Indicators Dashboard

A React-based data visualization platform that helps users explore and understand global happiness and development indicators from the World Happiness Report and World Bank data.

## 🌟 Features

- **Country Explorer**: Explore indicator trends for any country over time
- **Happiness Comparator**: Compare indicators with happiness index for correlation analysis
- **Regional Visualization**: Interactive world map and regional happiness distribution
- **India Dashboard**: Specialized view showing indicators correlated with India's happiness
- **Regional Comparison**: Compare countries within regions to identify top performers

## 🚀 Technologies Used

- **React** with Vite for fast development and building
- **Chart.js** and react-chartjs-2 for data visualizations
- **Axios** for API calls to external data sources
- **Modern CSS** with gradients and responsive design
- **GitHub Pages** ready for deployment

## 📊 Data Sources

- [World Happiness Report API](https://data.worldhappiness.report/map)
- [World Bank Indicators API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392)
- [Country Classification API](https://datahelpdesk.worldbank.org/knowledgebase/articles/906519)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd databoard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📱 Usage

1. **Overview Dashboard**: Start here to see all available features
2. **Country Explorer**: Select a country, indicator, and time range to explore trends
3. **Happiness Comparator**: Compare any indicator with happiness scores to find correlations
4. **Regional View**: See happiness distribution across world regions with interactive maps
5. **India Dashboard**: View specialized analysis for India's happiness correlations
6. **Regional Comparison**: Compare countries within any region on chosen indicators

## 🚀 Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub Pages URL:
   ```json
   "homepage": "https://yourusername.github.io/databoard"
   ```

2. Update the `base` in `vite.config.js` to match your repository name:
   ```javascript
   base: '/databoard/'
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## 🎯 Project Structure

```
src/
├── components/
│   ├── Header.jsx              # App header with title
│   ├── Dashboard.jsx           # Main overview dashboard
│   ├── CountryExplorer.jsx     # Country trend exploration
│   ├── HappinessComparator.jsx # Happiness correlation analysis
│   ├── RegionalVisualization.jsx # Regional happiness maps
│   ├── IndiaDashboard.jsx      # India-specific dashboard
│   └── RegionalComparison.jsx  # Regional country comparison
├── App.jsx                     # Main app component with navigation
├── App.css                     # Modern responsive styling
└── main.jsx                    # App entry point
```

## 🔧 Development Guidelines

- Focus on front-end only (no backend required)
- Use functional components with React hooks
- Implement responsive design for mobile and desktop
- Keep API calls efficient with loading states
- Follow Agile development practices
- Prioritize quick development over complex features

## 📈 Future Enhancements

- [ ] Real API integration with World Happiness Report
- [ ] Interactive Chart.js visualizations
- [ ] Advanced correlation analysis
- [ ] Export functionality for charts and data
- [ ] User preferences and favorites
- [ ] Dark mode theme
- [ ] Mobile app version

## 🤝 Contributing

This project follows Agile development practices:

1. Create user stories for new features
2. Work in iterative sprints
3. Focus on MVP functionality first
4. Regular testing and feedback cycles

## 📄 License

This project is created for educational purposes as part of an Agile development learning exercise.

## 🎨 Design Philosophy

- **User-Centric**: Intuitive navigation and clear visualizations
- **Performance-First**: Fast loading with Vite build tool
- **Mobile-Responsive**: Works seamlessly on all device sizes
- **Accessible**: Modern web standards for accessibility
- **Scalable**: Modular component structure for easy expansion+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
