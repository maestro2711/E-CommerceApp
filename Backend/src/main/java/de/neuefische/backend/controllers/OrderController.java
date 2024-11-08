package de.neuefische.backend.controllers;

import de.neuefische.backend.entity.Order;
import de.neuefische.backend.services.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@AllArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/place-order")

    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        Order orderSaved = orderService.placeOrder(order);
        return ResponseEntity.ok("Bestellung erfolgreich: " + orderSaved.firstName() + " " + orderSaved.lastName());
    }
}
