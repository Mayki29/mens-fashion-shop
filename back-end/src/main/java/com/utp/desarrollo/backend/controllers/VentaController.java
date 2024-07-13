package com.utp.desarrollo.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.desarrollo.backend.models.ComprobanteVenta;
import com.utp.desarrollo.backend.models.Venta;
import com.utp.desarrollo.backend.services.IVentaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/venta")
@CrossOrigin(origins = "http://localhost:4200")
public class VentaController {

    @Autowired
    IVentaService ventaService;

    @GetMapping()
    public List<Venta> findAllVentas() {
        return ventaService.findAll();
    }

    @GetMapping("/{id}")
    public Venta findVentaById(@PathVariable(value = "id") Long id){
        return ventaService.findById(id);
    }

    @PostMapping()
    public ComprobanteVenta saveVenta(@RequestBody Venta venta) {
        return ventaService.save(venta);
    }
    
    
}
