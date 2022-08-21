import React from 'react'
import MapPage from './Map'
import Rate from './Rate'
import Login from './Login'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export default function App() {



  return (
    <Router>
    <div>
        <Routes>
          <Route path='/home/:user_id' element={<MapPage />} />
          <Route path='/rate/:id/:longitude/:latitude/:user_id' element={<Rate />} />
          <Route path='/' element={<Login />} />
        </Routes>
    </div>
    </Router>
  )
}
