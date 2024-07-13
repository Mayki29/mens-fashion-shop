package com.utp.desarrollo.backend.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Inventario;

public interface IInventarioDao extends CrudRepository<Inventario, Long> {

}
