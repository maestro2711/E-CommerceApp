package de.neuefische.backend.services;


import de.neuefische.backend.entity.User;
import de.neuefische.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Data
@Builder
public class UserService {
    public UserRepository userRepository;

    public User registerUser(String username, String password) {
        //Überprüfe, ob der Benutzer bereits existiert

        if(userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("User already exists");

        }
        User newUser =new User(null, username, password);
        return userRepository.save(newUser);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    //Es wird keine Passwordüberprüfung durchgeführt,einfach Benutzer abrufen

    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new IllegalArgumentException("User not found");
        }
        //Passwort wird nicht validiert, aber wir loggen den Benutzer trotzdem ein
        return user;
    }

}
