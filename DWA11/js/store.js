// Create a Redux store holding the state of your app.

export const allSum = (startValue = 0, LessValue) => {
  let state = startValue;
  const getResult = () => state;
};

let store = allSum();

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "counter/incremented" });
store.dispatch({ type: "counter/incremented" });
store.dispatch({ type: "counter/decremented" });
