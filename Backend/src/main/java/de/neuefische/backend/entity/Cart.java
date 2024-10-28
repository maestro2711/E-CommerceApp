package de.neuefische.backend.entity;

import lombok.With;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.ArrayList;
import java.util.List;


public record Cart(@Indexed(unique = true) String userId,
                   String id,
                   List<CartItem> items) {
}
