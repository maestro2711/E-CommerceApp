package de.neuefische.backend.entity;

import org.springframework.data.mongodb.core.index.Indexed;

import java.util.ArrayList;
import java.util.List;

public record Cart(@Indexed(unique = true) String userId,
                   List<CartItem> items) {
}
