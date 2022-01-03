package com.keycloak.spingkeycloak.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@Builder
@Setter
public class ApiError {
    private HttpStatus status;
    private String message;

}
