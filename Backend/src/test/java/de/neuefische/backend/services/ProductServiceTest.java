package de.neuefische.backend.services;

import de.neuefische.backend.entity.Product;

import de.neuefische.backend.entity.ProductDTO;
import de.neuefische.backend.enums.Category;
import de.neuefische.backend.repositories.ProductRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {
    private final ProductRepository productRepo = mock(ProductRepository.class);
    private final ServiceId serviceId = mock(ServiceId.class);
    private final ProductService productService = new ProductService(productRepo, serviceId);




    @Test
    public void test_should_Add_New_Product() {

         Product expected= new Product("12a","herbst kleid","tragen wie",Category.women,24.5,"klid.jpeg");

         when(productRepo.save(expected)).thenReturn(expected);
         when(serviceId.getServiceId()).thenReturn("12a");
         when(productRepo.findById("12a")).thenReturn(Optional.of(expected));
         Product actual = productService.addProduct(new ProductDTO("herbst kleid","tragen wie",Category.women,24.5,"klid.jpeg"));

         assertEquals(expected,actual);
         verify(productRepo).save(expected);

        }

        @Test
    public void test_should_Return_All_Product_When_Call() {
            Product expected= new Product(UUID.randomUUID().toString(),"mens","herbst kleid",Category.women,24.5,"klid.jepeg");
            productRepo.save(expected);
            when(productRepo.findAll()).thenReturn(List.of(expected));
            List<Product> actual = productService.getAllProducts();
            assertNotNull(actual);
            assertEquals(expected,actual.get(0));
        }

        @Test
    public void test_should_Delete_Product_When_Call_With_ID() {
        String expectedId= UUID.randomUUID().toString();
        Product expected=new Product(expectedId,"kind","choes", Category.electronics,45.00,"shoe.jpeg");
        productRepo.save(expected);
        productService.deleteProduct(expectedId);
        verify(productRepo).deleteById(expectedId);


        }

        @Test
    public void test_should_get_Product_When_Call_With_ID() {
        String expectedId= UUID.randomUUID().toString();
            Product expected=new Product(expectedId,"kind","choes",Category.men,45.00,"shoe.jpeg");
            productRepo.save(expected);

            when(productRepo.findById(expectedId)).thenReturn(Optional.of(expected));
            Product actual = productService.getProductById(expectedId);
            assertNotNull(actual);
            assertEquals(expected,actual);
        }

      /*  @Test
    public void test_should_Update_Product_When_Call_With_ID() {
        String expectedId= UUID.randomUUID().toString();
            Product expected=new Product(expectedId,"kind","choes",Category.men,45.00,"shoe.jpeg");
            productRepo.save(expected);
            when(productRepo.findById(expectedId)).thenReturn(Optional.of(expected));
            Product actual = productService.updateProduct(expectedId,expected);
            assertEquals(expected,actual);

        }*/

        @Test
    public void test_should_Delete_Product_When_Call_With_Id(){
            //GIVEN
            String expectedId= UUID.randomUUID().toString();
            Product expected= new Product(expectedId,"mens","T-shirt",Category.women,24.5,"klid.jpeg");
            productRepo.save(expected);
            //WHEN
            when(productRepo.findById(expectedId)).thenReturn(Optional.of(expected));
            String actual= productService.deleteProduct(expectedId);
            //THEN
            assertNotNull(actual);
            assertEquals(expectedId,actual);

            verify(productRepo).deleteById(expectedId);
        }


}