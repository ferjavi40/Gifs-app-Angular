import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(private _gifService:GifsService) { }

  get historial () {
    return this._gifService.historial;
  }

  buscar(termino:string){
    this._gifService.buscarGifs(termino);
  }

}
