import {PRESS_ADD_BUTTON, PRESS_EDIT_BUTTON, PRESS_DELETE_BUTTON} from '../actions/action-types';

export const titleReducer = (
    state={formTitle: 'edit'},
    action) => {
    switch (action.type) {
        case PRESS_ADD_BUTTON:
            return {
                formTitle: 'addMovie',
            };
        case PRESS_EDIT_BUTTON:
            return {
                formTitle: 'edit',
            };
        case PRESS_DELETE_BUTTON:
            return {
                formTitle: 'delete',
            };
        default:
            return state;
    }
}
    