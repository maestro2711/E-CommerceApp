import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid2";
import { Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {CartItemProps} from "../types/CartItem.ts";



export interface Product{
    id:number;
    title:string;
    description:string;
    image:string;
    price:number;
    category:string
}
interface ProductListProps {
    onAddToCart: (quantity: number) => void;  // Prop zum Hinzufügen von Artikeln zum Warenkorb
}

const ProductList: React.FC <ProductListProps>= ({onAddToCart}) => {
    const [products, setProducts] = useState<Product[]>([]);
    // der Benutzername aus dm Localstorage abrufen
    const username=localStorage.getItem("username");

    useEffect(() => {

        //hole die Produkte von der FakestoreApi
        axios.get('https://fakestoreapi.com/products')
            .then((response)=>{
                setProducts(response.data);
            })
            .catch((error)=>{
                console.log("Error fetching products:",  error);
            })
    }, []);

    const handleAddToCart = (product:Product) => {
        onAddToCart(1);  // Füge einen Artikel zum Warenkorb hinzu (die Menge ist 1)
        if (!username){
            alert("please login to add items to the cart");
            return;
        }
        const cartItem:CartItemProps = {
            productId: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity:1
        }



        axios.post(`api/cart/${username}/add`,cartItem)
            .then(()=>{
                alert("Product Added to cart");
            })
            .catch((error)=>{
                alert("product already exist")
                console.log("Error adding product to cart", error);
            })
    }


    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid  item xs={12} sm={6} md={4} key={product.id}>
                        <Card style={{borderRadius:  '10px' ,color:'blue',width:'100%'}}>
                            <CardMedia
                                component="img"
                                height="400"
                                sx={{width:500,height:500}}
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    { product.description.length>100
                                    ?product.description.substring(0,100) + '...'
                                    :product.description}
                                </Typography>
                                <Typography variant="h5" component="div" style={{ marginTop: '10px' }}>
                                    {product.price}€
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ProductList;
