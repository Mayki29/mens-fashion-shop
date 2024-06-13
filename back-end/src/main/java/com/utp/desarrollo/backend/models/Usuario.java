package com.utp.desarrollo.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 50)
    private String nombre;
    @Column(length = 50)
    private String apellidos;
    @Column(length = 12)
    private String contrasena;
    @Column(length = 8)
    private String dni;
    @Column(length = 50)
    private String email;
    @Column(length = 9)
    private String telefono;
    @Column(length = 15)
    private String rol;
    private boolean estado;
}
