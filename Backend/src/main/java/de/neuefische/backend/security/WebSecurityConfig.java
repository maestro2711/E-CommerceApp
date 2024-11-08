package de.neuefische.backend.security;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final CustomUserDetailsService userDetailsService;

    public WebSecurityConfig(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // Deaktiviert CSRF (nur für Testzwecke)
                .authorizeHttpRequests(c -> {
                    c.requestMatchers("/api/users/register", "/api/users/login","/api/users/logout","/api/users/check-session","/api/orders/place-order").permitAll(); // Registrierung und Login erlauben
                    c.anyRequest().authenticated(); // Alle anderen Anfragen authentifizieren
                })
                .httpBasic(Customizer.withDefaults()) // Basic Auth für API-Requests
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.ALWAYS)) // Sitzung für jeden Benutzer erzwingen
                .logout(logout -> logout
                        .logoutUrl("/api/users/logout") // Definiert den Logout-Endpoint
                        .invalidateHttpSession(true)     // Session invalidieren
                        .deleteCookies("JSESSIONID")     // Session-Cookie löschen
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK);
                            response.getWriter().write("Logged out successfully");
                        })
                )
                .formLogin(AbstractHttpConfigurer::disable) // Deaktiviert die Standard-Login-Seite
                .build();
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        return auth.build();
    }
}
