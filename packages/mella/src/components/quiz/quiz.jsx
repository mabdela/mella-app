import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // handleChoose,
  updateSelectedQuizRequest,
} from '../../redux/main-content/main-content-actions';
import './quiz.scss';
import Spinner from '../spinner/spinner';

const Quiz = () => {
  const quizState = useSelector(state => state.maincontent.quizes);
  const selectedQuestions = useSelector(
    state => state.maincontent.selectedQuestions
  );
  // const loadingState = useSelector(state => state.maincontent.loading);

  //
  const user = useSelector(state => state.auth.user._id);
  const topicId = useSelector(state => state.sidebar.active);

  const dispatch = useDispatch();
  return (
    <>
      {quizState.length === 0 ? (
        <Spinner />
      ) : (
        quizState.map((quiz, questionIndex) => (
          <div key={questionIndex} className="quiz-container">
            {/* <h4>{quiz.type}</h4> */}
            <div className="quiz-choice-container">
              <p className="quiz-question">
                {`${questionIndex + 1}.`} {quiz.question}
              </p>
              {/* check whether the choices are empty string or not */}
              {quiz.choice.map((option, choiceIndex) => {
                return (
                  <div
                    key={choiceIndex}
                    // className={
                    //   selectedQuestions[questionIndex].selectedChoice ===
                    //   choiceIndex
                    //     ? `${
                    //         quiz.answer === choiceIndex
                    //           ? 'quiz-choose valid'
                    //           : 'quiz-choose invalid'
                    //       }`
                    //     : 'quiz-choose'
                    // }
                    className={
                      selectedQuestions[questionIndex].choice_index ===
                      choiceIndex
                        ? `${
                            selectedQuestions[questionIndex].valid !== -1 &&
                            selectedQuestions[questionIndex].valid === 1
                              ? 'quiz-choose valid'
                              : 'quiz-choose invalid'
                          }`
                        : 'quiz-choose'
                    }
                    // onClick={() =>
                    //   dispatch(handleChoose(questionIndex, choiceIndex))
                    // }
                    onClick={() =>
                      dispatch(
                        updateSelectedQuizRequest({
                          user_id: user,
                          topic_id: topicId.toString(),
                          question_index: questionIndex,
                          choice_index: choiceIndex,
                          clicked_choice: true,
                          answer_index: quiz.answer,
                        })
                      )
                    }
                  >
                    <p className="quiz-choice">
                      {String.fromCharCode(65 + choiceIndex)}
                    </p>
                    <p>{option}</p>
                  </div>
                );
              })}

              {/* {selectedQuestions[questionIndex].selectedChoice !== -1 &&
              quiz.answer !==
                selectedQuestions[questionIndex].selectedChoice ? (
                <div className="quiz-warning">{quiz.explanation}</div>
              ) : null} */}

              {selectedQuestions[questionIndex].choice_index !== -1 &&
              selectedQuestions[questionIndex].valid === 0 ? (
                <div className="quiz-warning">{quiz.explanation}</div>
              ) : null}
            </div>
          </div>
        ))
      )}

      {quizState.length !== 0 && selectedQuestions.length ? (
        <div
          className="quiz-progress-bar"
          style={{
            width: `${
              (Math.floor(
                selectedQuestions.filter(
                  choice => choice.clicked_choice === true
                ).length
              ) /
                quizState.length) *
              100
            }%`,
          }}
        ></div>
      ) : null}

      {quizState.length !== 0 && (
        <div className="quiz-score">
          <p>Your Score</p>
          <span>
            <i className="fas fa-trophy fa-2x"></i>
            <span>
              {selectedQuestions.length === 0
                ? 0
                : (selectedQuestions.filter(question => question.valid === 1)
                    .length /
                    selectedQuestions.length) *
                  100}
              /100
            </span>
          </span>
        </div>
      )}
    </>
  );
};

export default Quiz;
