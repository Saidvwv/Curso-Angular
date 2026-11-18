import { inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { DestinoViajeModel } from './destino-viaje.model';


// ESTADO
export interface DestinosViajesState {
    items: DestinoViajeModel[];
    loading: boolean;
    favorito: DestinoViajeModel | null;
}

export const initializeDestinosViajesState = (): DestinosViajesState => ({
    items: [],
    loading: false,
    favorito: null,
});


// ACCIONES
export enum DestinosViajesActionTypes {
    NUEVO_DESTINO = '[Destinos Viajes] Nuevo',
    ELEGIDO_FAVORITO = '[Destinos Viajes] Favorito',
    VOTE_UP = '[Destinos Viajes] Vote Up',
    VOTE_DOWN = '[Destinos Viajes] Vote Down',
}

export class NuevoDestinoAction implements Action {
    readonly type = DestinosViajesActionTypes.NUEVO_DESTINO;
    constructor(public destino: DestinoViajeModel) { }
}

export class ElegidoFavoritoAction implements Action {
    readonly type = DestinosViajesActionTypes.ELEGIDO_FAVORITO;
    constructor(public destino: DestinoViajeModel) { }
}

export class VoteUpAction implements Action {
    readonly type = DestinosViajesActionTypes.VOTE_UP;
    constructor(public destino: DestinoViajeModel) { }
}

export class VoteDownAction implements Action {
    readonly type = DestinosViajesActionTypes.VOTE_DOWN;
    constructor(public destino: DestinoViajeModel) { }
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction
    | VoteDownAction;

// REDUCERS
export function reducerDestinosViajes(
    state: DestinosViajesState = initializeDestinosViajesState(),
    action: DestinosViajesActions
): DestinosViajesState {
    switch (action.type) {
        case DestinosViajesActionTypes.NUEVO_DESTINO:
            return {
                ...state,
                items: [...state.items, action.destino],
            };
        case DestinosViajesActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach((x) => x.setSelected(false));
            action.destino.setSelected(true);
            return {
                ...state,
                favorito: action.destino,
            };
        }
        case DestinosViajesActionTypes.VOTE_UP: {
            action.destino.voteUp();
            return { ...state };
        }
        case DestinosViajesActionTypes.VOTE_DOWN: {
            action.destino.voteDown();
            return { ...state };
        }
    }
    return state;
}

// EFFECTS
@Injectable()
export class DestinosViajesEffects {
    private actions$ = inject(Actions) as Actions<DestinosViajesActions>;

    nuevoAgregado$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DestinosViajesActionTypes.NUEVO_DESTINO),
            map((action) => new ElegidoFavoritoAction(action.destino))
        )
    );
}