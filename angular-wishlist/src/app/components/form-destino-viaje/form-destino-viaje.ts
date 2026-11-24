import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DestinoViajeModel } from '../../models/destino-viaje.model';
import { APP_CONFIG } from '../../app-config.token';


@Component({
  imports: [ReactiveFormsModule, NgIf, NgFor],
  selector: 'app-form-destino-viaje',
  styleUrl: './form-destino-viaje.css',
  templateUrl: './form-destino-viaje.html',
})
export class FormDestinoViaje implements OnInit {
  @Output() onItemAdded = new EventEmitter<DestinoViajeModel>();
  fg: FormGroup;
  minLongitud = 3;
  searchResults: string[] = [];
  private config = inject(APP_CONFIG);

  constructor(fb: FormBuilder) {
    this.fg = fb.nonNullable.group({
      nombre: [
        '',
        Validators.compose([
          Validators.required,
          this.nombreValidatorParametrizable(this.minLongitud),
        ]),
      ],
      url: ['', Validators.required],
    });
  }

  ngOnInit() {
    const elemNombre = document.getElementById('nombre') as HTMLInputElement;
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: Event) => (e.target as HTMLInputElement).value),
        filter((text) => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text: string) =>
          ajax<string[]>(this.config.apiEndpoint + '/ciudades?q=' + encodeURIComponent(text))
        )
      )
      .subscribe((ajaxResponse) => {
        this.searchResults = ajaxResponse.response;
      });
  }

  guardar(nombre: string, url: string): boolean {
    this.onItemAdded.emit(new DestinoViajeModel(nombre, url));
    return false;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const l = (control.value ?? '').toString().trim().length;
      if (l > 0 && l < minLong) {
        return { minLongNombre: true };
      }
      return null;
    };
  }
}