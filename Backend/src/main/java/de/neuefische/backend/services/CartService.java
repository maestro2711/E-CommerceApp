package de.neuefische.backend.services;

import de.neuefische.backend.entity.Cart;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.repositories.CartItemRepository;
import de.neuefische.backend.repositories.CartRepository;
import de.neuefische.backend.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Data
@Builder
public class CartService {

    private CartRepository cartRepository;


    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId);

    }

    public Cart addToCart(String userId, CartItem newItem) {
        Cart cart=cartRepository.findByUserId(userId);
        if(cart==null){
            cart= new Cart(userId, List.of(newItem));
        }else{
            cart.items().add(newItem);
        }
        return cartRepository.save(cart);
    }

    public Cart updateCartItem(String userId, CartItem updateItem) {
        Cart cart=cartRepository.findByUserId(userId);
        if(cart==null){
            throw new IllegalArgumentException("CartItem not found");
        }
        cart.items().removeIf(item ->item.productId().equals(updateItem.productId()));
        cart.items().add(updateItem);
        return cartRepository.save(cart);
    }

    public void removeFromCart(String userId, String productId) {
        Cart cart=cartRepository.findByUserId(userId);
        if(cart!=null){
            cart.items().removeIf(item ->item.productId().equals(productId));
            cartRepository.save(cart);
        }
    }

    public void clearCart(String userId) {
        Cart cart=cartRepository.findByUserId(userId);
        if(cart!=null){
            cart.items().clear();
            cartRepository.save(cart);
        }
    }

}
