
import React, {useState} from 'react';
import ProductList from './components/ProductList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { Route,  Routes} from "react-router-dom";
import ProductItem from "./components/ProductItem.tsx";
import {Badge, Divider, IconButton, Link} from "@mui/material";
import Footer from "./pages/Footer.tsx";
import UserRegistration from "./components/UserRegistration.tsx";
import UserLogin from "./components/UserLogin.tsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "./components/Cart.tsx";


const App: React.FC = () => {
    const [cartItemCount, setCartItemCount] = useState<number>(0);  // Zustand für die Artikelanzahl im Warenkorb

    // Funktion zum Hinzufügen von Artikeln zum Warenkorb und Erhöhen der Zählung
    const handleAddToCart = (quantity: number) => {
        setCartItemCount(cartItemCount + quantity);
    };

    return (
     <>
         <nav style={{backgroundColor:'lightblue'}}>
             <h1>OnlineShop</h1>
             <div style={{display:"flex", justifyContent:"space-around"}}>
             <Link href="/"  style={{color:'white', fontSize:'50px',textDecoration:'none'}}>ProductList</Link>
                 <Link href={"/register"} style={{ fontSize:'50px', color: 'white',textAlign:'right', textDecoration:'none' }}>
                     Register
                 </Link>
             <Link href={"/login"} style={{fontSize:'50px',textDecoration:'none',color:'white',textAlign:'right'}}><AccountCircleIcon style={{textDecoration:'none',fontSize:'50px'}}/></Link>
             <IconButton color="inherit">
                 <Link href={"/cart"} style={{ textDecoration: 'none', color: 'white' ,fontSize:'50px'}}>
                     <Badge badgeContent={cartItemCount} color="secondary"  >
                         <ShoppingCartIcon  style={{textDecoration:'none',fontSize:'50px'}}/>
                     </Badge>
                 </Link>
             </IconButton>
             </div>

         </nav>
         <Divider />
         <div>
             <h1>Willkommen in unserem spannenden Shop 2024</h1>
             <p>Entdecken Sie unsere neuesten Styles für den Herbst</p>

         </div>



         {/*<Navigation/>*/}
         <Routes>
             <Route path="/" element={<ProductList onAddToCart={handleAddToCart}/>}/>
             <Route path="/products/:id" element={<ProductItem/>}/>
            <Route path="/register" element={<UserRegistration/>}/>
            <Route path="/login" element={<UserLogin/>}/>
             <Route path="/cart" element={<Cart />}/>

                </Routes>

                 <Footer/>
     </>


    );
};

export default App;


