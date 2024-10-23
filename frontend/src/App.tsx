
import React from 'react';
import ProductList from './components/ProductList';

import Navigation from './components/Navigation';
import { Route,  Routes} from "react-router-dom";
import ProductItem from "./components/ProductItem.tsx";
import {IconButton, Link} from "@mui/material";
import Footer from "./pages/Footer.tsx";
import UserRegistration from "./components/UserRegistration.tsx";
import UserLogin from "./components/UserLogin.tsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const App: React.FC = () => {
    return (
     <>
         <nav style={{backgroundColor:'lightblue'}}>
             <h1>ModeShop</h1>
             <Link href="/"  style={{color:'white', fontSize:'50px',textDecoration:'none'}}>ProductList</Link>
                 <Link href={"/register"} style={{ fontSize:'50px', color: 'white',textAlign:'right', textDecoration:'none' }}>
                     Register
                 </Link>
             <Link href={"/login"} style={{fontSize:'50px',textDecoration:'none',color:'white',textAlign:'right'}}>Login</Link>
             <IconButton color="inherit">
                 <Link href={"/cart"} style={{ textDecoration: 'none', color: 'white' ,fontSize:'50px'}}>
                     <ShoppingCartIcon style={{color:'white',fontSize:'50px',textAlign:'right'}} />
                 </Link>
             </IconButton>

         </nav>



                {/*<Navigation/>*/}
                <Routes>
                    <Route path="/" element={<ProductList/>}/>
                    <Route path="/products/:id" element={<ProductItem/>}/>
                    <Route path="/register" element={<UserRegistration/>}/>
                    <Route path="/login" element={<UserLogin/>}/>

                </Routes>

                 <Footer/>
     </>


    );
};

export default App;


