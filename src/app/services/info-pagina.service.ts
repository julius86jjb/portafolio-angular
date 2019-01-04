import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

    info: InfoPagina = {};
    equipo: InfoEquipo[] = [];
    cargada = false;
    cargada_equipo = false;
    constructor(private http: HttpClient) {
        this.cargarInfo();
        this.cargarEquipo();
    }

    private cargarInfo() {
        // Leer archivo JSON (necesitamos importar un modulo para esto: HttpClient )

        this.http.get('assets/data/data-pagina.json')
            .subscribe( (res: InfoPagina) => {
                // console.log( res['twitter'] );
                this.info = res;
                this.cargada = true;
            });
    }

    private cargarEquipo() {
        this.http.get('https://angular-html-c83d9.firebaseio.com/equipo.json')
            .subscribe( (res: InfoEquipo[]) => {
                // console.log(res);
                this.equipo = res;
                this.cargada_equipo = true;
            });
    }
}
