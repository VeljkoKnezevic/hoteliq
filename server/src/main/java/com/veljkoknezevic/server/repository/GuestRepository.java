package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Guest;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface GuestRepository extends CrudRepository<Guest, Integer> {

    Optional<Guest> findGuestByEmail(String email);


 }
