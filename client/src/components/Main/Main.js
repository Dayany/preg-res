import React, { useEffect } from "react";
import AddQuestion from "../Question/AddQuestion.js";
import Categories from "./Categories.js";
import CardQuestion from "../Question/CardQuestion.js";
import Pagination from "react-js-pagination";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

const { useState } = require("react");

function Main() {
  const intl = useIntl();
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);

  const categories = [
    intl.formatMessage({ id: "PregRes.all" }),
    intl.formatMessage({ id: "PregRes.people" }),
    intl.formatMessage({ id: "PregRes.products" }),
    intl.formatMessage({ id: "PregRes.currency" }),
    intl.formatMessage({ id: "PregRes.jobs" }),
  ];

  useEffect(() => {
    async function getQuestions() {
      const addInitialQuestions = (questions) => {
        dispatch({ type: "ADD_INITIAL_QUESTIONS", payload: questions });
      };
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch("http://localhost:8080/questions", requestOptions).then(
        (response) => {
          return response.json().then((data) => addInitialQuestions(data));
        }
      );
    }
    getQuestions();
  }, []);
  const [state, setState] = useState({ category: 0, pageNumber: 1 });
  const questionsPerPage = 10;
  let pagesVisited = (state.pageNumber - 1) * questionsPerPage;
  let pageCount = Math.ceil(questions && questions.length / questionsPerPage);

  const filterQuestions = (questionsToFilter) => {
    if (!questionsToFilter) return [];
    const filteredQuestions = questionsToFilter.filter((question) => {
      if (state.category === 0) return question;
      return question.category === state.category;
    });

    pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

    return filteredQuestions;
  };

  const displayQuestionsWithPagination = filterQuestions(questions)
    .reverse()
    .slice(pagesVisited, pagesVisited + questionsPerPage)
    .map((question) => {
      return (
        <div key={question.id}>
          <CardQuestion question={question} />
        </div>
      );
    });

  const handlePageChange = (selected) => {
    setState({ ...state, pageNumber: selected });
  };

  const handleSetNewCategory = (selected) => {
    setState({ ...state, category: selected, pageNumber: 1 });
  };

  return (
    <React.Fragment>
      <AddQuestion categoriesList={categories} />
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
        totalItemsCount={questions && questions.length}
        pageRangeDisplayed={pageCount}
        onChange={handlePageChange}
      />
    </React.Fragment>
  );
}

export default Main;
