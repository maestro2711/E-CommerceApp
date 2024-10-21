package de.neuefische.backend.controllers;


import de.neuefische.backend.entity.Product;
import de.neuefische.backend.entity.ProductDTO;
import de.neuefische.backend.enums.Category;
import de.neuefische.backend.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/products")
@Tag(name="Produkte",description = "APIs für die Verwaltung von Produkten")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    @Operation(summary = "Alle Produkte abrufen",description = "Gibt eine Liste aller verfügbare Produkte zurück")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    @Operation(summary = "Produkt nach ID abrufen", description = "Gibt die Details eines bestimmten Produkts zurück, basierend auf der Produkt-ID.")
    public Product getProductById(@PathVariable String productId) {

        return productService.getProductById(productId);
    }

    @GetMapping("/category/{category}")
    @Operation(summary = " Produkt nach Kategorien suchen", description = "Gibt die Details eines bestimmten Produkts zurück, basierend auf der category.")
    public List<Product> getProductsByCategory(@PathVariable Category category) {
        return productService.getProductsByCategory(category);
    }

    @PostMapping
    @Operation(summary = "Neues Produkt erstellen", description = "Erstellt ein neues Produkt in der Produktliste.")
    public void addProduct(@RequestBody ProductDTO product) {
        productService.addProduct(product);
    }

    @PutMapping("/{productId}")
    @Operation(summary = "Produkt aktualisieren", description = "Aktualisiert ein vorhandenes Produkt basierend auf der Produkt-ID.")
    public void updateProduct(@PathVariable String productId, @RequestBody Product product) {
        productService.updateProduct(productId, product);
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "Produkt löschen", description = "Löscht ein Produkt basierend auf der Produkt-ID.")
    public void deleteProduct(@PathVariable String productId) {

        productService.deleteProduct(productId);
    }
}
