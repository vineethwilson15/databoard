import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { getWorldBankData, getCountries, INDICATORS } from '../services/apiService'
import { getLineChartConfig, createTrendDataset, CHART_COLORS } from '../utils/chartConfig'

const CountryExplorer = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA')
  const [selectedIndicator, setSelectedIndicator] = useState('NY.GDP.PCAP.CD')
  const [startYear, setStartYear] = useState('2015')
  const [endYear, setEndYear] = useState('2023')
  const [countries, setCountries] = useState([])
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const indicators = [
    { value: 'NY.GDP.PCAP.CD', label: 'GDP per Capita' },
    { value: 'SP.DYN.LE00.IN', label: 'Life Expectancy' },
    { value: 'SE.PRM.NENR', label: 'Education Index' },
    { value: 'SL.UEM.TOTL.ZS', label: 'Unemployment Rate' },
    { value: 'EN.ATM.CO2E.PC', label: 'CO2 Emissions per Capita' }
  ]

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await getCountries()
        setCountries(countriesData)
      } catch (err) {
        console.error('Error loading countries:', err)
        // Set fallback countries
        setCountries([
          { code: 'USA', name: 'United States' },
          { code: 'CAN', name: 'Canada' },
          { code: 'GBR', name: 'United Kingdom' },
          { code: 'DEU', name: 'Germany' },
          { code: 'FRA', name: 'France' },
          { code: 'JPN', name: 'Japan' },
          { code: 'IND', name: 'India' },
          { code: 'CHN', name: 'China' },
          { code: 'BRA', name: 'Brazil' },
          { code: 'AUS', name: 'Australia' }
        ])
      }
    }
    loadCountries()
  }, [])

  const handleExplore = async () => {
    setLoading(true)
    setError('')
    
    try {
      const data = await getWorldBankData(selectedCountry, selectedIndicator, parseInt(startYear), parseInt(endYear))
      
      if (data.length === 0) {
        setError('No data available for the selected parameters')
        setChartData(null)
        return
      }

      const years = data.map(item => item.year)
      const values = data.map(item => item.value)
      const indicatorLabel = indicators.find(ind => ind.value === selectedIndicator)?.label || 'Indicator'
      const countryName = countries.find(country => country.code === selectedCountry)?.name || selectedCountry

      const dataset = createTrendDataset(
        `${indicatorLabel} - ${countryName}`,
        values,
        CHART_COLORS.primary,
        CHART_COLORS.primaryBorder
      )

      const config = getLineChartConfig(
        `${indicatorLabel} Trends for ${countryName} (${startYear}-${endYear})`,
        [dataset],
        years
      )

      setChartData(config)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>🌍 Country Explorer</h2>
      <p>Explore indicator trends for a selected country over a chosen time period</p>
      
      <div className="responsive-form-grid" style={{ margin: '2rem 0' }}>
        <div className="form-group">
          <label>Select Country:</label>
          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={loading}
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>{country.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Select Indicator:</label>
          <select 
            value={selectedIndicator} 
            onChange={(e) => setSelectedIndicator(e.target.value)}
            disabled={loading}
          >
            {indicators.map(indicator => (
              <option key={indicator.value} value={indicator.value}>{indicator.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Year:</label>
          <select 
            value={startYear} 
            onChange={(e) => setStartYear(e.target.value)}
          >
            {Array.from({ length: 14 }, (_, i) => 2010 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>End Year:</label>
          <select 
            value={endYear} 
            onChange={(e) => setEndYear(e.target.value)}
          >
            {Array.from({ length: 14 }, (_, i) => 2010 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        onClick={handleExplore}
        className="responsive-button"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Explore Trends'}
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="chart-container">
        <h3>Trend Analysis</h3>
        {loading ? (
          <div className="loading">Loading chart data...</div>
        ) : chartData ? (
          <div style={{ height: '400px' }}>
            <Line {...chartData} />
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            📊 Click "Explore Trends" to visualize data for the selected country and indicator
          </p>
        )}
      </div>
    </div>
  )
}

export default CountryExplorer
