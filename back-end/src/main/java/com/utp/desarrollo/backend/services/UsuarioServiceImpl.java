package com.utp.desarrollo.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Usuario;
import com.utp.desarrollo.backend.models.dao.IUsuarioDao;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    private IUsuarioDao usuarioDao;

    @Override
    public List<Usuario> findAll() {
        return (List<Usuario>) usuarioDao.findAll();
    }

    @Override
    public Usuario findById(Long id) {
        return (Usuario) usuarioDao.findById(id).orElse(null);
    }

    @Override
    public Usuario login(String email, String contrasena) {
        return usuarioDao.login(email, contrasena);
    }

    @Override
    public void save(Usuario usuario) {
        Usuario newUsuario = usuario;
        newUsuario.setRol("Cliente");
        newUsuario.setEstado(true);
        usuarioDao.save(newUsuario);

    }

    @Override
    public void update(Usuario usuario) {
        usuarioDao.save(usuario);
    }

    @Override
    public void delete(Long id) {
        usuarioDao.deleteById(id);

    }

}
