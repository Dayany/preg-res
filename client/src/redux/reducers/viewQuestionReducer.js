export default function viewQuestionReducer(state = { question: [] }, action) {
  console.log(action);
  switch (action.type) {
    case "LOAD_QUESTION":
      return { question: action.payload };
    case "ADD_ANSWER":
      return {
        question: {
          ...state.question,
          answers: action.payload,
        },
      };
    default:
      return state;
  }
}
