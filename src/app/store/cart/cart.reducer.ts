import { createReducer, on } from '@ngrx/store';
import { addToCart, removeItemFromCart, clearCart } from '@store/cart/cat.actions';
import { Course } from '@models/Course.model';

export interface CartState {
    items: Course[];
}

const initialState: CartState = {
    items: [],
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { course }) => ({
        ...state,
        items: [...state.items, course]
    })),
    on(removeItemFromCart, (state, { itemId }) => {
        const index = state.items.findIndex(item => item.id === itemId);

        if (index !== -1) {
            const newItems = [...state.items];  // Creamos una copia del arreglo
            newItems.splice(index, 1);  // Eliminamos el primer elemento que coincida
            return {
                ...state,
                items: newItems,  // Devolvemos el nuevo arreglo sin el elemento
            };
        }

        return state;  // Si no se encuentra el item, no modificamos el estado
    }),
    on(clearCart, state => ({
        ...state,
        items: []
    }))
);
