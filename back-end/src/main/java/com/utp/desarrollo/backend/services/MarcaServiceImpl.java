package com.utp.desarrollo.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Marca;
import com.utp.desarrollo.backend.models.dao.IMarcaDao;

@Service
public class MarcaServiceImpl implements IMarcaService {

    @Autowired
    private IMarcaDao marcaDao;

    @Override
    public List<Marca> findAll() {
        return (List<Marca>) marcaDao.findAll();
    }

}
