package com.utp.desarrollo.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.utp.desarrollo.backend.models.Usuario;
import com.utp.desarrollo.backend.services.IUsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping()
    public List<Usuario> findAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Usuario findUsuarioById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario usuario){
        return usuarioService.login(usuario.getEmail(), usuario.getContrasena());
    }

    @PostMapping()
    public void saveUsuario(@RequestBody Usuario usuario) {
        usuarioService.save(usuario);
    }
    @PutMapping()
    public void updateUsuario(@RequestBody Usuario usuario) {
        usuarioService.update(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioService.delete(id);
    }
}
