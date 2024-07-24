import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  filteredProducts: Producto[] = [];
  marcas: string[] = [];
  cortes: string[] = [];
  colores: string[] = [];
  selectedMarcas: string[] = [];
  selectedCortes: string[] = [];
  selectedColores: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getMarcas();
    this.getColores();
    this.getCortes();
  }

  getProducts(): void {
    this.apiService.getProducts().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  getMarcas(): void {
    this.apiService.getMarcas().subscribe(
      (data: string[]) => {
        this.marcas = data;
      },
      (error) => {
        console.error('Error fetching marcas', error);
      }
    );
  }

  getColores(): void {
    this.apiService.getColores().subscribe(
      (data: string[]) => {
        this.colores = data;
      },
      (error) => {
        console.error('Error fetching colores', error);
      }
    );
  }

  getCortes(): void {
    this.apiService.getCortes().subscribe(
      (data: string[]) => {
        this.cortes = data;
      },
      (error) => {
        console.error('Error fetching cortes', error);
      }
    );
  }

  onFilterChange(filterData: { filterType: string, value: string }): void {
    const { filterType, value } = filterData;
    if (filterType === 'marca') {
      this.toggleSelection(this.selectedMarcas, value);
    } else if (filterType === 'corte') {
      this.toggleSelection(this.selectedCortes, value);
    } else if (filterType === 'color') {
      this.toggleSelection(this.selectedColores, value);
    }
    this.filterProducts();
  }

  toggleSelection(array: string[], value: string): void {
    const index = array.indexOf(value);
    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  }

  filterProducts(): void {
    const marca = this.selectedMarcas.length ? this.selectedMarcas[0] : undefined;
    const color = this.selectedColores.length ? this.selectedColores[0] : undefined;
    const entalle = this.selectedCortes.length ? this.selectedCortes[0] : undefined;

    this.apiService.filtrarProductos(marca, color, entalle).subscribe(
      (data: Producto[]) => {
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error filtering products', error);
      }
    );
  }
}
