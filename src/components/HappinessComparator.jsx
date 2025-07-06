import React, { useState, useEffect } from 'react'
import { Line, Scatter } from 'react-chartjs-2'
import { getWorldBankData, getHappinessData, getHappinessTimeSeries, getCountries, calculateCorrelation } from '../services/apiService'
import { getLineChartConfig, getScatterChartConfig, createTrendDataset, createScatterDataset, CHART_COLORS } from '../utils/chartConfig'

const HappinessComparator = () => {
  const [selectedCountry, setSelectedCountry] = useState('DNK')
  const [selectedIndicator, setSelectedIndicator] = useState('NY.GDP.PCAP.CD')
  const [startYear, setStartYear] = useState('2018')
  const [endYear, setEndYear] = useState('2023')
  const [countries, setCountries] = useState([])
  const [happinessChartData, setHappinessChartData] = useState(null)
  const [indicatorChartData, setIndicatorChartData] = useState(null)
  const [correlationData, setCorrelationData] = useState(null)
  const [correlation, setCorrelation] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const indicators = [
    { value: 'NY.GDP.PCAP.CD', label: 'GDP per Capita' },
    { value: 'SP.DYN.LE00.IN', label: 'Life Expectancy' },
    { value: 'SE.PRM.NENR', label: 'Education Index' },
    { value: 'SL.UEM.TOTL.ZS', label: 'Unemployment Rate' },
    { value: 'EN.ATM.CO2E.PC', label: 'CO2 Emissions per Capita' },
    { value: 'SH.XPD.CHEX.GD.ZS', label: 'Health Expenditure' }
  ]

  // Load countries on component mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await getCountries()
        // Filter for happiness report countries
        const happinessCountries = countriesData.filter(country => 
          ['DNK', 'CHE', 'ISL', 'FIN', 'NLD', 'NOR', 'SWE', 'LUX', 'NZL', 'AUT', 'USA', 'CAN', 'GBR', 'DEU', 'FRA', 'IND', 'JPN'].includes(country.code)
        )
        setCountries(happinessCountries)
      } catch (err) {
        console.error('Error loading countries:', err)
        setCountries([
          { code: 'DNK', name: 'Denmark' },
          { code: 'CHE', name: 'Switzerland' },
          { code: 'ISL', name: 'Iceland' },
          { code: 'FIN', name: 'Finland' },
          { code: 'NLD', name: 'Netherlands' },
          { code: 'USA', name: 'United States' },
          { code: 'CAN', name: 'Canada' },
          { code: 'IND', name: 'India' }
        ])
      }
    }
    loadCountries()
  }, [])

  const handleCompare = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Get World Bank indicator data
      const indicatorData = await getWorldBankData(selectedCountry, selectedIndicator, parseInt(startYear), parseInt(endYear))
      
      if (indicatorData.length === 0) {
        setError('No indicator data available for the selected parameters')
        return
      }

      // Try to get real happiness time series data
      console.log('Fetching happiness time series for', selectedCountry)
      const happinessTimeSeriesData = await getHappinessTimeSeries(selectedCountry, parseInt(startYear), parseInt(endYear))
      
      // Align data by years that exist in both datasets
      const commonYears = indicatorData
        .map(item => item.year)
        .filter(year => happinessTimeSeriesData.some(h => h.year === year))
        .sort((a, b) => a - b)
      
      if (commonYears.length === 0) {
        setError('No overlapping years found between indicator and happiness data')
        return
      }
      
      const alignedIndicatorData = commonYears.map(year => {
        const indicatorItem = indicatorData.find(item => item.year === year)
        return indicatorItem ? indicatorItem.value : null
      }).filter(value => value !== null)
      
      const alignedHappinessData = commonYears.map(year => {
        const happinessItem = happinessTimeSeriesData.find(item => item.year === year)
        return happinessItem ? happinessItem.value : null
      }).filter(value => value !== null)

      const indicatorLabel = indicators.find(ind => ind.value === selectedIndicator)?.label || 'Indicator'
      const countryName = countries.find(country => country.code === selectedCountry)?.name || selectedCountry

      // Create happiness trend chart
      const happinessDataset = createTrendDataset(
        'Happiness Score',
        alignedHappinessData,
        CHART_COLORS.success,
        CHART_COLORS.successBorder
      )

      const happinessConfig = getLineChartConfig(
        `Happiness Index Trends for ${countryName}`,
        [happinessDataset],
        commonYears
      )

      // Create indicator trend chart
      const indicatorDataset = createTrendDataset(
        indicatorLabel,
        alignedIndicatorData,
        CHART_COLORS.secondary,
        CHART_COLORS.secondaryBorder
      )

      const indicatorConfig = getLineChartConfig(
        `${indicatorLabel} Trends for ${countryName}`,
        [indicatorDataset],
        commonYears
      )

      // Create correlation scatter plot
      const scatterData = alignedIndicatorData.map((value, index) => ({
        x: value,
        y: alignedHappinessData[index]
      }))

      const scatterDataset = createScatterDataset(
        'Correlation',
        scatterData,
        CHART_COLORS.primary
      )

      const scatterConfig = getScatterChartConfig(
        `Correlation: ${indicatorLabel} vs Happiness Score`,
        indicatorLabel,
        'Happiness Score'
      )
      scatterConfig.data.datasets = [scatterDataset]

      // Calculate correlation
      const correlationValue = calculateCorrelation(alignedIndicatorData, alignedHappinessData)

      setHappinessChartData(happinessConfig)
      setIndicatorChartData(indicatorConfig)
      setCorrelationData(scatterConfig)
      setCorrelation(correlationValue)

    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>📊 Happiness Comparator</h2>
      <p>Compare an indicator with the happiness index for a country and time range</p>
      
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
          <label>Select Indicator to Compare:</label>
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
        onClick={handleCompare}
        className="responsive-button"
        style={{ background: 'linear-gradient(45deg, #f093fb, #f5576c)' }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Compare with Happiness'}
      </button>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="responsive-chart-grid" style={{ margin: '2rem 0' }}>
        <div className="chart-container">
          <h3>Happiness Index Trend</h3>
          {loading ? (
            <div className="loading">Loading happiness data...</div>
          ) : happinessChartData ? (
            <div style={{ height: '300px' }}>
              <Line {...happinessChartData} />
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              😊 Happiness score trends will appear here
            </p>
          )}
        </div>

        <div className="chart-container">
          <h3>{indicators.find(i => i.value === selectedIndicator)?.label} Trend</h3>
          {loading ? (
            <div className="loading">Loading indicator data...</div>
          ) : indicatorChartData ? (
            <div style={{ height: '300px' }}>
              <Line {...indicatorChartData} />
            </div>
          ) : (
            <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              📈 Indicator trends will appear here
            </p>
          )}
        </div>
      </div>

      <div className="chart-container">
        <h3>Correlation Analysis</h3>
        {correlation !== 0 && (
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{
              background: Math.abs(correlation) > 0.5 ? '#4CAF50' : '#FF9800',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              display: 'inline-block',
              fontWeight: 'bold'
            }}>
              Correlation Coefficient: {correlation.toFixed(3)}
            </div>
            <p style={{ marginTop: '0.5rem', color: '#666' }}>
              {Math.abs(correlation) > 0.7 ? 'Strong' : Math.abs(correlation) > 0.4 ? 'Moderate' : 'Weak'} 
              {correlation > 0 ? ' positive' : ' negative'} correlation
            </p>
          </div>
        )}
        {loading ? (
          <div className="loading">Loading correlation data...</div>
        ) : correlationData ? (
          <div style={{ height: '400px' }}>
            <Scatter {...correlationData} />
          </div>
        ) : (
          <p style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            🔗 Correlation scatter plot will appear here after analysis
          </p>
        )}
      </div>
    </div>
  )
}

export default HappinessComparator
