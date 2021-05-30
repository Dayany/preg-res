import { combineReducers } from "redux";
import questionsReducer from "./reducers/questionsReducer";
import viewQuestionReducer from "./reducers/viewQuestionReducer";

export default combineReducers({
  questions: questionsReducer,
  viewQuestion: viewQuestionReducer,
});
