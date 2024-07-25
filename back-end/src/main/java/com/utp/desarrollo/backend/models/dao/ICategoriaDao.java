package com.utp.desarrollo.backend.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Categoria;

public interface ICategoriaDao extends CrudRepository<Categoria, Integer> {

}
