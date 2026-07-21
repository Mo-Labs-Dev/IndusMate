package com.shafilabs.indusmate.repository;

import com.shafilabs.indusmate.entity.BoltReading;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoltReadingRepository
        extends JpaRepository<BoltReading, Long> {

    List<BoltReading> findTop50ByOrderByCreatedAtDesc();
}