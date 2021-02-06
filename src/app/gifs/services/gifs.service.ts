import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
//Interfaces
import { SearchGIFResponse, Gif } from '../interfaces/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'G866JKtmxHimC7MO2ZVfkh8ReCjaLn4p';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string [] = [];
  public resultados  : Gif [] = [];

  get historial(){
    
    return [...this._historial];//los 3 puntos se hacen para romper la relacion y no haya problemas, asi se puede modificar el getter
  }

  constructor(private http:HttpClient){
    this._historial= JSON.parse(localStorage.getItem('historial')!) || [];//estos 2 es para guardar los resultados y mostrarlos auque se refresca la pagina
    this.resultados= JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query:string=''){
    query= query.trim().toLocaleLowerCase();//Este es para evitar que el valor de busqueda retorne valores repetidos
    if (!this._historial.includes(query)){//este condicional es para saber si hay valores repetidos dentro del historial
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,6);//esto es para limitar la cantidad de historial que va a mostrar
      localStorage.setItem('historial', JSON.stringify(this._historial));//este es para mantener el historial de busqeuda en el navegador
    }
    
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    console.log(params.toString());

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, {params})
              .subscribe( (resp) => {
                // console.log(resp.data);
                this.resultados= resp.data;
                // console.log(this.resultados);
                localStorage.setItem('resultados', JSON.stringify(this.resultados));//este es para mantener el resultado de busqeuda en el navegador
            
              });
  }
}
