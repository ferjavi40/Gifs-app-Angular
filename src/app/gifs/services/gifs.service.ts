import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey    : string = 'G866JKtmxHimC7MO2ZVfkh8ReCjaLn4p';
  private _historial: string [] = [];
  public resultados : any [] = [];

  get historial(){
    
    return [...this._historial];//los 3 puntos se hacen para romper la relacion y no haya problemas, asi se puede modificar el getter
  }

  constructor(private http:HttpClient){}

  buscarGifs(query:string=''){
    query= query.trim().toLocaleLowerCase();//Este es para evitar que el valor de busqueda retorne valores repetidos
    if (!this._historial.includes(query)){//este condicional es para saber si hay valores repetidos dentro del historial
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,6);//esto es para limitar la cantidad de historial que va a mostrar
    }
    console.log(this._historial);

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=G866JKtmxHimC7MO2ZVfkh8ReCjaLn4p&q=${query}&limit=8`)
              .subscribe( (resp: any) => {
                // console.log(resp.data);
                this.resultados= resp.data;
                console.log(this.resultados);
              });
  }
}
