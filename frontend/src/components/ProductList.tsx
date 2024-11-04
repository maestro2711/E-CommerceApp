import React, { useEffect, useState } from 'react';
import Grid from "@mui/material/Grid2";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { CartItemProps } from "../types/CartItem";

export interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
}

interface ProductListProps {
    onAddToCart: (quantity: number) => void;
    searchCategory:string
}

const ProductList: React.FC<ProductListProps> = ({ onAddToCart ,searchCategory}) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log("Error fetching products:", error);
            });
    }, []);


    const handleAddToCart = (product: Product) => {
        onAddToCart(1);
        const cartItem: CartItemProps = {
            productId: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1
        };

        axios.post(`/api/cart/add`, cartItem, { withCredentials: true })
            .then(() => {
                alert("Product added to cart");
            })
            .catch((error) => {
                alert("Product already exists in cart");
                console.log("Error adding product to cart", error);
            });
    };
    // Filter products based on the searchCategory
    const filteredProducts = searchCategory
        ? products.filter((product) =>
            product.category.toLowerCase().includes(searchCategory.toLowerCase())
        )
        : products;

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={4}>
                {filteredProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card style={{ borderRadius: '10px', color: 'blue', width: '100%' }}>
                            <CardMedia
                                component="img"
                                height="400"
                                sx={{ width: 500, height: 500 }}
                                image={product.image}
                                alt={product.title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {product.description.length > 100
                                        ? product.description.substring(0, 100) + '...'
                                        : product.description}
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
