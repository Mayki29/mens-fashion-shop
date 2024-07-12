import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color.model';
import { Inventario } from 'src/app/models/inventario.model';
import { Talla } from 'src/app/models/talla.model';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  inventario: Inventario[] = [];
  color: Color = {};
  talla: Talla = {};
  stock: number = 0;
  item: Inventario = {};

  
  
  constructor() { }

  ngOnInit(): void {
  }

  agregarInventario(){
    this.item.color = this.color;
    this.item.talla = this.talla;
    this.item.stock = this.stock;

    this.inventario.push(this.item);

    console.log(this.inventario)
    
  }

}
