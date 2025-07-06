import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { getRegionalData, REGIONS } from '../services/apiService'
import { getBarChartConfig, createBarDataset, CHART_COLORS, generateColorPalette } from '../utils/chartConfig'

const RegionalComparison = () => {
  const [selectedRegion, setSelectedRegion] = useState('western_europe')
  const [selectedIndicator, setSelectedIndicator] = useState('happiness')
  const [selectedYear, setSelectedYear] = useState('2023')
  const [chartData, setChartData] = useState(null)
  const [topPerformers, setTopPerformers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const regions = [
    { value: 'western_europe', label: 'Western Europe' },
    { value: 'north_america', label: 'North America' },
    { value: 'australia_new_zealand', label: 'Australia and New Zealand' },
    { value: 'middle_east_north_africa', label: 'Middle East and North Africa' },
    { value: 'latin_america_caribbean', label: 'Latin America and Caribbean' },
    { value: 'central_eastern_europe', label: 'Central and Eastern Europe' },
    { value: 'east_asia', label: 'East Asia' },
    { value: 'southeast_asia', label: 'Southeast Asia' },
    { value: 'south_asia', label: 'South Asia' },
    { value: 'sub_saharan_africa', label: 'Sub-Saharan Africa' }
  ]

  const indicators = [
    { value: 'happiness', label: 'Happiness Score' },
    { value: 'gdp', label: 'GDP per Capita' },
    { value: 'life_expectancy', label: 'Life Expectancy' },
    { value: 'education', label: 'Education Index' },
    { value: 'social_support', label: 'Social Support' },
    { value: 'freedom', label: 'Freedom to Make Life Choices' }
  ]

  // Mock data for different regions and indicators
  const getMockRegionalData = (region, indicator) => {
    const dataMap = {
      western_europe: {
        happiness: [
          { country: 'Finland', score: 7.8, rank: 1 },
          { country: 'Denmark', score: 7.6, rank: 2 },
          { country: 'Switzerland', score: 7.5, rank: 3 },
          { country: 'Iceland', score: 7.4, rank: 4 },
          { country: 'Netherlands', score: 7.3, rank: 5 }
        ],
        gdp: [
          { country: 'Luxembourg', score: 115000, rank: 1 },
          { country: 'Switzerland', score: 85000, rank: 2 },
          { country: 'Norway', score: 78000, rank: 3 },
          { country: 'Ireland', score: 75000, rank: 4 },
          { country: 'Denmark', score: 62000, rank: 5 }
        ]
      },
      south_asia: {
        happiness: [
          { country: 'Nepal', score: 5.2, rank: 1 },
          { country: 'Pakistan', score: 4.5, rank: 2 },
          { country: 'Sri Lanka', score: 4.3, rank: 3 },
          { country: 'India', score: 4.0, rank: 4 },
          { country: 'Bangladesh', score: 3.8, rank: 5 }
        ],
        gdp: [
          { country: 'India', score: 2500, rank: 1 },
          { country: 'Sri Lanka', score: 3800, rank: 2 },
          { country: 'Pakistan', score: 1500, rank: 3 },
          { country: 'Bangladesh', score: 2200, rank: 4 },
          { country: 'Nepal', score: 1200, rank: 5 }
        ]
      },
      north_america: {
        happiness: [
          { country: 'Canada', score: 7.0, rank: 1 },
          { country: 'United States', score: 6.9, rank: 2 }
        ],
        gdp: [
          { country: 'United States', score: 65000, rank: 1 },
          { country: 'Canada', score: 52000, rank: 2 }
        ]
      }
    }

    const regionKey = region.replace('_', ' ')
    return dataMap[region]?.[indicator] || dataMap.western_europe.happiness
  }

  const handleCompare = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Get mock data for the selected region and indicator
      const data = getMockRegionalData(selectedRegion, selectedIndicator)
      setTopPerformers(data)

      // Create bar chart
      const countries = data.map(item => item.country)
      const scores = data.map(item => item.score)
      const colors = generateColorPalette(countries.length)

      const dataset = createBarDataset(
        indicators.find(i => i.value === selectedIndicator)?.label || 'Score',
        scores,
        colors
      )

      const config = getBarChartConfig(
        `${indicators.find(i => i.value === selectedIndicator)?.label} Comparison - ${regions.find(r => r.value === selectedRegion)?.label}`,
        [dataset],
        countries
      )

      // Customize chart based on indicator
      if (selectedIndicator === 'happiness') {
        config.options.scales.y.max = 10
        config.options.scales.y.title.text = 'Happiness Score (0-10)'
      } else if (selectedIndicator === 'gdp') {
        config.options.scales.y.title.text = 'GDP per Capita (USD)'
      }

      setChartData(config)

    } catch (err) {
      console.error('Error comparing regions:', err)
      setError('Failed to load comparison data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Load initial data
  useEffect(() => {
    handleCompare()
  }, [])

  const getRegionalInsights = () => {
    if (topPerformers.length === 0) return null

    const topScore = topPerformers[0]?.score || 0
    const bottomScore = topPerformers[topPerformers.length - 1]?.score || 0
    const avgScore = topPerformers.reduce((sum, country) => sum + country.score, 0) / topPerformers.length
    const gap = topScore - bottomScore

    return {
      topCountry: topPerformers[0]?.country,
      topScore,
      avgScore: avgScore.toFixed(2),
      gap: gap.toFixed(1)
    }
  }

  const insights = getRegionalInsights()

  return (
    <div className="card">
      <h2>🏆 Regional Comparison</h2>
      <p>Compare countries within a region to see which are outperforming others on chosen indicators</p>
      
      <div className="responsive-form-grid" style={{ margin: '2rem 0' }}>
        <div className="form-group">
          <label>Select Region:</label>
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map(region => (
              <option key={region.value} value={region.value}>{region.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Indicator:</label>
          <select 
            value={selectedIndicator} 
            onChange={(e) => setSelectedIndicator(e.target.value)}
          >
            {indicators.map(indicator => (
              <option key={indicator.value} value={indicator.value}>{indicator.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Year:</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Array.from({ length: 14 }, (_, i) => 2010 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={handleCompare}
        className="responsive-button"
        style={{ background: 'linear-gradient(45deg, #fa709a, #fee140)' }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Generate Comparison'}
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* Regional Leaderboard */}
      <div className="chart-container">
        <h3>Regional Leaderboard - {regions.find(r => r.value === selectedRegion)?.label}</h3>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
          Top performers in {indicators.find(i => i.value === selectedIndicator)?.label} for {selectedYear}
        </p>

        {topPerformers.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {topPerformers.map((country, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                background: index < 3 ? 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)' : '#f8f9fa',
                borderRadius: '10px',
                border: index === 0 ? '3px solid #fdcb6e' : index === 1 ? '3px solid #e17055' : index === 2 ? '3px solid #fd79a8' : 'none'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: index === 0 ? '#fdcb6e' : index === 1 ? '#e17055' : index === 2 ? '#fd79a8' : '#74b9ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  marginRight: '1rem'
                }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${country.rank}`}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#333' }}>{country.country}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                    {indicators.find(i => i.value === selectedIndicator)?.label}: {
                      selectedIndicator === 'gdp' ? 
                        `$${country.score.toLocaleString()}` : 
                        country.score.toFixed(1)
                    }
                  </p>
                </div>
                
                <div style={{
                  background: index < 3 ? 'rgba(255,255,255,0.8)' : '#e74c3c',
                  color: index < 3 ? '#333' : 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontWeight: 'bold'
                }}>
                  #{country.rank}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="loading">Loading regional data...</div>
        )}
      </div>

      {/* Comparison Chart */}
      <div className="chart-container">
        <h3>Performance Comparison Chart</h3>
        {loading ? (
          <div className="loading">Loading chart data...</div>
        ) : chartData ? (
          <div style={{ height: '400px' }}>
            <Bar {...chartData} />
          </div>
        ) : (
          <div className="viz-container" style={{ 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <div>Comparison chart will appear here</div>
          </div>
        )}
      </div>

      {/* Regional Insights */}
      <div className="chart-container">
        <h3>Regional Insights</h3>
        {insights ? (
          <div className="responsive-grid">
            <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '8px', borderLeft: '4px solid #43e97b' }}>
              <h4 style={{ color: '#2d5a2d', margin: '0 0 0.5rem 0' }}>🌟 Top Performer</h4>
              <p style={{ margin: 0, color: '#333' }}>
                {insights.topCountry} leads with a score of {
                  selectedIndicator === 'gdp' ? 
                    `$${insights.topScore.toLocaleString()}` : 
                    insights.topScore.toFixed(1)
                }
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: '#fff3e0', borderRadius: '8px', borderLeft: '4px solid #ff9800' }}>
              <h4 style={{ color: '#e65100', margin: '0 0 0.5rem 0' }}>📈 Average Performance</h4>
              <p style={{ margin: 0, color: '#333' }}>
                Regional average: {
                  selectedIndicator === 'gdp' ? 
                    `$${parseFloat(insights.avgScore).toLocaleString()}` : 
                    insights.avgScore
                }
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: '#e3f2fd', borderRadius: '8px', borderLeft: '4px solid #2196f3' }}>
              <h4 style={{ color: '#1565c0', margin: '0 0 0.5rem 0' }}>🎯 Performance Gap</h4>
              <p style={{ margin: 0, color: '#333' }}>
                Gap between top and bottom: {
                  selectedIndicator === 'gdp' ? 
                    `$${parseFloat(insights.gap).toLocaleString()}` : 
                    `${insights.gap} points`
                }
              </p>
            </div>
          </div>
        ) : (
          <div className="responsive-grid">
            <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '8px', borderLeft: '4px solid #43e97b' }}>
              <h4 style={{ color: '#2d5a2d', margin: '0 0 0.5rem 0' }}>🌟 Top Performer</h4>
              <p style={{ margin: 0, color: '#333' }}>Select a region to see insights</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegionalComparison
