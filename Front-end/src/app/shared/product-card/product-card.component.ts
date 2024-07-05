import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() nombre: string = '';
  @Input() marca: string = '';
  @Input() imagen: string = '';
  @Input() imagenUrl: string = '';
  @Input() precioRegular: number = 0;
  @Input() precioDescuento: number = 0;
  @Input() descuento: number = 0;
  @Input() corte: string = '';
  @Input() color: string = '';

  constructor() { }

 
  ngOnInit(): void {
    console.log('Product Card Inputs:', {
      nombre: this.nombre,
      marca: this.marca,
      imagen: this.imagen,
      precioRegular: this.precioRegular,
      precioDescuento: this.precioDescuento,
      descuento: this.descuento,
    });
  }
}
