package com.utp.desarrollo.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Color;
import com.utp.desarrollo.backend.models.dao.IColorDao;

@Service
public class ColorServiceImpl implements IColorService{

    @Autowired
    private IColorDao colorDao;

    @Override
    public List<Color> findAll() {
        return (List<Color>)colorDao.findAll();
    }

}
