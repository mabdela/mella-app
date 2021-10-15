import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const PartsOfSentence = () => {
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
        The{' '}
        <span className="tooltip" onClick={() => handleSpeech('Clause')}>
          <span className="tooltiptext">ሐረጎች</span>Clause
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/parts_of_sentence/quiz"
        >
          Quiz
        </Link>
        A clause is a group of words that contains <b>a verb</b> and its{' '}
        <b>subject</b>.
        <br />
        <br />
        There are two types of clauses – <b>main clauses</b> and{' '}
        <b>subordinate clauses</b>.
        <h3>
          <span className="tooltip" onClick={() => handleSpeech('Main clause')}>
            <span className="tooltiptext">ዋና ሐረግ</span>Main clause
          </span>{' '}
        </h3>
        <p>A main clause is a clause that can stand as sentence by itself.</p>
        <h4>Example :</h4>
        <span style={{ borderBottom: '1px dotted' }}>
          When the power failed,
        </span>{' '}
        the computer stopped.
        <h3>
          <span
            className="tooltip"
            onClick={() => handleSpeech('subordinate clause')}
          >
            <span className="tooltiptext">የበታች ሐረግ</span>subordinate clause
          </span>{' '}
        </h3>
        <p>
          A subordinate clause is a clause that can not stand as sentence by
          itself.
        </p>
        <h4>Examples :</h4>When the power failed ,
        <span style={{ borderBottom: '1px dotted' }}>
          the computer stopped.
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default PartsOfSentence;
