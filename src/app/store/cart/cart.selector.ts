import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from '@store/cart/cart.reducer';

export const selectCart = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCart,
    (state: CartState) => state.items
);

export const selectCartCount = createSelector(
    selectCart,
    (state: CartState) => state.items.length
);

export const selectCartTotal = createSelector(
    selectCart,
    (state: CartState) =>
        state.items.reduce((total, item) => total + Number(item.price), 0)
);
