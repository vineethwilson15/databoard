import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import CountryExplorer from './components/CountryExplorer'
import HappinessComparator from './components/HappinessComparator'
import RegionalVisualization from './components/RegionalVisualization'
import IndiaDashboard from './components/IndiaDashboard'
import RegionalComparison from './components/RegionalComparison'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'explorer':
        return <CountryExplorer />
      case 'happiness':
        return <HappinessComparator />
      case 'regional':
        return <RegionalVisualization />
      case 'india':
        return <IndiaDashboard />
      case 'comparison':
        return <RegionalComparison />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="App">
      <Header />
      <nav className="navigation">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'explorer' ? 'active' : ''}
          onClick={() => setActiveTab('explorer')}
        >
          Country Explorer
        </button>
        <button 
          className={activeTab === 'happiness' ? 'active' : ''}
          onClick={() => setActiveTab('happiness')}
        >
          Happiness Comparator
        </button>
        <button 
          className={activeTab === 'regional' ? 'active' : ''}
          onClick={() => setActiveTab('regional')}
        >
          Regional View
        </button>
        <button 
          className={activeTab === 'india' ? 'active' : ''}
          onClick={() => setActiveTab('india')}
        >
          India Dashboard
        </button>
        <button 
          className={activeTab === 'comparison' ? 'active' : ''}
          onClick={() => setActiveTab('comparison')}
        >
          Regional Comparison
        </button>
      </nav>
      <main className="main-content">
        {renderActiveComponent()}
      </main>
    </div>
  )
}

export default App
