package com.utp.desarrollo.backend.auth;

import com.utp.desarrollo.backend.models.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    String token;
    Usuario user;
}
