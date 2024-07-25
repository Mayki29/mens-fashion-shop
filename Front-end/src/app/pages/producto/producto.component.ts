import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  producto: Producto = {} as Producto;
  inventario: any[] = [];
  colores: string[] = [];
  tallasPorColor: { [color: string]: string[] } = {};
  descuento: number = 0;
  descuentoPorcentual: number = 0;
  colorSeleccionado: string = '';
  tallaSeleccionada: string = '';
  stockDisponible: number = 0;
  cantidad: number = 1;
  mensajeStock: string = '';
  mensajeCarrito: string = '';
  selectedImage: string = '';
  selectedTab: string = 'descripcion';
  descripcion: { [key: string]: string } = {};
  keys: string[] = [];
  fadeOutTimeout: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getProductoDetalleCompleto(+productId).subscribe(data => {
        this.producto = data.producto;
        this.selectedImage = this.producto.imagenUrl;
        this.inventario = data.inventario;
        this.colores = [...new Set(this.inventario.map(item => item.color.nombre))];
        this.tallasPorColor = this.colores.reduce((acc, color) => {
          acc[color] = this.inventario.filter(item => item.color.nombre === color).map(item => item.talla.nombre);
          return acc;
        }, {} as { [color: string]: string[] });
        this.descuento = this.producto.precioRegular - this.producto.precioVenta;
        this.descuentoPorcentual = (this.descuento / this.producto.precioRegular) * 100;

        this.descripcion = JSON.parse(this.producto.descripcion);
        this.keys = Object.keys(this.descripcion);
      });
    }
  }

  convertirColor(color: string): string {
    const colores: { [key: string]: string } = {
      'NEGRO': '#000000',
      'BLANCO': '#FFFFFF',
      'ROJO': '#FF0000',
      'VERDE': '#00FF00',
      'AZUL': '#0000FF',
      'AMARILLO': '#FFFF00',
      'CIAN': '#00FFFF',
      'MAGENTA': '#FF00FF',
      'GRIS': '#808080',
      'NARANJA': '#FFA500',
      'ROSA': '#FFC0CB',
      'LIMA': '#00FF00',
      'VIOLETA': '#EE82EE',
      'MARRÓN': '#A52A2A',
      'TURQUESA': '#40E0D0'
    };
    return colores[color.toUpperCase()] || color;
  }

  updateStockDisponible(): void {
    const item = this.inventario.find(i => i.color.nombre === this.colorSeleccionado && i.talla.nombre === this.tallaSeleccionada);
    this.stockDisponible = item ? item.stock : 0;
  }

  ajustarCantidad(cambio: number): void {
    if (!this.colorSeleccionado || !this.tallaSeleccionada) {
      this.mostrarMensajeTemporal('Selecciona un color y talla primero !');
      return;
    }

    const nuevaCantidad = this.cantidad + cambio;
    if (nuevaCantidad > this.stockDisponible) {
      this.mostrarMensajeTemporal('Es el maximo stock disponible !');
    } else {
      this.cantidad = Math.max(1, nuevaCantidad);
    }
  }

  agregarAlCarrito(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex((item: any) => item.id === this.producto.id && item.color === this.colorSeleccionado && item.talla === this.tallaSeleccionada);

    if (productIndex === -1) {
      cart.push({
        id: this.producto.id,
        nombre: this.producto.nombre,
        marca: this.producto.marca.nombre,
        imagen:  this.producto.imagenUrl,
        precioRegular: this.producto.precioRegular,
        precioVenta: this.producto.precioVenta,
        color: this.colorSeleccionado,
        talla: this.tallaSeleccionada,
        quantity: this.cantidad
      });
    } else {
      cart[productIndex].quantity += this.cantidad;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.mostrarMensajeCarrito('Producto añadido al carrito correctamente');
  }

  seleccionarTalla(talla: string): void {
    if (this.tallasPorColor[this.colorSeleccionado]?.includes(talla)) {
      this.tallaSeleccionada = talla;
      this.cantidad = 1; // Reiniciar la cantidad a 1 al seleccionar una nueva talla
      this.updateStockDisponible();
    }
  }

  seleccionarColor(color: string): void {
    this.colorSeleccionado = color;
    this.tallaSeleccionada = ''; // Reiniciar la talla seleccionada
    this.cantidad = 1; // Reiniciar la cantidad a 1 al seleccionar un nuevo color
    this.updateStockDisponible();
  }

  selectImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
  }

  isTallaDisponible(talla: string): boolean {
    if (this.colorSeleccionado) {
      return this.tallasPorColor[this.colorSeleccionado]?.includes(talla) ?? false;
    }
    return false;
  }

  mostrarMensajeTemporal(mensaje: string): void {
    this.mensajeStock = mensaje;
    clearTimeout(this.fadeOutTimeout);
    this.fadeOutTimeout = setTimeout(() => {
      const mensajeStockElement = document.querySelector('.mensaje-stock') as HTMLElement;
      if (mensajeStockElement) {
        mensajeStockElement.classList.add('fade-out');
        setTimeout(() => {
          this.mensajeStock = '';
        }, 500); // Match this duration with the CSS transition duration
      }
    }, 3000);
  }

  mostrarMensajeCarrito(mensaje: string): void {
    this.mensajeCarrito = mensaje;
    clearTimeout(this.fadeOutTimeout);
    this.fadeOutTimeout = setTimeout(() => {
      const mensajeCarritoElement = document.querySelector('.mensaje-carrito') as HTMLElement;
      if (mensajeCarritoElement) {
        mensajeCarritoElement.classList.add('fade-out');
        setTimeout(() => {
          this.mensajeCarrito = '';
        }, 500); // Match this duration with the CSS transition duration
      }
    }, 3000);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const zoomImage = document.querySelector('.zoom-image') as HTMLImageElement;
    const zoomContainer = document.querySelector('.zoom-container') as HTMLElement;
    if (zoomImage && zoomContainer) {
      const rect = zoomContainer.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      zoomImage.style.transformOrigin = `${x}% ${y}%`;
    }
  }
}
