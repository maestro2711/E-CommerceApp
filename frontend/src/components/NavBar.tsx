import React  from "react";
import {AppBar, Toolbar, Button, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface NavBarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, onLogout }) => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>ProductList</Link>
                </Typography>
                <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                    <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ShoppingCartIcon  style={{textDecoration:'none',fontSize:'50px'}}/>
                        </Link>
                </Typography>
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
