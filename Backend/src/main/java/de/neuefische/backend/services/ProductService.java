package de.neuefische.backend.services;

import de.neuefische.backend.entity.Product;
import de.neuefische.backend.entity.ProductDTO;
import de.neuefische.backend.enums.Category;
import de.neuefische.backend.repositories.ProductRepository;
import lombok.*;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
@Data
@Builder
@Getter
@Setter
public class ProductService {
    private final ProductRepository productRepository;
    private final ServiceId serviceId;

    public List<Product> getAllProducts() {
        return productRepository.findAll();

    }
    public Product getProductById(String productId) {
        return productRepository.findById(productId).orElse(null);


    }

    public Product addProduct(ProductDTO product) {
        String productId = serviceId.getServiceId();
        Product newProduct = new Product(
                productId,
                product.title(),
                product.description(),
                product.category(),
                product.price(),
                product.image()
        );
         productRepository.save(newProduct);
         return productRepository.findById(productId).orElse(null);
    }

    public List<Product> getProductsByCategory(Category category) {

        return productRepository.findByCategory( category);
    }

    public Product updateProduct(String productId, Product updatedProduct) {
        Product updated = productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product with id: " +productId + " not Found"));
            // Erstellen eines neuen Product mit aktualisierten Werten

                  Product productToUpdate = new Product(
                          updatedProduct.productId(), // Behalten der ursprünglichen ID
                          updatedProduct.title(),
                          updatedProduct.description(),
                          updatedProduct.category(),
                          updatedProduct.price(),
                          updatedProduct.image()
                  );

            return productRepository.save(productToUpdate);
        }

        public String deleteProduct(String productId) {
        productRepository.deleteById(productId);
            return productId;
        }
    }



