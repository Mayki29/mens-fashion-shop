// src/app/models/producto.model.ts

import { Marca } from './marca.model';
import { Categoria } from './categoria.model';
<<<<<<< HEAD
import { Talla } from './talla.model';
import { Inventario } from './inventario.model';

=======
import { Inventario } from './inventario.model';
>>>>>>> b74ca873f18c7827bc1c0efb70d048e570455552
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
<<<<<<< HEAD
  tallas: Talla[];
=======
>>>>>>> b74ca873f18c7827bc1c0efb70d048e570455552
  inventario: Inventario[];
}
