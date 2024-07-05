package com.utp.desarrollo.backend.models;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComprobanteVenta {
    private LocalDateTime fechaHora;
    private List<Map<String, Object>> productos;
    private String nombreCliente;
    private Double total;
}
