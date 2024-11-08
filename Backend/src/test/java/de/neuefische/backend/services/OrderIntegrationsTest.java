package de.neuefische.backend.services;


import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.controllers.OrderController;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.entity.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class OrderIntegrationsTest {
    @Autowired
    private MockMvc mockMvc;


    @MockBean
    private OrderService orderService;

    @Autowired
    private ObjectMapper objectMapper; // Für JSON-Konvertierung

    @Test
    public void test_shoul_Create_Order_When_Call() throws Exception {
        //Arange
        Order order = new Order(
                "user123",
                Arrays.asList(new CartItem("item1", "messe",  "mess.jpeg",54.00,4), new CartItem("item2", "Tush", "tush.jpeg",64.00,4)),
                50.0,
                "John",
                "Doe",
                "123 Main St",
                "john.doe@example.com",
                "12345",
                "CREDIT_CARD"
        );

        when(orderService.placeOrder(order)).thenReturn(order);

        // Act & Assert
        mockMvc.perform(post("/api/orders/place-order")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(order)))
                .andExpect(status().isOk())
                .andExpect(content().string("Bestellung erfolgreich: John Doe"));
    }
}
