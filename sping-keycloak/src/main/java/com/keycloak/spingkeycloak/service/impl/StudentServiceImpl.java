package com.keycloak.spingkeycloak.service.impl;

import com.keycloak.spingkeycloak.dto.student.GetStudentDto;
import com.keycloak.spingkeycloak.entity.Student;
import com.keycloak.spingkeycloak.repository.StudentRepository;
import com.keycloak.spingkeycloak.service.StudentService;
import com.keycloak.spingkeycloak.util.RequestHelper;
import com.keycloak.spingkeycloak.util.TransportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;
    private RequestHelper requestHelper;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository, RequestHelper requestHelper) {
        this.studentRepository = studentRepository;
        this.requestHelper = requestHelper;
    }

    public TransportDto saveStudent(Student student) {
        studentRepository.save(student);
        if (student.getId() == null) {
            return requestHelper.setError(HttpStatus.BAD_REQUEST, "Invalid Parameters");
        }
        TransportDto studentCreateDto = requestHelper.setResponse(student);
        return studentCreateDto;
    }

    public TransportDto getAllStudents() {

        Iterable<Student> students = studentRepository.findAll();
        List<GetStudentDto> studentDisplayDtoList = new ArrayList<>();

        students.forEach(student -> {
            GetStudentDto studentDto = new GetStudentDto();
            studentDto.setId(student.getId());
            studentDto.setEmail(student.getEmail());
            studentDto.setFirstName(student.getFirstName());
            studentDto.setLastName(student.getLastName());

            studentDisplayDtoList.add(studentDto);
        });

        if (students == null) {
            return requestHelper.setError(HttpStatus.NOT_FOUND, "No students found");
        } else {
            return requestHelper.setResponse(studentDisplayDtoList);
        }
    }

    public Student getStudent(Long id) {
        return studentRepository.getStudentById(id);
    }

    public boolean deleteStudent(Long id) {
        return studentRepository.deleteStudentById(id);
    }
}
