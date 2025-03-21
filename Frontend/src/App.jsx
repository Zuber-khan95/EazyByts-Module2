import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import { useEffect } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Layout from "./pages/Layout.jsx"
import Home from "./pages/Home.jsx"
import AddStock from './pages/AddStock.jsx'
import Portfolio from './pages/Portfolio.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx';
import NotFound from "./pages/NotFound.jsx"
import EditStock from './pages/EditStock.jsx'

import { StockProvider } from './context/StockContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'

function App() {

  return (
    <AuthProvider>
  <StockProvider>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Layout/>}>
  <Route index element={<Home/>} />
<Route path="/addStock" element={<AddStock/>}/>
<Route path="/portfolio" element={
  <ProtectedRoute>
  <Portfolio/>
  </ProtectedRoute>
  }/>
 
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path="*" element={<NotFound/>}/>
  <Route path="/edit/:id" element={<EditStock/>}/>
  </Route>
</Routes>
</BrowserRouter>  
</StockProvider>
</AuthProvider>
  )
}

export default App
