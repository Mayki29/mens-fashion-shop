import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems.next(storedCart);
  }

  addToCart(product: any) {
    const currentCart = this.cartItems.value;
    const updatedCart = [...currentCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartItems.next(updatedCart);
    console.log('Producto añadido al carrito:', product);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems.next([]);
  }
}
