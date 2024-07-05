import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto: Producto | null = null;
  imagenPrincipal: string = '';
  imagenesSecundarias: string[] = [];
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getProductoDetalle(id).subscribe(
      (data: Producto) => {
        this.producto = data;
        this.imagenPrincipal = `http://localhost:8080/uploads/${data.imagenUrl}`;
        this.imagenesSecundarias = data.imagenUrlSec ? data.imagenUrlSec.map((url: string) => `http://localhost:8080/uploads/${url}`) : [];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching product details', error);
        this.isLoading = false;
      }
    );
  }

  cambiarImagenPrincipal(imagen: string): void {
    this.imagenPrincipal = imagen;
  }
}
