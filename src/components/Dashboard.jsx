import React from 'react'

const Dashboard = () => {
  return (
    <div className="card">
      <h2>Welcome to DataBoard</h2>
      <div className="responsive-grid" style={{ marginTop: '2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>🌍 Country Explorer</h3>
          <p>Explore happiness and development indicators for any country over time</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>📊 Happiness Comparator</h3>
          <p>Compare indicators with happiness index for detailed insights</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>🗺️ Regional View</h3>
          <p>Visualize happiness distribution across different world regions</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>🇮🇳 India Dashboard</h3>
          <p>Specialized dashboard showing indicators correlated with India\'s happiness</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
          color: 'white', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>🏆 Regional Comparison</h3>
          <p>Compare countries within regions to identify top performers</p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', 
          color: '#333', 
          padding: '1.5rem', 
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h3>📈 Data Sources</h3>
          <p>World Happiness Report & World Bank Development Indicators</p>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <h3>Getting Started</h3>
        <p>Use the navigation above to explore different visualizations and insights about global happiness and development indicators.</p>
      </div>
    </div>
  )
}

export default Dashboard
