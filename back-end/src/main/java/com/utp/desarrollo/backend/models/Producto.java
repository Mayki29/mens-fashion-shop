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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @Column(length = 250)
    private String descripcion;
    
    @ManyToOne
    @JoinColumn(name = "id_marca")
    private Marca marca;
    
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @Column(name = "precio_venta")
    private Double precioVenta;
    @Column(name = "precio_compra")
    private Double precioCompra;
    private String color;
    private Double descuento;
    @Column(name = "precio_regular")
    private Double precioRegular;
    @Column(name = "imagen_url")
    private String imagenUrl;
    @Column(name = "imagen_url_sec", columnDefinition = "json")
    private String imagenUrlSec;

    @OneToMany
    @JoinColumn(name = "id_producto")
    @JsonIgnore
    private List<DetalleVenta> detalleVenta;
    
    @OneToMany
    @JoinColumn(name = "id_producto")
    @JsonIgnore
    private List<Inventario> inventario;

}
