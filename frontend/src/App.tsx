
import React, {useEffect, useState} from 'react';
import ProductList from './components/ProductList';


import {Navigate, Route,  Routes} from "react-router-dom";

import { Divider, } from "@mui/material";
import Footer from "./pages/Footer.tsx";
import UserRegistration from "./components/UserRegistration.tsx";
import UserLogin from "./components/UserLogin.tsx";
import Cart from "./components/Cart.tsx";
import axios from "axios";
import NavBar from "./components/NavBar.tsx";

const App: React.FC = () => {
    const [cartItemCount, setCartItemCount] = useState<number>(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchCategory, setSearchCategory] = useState<string>("");
    // Zustand für die Artikelanzahl im Warenkorb
  // const username= localStorage.getItem("username")
    // Funktion zum Hinzufügen von Artikeln zum Warenkorb und Erhöhen der Zählung
    const handleAddToCart = (  quantity: number) => {
        setCartItemCount(cartItemCount + quantity);
    };

    // Überprüfen der Sitzung beim Laden der Seite
    useEffect(() => {
        axios.get("/api/users/check-session", { withCredentials: true })
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);


    const handleLogout = () => {
        axios.post("/api/users/logout", {}, { withCredentials: true })
            .then(() => setIsAuthenticated(false))
            .catch(err => console.log("Error during logout:", err));
    };

    const handleSearch = (category: string) => {
        setSearchCategory(category);
    }
    const handleResetSearch =()=>{
        setSearchCategory("");
    }
    const handleClearCart =()=>{
        setCartItemCount(0);
    }



    return (
     <>
         <nav>
             <NavBar isAuthenticated={isAuthenticated}
                     onLogout={handleLogout}
             onSearch={handleSearch}
             onResetSearch={handleResetSearch}
             cartItemCount={cartItemCount}/>
         </nav>

         {/*<nav style={{backgroundColor:'lightblue'}}>
             <h1>OnlineShop</h1>
             <div style={{display:"flex", justifyContent:"space-around"}}>
             <Link href="/"  style={{color:'white', fontSize:'50px',textDecoration:'none'}}>ProductList</Link>
                 <Link href={"/register"} style={{ fontSize:'50px', color: 'white',textAlign:'right', textDecoration:'none' }}>
                     Register
                 </Link>
             <Link href={"/login"} style={{fontSize:'50px',textDecoration:'none',color:'white',textAlign:'right'}}><AccountCircleIcon style={{textDecoration:'none',fontSize:'50px'}}/></Link>
             <IconButton color="inherit">
                 <Link href={"/cart/" +username} style={{ textDecoration: 'none', color: 'white' ,fontSize:'50px'}}>
                     <Badge badgeContent={cartItemCount} color="secondary"  >
                         <ShoppingCartIcon  style={{textDecoration:'none',fontSize:'50px'}}/>
                     </Badge>
                 </Link>
             </IconButton>
             </div>

         </nav>*/}
         <Divider />
         <div>
             <h1>Willkommen in unserem spannenden Shop 2024</h1>
             <p>Entdecken Sie unsere neuesten Styles für den Herbst</p>

         </div>



         {/*<Navigation/>*/}

         <Routes>
             {/*<Route path="/" element={<ProductList onAddToCart={handleAddToCart}/>}/>
             <Route path="/products/:id" element={<ProductItem/>}/>
            <Route path="/register" element={<UserRegistration/>}/>
            <Route path="/login" element={<UserLogin/>}/>
             <Route path="/cart/:id" element={<Cart />}/>*/}




                     <Route path="/cart" element={<Cart onCartClear={handleClearCart} />}/>
                     <Route path="/" element={<ProductList onAddToCart={handleAddToCart} searchCategory={searchCategory} />} />
                     <Route path="/login" element={!isAuthenticated ? <UserLogin onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
                     <Route path="/register" element={!isAuthenticated ? <UserRegistration /> : <Navigate to="/" />} />



                </Routes>

                 <Footer/>
     </>


    );
};

export default App;


