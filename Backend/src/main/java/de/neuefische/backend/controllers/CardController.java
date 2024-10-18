package de.neuefische.backend.controllers;

import de.neuefische.backend.entity.Cart;
import de.neuefische.backend.entity.CartItem;
import de.neuefische.backend.services.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/cart")
@AllArgsConstructor
//Für swagger AIPDoc
@Tag(name = "Warenkorb", description = "APIs für die Verwaltung des Warenkorbs")
public class CardController {

    public final CartService cartService;


    @GetMapping("/{userId}")
    @Operation(summary = "Warenkorb eines Benutzers abrufen", description = "Gibt den aktuellen Warenkorb für den angegebenen Benutzer zurück.")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCartByUserId(userId);
    }

    @PostMapping("/{userId}/add")
    @Operation(summary = "Artikel zum Warenkorb hinzufügen", description = "Fügt dem Warenkorb eines Benutzers einen neuen Artikel hinzu.")
    public Cart addCart(@PathVariable String userId, @RequestBody CartItem cartItem) {
        return cartService.addToCart(userId, cartItem);
    }

    @PutMapping("/{userId}/update")
    @Operation(summary = "Artikel im Warenkorb aktualisieren", description = "Aktualisiert die Menge eines Artikels im Warenkorb des Benutzers.")
    public Cart updateCartItem(@PathVariable String userId, @RequestBody CartItem cartItem) {
        return cartService.updateCartItem(userId, cartItem);
    }

    @DeleteMapping("/{userId}/remove/{productId}")
    @Operation(summary = "Artikel aus dem Warenkorb entfernen", description = "Entfernt einen bestimmten Artikel aus dem Warenkorb des Benutzers.")
    public void removeCartItem(@PathVariable String userId, @PathVariable String productId) {
        cartService.removeFromCart(userId, productId);
    }

    @DeleteMapping("/{userId}/clear")
    //für Swagger API Dokumentation
    @Operation(summary = "Warenkorb leeren", description = "Entfernt alle Artikel aus dem Warenkorb des Benutzers.")
    public void clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
    }



}
