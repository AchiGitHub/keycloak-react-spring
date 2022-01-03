package com.keycloak.spingkeycloak.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class StudentCreationFailedException extends RuntimeException {
    private final String name;
}
