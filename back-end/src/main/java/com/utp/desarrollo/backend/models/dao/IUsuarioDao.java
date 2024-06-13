package com.utp.desarrollo.backend.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long>{
    
}
