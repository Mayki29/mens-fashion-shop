import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/producto';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getMarcas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/marcas`)
      .pipe(catchError(this.handleError));
  }

  getCortes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/entalles`)
      .pipe(catchError(this.handleError));
  }

  getColores(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/colores`)
      .pipe(catchError(this.handleError));
  }

  filtrarProductos(marca?: string, color?: string, entalle?: string): Observable<Producto[]> {
    let params = new HttpParams();
    if (marca) {
      params = params.set('marca', marca);
    }
    if (color) {
      params = params.set('color', color);
    }
    if (entalle) {
      params = params.set('entalle', entalle);
    }

    return this.http.get<Producto[]>(`${this.apiUrl}/filtrar`, { params })
      .pipe(catchError(this.handleError));
  }
  //login(request: Cliente)

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }

  getProductoDetalleCompleto(id: number): Observable<{ producto: Producto, inventario: any[], colores: string[], tallasPorColor: { [color: string]: string[] }, descuento: number, descuentoPorcentual: number }> {
    return this.http.get<{ producto: Producto, inventario: any[], colores: string[], tallasPorColor: { [color: string]: string[] }, descuento: number, descuentoPorcentual: number }>(`${this.apiUrl}/detalle-completo/${id}`)
      .pipe(catchError(this.handleError));
  }
}
