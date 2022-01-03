package com.keycloak.spingkeycloak.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
public class Auditable<T> {
    @CreatedBy
    protected T createdBy;
    @LastModifiedBy
    protected T lastModifiedBy;
    @CreatedDate
    protected LocalDateTime creationDate;
    @LastModifiedDate
    protected LocalDateTime lastModifiedDate;
}
