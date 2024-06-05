import { AfterViewChecked, AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CarritoProductComponent } from 'src/app/shared/pagos/carrito-product/carrito-product.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChildren(CarritoProductComponent) productos!: QueryList<CarritoProductComponent>;
  subtotal = "";
  descuentos = "";
  total = "";

  constructor() { }

  ngAfterViewInit(): void {
    this.calcularTotales();
  }
  ngAfterViewChecked(): void {
    this.calcularTotales();
  }

  ngOnInit(): void {
  }

  private calcularTotales(): void {
    let nsubtotal = 0;
    let ndescuentos = 0;

    this.productos.forEach((e) => {
      nsubtotal += e.precioAntes *e.cantidad;
      ndescuentos += (e.precioAntes - e.precio)*e.cantidad;
      console.log(e.precio)
    });

    this.subtotal = nsubtotal.toLocaleString("es-PE",{
      style: "currency",
      currency: "PEN"
    })
    this.descuentos = ndescuentos.toLocaleString("es-PE",{
      style: "currency",
      currency: "PEN"
    })
    this.total = (nsubtotal - ndescuentos).toLocaleString("es-PE",{
      style: "currency",
      currency: "PEN"
    })

  }

}
