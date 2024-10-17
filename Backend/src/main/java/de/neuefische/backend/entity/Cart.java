package de.neuefische.backend.entity;

import java.util.List;

public record Cart(String userId,
                   List<CartItem> items) {
}
