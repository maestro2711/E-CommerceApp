package de.neuefische.backend.repositories;

import de.neuefische.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends MongoRepository<User, String> {
    public User findByUsername(String username);
}
