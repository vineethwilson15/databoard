import React from 'react'

const Header = () => {
  return (
    <header style={{
      width: '100%',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '2rem 1rem',
      margin: 0,
      textAlign: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      boxSizing: 'border-box'
    }}>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 'bold',
        color: 'white',
        margin: 0,
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}>
        🌍 DataBoard
      </h1>
      <p style={{
        fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
        color: 'rgba(255, 255, 255, 0.9)',
        margin: '0.5rem 0 0 0',
        padding: '0 1rem'
      }}>
        Global Happiness & Development Indicators Dashboard
      </p>
    </header>
  )
}

export default Header
