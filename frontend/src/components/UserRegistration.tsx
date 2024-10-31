import React, { FormEvent, useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from "@mui/material";

const UserRegistration: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    // const navigate = useNavigate();

    const handleRegister = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user = { username: userName, password };

        axios.post("/api/users/register", user, { withCredentials: true })
            .then(response => {
                alert(`User ${response.data.username} registered successfully!`);
                // navigate('/login');
            })
            .catch(error => console.log("Error registering user: ", error));

        setPassword("");
        setUserName("");
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <TextField
                label="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                style={{ marginTop: '1rem' }}
            />
            <Button variant="contained"
                    color="primary"
                    onClick={handleRegister}
                    style={{ marginTop: '1rem' }}>Register</Button>
        </Container>
    );
};
export default UserRegistration;
