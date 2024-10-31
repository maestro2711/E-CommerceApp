package de.neuefische.backend.controllers;

import de.neuefische.backend.entity.Cart;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.services.CartService;
import de.neuefische.backend.services.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
//Für swagger AIPDoc
@Tag(name = "Warenkorb", description = "APIs für die Verwaltung des Warenkorbs")
public class CardController {

    public final CartService cartService;

    private String getCurrentUserId() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDetails.getId();
    }


    @GetMapping()
    @Operation(summary = "Warenkorb eines Benutzers abrufen", description = "Gibt den aktuellen Warenkorb für den angegebenen Benutzer zurück.")
    public Cart getCart() {
        String userId = getCurrentUserId();
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/add")
    @Operation(summary = "Artikel zum Warenkorb hinzufügen", description = "Fügt dem Warenkorb eines Benutzers einen neuen Artikel hinzu.")
    public Cart addCart(@RequestBody CartItem cartItem) {
        String userId = getCurrentUserId();
        return cartService.addToCart(userId, cartItem);
    }

    @PutMapping("/update")
    @Operation(summary = "Artikel im Warenkorb aktualisieren", description = "Aktualisiert die Menge eines Artikels im Warenkorb des Benutzers.")
    public Cart updateCartItem(@RequestBody CartItem cartItem) {
        String userId = getCurrentUserId();
        return cartService.updateCartItem(userId, cartItem);
    }

    @DeleteMapping("/remove/{productId}")
    @Operation(summary = "Artikel aus dem Warenkorb entfernen", description = "Entfernt einen bestimmten Artikel aus dem Warenkorb des Benutzers.")
    public void removeCartItem( @PathVariable String productId) {
        String userId = getCurrentUserId();
        cartService.removeFromCart(userId, productId);
    }

    @DeleteMapping("/clear")
    //für Swagger API Dokumentation
    @Operation(summary = "Warenkorb leeren", description = "Entfernt alle Artikel aus dem Warenkorb des Benutzers.")
    public void clearCart() {
        String userId = getCurrentUserId();
        cartService.clearCart(userId);
    }



}