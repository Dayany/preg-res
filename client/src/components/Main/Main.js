import React from "react";
import AddQuestion from "../Question/AddQuestion.js";
import Categories from "./Categories.js";
import CardQuestion from "../Question/CardQuestion.js";
import Pagination from "react-js-pagination";
import { useIntl } from "react-intl";

const { useEffect, useState } = require("react");

function Main() {
  useEffect(() => {
    fetchQuestions();
  }, []);

  const intl = useIntl();

  const categories = [
    intl.formatMessage({id: 'PregRes.all'}),
    intl.formatMessage({id: 'PregRes.people'}),
    intl.formatMessage({id: 'PregRes.products'}),
    intl.formatMessage({id: 'PregRes.currency'}),
    intl.formatMessage({id: 'PregRes.jobs'})
  ];

  const [questions, setQuestions] = useState([]);
  const [state, setState] = useState({ category: 0, pageNumber: 1 });
  const questionsPerPage = 10;
  let pagesVisited = (state.pageNumber - 1) * questionsPerPage;
  let pageCount = Math.ceil(questions.length / questionsPerPage);

  const filterQuestions = (questionsToFilter) => {
    const filteredQuestions = questionsToFilter.filter((question) => {
      if (state.category === 0) return question;
      return question.category === state.category;
    });

    pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

    return filteredQuestions;
  };

  const displayQuestionsWithPagination = filterQuestions(questions)
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

  const handlePageChange = (selected) => {
    setState({ ...state, pageNumber: selected });
  };

  const handleSetNewCategory = (selected) => {
    setState({ ...state, category: selected, pageNumber: 1 });
  };

  return (
    <React.Fragment>
      <AddQuestion
        categoriesList={categories}
        setQuestionsChild={updateQuestions}
      />
      <Categories
        categoriesList={categories}
        setNewCategoryChild={handleSetNewCategory}
      />
      {displayQuestionsWithPagination}
      <Pagination
        itemClass="page-item"
        linkClass="page-link"
        activePage={state.pageNumber}
        itemsCountPerPage={questionsPerPage}
        totalItemsCount={questions.length}
        pageRangeDisplayed={pageCount}
        onChange={handlePageChange}
      />
    </React.Fragment>
  );
}

export default Main;
