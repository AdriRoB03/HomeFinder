
package com.homefinder.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private int price;
    private int bedrooms;
    private int bathrooms;
    private int area;
    private String image;

    // Constructor vacío requerido por JPA
    public Property() {
    }

    public Property(Long id, String title, String location, int price,
                    int bedrooms, int bathrooms, int area, String image) {
        this.id = id;
        this.title = title;
        this.location = location;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.area = area;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getLocation() {
        return location;
    }

    public int getPrice() {
        return price;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public int getArea() {
        return area;
    }

    public String getImage() {
        return image;
    }
}