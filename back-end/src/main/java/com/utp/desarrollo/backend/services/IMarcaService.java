package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Marca;

public interface IMarcaService {
    List<Marca> findAll();
}
