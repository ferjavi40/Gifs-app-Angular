import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef;

  buscar(termino: string){
    console.log(this.txtBuscar);
  }


}
