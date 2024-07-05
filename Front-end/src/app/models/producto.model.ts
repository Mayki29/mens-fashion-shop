// src/app/models/producto.model.ts

import { Marca } from './marca.model';
import { Categoria } from './categoria.model';
import { Talla } from './talla.model';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: any;
  precioVenta: number;
  precioRegular: number;
  precioCompra: number;
  marca: Marca;
  categoria: Categoria;
  color: string;
  descuento: number;
  imagenUrl: string;
  imagenUrlSec: string[];
  tallas: Talla[];
}
