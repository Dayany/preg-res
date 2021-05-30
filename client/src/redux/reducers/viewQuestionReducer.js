export default function viewQuestionReducer(state = { question: [] }, action) {
  switch (action.type) {
    case "LOAD_QUESTION":
      return { question: [...action.payload] };
    case "ADD_ANSWER":
      return { question: [...state.question, action.payload] };
    default:
      return state;
  }
}
