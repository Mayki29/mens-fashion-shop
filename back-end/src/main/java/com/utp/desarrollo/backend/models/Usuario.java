package com.utp.desarrollo.backend.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
    @JsonIgnore
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

    @OneToMany()
    @JoinColumn(name = "id_usuario")
    @JsonIgnore
    private List<Venta> ventas;
}
