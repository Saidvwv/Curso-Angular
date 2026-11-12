import { signal } from '@angular/core';

export class DestinoViajeModel {
  private selected = signal(false);

  constructor(public nombre: string, public imagenUrl: string) {}

  isSelected(): boolean {
    return this.selected();
  }

  setSelected(s: boolean) {
    this.selected.set(s);
  }
}