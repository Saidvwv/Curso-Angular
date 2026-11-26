import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { firstValueFrom, from, Observable } from 'rxjs';
import { db, Translation } from '../models/my-database.model';

export class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient, private apiEndpoint: string) {}

  getTranslation(lang: string): Observable<TranslationObject> {
    return from(this.cargar(lang));
  }

  private async cargar(lang: string): Promise<TranslationObject> {
    let traducciones = await db.translations.where('lang').equals(lang).toArray();

    if (traducciones.length === 0) {
      traducciones = await firstValueFrom(
        this.http.get<Translation[]>(`${this.apiEndpoint}/api/translation?lang=${lang}`)
      );
      await db.translations.bulkAdd(traducciones);
    }

    return traducciones.reduce(
      (acc, t) => ({ ...acc, [t.key]: t.value }),
      {} as TranslationObject
    );
  }
}