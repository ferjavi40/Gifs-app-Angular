import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string [] = [];

  get historial(){
    return [...this._historial];//los 3 puntos se hacen para romper la relacion y no haya problemas, asi se puede modificar el getter
  }

  buscarGifs(query:string){
    this._historial.unshift( query );
    console.log(this._historial);
  }
}
