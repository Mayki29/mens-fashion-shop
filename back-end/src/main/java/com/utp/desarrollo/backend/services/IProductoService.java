package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Producto;

public interface IProductoService {
    List<Producto> getAll();
    Producto findById(Long id);
    void save(Producto producto);
    void update(Producto producto);
    void delete(Long id);
}
