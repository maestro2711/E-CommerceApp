
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
import Checkout from "./components/Checkout.tsx";

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
        alert("Bestellung erfolgreich")
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


         <Divider />
         <div>
             <h1>Willkommen in unserem spannenden Shop 2024</h1>
             <p>Entdecken Sie unsere neuesten Styles für den Herbst</p>

         </div>





         <Routes>





                     <Route path="/cart" element={<Cart onCartClear={handleClearCart} />}/>
             <Route path ="/checkout" element={<Checkout onOrderPlaced={handleClearCart}/>}/>
                     <Route path="/" element={<ProductList onAddToCart={handleAddToCart} searchCategory={searchCategory} />} />
                     <Route path="/login" element={!isAuthenticated ? <UserLogin onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
                     <Route path="/register" element={!isAuthenticated ? <UserRegistration /> : <Navigate to="/" />} />



                </Routes>

                 <Footer/>
     </>


    );
};

export default App;


