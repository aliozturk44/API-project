
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProductListing from './productListing'
import ProductCreate from './ProductCreate'
import ProductDetails from './ProductDetails'
import ProductEdit from './ProductEdit'

//Home page
function App() {
  return (
    <div className="App">
     <h1>React JS CRUD Operations</h1>
     <BrowserRouter>
  <Routes>
    <Route path='/' element={<ProductListing/>}></Route>
    <Route path='/product/create' element={<ProductCreate/>}></Route>
    <Route path='/product/detail/:productid' element={<ProductDetails/>}></Route>
    <Route path='/product/edit/:productid' element={<ProductEdit/>}></Route>
  </Routes>
  </BrowserRouter>
    </div>
  );
  
}

export default App;
