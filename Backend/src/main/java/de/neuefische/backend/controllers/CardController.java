package de.neuefische.backend.controllers;

import de.neuefische.backend.entity.Cart;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.services.CartService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
public class CardController {

    public final CartService cartService;


    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/{userId}/add")
    public Cart addCart(@PathVariable String userId, @RequestBody CartItem cartItem) {
        return cartService.addToCart(userId, cartItem);
    }

    @PutMapping("/userId/update")
    public Cart updateCartItem(@PathVariable String userId, @RequestBody CartItem cartItem) {
        return cartService.updateCartItem(userId, cartItem);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    public void removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeFromCart(userId, productId);
    }

    @DeleteMapping("/{userId}/clear")
    public void clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
    }



}
