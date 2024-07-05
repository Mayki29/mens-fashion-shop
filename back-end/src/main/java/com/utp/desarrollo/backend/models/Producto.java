package com.utp.desarrollo.backend.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
    @Column(length = 250, columnDefinition = "json")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_marca")
    @JsonIgnoreProperties("productos")
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    @JsonIgnoreProperties("productos")
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
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "imagen_url_sec", joinColumns = @JoinColumn(name = "producto_id"))
    @Column(name = "url")
    private List<String> imagenUrlSec;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto")
    @JsonIgnore
    private List<DetalleVenta> detalleVenta;

    @OneToMany
    @JoinColumn(name = "id_producto")
    @JsonIgnore
    private List<Inventario> inventario;

    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precioVenta=" + precioVenta +
                ", precioCompra=" + precioCompra +
                ", color='" + color + '\'' +
                ", descuento=" + descuento +
                ", precioRegular=" + precioRegular +
                ", imagenUrl='" + imagenUrl + '\'' +
                ", imagenUrlSec=" + imagenUrlSec +
                '}';
    }

}
