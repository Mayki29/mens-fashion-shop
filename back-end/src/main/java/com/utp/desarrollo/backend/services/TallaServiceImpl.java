package com.utp.desarrollo.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Talla;
import com.utp.desarrollo.backend.models.dao.ITallaDao;

@Service
public class TallaServiceImpl implements ITallaService {

    @Autowired
    private ITallaDao tallaDao;

    @Override
    public List<Talla> findAll() {
        return (List<Talla>) tallaDao.findAll();
    }


}
