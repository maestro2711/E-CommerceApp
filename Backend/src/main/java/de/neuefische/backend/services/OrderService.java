package de.neuefische.backend.services;

import de.neuefische.backend.entity.Order;
import de.neuefische.backend.repositories.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OrderService {
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {

        return orderRepository.save(order);
    }
}
