package de.neuefische.backend.entity;

import lombok.With;

@With
public record CartItem(
                       String productId,
                       String title,
                       String image,
                       double price,
                       int quantity
                       ) {
}
