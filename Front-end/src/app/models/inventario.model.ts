import { Color } from "./color.model";
import { Talla } from "./talla.model";

export interface Inventario {
    id?: number;
    color?: Color;
    talla?: Talla;
    stock?: number;

}