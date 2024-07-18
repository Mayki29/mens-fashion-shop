// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/producto';
  private apiAuth = "http://localhost:8080/auth"

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
    return this.http.get<string[]>(`${this.apiUrl}/cortes`)
      .pipe(catchError(this.handleError));
  }

  getColores(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/colores`)
      .pipe(catchError(this.handleError));
  }
  getProductoDetalle(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/detalle/${id}`)
      .pipe(catchError(this.handleError));
  }
  getFormProductosElements(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/form-producto-elements`)
      .pipe(catchError(this.handleError));
  }
  login(request: Usuario): Observable<any>{
    return this.http.post<any>(`${this.apiAuth}/login`, request)
      .pipe(catchError(this.handleError))
  }
  registrarUsuario(request: Usuario): Observable<any>{
    return this.http.post<any>(`${this.apiAuth}/register`, request)
      .pipe(catchError(this.handleError))
  }

  saveProducto(request: Producto): Observable<Producto>{
    return this.http.post<Producto>(this.apiUrl, request)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
