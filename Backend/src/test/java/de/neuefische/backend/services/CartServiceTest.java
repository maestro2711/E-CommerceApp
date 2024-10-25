package de.neuefische.backend.services;

import de.neuefische.backend.entity.Cart;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.repositories.CartRepository;

import org.junit.jupiter.api.Test;


import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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

    /*@Test
    public void test_should_Return_Cart_When_Call_With_Id() {
        String expectedId = "retes";
        Cart expected = new Cart(expectedId,List.of(new CartItem(null,"12b","jupe.jpeg",54,4)));
        when(cartRepo.findByUserId(expectedId)).thenReturn(expected);

        Cart actual = cartService.getCartByUserId(expectedId);
        assertEquals(expected, actual);
    }*/


}