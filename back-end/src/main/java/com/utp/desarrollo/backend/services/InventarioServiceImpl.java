package com.utp.desarrollo.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Inventario;
import com.utp.desarrollo.backend.models.dao.IInventarioDao;

@Service
public class InventarioServiceImpl implements IInventarioService {

    @Autowired
    private IInventarioDao inventarioDao;

    @Override
    public List<Inventario> findAll() {
        return (List<Inventario>) inventarioDao.findAll();
    }

    @Override
    public Inventario findById(Long id) {
        return inventarioDao.findById(id).orElse(null);
    }

}
