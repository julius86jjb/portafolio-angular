import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    cargando = true;
    productos: Producto[] = [];

    constructor(private _http: HttpClient) {
        this.cargarProductos();
    }

    private cargarProductos() {
        this._http.get('https://angular-html-c83d9.firebaseio.com/productos_idx.json')
        .subscribe( (res: Producto[]) => {
            // console.log(res);
            this.productos = res;

            setTimeout(() => {
                this.cargando = false;
            }, 2000);
        });

    }
}
