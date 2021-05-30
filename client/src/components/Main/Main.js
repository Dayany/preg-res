import React from "react";
import AddQuestion from "../Question/AddQuestion.js";
import Categories from "./Categories.js";
import CardQuestion from "../Question/CardQuestion.js";
import Pagination from "react-js-pagination";
import { useIntl } from "react-intl";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";

const { useState } = require("react");

const firestore = firebase.firestore();

function Main() {
  const intl = useIntl();
  const dispatch = useDispatch();

  const addQuestion = (question) => {
    dispatch({ type: "ADD_QUESTION", payload: question });
  };

  const categories = [
    intl.formatMessage({ id: "PregRes.all" }),
    intl.formatMessage({ id: "PregRes.people" }),
    intl.formatMessage({ id: "PregRes.products" }),
    intl.formatMessage({ id: "PregRes.currency" }),
    intl.formatMessage({ id: "PregRes.jobs" }),
  ];

  const questionsRef = firestore.collection("questions");
  const query = questionsRef.orderBy("date");
  const [questions] = useCollectionData(query, { idField: "id" });

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
          <CardQuestion state={question} />
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
      <AddQuestion categoriesList={categories} questionsRef={questionsRef} />
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
