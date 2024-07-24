import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  marcas: string[] = [];
  colores: string[] = [];
  entalles: string[] = [];

  @Output() filterChange = new EventEmitter<{filterType: string, value: string}>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getMarcas();
    this.getColores();
    this.getEntalles();
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

  getEntalles(): void {
    this.apiService.getCortes().subscribe(
      (data: string[]) => {
        this.entalles = data;
      },
      (error) => {
        console.error('Error fetching entalles', error);
      }
    );
  }

  onFilterChange(event: any, filterType: string): void {
    const value = event.target.value;
    this.filterChange.emit({ filterType, value });
  }
}
