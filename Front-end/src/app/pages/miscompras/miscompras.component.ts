import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.component.html',
  styleUrls: ['./miscompras.component.scss']
})
export class MiscomprasComponent implements OnInit {
  opcionSeleccionada: string = 'compras'; // Opción predeterminada

  seleccionarOpcion(opcion: string) {
    this.opcionSeleccionada = opcion;
  }

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
