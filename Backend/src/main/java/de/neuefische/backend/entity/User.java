package de.neuefische.backend.entity;

import org.springframework.data.annotation.Id;

import java.util.List;

public record User( String id,
                   String username,
                   String password){

}
