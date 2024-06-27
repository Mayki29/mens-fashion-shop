package com.utp.desarrollo.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.utp.desarrollo.backend.models.Producto;
import com.utp.desarrollo.backend.services.IProductoService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/producto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    private IProductoService productoService;

    @GetMapping
    public List<Producto> findAllProductos() {
        return productoService.findAll();
    }

    @GetMapping("/{id}")
    public Producto findProductoById(@PathVariable Long id) {
        return productoService.findById(id);
    }

    @PostMapping
    public Producto saveProducto(@RequestBody Producto producto) {
        return productoService.save(producto);
    }

    @PostMapping("/upload")
    public ResponseEntity<Producto> uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("producto") String productoJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            // Log the received JSON
            logger.info("Received producto JSON: " + productoJson);

            // Parse the JSON string into a Producto object
            Producto producto = mapper.readValue(productoJson, Producto.class);

            // Save the image file to the uploads directory
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path path = Paths.get("uploads/" + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            // Set the image URL in the producto object
            String imageUrl = "http://localhost:8080/uploads/" + fileName;
            producto.setImagenUrl(imageUrl);

            // Save the producto object to the database
            Producto savedProducto = productoService.save(producto);

            return new ResponseEntity<>(savedProducto, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error uploading image", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public Producto updateProducto(@RequestBody Producto producto) {
        return productoService.save(producto);
    }

    @DeleteMapping("/{id}")
    public void deleteProducto(@PathVariable Long id) {
        productoService.delete(id);
    }
}