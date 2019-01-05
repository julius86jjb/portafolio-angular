import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    cargando = true;
    productos: Producto[] = [];
    productosBuscados: Producto[] = [];

    constructor(private _http: HttpClient) {
        this.cargarProductos();
    }

    private cargarProductos() {
        return new Promise((resolve, reject) => {
            this._http.get('https://angular-html-c83d9.firebaseio.com/productos_idx.json')
                .subscribe( (res: Producto[]) => {
                    // console.log(res);
                    this.productos = res;

                    setTimeout(() => {
                        this.cargando = false;
                    }, 2000);
                    resolve();
                });
        });
    }

    getProducto(id: string) {
        return this._http.get(`https://angular-html-c83d9.firebaseio.com/productos/${ id }.json`);
    }

    buscarProducto( termino: string) {
        if ( this.productos.length === 0 ) {
            this.cargarProductos().then( () => {
                this.filtrarProductos( termino );
            });
        } else {
            this.filtrarProductos( termino );
        }

    }

    private filtrarProductos( termino: string) {
        termino = termino.toLocaleLowerCase();
        this.productosBuscados = [];
        this.productos.forEach( prod => {
            const tituloLower = prod.titulo.toLocaleLowerCase();
            if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0) {
                this.productosBuscados.push( prod );
            }
        });
    }
}

