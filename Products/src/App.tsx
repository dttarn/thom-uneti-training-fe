import { Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import './index.css'
import ProductDetail from './pages/ProductDetail'

export default function App() {
  return (
    <Routes>
      {' '}
      //quan ly nhieu duong dan (danh sach web)
      <Route path='/' element={<ProductList />}></Route> //trang danh sach san
      pham
      <Route path='/products/:id' element={<ProductDetail />}></Route> //trang
      chi tiet san pham
    </Routes>
  )
}
