import { types } from "../types/types";
// const state = {
//     nombre: 'Nandier',
//     logged: true
// }


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            console.log(state);
            return {
                ...action.payload,
                logged: true
            }
        
        case types.logout:
            return{
                logged: false
            }
    
        default:
            return state;
    }
}