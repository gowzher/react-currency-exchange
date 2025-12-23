import { use, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Currency from './components/currency.jsx'


function App() {

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Currency />
    </div>
  )
}

export default App
