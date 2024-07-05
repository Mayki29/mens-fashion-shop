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
    this.getCortes();
    this.getColores();
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

  onMarcaChange(event: any): void {
    const selectedMarca = event.target.value;
    if (event.target.checked) {
      this.selectedMarcas.push(selectedMarca);
    } else {
      this.selectedMarcas = this.selectedMarcas.filter(marca => marca !== selectedMarca);
    }
    this.filterProducts();
  }

  onCorteChange(event: any): void {
    const selectedCorte = event.target.value;
    if (event.target.checked) {
      this.selectedCortes.push(selectedCorte);
    } else {
      this.selectedCortes = this.selectedCortes.filter(corte => corte !== selectedCorte);
    }
    this.filterProducts();
  }

  onColorChange(event: any): void {
    const selectedColor = event.target.value;
    if (event.target.checked) {
      this.selectedColores.push(selectedColor);
    } else {
      this.selectedColores = this.selectedColores.filter(color => color !== selectedColor);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.productos.filter(product => {
      const matchMarca = this.selectedMarcas.length ? this.selectedMarcas.includes(product.marca.nombre) : true;
      const matchCorte = this.selectedCortes.length ? this.selectedCortes.includes(this.getCorteFromDescription(product.descripcion)) : true;
      const matchColor = this.selectedColores.length ? this.selectedColores.includes(product.color) : true;
      return matchMarca && matchCorte && matchColor;
    });
  }

  getCorteFromDescription(descripcion: string): string {
    try {
      const descObj = JSON.parse(descripcion);
      return descObj.corte;
    } catch (e) {
      console.error('Error parsing description JSON:', e);
      return '';
    }
  }
}
