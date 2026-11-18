import { signal } from '@angular/core';

export class DestinoViajeModel {
  private selected = signal(false);
  votes = signal(0);
  servicios: string[];
  id = Math.random().toString(36).substring(2, 10);

  constructor(public nombre: string, public imagenUrl: string) {
    this.servicios = ['pileta', 'desayuno'];
  }

  isSelected(): boolean {
    return this.selected();
  }

  setSelected(s: boolean) {
    this.selected.set(s);
  }

    voteUp() {
    this.votes.update((v) => v + 1);
  }

  voteDown() {
    this.votes.update((v) => v - 1);
  }

}