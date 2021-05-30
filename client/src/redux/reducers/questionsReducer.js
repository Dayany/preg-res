export default function questionsReducer(state = { questions: [] }, action) {
  switch (action.type) {
    case "ADD_INITIAL_QUESTIONS":
      return { questions: [...action.payload] };
    case "ADD_QUESTION":
      return { questions: [...state.questions, action.payload] };
    default:
      return state;
  }
}
