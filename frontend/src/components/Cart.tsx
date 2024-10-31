import React, { useEffect, useState } from "react";
import { CartItemProps } from "../types/CartItem";
import axios from "axios";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import CartItem from "./CartItem";

const Cart: React.FC = () => {
    const [cart, setCart] = useState<CartItemProps[]>([]);

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
            <Typography variant="h5" gutterBottom>Total Price: {getTotalPrice().toFixed(2)}€</Typography>
            <Button variant="contained">Checkout</Button>
        </Container>
    );
};
export default Cart;
