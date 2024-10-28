import React, {useState} from "react";
import axios from "axios";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const UserLogin:React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate=useNavigate()
    const handleLogin=()=>{
        const user={username:username,password:password};
        axios.post('api/users/login', user)
            .then(response =>{
                //Benutzername im Local Storage speichern
                localStorage.setItem("username",response.data.username);
                alert(`Logged in as   ${response.data.username}  `);
                navigate('/');
            })
            .catch(error =>console.log("Error Logging in user: ", error));
    }

    return(
        <Container>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <TextField
                label="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                fullWidth
                />
            <TextField
                label="Password"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                fullWidth
                style={{marginTop:'1rem'}}
                />
            <Button variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    style={{marginTop:'1rem'}}>Login</Button>

        </Container>
    )
}
export default UserLogin