import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from '@store/app.state';


export function localStorageSyncReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return localStorageSync({
        keys: ['cart'], // <-- slice que querés guardar en localStorage
        rehydrate: true, // <-- importante para restaurar al iniciar
        restoreDates: false,
    })(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = [localStorageSyncReducer];
