package de.neuefische.backend.entity;

import java.math.BigDecimal;

public record Product(String id,
                      String category,
                      String title,
                      String description,
                      BigDecimal price,
                      String image) {
}
