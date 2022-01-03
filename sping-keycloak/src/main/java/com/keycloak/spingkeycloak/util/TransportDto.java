package com.keycloak.spingkeycloak.util;

import com.keycloak.spingkeycloak.common.ApiError;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransportDto {
    private ApiError error;
    private Object response;
}
