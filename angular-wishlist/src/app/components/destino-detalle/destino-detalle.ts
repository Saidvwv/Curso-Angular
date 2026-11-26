import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';

class DestinosApiClientViejo {
  getById(id: string): DestinoViajeModel | null {
    console.log('llamando por la clase vieja!');
    return null;
  }
}

@Injectable()
class DestinosApiClientDecorated extends DestinosApiClient {
  override getById(id: string): DestinoViajeModel | null {
    console.log('llamando por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  imports: [MapComponent, MarkerComponent],
  selector: 'app-destino-detalle',
  styleUrl: './destino-detalle.css',
  templateUrl: './destino-detalle.html',
  providers: [
    { provide: DestinosApiClient, useClass: DestinosApiClientDecorated },
    { provide: DestinosApiClientViejo, useExisting: DestinosApiClient },
  ],
})
export class DestinoDetalle implements OnInit {
  private route = inject(ActivatedRoute);
  private destinosApiClient = inject(DestinosApiClientViejo);
  destino: DestinoViajeModel | null = null;

  style: StyleSpecification = {
    version: 8,
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
      },
    },
    layers: [
      {
        id: 'countries',
        type: 'fill',
        source: 'world',
        layout: {},
        paint: {
          'fill-color': '#6F788A',
        },
      },
    ],
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destino = this.destinosApiClient.getById(id);
    }
  }

  saludar() {
    alert('Hola');
  }
}