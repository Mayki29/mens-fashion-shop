package com.utp.desarrollo.backend.models.dao;

import java.util.List;

import com.utp.desarrollo.backend.models.Producto;

public interface IProductoDao {
    List<Producto> getAll();
}
