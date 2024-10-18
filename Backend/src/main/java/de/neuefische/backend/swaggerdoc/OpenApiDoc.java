package de.neuefische.backend.swaggerdoc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;



@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "OpenApi Spezifikation für E-Commerce App",
                version = "1.0",
                description = "API Dokumentation für die  Endpunkte ",
                contact = @Contact(
                        name = "mitterand",
                        email = "asmitterand@yahoo.fr",
                        url = "http://localhost")


        ),
        servers = @Server(
                description = "Local Environment",
                url = "http://localhost:8081")
//                license = @License(name = "Apache 2.0"


)


public class OpenApiDoc {


}
