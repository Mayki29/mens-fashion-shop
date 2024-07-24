package com.utp.desarrollo.backend.models.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long>{

    //@Query("SELECT u FROM Usuario u WHERE u.email = ?1 AND u.contrasena = ?2")
    Optional<Usuario> findByEmail(String email);
    
}
