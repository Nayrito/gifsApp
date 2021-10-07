import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent  {

  constructor(private gifservice:GifsService) { }

  get resultados(){
    return this.gifservice.respuesta
  }
}
