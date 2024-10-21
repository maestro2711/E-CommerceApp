package de.neuefische.backend.services;


import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ServiceId {
    public String getServiceId() {
        return UUID.randomUUID().toString();
    }
}
