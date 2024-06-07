package com.utp.desarrollo.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.desarrollo.backend.models.Producto;
import com.utp.desarrollo.backend.services.IProductoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @GetMapping("/producto")
    public List<Producto> getAllProductos() {
        return productoService.getAll();
    }
    
}
