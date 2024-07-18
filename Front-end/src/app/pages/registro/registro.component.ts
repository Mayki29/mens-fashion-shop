import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario:Usuario = new Usuario()

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  registrarUsuario(usuario: Usuario){
    debugger
    console.log(usuario)
    this.apiService.registrarUsuario(usuario).subscribe({
      next:(response) =>{
        if(response.token != null || response.token != ""){
          localStorage.setItem('token', response.token);
          console.log(response);
          window.location.href = 'home';
        }else{
          alert("Vuelva a intentarlo")
        }
      }
    })
  }

}
