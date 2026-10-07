package com.homefinder.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.homefinder.backend.model.Property;
import com.homefinder.backend.repository.PropertyRepository;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyRepository propertyRepository;

    public PropertyController(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @GetMapping
    public List<Property> getProperties() {
        return propertyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        return propertyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        property.setId(null);
        return propertyRepository.save(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(
            @PathVariable Long id,
            @RequestBody Property propertyDetails) {

        return propertyRepository.findById(id)
                .map(property -> {
                    property.setTitle(propertyDetails.getTitle());
                    property.setLocation(propertyDetails.getLocation());
                    property.setPrice(propertyDetails.getPrice());
                    property.setBedrooms(propertyDetails.getBedrooms());
                    property.setBathrooms(propertyDetails.getBathrooms());
                    property.setArea(propertyDetails.getArea());
                    property.setImage(propertyDetails.getImage());

                    Property updatedProperty =
                            propertyRepository.save(property);

                    return ResponseEntity.ok(updatedProperty);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {

        if (!propertyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        propertyRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}