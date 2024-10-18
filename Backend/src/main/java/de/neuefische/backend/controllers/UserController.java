package de.neuefische.backend.controllers;


import de.neuefische.backend.entity.User;
import de.neuefische.backend.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor

//Für APIDokumentation mit Swagger
@Tag(name = "Benutzer", description = "APIs für die Verwaltung von Benutzern")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Registriere einen neuen Benutzer", description = "Registriert einen neuen Benutzer mit einem Benutzernamen und einem Passwort.")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user.username(), user.password());
    }

    @PostMapping("/login")
    @Operation(summary = "Benutzer-Login", description = "Loggt einen Benutzer ein, indem der Benutzername und das Passwort bereitgestellt werden.")
    public User loginUser(@RequestBody User user) {
        return userService.loginUser(user.username(), user.password());
    }

    @GetMapping("/{username}")
    @Operation(summary = "Hole Benutzerinformationen", description = "Ruft die Benutzerinformationen basierend auf dem Benutzernamen ab.")
    public User getUser(@PathVariable String username) {

        return userService.getUserByUsername(username);
    }
    @Operation(summary = "Lösche Benutzer", description = "Löscht einen Benutzer basierend auf dem Benutzernamen.")
    @DeleteMapping("/{username}")
    public void deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
    }

}
