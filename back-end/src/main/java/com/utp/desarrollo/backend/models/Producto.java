package com.utp.desarrollo.backend.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

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

    @Column(name = "precio_compra")
    private Double precioCompra;
    @Column(name = "precio_regular")
    private Double precioRegular;
    @Column(name = "precio_venta")
    private Double precioVenta;

    @Transient
    private double descuento;

    @Column(name = "imagen_url")
    private String imagenUrl;
    @Column(name = "imagen_url_sec")
    @Convert(converter = StringListConverter.class)
    private List<String> imagenUrlSec;


    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "id_producto")
    //@JsonIgnore
    private List<Inventario> inventario;

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    public String toString() {
        return "Producto{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", descripcion='" + descripcion + '\'' +
                ", precioVenta=" + precioVenta +
                ", precioCompra=" + precioCompra +
                ", precioRegular=" + precioRegular +
                ", imagenUrl='" + imagenUrl + '\'' +
                ", imagenUrlSec=" + imagenUrlSec +
                '}';
    }

}
