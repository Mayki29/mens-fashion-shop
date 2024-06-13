package com.utp.desarrollo.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Producto;
import com.utp.desarrollo.backend.models.dao.IProductoDao;

@Service
public class ProductoServicesImpl implements IProductoService{

    @Autowired
    private IProductoDao productoDao;

    @Override
    public List<Producto> getAll() {
        return (List<Producto>)productoDao.findAll();
    }

}
