package com.keycloak.spingkeycloak.dto.student;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentUpdateDto {
    private String firstName;
    private String lastName;
    private String email;
}
