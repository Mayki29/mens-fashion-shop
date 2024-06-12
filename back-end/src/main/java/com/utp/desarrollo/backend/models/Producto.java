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
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 150)
    private String nombre;
    private String descripcion;
    //private String marca;
    //private String imagen;
    @Column(name = "precio_venta")
    private Double precioVenta;
    @Column(name = "precio_compra")
    private Double precioCompra;
    private Integer stock;
    //private Double descuento;
}
