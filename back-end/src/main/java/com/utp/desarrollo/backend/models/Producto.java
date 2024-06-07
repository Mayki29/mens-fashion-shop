package com.utp.desarrollo.backend.models;

public class Producto {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String marca;
    private String imagen;
    private double precioRegular;
    private double precioDescuento;
    private double descuento;
}
