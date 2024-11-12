import React, { FormEvent, useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserLoginProps {
    onLogin: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({onLogin}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user = { username, password };

        axios.post('/api/users/login', undefined,{ auth:{username,password} })
            .then(() => {

                localStorage.setItem('username', user.username); // Benutzername speichern
                alert('Logged in successfully');
                onLogin();
                navigate('/');
            })
            .catch(error => console.log("Error Logging in user: ", error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
            />
            <TextField
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
                style={{ marginTop: '1rem' }}
            />
            <Button variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={{ marginTop: '1rem' }}>Login</Button>
        </Container>
    );
};
export default UserLogin;
