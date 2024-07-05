package com.utp.desarrollo.backend.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Venta;

public interface IVentaDao extends CrudRepository<Venta,Long>{

    @Query("SELECT v FROM Venta v WHERE v.id = ?1")
    public Venta findVentaById(Long id);

}
