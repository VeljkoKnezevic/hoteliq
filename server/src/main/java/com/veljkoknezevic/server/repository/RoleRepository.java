package com.veljkoknezevic.server.repository;

import com.veljkoknezevic.server.model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role,Integer> {

    Optional<Role> findRoleByAuthority(String authority);
}
