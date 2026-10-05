package com.homefinder.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.homefinder.backend.model.Property;
import com.homefinder.backend.repository.PropertyRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(PropertyRepository propertyRepository) {
        return args -> {

            if (propertyRepository.count() == 0) {

                propertyRepository.save(
                    new Property(
                        null,
                        "Piso moderno en el centro",
                        "Sevilla, Centro",
                        850,
                        2,
                        1,
                        75,
                        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
                    )
                );

                propertyRepository.save(
                    new Property(
                        null,
                        "Apartamento luminoso",
                        "Sevilla, Triana",
                        700,
                        2,
                        1,
                        68,
                        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
                    )
                );

                propertyRepository.save(
                    new Property(
                        null,
                        "Vivienda amplia con terraza",
                        "Sevilla, Nervión",
                        1100,
                        3,
                        2,
                        105,
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                    )
                );

                System.out.println("Viviendas iniciales creadas correctamente.");
            }
        };
    }
}