package de.neuefische.backend.entity;

import de.neuefische.backend.enums.Category;

import java.math.BigDecimal;

public record ProductDTO(
                         String title,
                         String description,
                         Category category,
                         double price,
                         String image) {
}
