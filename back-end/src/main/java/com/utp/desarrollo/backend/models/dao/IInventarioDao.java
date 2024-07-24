package com.utp.desarrollo.backend.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Inventario;

import java.util.List;

public interface IInventarioDao extends CrudRepository<Inventario, Long> {
    List<Inventario> findByProductoId(Long productoId);
}
