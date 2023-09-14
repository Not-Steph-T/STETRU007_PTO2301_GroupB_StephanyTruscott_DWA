/**
 *Reducer - a function that takes a current state, value and action object & returns a new state value.
 *(state, action) => newState
 * In this example, we use a switch statement
 */

import { ActionTypes } from "./action.js";

/**
 * the initial state of the tally app
 * @type {initialState}
 */
const initialState = {
  value: 0,
};

/**
 *
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD:
      return {
        ...state,
        value: state.value + 1,
      };
    case ActionTypes.SUBTRACT:
      return {
        ...state,
        value: state.value - 1,
      };
    case ActionTypes.RESET:
      return {
        ...state,
        value: 0,
      };
    case ActionTypes.OVERLAY:
      return {
        ...state,
        value: 0,
      };
    default:
      return state;
  }
};
