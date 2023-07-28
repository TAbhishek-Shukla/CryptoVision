import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Exchanges from './components/Exchanges'
import Coins from './components/Coins'
import Coindetails from './components/Coindetails'
import NotFound from './components/NotFound'
import Header from './components/Header'
import GotoTop from './components/GotoTop'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='exchanges' element={<Exchanges />} />
      <Route path='coins' element={<Coins />} />
      <Route path='coin/:id' element={<Coindetails />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <GotoTop />
    <Footer />
    </BrowserRouter>
  )
}

export default App