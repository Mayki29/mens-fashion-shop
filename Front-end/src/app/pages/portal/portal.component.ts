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
  //tabla y modales
  listProductos: Producto[] = [];
  showInventario: Inventario[] = [];
  showImagenes: string[] = [];


  //Selects
  colores: Color[] = [];
  tallas: Talla[] = [];
  marcas: Marca[] = [];
  categorias: Categoria[] = [];

  //Items inventario
  color?: Color = {};
  talla?: Talla = {};
  stock?: number = 0;
  item: Inventario;

  //Modelos formulario
  inventario: Inventario[] = [];
  producto?: Producto;
  imagenes?: any;

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
    this.item = {
      id: 0,
      talla: {},
    };
    this.imagenes = {};
  }

  ngOnInit(): void {
    this.getFormProductosElements();
    this.getProductos();
    
  }

  agregarInventario() {
    this.item.color = { ...this.color };
    this.item.talla = { ...this.talla };
    this.item.stock = this.stock;
    const isIn = this.inventario.some(i => i.color?.id === this.item.color?.id && i.talla.id === this.item.talla.id)
    if(!isIn){
      this.inventario.push({ ...this.item });
    }
  }

  eliminarItem(index: number){
    this.inventario.splice(index,1);
  }


  //Mostrar data
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

  getProductos(){
    this.apiService.getProducts().subscribe({
      next: (data: Producto[]) => {
        data.forEach(p => p.descripcion = JSON.parse(p.descripcion));
        this.listProductos = data;
        console.log(this.listProductos)
      },
      error: (e) => {},
    });
  }

  loadModalInventario(id: number){
    const prod = this.listProductos.find(p => p.id == id)
    this.showInventario = prod?.inventario || [];
  }
  loadModalImagenes(id: number){
    const prod = this.listProductos.find(p => p.id == id)
    let imgs = prod?.imagenUrlSec.concat(prod?.imagenUrl||'');
    this.showImagenes = imgs||[];
  }


  //CRUD
  saveProducto(producto: Producto) {
    producto.descripcion = JSON.stringify(producto.descripcion);
    producto.inventario = [...this.inventario];

    const form: FormData = new FormData();
    form.append('producto', JSON.stringify(producto));
    form.append('imagenP', this.imagenes.principal);
    for (let index = 0; index < this.imagenes.secundaria.length; index++) {
      form.append('imagenS', this.imagenes.secundaria[index]);
      
    }

    this.apiService.saveProducto(form).subscribe({
      next: (response) => {
        this.producto = response;
        console.log('Guardar =>', 'Registrado correctamente');
      },
      error: (e) => {},
    });
  }

  deleteProducto(id: number){
    if(!confirm("¿Desea eliminar el producto?")){
      return
    }
    this.apiService.deleteProducto(id).subscribe({
      next: (response) => {
        console.log('Eliminar =>', 'Eliminado correctamente');
        this.getProductos();
      },
      error: (e) => {},
    });
  }

  trackByFn(index: number, item: Inventario) {
    return item.id;
  }

  capturarImagenPrincipal(event: any): any {
    this.imagenes.principal = event.target.files[0];
  }
  capturarImagenSecundaria(event: any): any {
    this.imagenes.secundaria = event.target.files;
  }
}
