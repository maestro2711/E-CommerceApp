package de.neuefische.backend.entity;

import java.math.BigDecimal;
import java.util.List;

public record Order(String userId,
                    List<CartItem> items,
                    double totalPrice,
                   String  firstName,
                    String  lastName,
                    String  address,
                    String email,
                    String  postalCode,
                    String paymentMethod



                  ) {
    /*  public double getTotalPrice(){
        return items.stream().mapToDouble(CartItem::price).sum();

    }*/
}
