import { createAction, props } from '@ngrx/store';
import { Course } from '@models/Course.model';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ course: Course }>()
);

export const removeItemFromCart = createAction(
    '[Cart] Remove Item',
    props<{ itemId: string }>() // Usá el ID o identificador único del curso
);

export const clearCart = createAction('[Cart] Clear Cart');
