import React from "react";
import AddQuestion from "../Question/AddQuestion.js";
import Categories from "./Categories.js";
import CardQuestion from "../Question/CardQuestion.js";
import Pagination from "react-js-pagination";

const { useEffect, useState } = require("react");

function Main() {
  useEffect(() => {
    fetchQuestions();
  }, []);

  const [questions, setQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const questionsPerPage = 10;
  const pagesVisited = (pageNumber - 1) * questionsPerPage;
  const pageCount = Math.ceil(questions.length / questionsPerPage);
  

  const displayQuestionsWithPagination = questions
    .slice(pagesVisited, pagesVisited + questionsPerPage)
    .map((question) => {
      return (
        <div key={question._id}>
          <CardQuestion state={question} />
        </div>
      );
    });

  const fetchQuestions = async () => {
    const data = await fetch(process.env.REACT_APP_DB_URL + "/question");
    const questions = await data.json();
    setQuestions(questions);
  };

  const updateQuestions = (question) => {
    const newQuestions = [question].concat(questions);
    setQuestions(newQuestions);
  };

  const handlePageChange = selected => {
    setPageNumber(selected);
  };
  return (
    <React.Fragment>
      <AddQuestion setQuestionsChild={updateQuestions} />
      <Categories />
      {displayQuestionsWithPagination}
      <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={pageNumber}
        itemsCountPerPage={questionsPerPage}
        totalItemsCount={questions.length}
        pageRangeDisplayed={pageCount}
        onChange={handlePageChange}
      />
    </React.Fragment>
  );
}

export default Main;
