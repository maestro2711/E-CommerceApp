import React, {useState} from "react";
import {Button, Container,  MenuItem, Select, TextField, Typography} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface CheckoutProps{
    onOrderPlaced:() =>void
}

const Ccheckout: React.FC<CheckoutProps> = ({onOrderPlaced}) => {
    const [firstName,setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [postalCode, setPostalCode] = useState("");
    const [paymentMethod, setPaymentMethod] = useState<string>("Cash on Delivery");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv,setCvv] = useState("");
    const navigate= useNavigate()


    const handleCheckout = () =>{
        //überprüfung der Eingabe
        if (!firstName || !lastName || !email || !address || !postalCode || !paymentMethod){
            alert("Bitte alle felde ausfüllen");
            return
        }

        //Erstellen des Bestellobjekts
        const orderData = {
            firstName,
            lastName,
            email,
            address,
            postalCode,
            paymentMethod,
            paymentDetails:paymentMethod ==="Credit Card" ?{cardNumber, expiryDate,cvv}: null,
        }
        //fiktive Zahlungssimulation und Absenden der Bestellung an das Backend

        axios.post("/api/orders/place-order",orderData,{withCredentials:true})
            .then(response =>{
                console.log('Response:', response.data)
                alert(response.data)
                onOrderPlaced()

                //Felder zurücksetzen
                setFirstName("")
                setLastName("")
                setEmail("")
                setAddress("")
                setPostalCode("")
                setCardNumber("")
                setExpiryDate("")
                setCardNumber("")
                setCvv("")
               navigate("/")

            })
            .catch(error =>{
                console.error("fehler beim Absenden der Bestellung: ", error)
            })




    }


    return(
        <Container>
            <Typography variant="h4" color="textSecondary" gutterBottom>Checkout</Typography>
            <TextField
                label="FirstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                margin="normal"
                />

            <TextField
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                margin="normal"
                />

            <TextField
                label="Email Adress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                />

            <TextField
                label=" Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="normal"
                />

            <TextField
                label=" Postal Code"
                value={postalCode}
                onChange={(e)=> setPostalCode(e.target.value)}
                fullWidth
                margin="normal"
                />

           <Typography variant="h6">Zahlungsmethode</Typography>
            <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value )}
            >
                <MenuItem value="credit_card">KreditKarte</MenuItem>
                <MenuItem value="Cash on Delivery">Barzahlung bei Lieferung</MenuItem>
                <MenuItem value="bank_transfert">Banküberweisung</MenuItem>
            </Select>
            {paymentMethod == "credit_card" && (
                <>
                    <TextField label="Kartennummer" value={cardNumber} onChange={(e) =>setCardNumber(e.target.value)}
                               />
                    <TextField  label="Ablaufdatum" value={expiryDate} onChange={(e) =>setExpiryDate(e.target.value)}
                                 />
                    <TextField  label="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)}
                               />
                </>
            )}



            <Button variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                    style={{marginTop: "20px"}}
                    >Bestellung abschließen</Button>
        </Container>
    )
}
export default Ccheckout;