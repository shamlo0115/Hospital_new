package io.sokolov.dao;

import io.sokolov.domain.UserRole;
import io.sokolov.domain.UserRoleType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    Optional<UserRole> findByName(UserRoleType roleType);
}
