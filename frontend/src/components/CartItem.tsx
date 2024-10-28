import {CartItemProps} from "../types/CartItem.ts";
import React from "react";
import {Button, TableCell, TableRow} from "@mui/material";

interface Props {
    item:CartItemProps;
    onRemove:(productId:number) => void;
    onUpdateQuantity:(productId:number,quantity:number) => void;
}



const CartItem :React.FC <Props> =({item,onRemove,onUpdateQuantity}) => {

    return(
        <TableRow>
            <TableCell >{item.title}</TableCell>
            <TableCell>
                <Button variant="contained" onClick={()=>onUpdateQuantity(item.productId,item.quantity -1)}
                        disabled={item.quantity<=1}>-</Button>
                {item.quantity}
                <Button onClick={()=>onUpdateQuantity(item.productId,item.quantity +1)}>+</Button>
            </TableCell>
            <TableCell>{(item.price * item.quantity).toFixed(2)}€</TableCell>
            <TableCell>
                <Button color="secondary" onClick={()=>onRemove(item.productId)}>Remove</Button>
            </TableCell>
        </TableRow>
    )
}
export default CartItem
