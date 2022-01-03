package com.keycloak.spingkeycloak.service;

import com.keycloak.spingkeycloak.entity.Student;
import com.keycloak.spingkeycloak.util.TransportDto;

public interface StudentService {
    TransportDto saveStudent(Student student);
    TransportDto getAllStudents();
    Student getStudent(Long id);
    boolean deleteStudent(Long id);
}
