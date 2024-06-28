package com.utp.desarrollo.backend.services;

import java.util.List;

import com.utp.desarrollo.backend.models.ComprobanteVenta;
import com.utp.desarrollo.backend.models.Venta;

public interface IVentaService {
    ComprobanteVenta save(Venta venta);
    List<Venta> findAll();
    Venta findById(Long id);

}
