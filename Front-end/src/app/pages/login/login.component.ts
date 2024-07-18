import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario:Usuario = new Usuario;

  constructor(private apiService: ApiService) {
   }

  ngOnInit(): void {
    // let token = localStorage.getItem("token");
    // if( token != "" || token != null || token != undefined){
    //   window.location.href = 'home';
    // }
  }


  login(usuario: Usuario){
    console.log(usuario)
    this.apiService.login(usuario).subscribe({
      next:(response) =>{
        if(response.token != null || response.token != ""){
          localStorage.setItem('token', response.token);
          localStorage.setItem("usuario", JSON.stringify(response.user));
          console.log(response);
          window.location.href = 'home';
        }else{
          alert("Vuelva a intentarlo")
        }
      }
    })
  }

}
