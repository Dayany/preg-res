import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";
/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
const questionsReducer = (state = { questions: [] }, action) => {
  console.log(state);
  switch (action.type) {
    case "ADD_INITIAL_QUESTIONS":
      return { questions: [...action.payload] };
    case "ADD_QUESTION":
      return { questions: [...state.questions, action.payload] };
    default:
      return state;
  }
};

// const questionsSlice = createSlice({
//   name: "questions",
//   initialState: {
//     questions: [],
//   },
//   reducers: {
//     add: (state, action) => {
//       [...state.questions, action.payload];
//     },
//   },
// });

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(questionsReducer);

export default store;
