import { signal } from '@angular/core';

export class DestinoViajeModel {
  private selected = signal(false);
  servicios: string[];

  constructor(public nombre: string, public imagenUrl: string) {
    this.servicios = ['pileta', 'desayuno'];
  }

  isSelected(): boolean {
    return this.selected();
  }

  setSelected(s: boolean) {
    this.selected.set(s);
  }
}