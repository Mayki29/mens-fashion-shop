import { Color } from "./color.model";
import { Producto } from "./producto.model";
import { Talla } from "./talla.model";

export interface Inventario {
    id: number;
    id_producto: number;
    id_talla?: number;
    id_color?: number;
    stock: number;
    talla: Talla;
    color: Color;
}