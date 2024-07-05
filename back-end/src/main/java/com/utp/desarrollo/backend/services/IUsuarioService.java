package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.Usuario;

public interface IUsuarioService {
    List<Usuario> findAll();
    Usuario findById(Long usuario);
    Usuario login(String email, String contrasena);
    Usuario save(Usuario usuario);
    void update(Usuario usuario);
    void delete(Long id);

}
