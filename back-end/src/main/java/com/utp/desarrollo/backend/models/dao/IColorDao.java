package com.utp.desarrollo.backend.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.utp.desarrollo.backend.models.Color;

public interface IColorDao extends CrudRepository<Color, Integer> {

}
