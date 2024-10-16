package de.neuefische.backend.services;

import de.neuefische.backend.entity.Product;
import de.neuefische.backend.entity.ProductDTO;
import de.neuefische.backend.repositories.ProductRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.UUID;

@Service
@AllArgsConstructor
@Data
@Builder
@Getter
@Setter
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();

    }
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Product with id: " +id+ " not Found"));
    }

    public Product addProduct(ProductDTO product) {
        // Erstellen eines neuen Product mit einer generierten ID
        Product newProduct = new Product(
                UUID.randomUUID().toString(),
                product.title(),
                product.description(),
                product.category(),
                product.price(),
                product.image()
        );
        return productRepository.save(newProduct);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product updateProduct(String id, Product updatedProduct) {
        Product updated = productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Product with id: " +id + " not Found"));
            // Erstellen eines neuen Product mit aktualisierten Werten

                  Product productToUpdate = new Product(
                          updatedProduct.id(), // Behalten der ursprünglichen ID
                          updatedProduct.title(),
                          updatedProduct.description(),
                          updatedProduct.category(),
                          updatedProduct.price(),
                          updatedProduct.image()
                  );

            return productRepository.save(productToUpdate);
        }

        public void deleteProduct(String id) {
        productRepository.deleteById(id);
        }
    }



