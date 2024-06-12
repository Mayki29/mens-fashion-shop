package com.utp.desarrollo.backend.models;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
//@Entity
//@Table
public class Usuario {
    private Long id;
    private String nombre;
    private String apellidos;
    private LocalDate fechaContrato;
    private String dni;
    private String email;
    private String telefono;
    private String rol;
    private String cargo;
}
