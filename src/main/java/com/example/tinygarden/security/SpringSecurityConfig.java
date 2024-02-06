package com.example.tinygarden.security;

import com.example.tinygarden.config.PasswordEncoderUtil;
import com.example.tinygarden.service.impl.CustomerDetailServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {
    private final CustomerDetailServiceImpl customerDetailService;
    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customerDetailService);
        authenticationProvider.setPasswordEncoder(PasswordEncoderUtil.getInstance());
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }


    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity httpSecurity)
            throws Exception {
        httpSecurity
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/authenticate").permitAll()
                .requestMatchers("/customer/save-customer-details").permitAll()
                .requestMatchers("/plant/get-by-type/{type}").permitAll()
                .requestMatchers("/plant/get-by-id/{plantId}").permitAll()
                .requestMatchers("/plant/save-plant-details",
                        "/plant/delete-by-id/{plantId}",
                        "/plant/update-plant",
                        "/plant/update-plant-without-image",
                        "/plant/plant-record",
                        "/customer/get-all-data",
                        "/customer/customer-record",
                        "/order/get-all-order").hasAuthority("admin")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
