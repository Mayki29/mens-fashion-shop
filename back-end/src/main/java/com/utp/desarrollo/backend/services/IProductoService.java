package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Producto;

public interface IProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    void save(Producto producto);
    void delete(Long id);
}
