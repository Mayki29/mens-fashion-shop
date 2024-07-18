import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color.model';
import { Inventario } from 'src/app/models/inventario.model';
import { Talla } from 'src/app/models/talla.model';


interface InventarioItem {
  nombreProducto: string;
  color: { nombre: string };
  talla: { nombre: string };
  precioCompra: number;
  precioVenta: number;
  stock: number;
}

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  nombreProducto: string = '';
  descripcion: string = '';
  color: { nombre: string } = { nombre: '' };
  talla: { nombre: string } = { nombre: '' };
  stock: number = 0;
  precioCompra: number = 0;
  precioVenta: number = 0;
  precioRegular: number | null = null;
  marca: string = 'Overtake';
  inventario: any[] = []; // Aquí puedes definir la interfaz para los productos
  modoEdicion: boolean = false;
  indexEdicion: number | null = null;

  // editar inventario
  nombreProductoEditado: string = '';
  colorEditado: { nombre: string } = { nombre: '' };
  tallaEditada: { nombre: string } = { nombre: '' };
  precioCompraEditado: number = 0;
  precioVentaEditado: number = 0;
  stockEditado: number = 0;

  constructor() { }

  ngOnInit(): void {
    // lógica o datos 
  }

  agregarProducto() {
    if (this.nombreProducto && this.descripcion && this.stock >= 0 && this.precioCompra >= 0 && this.precioVenta >= 0) {
      const nuevoProducto = {
        nombreProducto: this.nombreProducto,
        descripcion: this.descripcion,
        stock: this.stock,
        precioCompra: this.precioCompra,
        precioVenta: this.precioVenta,
        precioRegular: this.precioRegular,
        marca: this.marca,
        color: { nombre: this.color.nombre },
        talla: { nombre: this.talla.nombre },
      };
      this.inventario.push(nuevoProducto);
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {
    this.nombreProducto = '';
    this.descripcion = '';
    this.stock = 0;
    this.precioCompra = 0;
    this.precioVenta = 0;
    this.precioRegular = null;
    this.marca = 'Overtake';
  }

  editarInventario(index: number) {
    this.modoEdicion = true;
    this.indexEdicion = index;
    const producto = this.inventario[index];
    this.nombreProductoEditado = producto.nombreProducto;
    this.colorEditado = producto.color || { nombre: '' };
    this.tallaEditada = producto.talla || { nombre: '' };
    this.precioCompraEditado = producto.precioCompra;
    this.precioVentaEditado = producto.precioVenta;
    this.stockEditado = producto.stock;
  }

  guardarEdicion() {
    if (this.indexEdicion !== null) {
      const productoEditado = {
        nombreProducto: this.nombreProductoEditado,
        color: this.colorEditado,
        talla: this.tallaEditada,
        precioCompra: this.precioCompraEditado,
        precioVenta: this.precioVentaEditado,
        stock: this.stockEditado
      };
      this.inventario[this.indexEdicion] = productoEditado;
      this.modoEdicion = false;
      this.indexEdicion = null;
    }
  }

  eliminarInventario(index: number) {
    this.inventario.splice(index, 1);
  }
}