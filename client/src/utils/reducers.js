import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_PRODUCTS
} from "./actions"
import { useReducer } from "react";

export const reducer = (state, action) => {
    switch (action.type){
        //if action type is the value of 'UPDATE_PRODUCTS', return a new object with an updated array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
    
    //if action type value is the value of 'update categories', return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
        return {
            ...state,
            categories: [...action.categories]
        };
        
        
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }
            default:
            return state;
        }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}