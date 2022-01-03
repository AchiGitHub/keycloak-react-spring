package com.keycloak.spingkeycloak.controller;

import com.keycloak.spingkeycloak.dto.student.StudentCreationDto;
import com.keycloak.spingkeycloak.entity.Student;
import com.keycloak.spingkeycloak.exception.StudentCreationFailedException;
import com.keycloak.spingkeycloak.service.StudentService;
import com.keycloak.spingkeycloak.util.TransportDto;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/student")
@Slf4j
public class StudentController {

    private StudentService studentService;
    private ModelMapper modelMapper;

    @Autowired
    public StudentController(StudentService studentService, ModelMapper modelMapper) {
        this.studentService = studentService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("")
    public ResponseEntity<Student> createStudent(@RequestBody StudentCreationDto student) throws StudentCreationFailedException {

        Student studentDetails = modelMapper.map(student, Student.class);

        LocalDateTime now = LocalDateTime.now();

        studentDetails.setCreationDate(now);
        studentDetails.setLastModifiedDate(now);
        studentDetails.setLastModifiedBy("USER");
        studentDetails.setCreatedBy("USER");

        TransportDto createdStudent = studentService.saveStudent(studentDetails);
        log.info("Student {}", studentDetails);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdStudent.getResponse())
                .toUri();

        return  ResponseEntity.created(location).build();
    }

    @GetMapping("")
    public ResponseEntity getAllStudents() {
        TransportDto res = studentService.getAllStudents();

        if (res.getError() != null) {
            return ResponseEntity.status(res.getError().getStatus()).body(res);
        }
        return ResponseEntity.ok(res.getResponse());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudent(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteStudent(@PathVariable Long id) {
        if (!studentService.deleteStudent(id)) {
            throw new IllegalStateException("Student with id" + id);
        }
        return ResponseEntity.ok().build();
    }

}
