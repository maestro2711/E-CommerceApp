package de.neuefische.backend.entity;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

@Builder
public record User( @Id String userId,
                   String username,
                   String password){

    /*public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }*/
}
