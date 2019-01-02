import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

    info: InfoPagina = {};
    cargada = false;
    constructor(private http: HttpClient) {
        console.log(' mensaje desde el servicio ');

        // Leer archivo JSON (necesitamos importar un modulo para esto: HttpClient )

        this.http.get('assets/data/data-pagina.json')
            .subscribe( (res: InfoPagina) => {
                console.log(res);
                // console.log( res['twitter'] );
                this.info = res;
                this.cargada = true;
            });
    }
}
