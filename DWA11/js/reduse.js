/**
 *Reducer - a function that takes a current state, value and action object & returns a new state value.
 *(state, action) => newState
 */
export const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case "counter/incremented":
      return { value: state.value + 1 };
    case "counter/decremented":
      return { value: state.value - 1 };
    case "reset":
      return { value: (state.value = 0) };
    default:
      return state;
  }
};
