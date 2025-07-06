import axios from 'axios'

// API Configuration
const WORLD_BANK_BASE_URL = 'https://api.worldbank.org/v2'
const HAPPINESS_BASE_URL = 'https://data.worldhappiness.report'

// Create axios instances with default configurations
const worldBankAPI = axios.create({
  baseURL: WORLD_BANK_BASE_URL,
  params: {
    format: 'json',
    per_page: 1000
  }
})

const happinessAPI = axios.create({
  baseURL: HAPPINESS_BASE_URL,
  timeout: 10000
})

// World Bank Indicators
export const INDICATORS = {
  GDP_PER_CAPITA: 'NY.GDP.PCAP.CD',
  LIFE_EXPECTANCY: 'SP.DYN.LE00.IN',
  UNEMPLOYMENT: 'SL.UEM.TOTL.ZS',
  CO2_EMISSIONS: 'EN.ATM.CO2E.PC',
  EDUCATION_INDEX: 'SE.PRM.NENR',
  POPULATION: 'SP.POP.TOTL',
  HEALTH_EXPENDITURE: 'SH.XPD.CHEX.GD.ZS',
  INTERNET_USERS: 'IT.NET.USER.ZS'
}

// Country Regions Mapping
export const REGIONS = {
  'Western Europe': ['DNK', 'CHE', 'ISL', 'NOR', 'FIN', 'NLD', 'SWE', 'AUT', 'LUX', 'DEU', 'BEL', 'GBR', 'IRL', 'FRA'],
  'North America': ['USA', 'CAN'],
  'Australia and New Zealand': ['AUS', 'NZL'],
  'Middle East and North Africa': ['ISR', 'ARE', 'SAU', 'KWT', 'BHR', 'QAT', 'JOR', 'LBN', 'MAR', 'DZA', 'TUN', 'EGY'],
  'Latin America and Caribbean': ['CRI', 'URY', 'CHL', 'PAN', 'BRA', 'ARG', 'MEX', 'COL', 'ECU', 'PER', 'PRY', 'BOL'],
  'Central and Eastern Europe': ['CZE', 'SVN', 'SVK', 'POL', 'LTU', 'EST', 'RUS', 'LVA', 'BGR', 'HRV', 'HUN', 'ROU'],
  'East Asia': ['TWN', 'JPN', 'KOR', 'CHN', 'HKG', 'SGP', 'MNG'],
  'Southeast Asia': ['THA', 'PHL', 'MYS', 'VNM', 'IDN', 'LAO', 'KHM'],
  'South Asia': ['NPL', 'BTN', 'LKA', 'IND', 'BGD', 'PAK', 'AFG'],
  'Sub-Saharan Africa': ['MWI', 'TZA', 'RWA', 'ETH', 'KEN', 'UGA', 'GHA', 'SEN', 'NGA', 'ZAF', 'ZWE', 'ZMB']
}

// API Service Functions

// Get World Bank indicator data for a country
export const getWorldBankData = async (countryCode, indicator, startYear = 2010, endYear = 2023) => {
  try {
    const response = await worldBankAPI.get(
      `/country/${countryCode}/indicator/${indicator}`,
      {
        params: {
          date: `${startYear}:${endYear}`
        }
      }
    )
    
    if (response.data && response.data[1]) {
      return response.data[1]
        .filter(item => item.value !== null)
        .map(item => ({
          year: parseInt(item.date),
          value: item.value,
          country: item.country.value,
          indicator: item.indicator.value
        }))
        .sort((a, b) => a.year - b.year)
    }
    return []
  } catch (error) {
    console.error('Error fetching World Bank data:', error)
    return []
  }
}

// Get happiness data (using mock data as the actual API might have CORS issues)
export const getHappinessData = async (countryCode, year = 2023) => {
  try {
    // Mock happiness data based on real World Happiness Report data
    const mockHappinessData = {
      'DNK': { score: 7.6, rank: 2 },
      'CHE': { score: 7.5, rank: 3 },
      'ISL': { score: 7.4, rank: 4 },
      'FIN': { score: 7.4, rank: 1 },
      'NLD': { score: 7.3, rank: 5 },
      'USA': { score: 6.9, rank: 15 },
      'CAN': { score: 7.0, rank: 13 },
      'GBR': { score: 7.0, rank: 19 },
      'DEU': { score: 7.0, rank: 16 },
      'FRA': { score: 6.7, rank: 21 },
      'IND': { score: 4.0, rank: 126 },
      'CHN': { score: 5.3, rank: 72 },
      'JPN': { score: 6.0, rank: 47 },
      'BRA': { score: 6.1, rank: 49 },
      'AUS': { score: 7.1, rank: 12 },
      'NZL': { score: 7.1, rank: 11 }
    }
    
    return mockHappinessData[countryCode] || { score: 5.0, rank: 100 }
  } catch (error) {
    console.error('Error fetching happiness data:', error)
    return { score: 5.0, rank: 100 }
  }
}

// Get countries list
export const getCountries = async () => {
  try {
    const response = await worldBankAPI.get('/country', {
      params: {
        per_page: 300
      }
    })
    
    if (response.data && response.data[1]) {
      return response.data[1]
        .filter(country => country.capitalCity) // Filter out regions and aggregates
        .map(country => ({
          code: country.id,
          name: country.name,
          region: country.region?.value || 'Other'
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    }
    return []
  } catch (error) {
    console.error('Error fetching countries:', error)
    // Return fallback country list
    return [
      { code: 'USA', name: 'United States', region: 'North America' },
      { code: 'CAN', name: 'Canada', region: 'North America' },
      { code: 'GBR', name: 'United Kingdom', region: 'Europe & Central Asia' },
      { code: 'DEU', name: 'Germany', region: 'Europe & Central Asia' },
      { code: 'FRA', name: 'France', region: 'Europe & Central Asia' },
      { code: 'JPN', name: 'Japan', region: 'East Asia & Pacific' },
      { code: 'IND', name: 'India', region: 'South Asia' },
      { code: 'CHN', name: 'China', region: 'East Asia & Pacific' },
      { code: 'BRA', name: 'Brazil', region: 'Latin America & Caribbean' },
      { code: 'AUS', name: 'Australia', region: 'East Asia & Pacific' }
    ]
  }
}

// Get regional happiness data
export const getRegionalData = async (year = 2023) => {
  try {
    // Mock regional happiness data
    const regionalData = {
      'Western Europe': { averageScore: 7.2, countries: 14, topCountry: 'Finland' },
      'North America': { averageScore: 6.95, countries: 2, topCountry: 'Canada' },
      'Australia and New Zealand': { averageScore: 7.1, countries: 2, topCountry: 'New Zealand' },
      'Middle East and North Africa': { averageScore: 5.3, countries: 12, topCountry: 'Israel' },
      'Latin America and Caribbean': { averageScore: 5.8, countries: 12, topCountry: 'Costa Rica' },
      'Central and Eastern Europe': { averageScore: 6.1, countries: 12, topCountry: 'Czech Republic' },
      'East Asia': { averageScore: 5.9, countries: 7, topCountry: 'Taiwan' },
      'Southeast Asia': { averageScore: 5.4, countries: 7, topCountry: 'Thailand' },
      'South Asia': { averageScore: 4.6, countries: 7, topCountry: 'Nepal' },
      'Sub-Saharan Africa': { averageScore: 4.2, countries: 10, topCountry: 'Mauritius' }
    }
    
    return regionalData
  } catch (error) {
    console.error('Error fetching regional data:', error)
    return {}
  }
}

// Calculate correlation between two datasets
export const calculateCorrelation = (data1, data2) => {
  if (data1.length !== data2.length || data1.length === 0) return 0
  
  const n = data1.length
  const sumX = data1.reduce((sum, val) => sum + val, 0)
  const sumY = data2.reduce((sum, val) => sum + val, 0)
  const sumXY = data1.reduce((sum, val, i) => sum + val * data2[i], 0)
  const sumX2 = data1.reduce((sum, val) => sum + val * val, 0)
  const sumY2 = data2.reduce((sum, val) => sum + val * val, 0)
  
  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
  
  return denominator === 0 ? 0 : numerator / denominator
}

// Get mock India correlation data
export const getIndiaCorrelationData = async () => {
  try {
    return [
      { indicator: 'Social Support', correlation: 0.81, trend: 'positive', description: 'Very strong positive correlation' },
      { indicator: 'GDP per Capita', correlation: 0.78, trend: 'positive', description: 'Strong positive correlation with happiness' },
      { indicator: 'Education Index', correlation: 0.72, trend: 'positive', description: 'Strong positive correlation' },
      { indicator: 'Life Expectancy', correlation: 0.65, trend: 'positive', description: 'Moderate positive correlation' },
      { indicator: 'Unemployment Rate', correlation: -0.58, trend: 'negative', description: 'Moderate negative correlation' },
      { indicator: 'Air Pollution', correlation: -0.43, trend: 'negative', description: 'Moderate negative correlation' }
    ]
  } catch (error) {
    console.error('Error fetching India correlation data:', error)
    return []
  }
}
