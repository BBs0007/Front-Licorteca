import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home-page'
import SupplierPage from './pages/Supplier-page'
import ClientPage from './pages/Client-page'
import EmployeePage from './pages/Employee-page'
import ProductPage from './pages/Product-page'
import SalePage from './pages/Sale-page'
import CatalogPage from './pages/Catalogo-page'
import PurchasePage from './pages/Purchase-page'
import { useState } from 'react'


function App() {

  const [carProducts, setCarProducts] = useState([]);

  

  return (
    <>
      <Routes>
        <Route path='/'          element={<HomePage     />}  />
        <Route path='/supplier'  element={<SupplierPage />}  />
        <Route path='/client'    element={<ClientPage   />}  />
        <Route path='/employee'  element={<EmployeePage />}  />
        <Route path='/product'   element={<ProductPage  />}  />
        <Route path='/catalogo'  element={<CatalogPage  />}  />
        <Route path='/sale'      element={<SalePage     />}  />
        <Route path='/purchase'  element={<PurchasePage />}  />
      </Routes>
    </>
  )
}

export default App
