package de.neuefische.backend.entity;

import org.springframework.data.annotation.Id;

import java.util.List;

public record User(@Id String id,
                   String username,
                   List<CartItem> cart){

}
