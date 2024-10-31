package de.neuefische.backend.services;


import de.neuefische.backend.entity.User;
import de.neuefische.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
@Data
@Builder
public class UserService {
    public UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String username, String password) {
        System.out.println("Starte Registrierung für Benutzer: " + username);

        if (userRepository.findByUsername(username) != null) {
            System.out.println("Benutzername existiert bereits.");
            throw new IllegalArgumentException("User already exists");
        }

        String hashedPassword = passwordEncoder.encode(password);
        System.out.println("Gehashtes Passwort: " + hashedPassword);

        User newUser = new User(UUID.randomUUID().toString(), username, hashedPassword);
        User savedUser = userRepository.save(newUser);

        System.out.println("Benutzer erfolgreich registriert: " + savedUser);

        return savedUser;
    }


    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }



    /*public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }
        // Überprüfe das Passwort
        if (!passwordEncoder.matches(password, user.password())) {
            throw new IllegalArgumentException("Invalid password");
        }
        // Rückgabe des Benutzerobjekts bei erfolgreicher Authentifizierung
        return user;
    }*/

    // Holt den Benutzer anhand der Benutzer-ID
    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new IllegalArgumentException("User not found");

        }
        userRepository.delete(user);
    }

}