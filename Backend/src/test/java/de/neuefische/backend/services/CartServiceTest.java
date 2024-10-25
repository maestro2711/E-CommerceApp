package de.neuefische.backend.services;

import de.neuefische.backend.entity.Cart;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.repositories.CartRepository;

import org.junit.jupiter.api.Test;


import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class CartServiceTest {
    private final CartRepository cartRepo = mock(CartRepository.class);
    private final CartService cartService = new CartService(cartRepo);

    @Test

    public void test_shoul_Add_Item_Cart_When_Call() {
        //Given
        Cart expected = new Cart("retes",null, List.of(new CartItem("12ab","pullover","pull.jpeg",24,5)));
        //THEN

        when(cartRepo.save(any(Cart.class))).thenReturn(expected);
        Cart  actual= cartService.addToCart("retes",new CartItem("12ab","pullover","pull.jpeg",24,5));

        assertEquals(expected, actual);

    }

    @Test
    public void test_should_Return_Cart_When_Call_With_Id() {
        // Given
        String expectedUserId = "retes";
        String cartId = new ServiceId().getServiceId(); // Generiere eine ID
        Cart expected = new Cart(
                expectedUserId,
                cartId,
                List.of(new CartItem(null, "12b", "jupe.jpeg", 54, 4))
        );
        when(cartRepo.findByUserId(expectedUserId)).thenReturn(expected);

        // When
        Cart actual = cartService.getCartByUserId(expectedUserId);

        // Then
        assertEquals(expected, actual);
    }


    @Test
    public void test_should_Update_Cart_When_Item_Exists() {
        // Given
        String userId = "user123";
        String cartId = new ServiceId().getServiceId();
        List<CartItem> items = new ArrayList<>(List.of(
                new CartItem(null, "prod1", "image.jpg", 100, 1)
        ));
        Cart existingCart = new Cart(userId, cartId, items);
        CartItem updateItem = new CartItem(null, "prod1", "image.jpg", 100, 3);

        when(cartRepo.findByUserId(userId)).thenReturn(existingCart);
        when(cartRepo.save(any(Cart.class))).thenReturn(existingCart);

        // When
        Cart actual = cartService.updateCartItem(userId, updateItem);

        // Then
        assertEquals(3, actual.items().get(0).quantity());
    }

    @Test
    void test_should_Throw_IllegalArgumentException_When_Cart_Not_Found() {
        // Given
        String userId = "nonExistentUser";
        CartItem updateItem = new CartItem(null, "prod1", "product.jpg", 100, 2);

        when(cartRepo.findByUserId(userId)).thenReturn(null);

        // When/Then
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> cartService.updateCartItem(userId, updateItem)
        );

        assertEquals("CartItem not found", exception.getMessage());
    }

    @Test
    void test_should_Throw_IllegalArgumentException_When_Item_Not_In_Cart() {
        // Given
        String userId = "user123";
        String cartId = new ServiceId().getServiceId();
        CartItem existingItem = new CartItem(null, "prod1", "product.jpg", 100, 1);
        CartItem nonExistingUpdateItem = new CartItem(null, "prod2", "other.jpg", 200, 2);

        Cart existingCart = new Cart(
                userId,
                cartId,
                new ArrayList<>(List.of(existingItem))
        );

        when(cartRepo.findByUserId(userId)).thenReturn(existingCart);

        // When/Then
        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> cartService.updateCartItem(userId, nonExistingUpdateItem)
        );

        assertEquals("Item not found in cart", exception.getMessage());
    }
}

