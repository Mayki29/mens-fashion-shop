import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  userLoginOn:boolean = false;
  usuario?:Usuario;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn=userLoginOn;
      }
    })
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/home']);
  }

}
