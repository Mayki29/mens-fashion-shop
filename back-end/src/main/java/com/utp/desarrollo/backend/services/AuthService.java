package com.utp.desarrollo.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.utp.desarrollo.backend.auth.AuthResponse;
import com.utp.desarrollo.backend.auth.LoginRequest;
import com.utp.desarrollo.backend.auth.RegisterRequest;
import com.utp.desarrollo.backend.models.Rol;
import com.utp.desarrollo.backend.models.Usuario;
import com.utp.desarrollo.backend.models.dao.IUsuarioDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    private IUsuarioDao usuarioDao;

    @Autowired
    private JwtServiceImpl jwtService;

    public AuthResponse login(LoginRequest request) {
        return null;
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellidos(request.getApellidos());
        usuario.setContrasena(request.getContrasena());
        usuario.setEmail(request.getEmail());
        usuario.setDni(request.getDni());
        usuario.setTelefono(request.getTelefono());
        usuario.setRol(Rol.USER);
        usuario.setEstado(true);

        usuarioDao.save(usuario);

        return AuthResponse.builder()
            .token(jwtService.getToken(usuario))
            .build();

    }

}
