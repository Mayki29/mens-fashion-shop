package com.utp.desarrollo.backend.services;

import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.models.Rol;
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

    // @Override
    // public Usuario login(String email, String contrasena) {
    //     String contrasenaEncriptada = DigestUtils.sha512Hex(contrasena);
    //     return usuarioDao.login(email, contrasenaEncriptada);
    // }

    @Override
    public Usuario save(Usuario usuario) {
        Usuario newUsuario = usuario;
        newUsuario.setRol(Rol.USER);
        newUsuario.setEstado(true);
        newUsuario.setContrasena(DigestUtils.sha512Hex(usuario.getContrasena()));
        return usuarioDao.save(newUsuario);

    }

    @Override
    public void update(Usuario usuario) {
        Usuario newUsuario = usuario;
        newUsuario.setContrasena(DigestUtils.sha512Hex(usuario.getContrasena()));
        usuarioDao.save(newUsuario);
    }

    @Override
    public void delete(Long id) {
        usuarioDao.deleteById(id);

    }

    @Override
    public Usuario login(String email, String contrasena) {
       return null;
    }

}
