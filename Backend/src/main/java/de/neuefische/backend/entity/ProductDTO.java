package de.neuefische.backend.entity;

import java.math.BigDecimal;

public record ProductDTO(String category,
                         String title,
                         String description,
                         BigDecimal price,
                         String image) {
}
