package com.homefinder.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homefinder.backend.model.Property;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}