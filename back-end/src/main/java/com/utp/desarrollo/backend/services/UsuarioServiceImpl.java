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
        return (List<Usuario>)usuarioDao.findAll();
    }

    @Override
    public Usuario findById(Long id) {
        return (Usuario)usuarioDao.findById(id).orElse(null);
    }

    @Override
    public void save(Usuario usuario) {
        usuarioDao.save(usuario);

    }

    @Override
    public void delete(Long id) {
        usuarioDao.deleteById(id);

    }
}
