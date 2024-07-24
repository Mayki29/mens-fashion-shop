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
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

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
        List<Producto> productos = productoService.findAll();
        productos.forEach(this::calculateDiscount);
        return productos;
    }

    @GetMapping("/{id}")
    public Producto findProductoById(@PathVariable Long id) {
        Producto producto = productoService.findById(id);
        calculateDiscount(producto);
        return producto;
    }

    @PostMapping
    public Producto saveProducto(@RequestBody Producto producto) {
        return productoService.save(producto);
    }

    @GetMapping("/inventario")
    public List<Inventario> findAllInventario() {
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
    public List<String> getMarcas() {
        return marcaService.findAll().stream()
                .map(marca -> marca.getNombre())
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/entalles")
    public List<String> getEntalles() {
        ObjectMapper mapper = new ObjectMapper();
        return productoService.findAll().stream()
                .map(producto -> {
                    try {
                        JsonNode descripcionNode = mapper.readTree(producto.getDescripcion());
                        return descripcionNode.get("Entalle").asText();
                    } catch (Exception e) {
                        e.printStackTrace();
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/colores")
    public List<String> getColores() {
        return colorService.findAll().stream()
                .map(color -> color.getNombre())
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/detalle/{id}")
    public ResponseEntity<Producto> getProductoDetalle(@PathVariable Long id) {
        Producto producto = productoService.findById(id);
        calculateDiscount(producto);
        logger.info("Producto encontrado: {}", producto);
        if (producto != null) {
            return ResponseEntity.ok(producto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/form-producto-elements")
    public Map<String, Object> getFormProductosElements() {
        Map<String, Object> formElements = new HashMap<>();
        formElements.put("colores", colorService.findAll());
        formElements.put("tallas", tallaService.findAll());
        formElements.put("marcas", marcaService.findAll());
        formElements.put("categorias", categoriaService.findAll());
        return formElements;
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Producto>> filtrarProductos(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String entalle) {

        List<Producto> productos = productoService.findAll();

        if (marca != null && !marca.isEmpty()) {
            logger.info("Filtrando por marca: " + marca);
            productos = productos.stream()
                    .peek(producto -> logger.info("Producto Marca: " + producto.getMarca().getNombre()))
                    .filter(producto -> producto.getMarca().getNombre().equalsIgnoreCase(marca))
                    .collect(Collectors.toList());
        }

        if (color != null && !color.isEmpty()) {
            productos = productos.stream()
                    .filter(producto -> producto.getInventario().stream()
                            .anyMatch(inventario -> inventario.getColor().getNombre().equalsIgnoreCase(color)))
                    .collect(Collectors.toList());
        }

        if (entalle != null && !entalle.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            productos = productos.stream()
                    .filter(producto -> {
                        try {
                            JsonNode descripcionNode = mapper.readTree(producto.getDescripcion());
                            return descripcionNode.get("Entalle").asText().equalsIgnoreCase(entalle);
                        } catch (Exception e) {
                            e.printStackTrace();
                            return false;
                        }
                    })
                    .collect(Collectors.toList());
        }

        productos.forEach(this::calculateDiscount);

        logger.info("Productos filtrados: " + productos.size());

        return ResponseEntity.ok(productos);
    }

    @GetMapping("/detalle-completo/{id}")
    public ResponseEntity<Map<String, Object>> getProductoDetalleCompleto(@PathVariable Long id) {
        Producto producto = productoService.findById(id);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }

        // Obtener inventario del producto
        List<Inventario> inventario = inventarioService.findByProductoId(id);

        // Obtener colores disponibles
        List<String> colores = inventario.stream()
                .map(inv -> inv.getColor().getNombre())
                .distinct()
                .collect(Collectors.toList());

        // Obtener tallas disponibles por color
        Map<String, List<String>> tallasPorColor = new HashMap<>();
        for (Inventario inv : inventario) {
            String color = inv.getColor().getNombre();
            String talla = inv.getTalla().getNombre();
            tallasPorColor.computeIfAbsent(color, k -> new ArrayList<>()).add(talla);
        }

        // Calcular el descuento
        double descuento = producto.getPrecioRegular() - producto.getPrecioVenta();
        double descuentoPorcentual = (descuento / producto.getPrecioRegular()) * 100;

        // Crear respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("producto", producto);
        response.put("inventario", inventario);
        response.put("colores", colores);
        response.put("tallasPorColor", tallasPorColor);
        response.put("descuento", descuento);
        response.put("descuentoPorcentual", Math.round(descuentoPorcentual));
        response.put("imagenUrlSec", producto.getImagenUrlSec()); // Asegurarse de agregar las imágenes secundarias

        return ResponseEntity.ok(response);
    }

    private void calculateDiscount(Producto producto) {
        if (producto.getPrecioRegular() != null && producto.getPrecioVenta() != null) {
            double descuento = ((producto.getPrecioRegular() - producto.getPrecioVenta()) / producto.getPrecioRegular()) * 100;
            producto.setDescuento((int) Math.round(descuento));
        } else {
            producto.setDescuento(0);
        }
    }
}
