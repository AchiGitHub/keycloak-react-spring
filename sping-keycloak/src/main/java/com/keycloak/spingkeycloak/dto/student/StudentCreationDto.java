package com.keycloak.spingkeycloak.dto.student;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StudentCreationDto {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String email;

    @JsonIgnore
    private final LocalDateTime createdAt = LocalDateTime.now();
    @JsonIgnore
    private final LocalDateTime editedAt = LocalDateTime.now();

}
