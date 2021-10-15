import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Conditional_clauses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeQuiz());
  }, [dispatch]);

  const handleSpeech = message => {
    TextToSpeech(message);
  };
  return (
    <div className="mella-content-wrapper">
      <h2>
        <span
          className="tooltip"
          onClick={() => handleSpeech('conditional clauses')}
        >
          <span className="tooltiptext-text">ሁኔታዊ አንቀጾች</span>Conditional
          clauses
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/conditional_clauses/quiz"
        >
          Quiz
        </Link>
        <p>
          A conditional sentence{' '}
          <span className="tooltip" onClick={() => handleSpeech('expresses')}>
            <span className="tooltiptext-text">ማብራራት</span>expresses
          </span>{' '}
          the{' '}
          <span className="tooltip" onClick={() => handleSpeech('idea')}>
            <span className="tooltiptext-text">ሃሳብ</span>idea
          </span>{' '}
          that the action in the main clause (the result clause) can only{' '}
          <span className="tooltip" onClick={() => handleSpeech('happen')}>
            <span className="tooltiptext-text">መፈጠር</span>happen
          </span>{' '}
          a certain condition (the caluse that begin with 'if') is fulfilled .
          If caluse and main clause are two main parts of conditional clause.
        </p>
        <p>
          The if caluse states the condition and the main clause states the{' '}
          <span className="tooltip" onClick={() => handleSpeech('result')}>
            <span className="tooltiptext-text">ዉጠት</span>result
          </span>
        </p>
        <p>In english there are three types of conditional clauses</p>
        <ol>
          <li>First conditional (probabale)</li>
          <li>Second conditional (improbable)</li>
          <li>Third conditional (impossble)</li>
        </ol>
        <p>To see them in detail</p>
        <ol>
          <li>
            <h3>First Conditional (probabale)</h3>
            Is a structure used for talking about possblity in the present or in
            the future . It contains if and main cluses
            <p>The first conditional is used to talk about things may happen</p>
            <p>If clause = uses present simple</p>
            <p>main cluse = uses future thense</p>
            <b>Example </b> if I have enough time , I will write to my firends
          </li>
          <li>
            <h3>Second conditional (improbable)</h3>
            Is a structure used for talking about unread situations in the
            present or future
            <p>
              The second conditional is used to talk about unreal (not true or
              not possble) in the present or future things which don't or won't
              happen.
            </p>
            <p>If clause = uses simple past</p>
            <p>main cluse = uses sub + would + v1</p>
            <b>Example </b> if we finished early , we would go to the cinema
          </li>
          <li>
            <h3>Third conditional (impossble)</h3>
            Is a structure used for talking about unread situations in the past
            <p>
              The third conditional is used to talk about things didn't happen
              in the past. this conditional is often used to express crticism or
              target
            </p>
            <p>If clause = uses if + past perfect</p>
            <p>main cluse = uses condtional perfect(would + have +v3)</p>
            <b>Example </b> if I had enough time , I would have written to you
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Conditional_clauses;
