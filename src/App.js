import React from 'react'
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Home1 from "./pages/home1.js";
import About from "./pages/about.js";
import Categories from "./pages/categories.jsx";
import SubCategories from './pages/subcategories.jsx';
import AddProducts from "./pages/addProducts.jsx";
import AddPro from "./pages/AddPro.jsx";
import ViewPro from "./pages/ViewPro.jsx";
import CategoryTable from './components/CategoryTable.jsx';
import EditProducts from "./pages/editProducts.jsx"
import Users from './pages/users.jsx';
import ViewUsers from './pages/ViewUsers.jsx';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "../src/pages/Login.jsx"
import Test from "./pages/test.jsx"
import DisplayProducts from './pages/displayproducts.jsx';
    
function App() {
  return ( 
   <>
   {/* <CategoryTable/> */}
   <BrowserRouter>
   <Routes>
    <Route path="/" exact element={<Home1/>}></Route>
    <Route path="/about" exact element={<About/>}></Route>
    <Route path="/addProducts" exact element={<AddProducts/>}></Route>
    <Route path="/AddPro" exact element={<AddPro/>}></Route>
    <Route path="/ViewPro" exact element={<ViewPro/>}></Route>



    <Route path="/users" exact element={<Users/>}></Route>
    <Route path="/ViewUsers" exact element={<ViewUsers/>}></Route>
    <Route path="/categories" exact element={<Categories/>}></Route>
    <Route path="/subcategories" exact element={<SubCategories/>}></Route>
    <Route path="/Login" exact element={<Login/>}></Route>
    <Route path="/test" exact element={<Test/>}></Route>
    <Route path="/about/editProducts/:id" element={<EditProducts/>}/>
        <Route path="/about/editProducts/:id" element={<EditProducts/>}/>
        <Route path="/displayProducts" exact element={<DisplayProducts/>}></Route>

    <Route path="/login" element={<Login/>}/>

   </Routes>
   </BrowserRouter>
   <ToastContainer/>
    

   </>
  );
}

export default App;

















