package de.neuefische.backend.services;

import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.repositories.OrderRepository;
import de.neuefische.backend.repositories.ProductRepository;
import de.neuefische.backend.entity.Order;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class OrderServiceTest {
    private final OrderRepository orderRepo = mock(OrderRepository.class);
    private final OrderService orderService = new OrderService(orderRepo);



    @Test
    public void test_should_Create_Order_When_Call(){
        // Arrange
        Order order = new Order(
                "user123",
                Arrays.asList(new CartItem("item1", "Manteau", "mant.jepg",21.00,2), new CartItem("item2", "jacke", "jack.jpeg",23.00,4)),
                50.0,
                "John",
                "Doe",
                "123 Main St",
                "john.doe@example.com",
                "12345",
                "CREDIT_CARD"
        );

        //when
        when(orderRepo.save(order)).thenReturn(order);

        //ACT
        Order result = orderService.placeOrder(order);
        assertNotNull(result);
        assertEquals(order,result);
        verify(orderRepo, times(1)).save(order);

    }


}