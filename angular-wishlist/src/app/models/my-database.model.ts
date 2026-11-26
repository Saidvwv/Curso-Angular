import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

export interface DestinoGuardado {
  id?: number;
  nombre: string;
  imagenUrl: string;
}

export interface Translation {
  id?: number;
  lang: string;
  key: string;
  value: string;
}

// dexie db
@Injectable({
  providedIn: 'root',
})
export class MyDatabase extends Dexie {
  destinos!: Table<DestinoGuardado, number>;
  translations!: Table<Translation, number>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl',
    });
    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl',
      translations: '++id, lang, key, value',
    });
  }
}

export const db = new MyDatabase();
// fin dexie db