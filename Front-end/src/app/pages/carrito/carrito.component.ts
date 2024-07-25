import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  cantitems: any[] = [];
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;

  ngOnInit() {
    this.loadCart();
    this.calculateTotals();
  }

  loadCart() {
    this.cantitems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cantitems.forEach(item => {
      if (!item.quantity) {
        item.quantity = 1; // establece la cantidad predeterminada en 1 por siacaso sale error
      }
    });
    this.calculateTotals();
  }

  incrementQuantity(index: number) {
    this.cantitems[index].quantity++;
    this.updateCart();
  }

  decrementQuantity(index: number) {
    if (this.cantitems[index].quantity > 1) {
      this.cantitems[index].quantity--;
      this.updateCart();
    }
  }

  removeItem(index: number) {
    this.cantitems.splice(index, 1);
    this.updateCart();
  }

  updateCart() {
    localStorage.setItem('cart', JSON.stringify(this.cantitems));
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cantitems.reduce((sum, item) => sum + item.precioRegular * item.quantity, 0);
    this.descuento = this.cantitems.reduce((sum, item) => sum + (item.precioRegular - item.precioVenta) * item.quantity, 0);
    this.total = this.subtotal - this.descuento;
  }

  checkout() {
    console.log('Compra realizada:', this.cantitems); // Aquí se verá la cantidad en el objeto del carrito
    alert('Compra realizada con éxito');
    localStorage.removeItem('cart');
    this.loadCart();
  }
}
