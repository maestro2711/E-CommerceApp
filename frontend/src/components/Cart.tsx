import React, {useEffect, useState} from "react";
import {CartItemProps} from "../types/CartItem.ts";
import axios from "axios";
import {Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import CartItem from "./CartItem.tsx";


const Cart: React.FC = () => {
    const [cart, setCart]= useState<CartItemProps[]>([])
    //benutzername aus LocalStorage holen
    const username=localStorage.getItem("username")

    useEffect(() => {
        if (!username){
            alert("Please login to view your cart");
            return;
        }

        //warenkorb vom Backend abrufen
        axios.get(`api/cart/${username}`)
            .then((response)=>{
                setCart(response.data.items);
            })
            .catch(error =>{
                console.log("Error fetching cart:" ,error)
            })




    }, [username]);
    const handleUpdateQuantity = (productId:number,quantity:number) => {
        if (!username) return

        axios.put(`/api/cart/${username}/update`,{
            productId,
            quantity,
        })
            .then(()=>{
                setCart(cart.map(item =>
                item.productId===productId
                ?{...item, quantity}
                :item))
            })
            .catch(error =>{
                console.log("Error updating quantity: ",error);
            })
    }

    const handleRemove=(productId:number) => {
        if (!username) return
        axios.delete(`/api/cart/${username}/remove/${productId}`)
            .then(()=>{
                setCart(cart.filter(item=>item.productId!==productId))
            })
            .catch(error =>{
                console.log("Error removing product from cart: ", error)
            })
    }

    const getTotalPrice=() =>{
        return cart.reduce((total, item) =>total + item.price * item.quantity, 0);
    }


    return(
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
                    {cart.map(item =>(
                        <CartItem
                          key={item.productId}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemove}/>
                    ))}
                </TableBody>
            </Table>
            <Typography variant="h5" gutterBottom>TotalPrice: {getTotalPrice().toFixed(2)}€</Typography>
            <Button variant="contained">Checkout</Button>
        </Container>
    )
}
export default Cart;