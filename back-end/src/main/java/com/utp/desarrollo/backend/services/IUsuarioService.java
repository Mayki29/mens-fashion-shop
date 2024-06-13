package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Usuario;

public interface IUsuarioService {
    List<Usuario> findAll();
    Usuario findById(Long usuario);
    void save(Usuario usuario);
    void delete(Long id);

}
