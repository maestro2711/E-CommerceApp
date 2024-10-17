package de.neuefische.backend.entity;

import java.math.BigDecimal;
import java.util.List;

public record Order(String userId,
                    List<CartItem> items,
                    BigDecimal totalPrice,
                    String paymentStatus,
                    String deliveryAddress


                    ) {
}
