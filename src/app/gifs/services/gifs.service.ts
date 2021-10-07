import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private appikey:string = 'R7Hg66FAZfrapmNX0ZTCRUvR7g9XM2Zo';

  private _historial:string[] = [];
  public respuesta:Gif[]=[];
  
  get historial(){
    return [...this._historial];
  }
  constructor(private http:HttpClient){
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }
    this.respuesta = JSON.parse(localStorage.getItem('respuesta')!) || []
  }

  buscarGifs(query:string){
    query = query.trim().toLowerCase()

    if (query.trim().length === 0){
      return
    }
    if (!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,4)
      localStorage.setItem('historial',JSON.stringify(this._historial))

    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=R7Hg66FAZfrapmNX0ZTCRUvR7g9XM2Zo&q=${query}&limit=20`)
    .subscribe((resp) =>{
      console.log(resp.data)
      this.respuesta = resp.data
      localStorage.setItem('respuesta',JSON.stringify(this.respuesta))
    })


    console.log(this._historial)

  }
}
