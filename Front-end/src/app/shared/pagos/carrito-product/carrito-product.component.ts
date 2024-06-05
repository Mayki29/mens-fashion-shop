import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tr[app-carrito-product]',
  templateUrl: './carrito-product.component.html',
  styleUrls: ['./carrito-product.component.scss']
})
export class CarritoProductComponent implements OnInit {
  @Input() nombre: string = '';
  @Input() marca: string = '';
  @Input() imagen: string = '';
  @Input() precioAntes: number = 0;
  @Input() precio: number = 0;
  @Input() cantidad: number = 1;
  @Input() total: number = 0;


  constructor() { }

  ngOnInit(): void {
  }


  incrementar(){
    this.cantidad+=1;
    this.total = this.cantidad*this.precio;
  }
  disminuir(){
    if(this.cantidad > 1){
      this.cantidad-=1;   
      this.total = this.cantidad*this.precio;
    }

  }

}
