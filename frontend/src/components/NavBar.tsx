import React, {useState} from "react";
import {AppBar, Toolbar, Button, Typography, IconButton, Badge, TextField} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface NavBarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
    onSearch: (category:string) => void;
    cartItemCount:number;
    onResetSearch:() => void;

}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, onLogout,onSearch,cartItemCount ,onResetSearch}) => {
    const [searchItem,setSearchItem] = useState("");

    //funktion to search categorie

    const handleSearch = (event:React.FormEvent)=>{
        event.preventDefault();
        onSearch(searchItem);
        setSearchItem("")
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={onResetSearch}>
                        ProductList
                    </Link>
                </Typography>

                <form onSubmit={handleSearch}>
                    <TextField
                        label="Search Category"
                        variant="outlined"
                        size="small"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                        style={{ marginRight: "1rem", backgroundColor: "white", borderRadius: "4px" }}
                    />
                </form>

                <IconButton color="inherit" component={Link} to="/cart">
                    <Badge badgeContent={cartItemCount} color="secondary">
                        <ShoppingCartIcon fontSize="large" />
                    </Badge>
                </IconButton>

                {!isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                ) : (
                    <Button color="inherit" onClick={onLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
