package com.utp.desarrollo.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.utp.desarrollo.backend.models.Inventario;
import com.utp.desarrollo.backend.models.Producto;
import com.utp.desarrollo.backend.models.dao.IColorDao;
import com.utp.desarrollo.backend.services.ICategoriaService;
import com.utp.desarrollo.backend.services.IColorService;
import com.utp.desarrollo.backend.services.IInventarioService;
import com.utp.desarrollo.backend.services.IMarcaService;
import com.utp.desarrollo.backend.services.IProductoService;
import com.utp.desarrollo.backend.services.ITallaService;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/producto")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {

    private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    private IProductoService productoService;

    @Autowired
    private IInventarioService inventarioService;
    
    @Autowired
    private IColorService colorService;
    
    @Autowired
    private ITallaService tallaService;

    @Autowired
    private IMarcaService marcaService;

    @Autowired
    private ICategoriaService categoriaService;

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

    @GetMapping("/inventario")
    public List<Inventario> findAllInventario(){
        return inventarioService.findAll();
    }

    @PostMapping("/upload")
    public ResponseEntity<Producto> uploadImage(@RequestParam("image") MultipartFile file, @RequestParam("producto") String productoJson) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            logger.info("Received producto JSON: " + productoJson);

            Producto producto = mapper.readValue(productoJson, Producto.class);

            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Path path = Paths.get("uploads/" + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            String imageUrl = "http://localhost:8080/uploads/" + fileName;
            producto.setImagenUrl(imageUrl);

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

    @GetMapping("/marcas")
    public ResponseEntity<List<String>> getMarcas() {
        List<String> marcas = productoService.findAll()
                .stream()
                .map(producto -> producto.getMarca().getNombre())
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(marcas);
    }

    @GetMapping("/cortes")
    public ResponseEntity<List<String>> getCortes() {
        ObjectMapper mapper = new ObjectMapper();
        List<String> cortes = productoService.findAll()
                .stream()
                .map(producto -> {
                    try {
                        JsonNode descripcionNode = mapper.readTree(producto.getDescripcion());
                        return descripcionNode.get("corte").asText();
                    } catch (Exception e) {
                        e.printStackTrace();
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(cortes);
    }

    // @GetMapping("/colores")
    // public ResponseEntity<List<String>> getColores() {
    //     List<String> colores = productoService.findAll()
    //             .stream()
    //             .map(Producto::getColor)
    //             .distinct()
    //             .collect(Collectors.toList());
    //     return ResponseEntity.ok(colores);
    // }

    @GetMapping("/detalle/{id}")
    public ResponseEntity<Producto> getProductoDetalle(@PathVariable Long id) {
        Producto producto = productoService.findById(id);
        logger.info("Producto encontrado: {}", producto);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/form-producto-elements")
    public Map<String,Object> getFormProductosElements() {
        Map<String, Object> formElements = new HashMap<>();
        formElements.put("colores", colorService.findAll());
        formElements.put("tallas", tallaService.findAll());
        formElements.put("marcas", marcaService.findAll());
        formElements.put("categorias", categoriaService.findAll());
        return formElements;
    }
    

}