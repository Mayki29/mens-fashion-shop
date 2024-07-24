// src/app/models/producto.model.ts

import { Marca } from './marca.model';
import { Categoria } from './categoria.model';
import { Inventario } from './inventario.model';
export interface Producto {
  id: number;
  nombre: string;
  descripcion: any;
  precioVenta: number;
  precioRegular: number;
  precioCompra: number;
  marca: Marca;
  categoria: Categoria;
  descuento: number;
  imagenUrl: string;
  imagenUrlSec: string[];
  inventario: Inventario[];
}
