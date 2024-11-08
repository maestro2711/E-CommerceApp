import React, { useEffect, useState } from "react";
import { CartItemProps } from "../types/CartItem";
import axios from "axios";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import CartItem from "./CartItem";
import {useNavigate} from "react-router-dom";

interface CartProps {
    onCartClear:() =>void;
}

const Cart: React.FC<CartProps> = ({onCartClear}) => {
    const [cart, setCart] = useState<CartItemProps[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/cart`, { withCredentials: true })
            .then((response) => {
                setCart(response.data.items);
            })
            .catch(error => {
                console.log("Error fetching cart:", error);
            });
    }, []);


    const handleUpdateQuantity = (productId: number, quantity: number) => {
        axios.put(`/api/cart/update`, { productId, quantity }, { withCredentials: true })
            .then(() => {
                setCart(cart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                ));
            })
            .catch(error => console.log("Error updating quantity: ", error));
    };

    const handleRemove = (productId: number) => {
        axios.delete(`/api/cart/remove/${productId}`, { withCredentials: true })
            .then(() => {
                setCart(cart.filter(item => item.productId !== productId));
            })
            .catch(error => console.log("Error removing product from cart: ", error));
    };

    const handleClearCart =()=>{
        axios.delete("/api/cart/clear", {withCredentials:true})
            .then(()=>{
                setCart([])
                onCartClear();
            })
            .catch(error => console.log("Error removing cart: ", error));
    }

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Cart</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map(item => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemove}
                        />
                    ))}
                </TableBody>
            </Table>
            <div>
                {/* Anzeige der einzelnen Artikel hier */}
                <Button onClick={handleClearCart} variant="contained" color="secondary">
                    Clear Cart
                </Button>
            </div>
            <Typography variant="h5" gutterBottom>Total Price: {getTotalPrice().toFixed(2)}€</Typography>
            <Button onClick={() => navigate("/checkout")} variant="contained">Zur Kasse</Button>
        </Container>
    );
};
export default Cart;
