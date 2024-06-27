import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  products: Producto[] = [];
  filteredProducts: Producto[] = [];
  selectedBrands: string[] = [];
  selectedCorte: string[] = [];
  selectedColors: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.apiService.getProducts().subscribe(
      (data: Producto[]) => {
        this.products = data;
        this.filteredProducts = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onBrandChange(event: any): void {
    const brand = event.target.value;
    if (event.target.checked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index > -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    this.filterProducts();
  }


  toggleCorte(corte: string): void {
    const index = this.selectedCorte.indexOf(corte);
    if (index > -1) {
      this.selectedCorte.splice(index, 1);
    } else {
      this.selectedCorte.push(corte);
    }
    this.filterProducts();
  }

  toggleColor(color: string): void {
    const index = this.selectedColors.indexOf(color);
    if (index > -1) {
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const brandMatch = this.selectedBrands.length === 0 || this.selectedBrands.includes(product.marca);
      const corteMatch = this.selectedCorte.length === 0 || this.selectedCorte.includes(product.corte);
      const colorMatch = this.selectedColors.length === 0 || this.selectedColors.includes(product.color);
      return brandMatch && corteMatch && colorMatch;
    });
  }
}
