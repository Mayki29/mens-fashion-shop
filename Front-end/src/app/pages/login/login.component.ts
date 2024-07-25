import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario:Usuario = new Usuario;

  constructor(private router:Router, private loginService: LoginService) {
   }

  ngOnInit(): void {
    // let token = localStorage.getItem("token");
    // if( token != "" || token != null || token != undefined){
    //   window.location.href = 'home';
    // }
  }


  login(usuario: Usuario){
    console.log(usuario)
    this.loginService.login(usuario).subscribe({
      next:(response) =>{
        console.log(response)
      },
      error:(errorData) =>{
        console.error(errorData);
      },
      complete:()=>{
        console.info("Login Completo");
        this.router.navigateByUrl('/home');
      }
    })
  }

}
