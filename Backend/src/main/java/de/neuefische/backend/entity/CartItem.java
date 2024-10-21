package de.neuefische.backend.entity;

import java.math.BigDecimal;

public record CartItem(
                       String productId,
                       String title,
                       String image,
                       double price,
                       int quantity
                       ) {
}
