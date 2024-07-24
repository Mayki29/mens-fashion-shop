package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Categoria;

public interface ICategoriaService {
    List<Categoria> findAll();
}
