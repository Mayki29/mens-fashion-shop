import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("")
  tokenData: any;

  private apiAuth = "http://localhost:8080/auth"

  constructor(private http: HttpClient) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData = new BehaviorSubject<String>(sessionStorage.getItem("token") || ""); 
    this.tokenData = this.getTokenData(sessionStorage.getItem("token") || "");
  }
  login(request: Usuario): Observable<any>{
    return this.http.post<any>(`${this.apiAuth}/login`, request)
      .pipe(tap((userData)=>{
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        this.tokenData = this.getTokenData(userData.token);
        console.log(this.tokenData)
        
      }),
      map((userData)=>userData.token),
      catchError(this.handleError))
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);

  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }
  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
  get userToken():String{
    return this.currentUserData.value;
  }

  private getTokenData(token: String): any{
    if(token == ''){
      return '';
    }
    return JSON.parse(atob(token.split('.')[1]))
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
