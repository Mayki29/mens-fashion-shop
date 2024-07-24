package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Inventario;

public interface IInventarioService {
    List<Inventario> findAll();
    Inventario findById(Long id);
    List<Inventario> findByProductoId(Long productoId);
    
}
