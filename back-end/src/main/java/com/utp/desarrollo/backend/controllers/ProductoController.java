package com.utp.desarrollo.backend.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.desarrollo.backend.models.Producto;
import com.utp.desarrollo.backend.services.IProductoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("api/producto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    @Autowired
    private IProductoService productoService;

    @GetMapping()
    public List<Producto> findAllProductos() {
        return productoService.findAll();
    }
    @GetMapping("/{id}")
    public Producto findProductoById(@PathVariable Long id) {
        return productoService.findById(id);
    }
    @PostMapping()
    public void saveProducto(@RequestBody Producto producto) {
        productoService.save(producto);
    }
    @PutMapping()
    public void updateProducto(@RequestBody Producto producto) {
        productoService.save(producto);
    }
    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id){
        productoService.delete(id);
    }
    
}
