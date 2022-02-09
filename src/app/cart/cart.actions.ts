import { createAction, props } from "@ngrx/store";


export const removeItem = createAction('[Cart Page] Remove Item', props<{itemName: string}>());

export const addItem = createAction('[Store Page] Add Item', props<{productName: string}>());

export const updateItemAmount = createAction('[Cart Page] Update Item Amount', props<{itemName: string, amount: number}>());

export const checkOut = createAction('[Cart Page] CheckOut');
