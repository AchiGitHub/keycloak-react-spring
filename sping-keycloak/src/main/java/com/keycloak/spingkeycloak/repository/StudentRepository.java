package com.keycloak.spingkeycloak.repository;

import com.keycloak.spingkeycloak.entity.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, Long> {
    Student getStudentById(Long id);

    boolean deleteStudentById(Long id);
}
