package de.neuefische.backend.entity;

import de.neuefische.backend.enums.Category;

public record Product(String productId,
                      String title,
                      String description,
                      Category category,
                      double price,
                      String image) {
}

