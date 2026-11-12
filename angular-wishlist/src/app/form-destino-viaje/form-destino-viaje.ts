import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-form-destino-viaje',
  styleUrl: './form-destino-viaje.css',
  templateUrl: './form-destino-viaje.html',
})
export class FormDestinoViaje {
  @Output() onItemAdded = new EventEmitter<DestinoViajeModel>();
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.fg = fb.nonNullable.group({
      nombre: '',
      url: '',


    });

    this.fg.valueChanges.subscribe((form: any) => {
      console.log('cambio el formulario: ', form);
    });
  }

  guardar(nombre: string, url: string): boolean {
    this.onItemAdded.emit(new DestinoViajeModel(nombre, url));
    return false;
  }
}