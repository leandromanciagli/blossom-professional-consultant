import { LoaderState } from '@components/loader/loader.reducer';
import { CartState } from '@store/cart/cart.reducer';

export interface AppState {
    cart: CartState;
    loader: LoaderState;
}
