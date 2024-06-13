package com.utp.desarrollo.backend.models.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Producto;

public interface IProductoDao extends CrudRepository<Producto, Long>{
    //List<Producto> getAll();
}
