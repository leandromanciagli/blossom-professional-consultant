import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { cartReducer } from './cart/cart.reducer';
import { loaderReducer } from '@components/loader/loader.reducer';


export const reducers: ActionReducerMap<AppState> = {
    cart: cartReducer,
    loader: loaderReducer,
};
