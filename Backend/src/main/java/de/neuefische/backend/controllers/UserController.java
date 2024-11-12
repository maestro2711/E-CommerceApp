package de.neuefische.backend.controllers;


import de.neuefische.backend.entity.User;
import de.neuefische.backend.services.CustomUserDetails;
import de.neuefische.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor

//Für APIDokumentation mit Swagger
@Tag(name = "Benutzer", description = "APIs für die Verwaltung von Benutzern")
public class UserController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    @Operation(summary = "Registriere einen neuen Benutzer", description = "Registriert einen neuen Benutzer mit einem Benutzernamen und einem Passwort.")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user.username(), user.password());
    }

    @GetMapping("/check-session")
    @ResponseStatus(HttpStatus.OK)
    public void checkSession() {
        // Kein Inhalt erforderlich – Spring Security übernimmt die Authentifizierung
    }

    @PostMapping("/login")
    @Operation(summary = "Benutzer-Login", description = "Loggt einen Benutzer ein, indem der Benutzername und das Passwort bereitgestellt werden.")
    public String loginUser( ) {
        // Benutzer authentifizieren

        return "Login successful";

    }

    @GetMapping("/current")
    @Operation(summary = "Hole Benutzerinformationen", description = "Ruft die Benutzerinformationen basierend auf dem Benutzernamen ab.")
    public User getCurrentUser(HttpSession session) {
        // Benutzer-ID aus der Sitzung abrufen
        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            throw new IllegalArgumentException("No user is currently logged in");
        }

        // Benutzerinformationen anhand der ID abrufen
        return userService.getUserById(userId);
    }
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logout successful";
    }

    @GetMapping("/{username}")

    public User getUser(@PathVariable String username) {

        return userService.getUserByUsername(username);
    }
    @Operation(summary = "Lösche Benutzer", description = "Löscht einen Benutzer basierend auf dem Benutzernamen.")
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
    }

}