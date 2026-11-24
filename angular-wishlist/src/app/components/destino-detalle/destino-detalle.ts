import { Component, inject, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { APP_CONFIG } from '../../app-config.token';

class DestinosApiClientViejo {
  getById(id: string): DestinoViajeModel | null {
    console.log('llamando por la clase vieja!');
    return null;
  }
}

@Injectable()
class DestinosApiClientDecorated extends DestinosApiClient {
  private config = inject(APP_CONFIG);

  override getById(id: string): DestinoViajeModel | null {
    console.log('llamando por la clase decorada!');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  imports: [],
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

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.destino = this.destinosApiClient.getById(id);
    }
  }
}