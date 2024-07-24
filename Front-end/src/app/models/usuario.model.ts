export class Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    contrasena: string;
    dni: string;
    email: string;
    telefono: string;
    rol: string;
    constructor(){
      this.id = 0;
      this.nombre = '';
      this.apellidos = '';
      this.contrasena = '';
      this.dni = '';
      this.email = '';
      this.telefono = '';
      this.rol = '';
    }
  }