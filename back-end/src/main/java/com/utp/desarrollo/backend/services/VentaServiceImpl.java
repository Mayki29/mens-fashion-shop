package com.utp.desarrollo.backend.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.utp.desarrollo.backend.models.ComprobanteVenta;
import com.utp.desarrollo.backend.models.Venta;
import com.utp.desarrollo.backend.models.dao.IVentaDao;

@Service
public class VentaServiceImpl implements IVentaService{

    @Autowired
    IVentaDao ventaDao;

    @Override
    @Transactional(readOnly = true)
    public List<Venta> findAll() {
        return (List<Venta>)ventaDao.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Venta findById(Long id) {
        return ventaDao.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public ComprobanteVenta save(Venta venta) {
        Venta v = venta;
        v.setFechaHora(LocalDateTime.now());
        Long id = ventaDao.save(v).getId();//Guarda la venta en la base de al datos y obtiene su id
        Venta ventaGenerada = ventaDao.findById(id).orElse(null);//Busca la venta que se acaba de crear
        
        
        //Asigna los datos de la venta al comprobante
        ComprobanteVenta comprobante = new ComprobanteVenta();
        comprobante.setFechaHora(ventaGenerada.getFechaHora());
        comprobante.setNombreCliente(ventaGenerada.getUsuario().getNombre() + " " +ventaGenerada.getUsuario().getApellidos());
        
        List<Map<String,Object>> productosList = new ArrayList<>();
        ventaGenerada.getDetalleVenta().stream().forEach(e -> {
            Map<String, Object> mapProducto = new HashMap<>();
            mapProducto.put("producto", e.getProducto().getNombre());
            mapProducto.put("cantidad", e.getCantidad());
            mapProducto.put("preciounitario", e.getPrecioUnitario());
            productosList.add(mapProducto);
        });
        comprobante.setProductos(productosList);
        //Calcula total de la venta
        Double totalVenta = ventaGenerada.getDetalleVenta().stream()
                        .reduce(0D, (total, elemento )-> total + (elemento.getPrecioUnitario() * elemento.getCantidad()), Double::sum);
        comprobante.setTotal(totalVenta);
        return comprobante;
    }

    

}
