import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const QuestionTags = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeQuiz());
  }, [dispatch]);

  const handleSpeech = message => {
    TextToSpeech(message);
  };
  return (
    <div className="mella-content-wrapper">
      <br />
      <h2>
        {' '}
        <span className="tooltip" onClick={() => handleSpeech('Question Tags')}>
          <span className="tooltiptext-text">ጥያቄ</span>Questions
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/question_tags/quiz"
        >
          Quiz
        </Link>
        <ul>
          <li>
            <h3>Question Tags</h3>A question tag or a tag question is a phrase
            that is added at the end of a statement to{' '}
            <span className="tooltip" onClick={() => handleSpeech('turn')}>
              <span className="tooltiptext">መቀየር</span>
              turn
            </span>{' '}
            into a{' '}
            <span className="tooltip" onClick={() => handleSpeech('question')}>
              <span className="tooltiptext">ጥያቄ</span>
              question
            </span>
            .
            <br />
            When a speaker uses a question tag at the end of a statement, he/she
            is seeking for approval, confirmation or correction.
            <h3>Example :</h3>
            <ul>
              <li>
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('Approval')}
                >
                  <span className="tooltiptext">ማፅደቅ</span>
                  <b>Approval</b>
                </span>{' '}
                : I look{' '}
                <span className="tooltip" onClick={() => handleSpeech('smart')}>
                  <span className="tooltiptext">ብልጥ</span>
                  smart
                </span>{' '}
                today, don’t I? Yes you do.
              </li>
              <br />
              <li>
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('Confirmation')}
                >
                  <span className="tooltiptext">ማረጋገጫ</span>
                  <b>Confirmation</b>
                </span>{' '}
                : These are the new students, aren’t they? Yes they are.
              </li>
              <br />
              <li>
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('Correction')}
                >
                  <span className="tooltiptext">እርማት</span>
                  <b>Correction</b>
                </span>{' '}
                : I{' '}
                <span className="tooltip" onClick={() => handleSpeech('paid')}>
                  <span className="tooltiptext">ተከፍሏል</span>
                  paid
                </span>{' '}
                your money yesterday, didn’t I ? No you didn’t. <br /> Many{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('learners')}
                >
                  <span className="tooltiptext">ተማሪዎች</span>
                  learners
                </span>{' '}
                <span className="tooltip" onClick={() => handleSpeech('face')}>
                  <span className="tooltiptext">መከሰት</span>
                  face
                </span>{' '}
                a problem of supplying the{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('correct')}
                >
                  <span className="tooltiptext">ትክክለኛ</span>
                  correct
                </span>{' '}
                question tags to sentences.
              </li>
            </ul>
          </li>
          <li>
            <h3>Information Questions And Yes of No</h3>
            <p>
              Informations question is a question that asks for Information by
              using a questions word (<b>what , when , who ...</b>)
            </p>
            <b>Example : where</b> does he live?
            <p>
              Yes or No question is a question that maybe answered by yes or no
            </p>
            <b>Example : does</b> he live in addis?
          </li>
        </ul>
      </div>
      <Comment />
    </div>
  );
};

export default QuestionTags;
