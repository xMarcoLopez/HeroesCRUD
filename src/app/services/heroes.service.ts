import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe/heroe.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://app-login-e9ae0.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1500)
      );
  }

  private crearArreglo(heroesObj: Object) {
    const heroes: HeroeModel[] = [];
    if (heroesObj === null) {
      return [];
    }
    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
