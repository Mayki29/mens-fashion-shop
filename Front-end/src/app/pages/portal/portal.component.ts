import { Component, OnInit } from '@angular/core';
import { Inventario } from 'src/app/models/inventario.model';
import { Talla } from 'src/app/models/talla.model';
import { Color } from 'src/app/models/color.model';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  item: Inventario = {
    id: 0,
    id_producto: 0,
    id_talla: 0,
    id_color: 0,
    stock: 0,
    talla: { id: 0, nombre: '' },
    color: { id: 0, nombre: '' }
  };

  color: Color = { id: 0, nombre: '' };
  talla: Talla = { id: 0, nombre: '' };
  stock: number = 0;
  inventario: Inventario[] = [];

  constructor() { }

  ngOnInit(): void {
    this.agregarInventario();
  }

  agregarInventario() {
    const nuevoItem: Inventario = {
      id: this.item.id,
      id_producto: this.item.id_producto,
      id_talla: this.talla.id,
      id_color: this.color.id,
      stock: this.stock,
      talla: { id: this.talla.id, nombre: this.talla.nombre },
      color: { id: this.color.id, nombre: this.color.nombre }
    };
    this.inventario.push(nuevoItem);
    this.stock = 0; // Restablece el stock después de agregar
  }
}
