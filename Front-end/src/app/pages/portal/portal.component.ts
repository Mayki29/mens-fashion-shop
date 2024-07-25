import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { Color } from 'src/app/models/color.model';
import { Inventario } from 'src/app/models/inventario.model';
import { Marca } from 'src/app/models/marca.model';
import { Producto } from 'src/app/models/producto.model';
import { Talla } from 'src/app/models/talla.model';
import { ApiService } from 'src/app/services/api.service';

interface FormProductosData {
  colores: Color[];
  tallas: Talla[];
  marcas: Marca[];
  categorias: Categoria[];
}
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  inventario: Inventario[] = [];
  colores: Color[] = [];
  tallas: Talla[] = [];
  marcas: Marca[] = [];
  categorias: Categoria[] = [];

  color?: Color = {};
  talla?: Talla = {};
  stock?: number = 0;
  item: Inventario ;

  producto?: Producto;

  constructor(private apiService: ApiService) {
    this.producto = {
      id: 0,
      nombre: '',
      descripcion: {},
      precioVenta: 0,
      precioRegular: 0,
      precioCompra: 0,
      marca: {
        id: 0,
        nombre: '',
      },
      categoria: { id: 0, nombre: '' },
    
      descuento: 0,
      imagenUrl: '',
      imagenUrlSec: [],
      
      inventario: [],
    };
    this.item ={
      id: 0,
      talla: {}
      
    };

  }

  ngOnInit(): void {
    this.getFormProductosElements();
    console.log(this.colores, this.tallas, this.marcas);
  }

  agregarInventario() {
    this.item.color = { ...this.color };
    this.item.talla = { ...this.talla };
    this.item.stock = this.stock;

    this.inventario.push({ ...this.item });
    console.log(this.inventario)
  }

  // editarItem(index: number, item:Inventario){
  //   this.color = item.color;
  //   this.talla = item.talla;
  //   this.stock = item.stock;


  // }

  // eliminarItem(index: number){
  //   this.inventario.
  // }

  getFormProductosElements() {
    this.apiService.getFormProductosElements().subscribe({
      next: (data: FormProductosData) => {
        this.colores = data.colores;
        this.tallas = data.tallas;
        this.marcas = data.marcas;
        this.categorias = data.categorias;
        if (this.marcas.length > 0 && this.producto) {
          this.producto.marca = this.marcas[0];
          this.producto.categoria = this.categorias[0];
          this.color = this.colores[0];
          this.talla = this.tallas[0];
        }
      },
      error: (e) => {},
    });
  }

  saveProducto(producto: Producto) {
    producto.inventario = [...this.inventario];

    this.apiService.saveProducto(producto).subscribe({
      next: (response) => {
        this.producto = response;
        console.log('Guardar =>', 'Registrado correctamente');
      },
      error: (e) => {},
    });
  }
  trackByFn(index: number, item: Inventario) {
    return item.id;
  }
}
