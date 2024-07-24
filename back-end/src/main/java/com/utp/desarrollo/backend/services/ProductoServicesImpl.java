package com.utp.desarrollo.backend.services;

import com.utp.desarrollo.backend.models.Producto;
import com.utp.desarrollo.backend.models.dao.IProductoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoServicesImpl implements IProductoService {

    @Autowired
    private IProductoDao productoDao;

    @Override
    public List<Producto> findAll() {
        List<Producto> productos = (List<Producto>) productoDao.findAll();
        return productos.stream()
                .peek(this::calculateDiscount)
                .collect(Collectors.toList());
    }

    @Override
    public Producto findById(Long id) {
        Producto producto = productoDao.findById(id).orElse(null);
        if (producto != null) {
            calculateDiscount(producto);
        }
        return producto;
    }

    @Override
    public Producto save(Producto producto) {
        return productoDao.save(producto);
    }

    @Override
    public void delete(Long id) {
        productoDao.deleteById(id);
    }

    private void calculateDiscount(Producto producto) {
        if (producto.getPrecioRegular() != null && producto.getPrecioVenta() != null) {
            double descuento = ((producto.getPrecioRegular() - producto.getPrecioVenta()) / producto.getPrecioRegular()) * 100;
            producto.setDescuento(Math.round(descuento * 100.0) / 100.0); // Redondea a dos decimales
        } else {
            producto.setDescuento(0);
        }
    }
}
