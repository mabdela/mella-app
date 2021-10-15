import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Clauses = () => {
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
        The{' '}
        <span className="tooltip" onClick={() => handleSpeech('Clause')}>
          <span className="tooltiptext-text">ሐረጎች</span>Clause
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/clauses/quiz"
        >
          Quiz
        </Link>
        <span>
          <p>
            {' '}
            A clause is a group of words that{' '}
            <span className="tooltip" onClick={() => handleSpeech('contains')}>
              <span className="tooltiptext">መያዝ</span>contains
            </span>{' '}
            a{' '}
            <span className="tooltip" onClick={() => handleSpeech('verb')}>
              <span className="tooltiptext">ግስ</span>verb
            </span>{' '}
            and its{' '}
            <span className="tooltip" onClick={() => handleSpeech('subject')}>
              <span className="tooltiptext">ድርጊት ፈጻሚ</span>subject
            </span>{' '}
            that have a relationship.
          </p>
          <p>
            This relationship is{' '}
            <span className="tooltip" onClick={() => handleSpeech('crucial')}>
              <span className="tooltiptext">ወሳኝ</span>crucial
            </span>
            ; a clause{' '}
            <span className="tooltip" onClick={() => handleSpeech('conveys')}>
              <span className="tooltiptext">ያስተላልፋል</span>conveys
            </span>{' '}
            information about what that subject is or is doing, rather than
            simply being a{' '}
            <span className="tooltip" onClick={() => handleSpeech('random')}>
              <span className="tooltiptext">በዘፈቀደ</span>random
            </span>{' '}
            grouping of words. Because a clause expresses an action or a state
            of being, a clause can often—but not always—function as an{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('independent')}
            >
              <span className="tooltiptext">ገለልተኛ</span>independent
            </span>{' '}
            sentence.{' '}
          </p>
        </span>
        There are two types of clauses –{' '}
        <span className="tooltip" onClick={() => handleSpeech('main clauses')}>
          <span className="tooltiptext">ዋና አንቀጾች</span>main clauses
        </span>{' '}
        and{' '}
        <span
          className="tooltip"
          onClick={() => handleSpeech('subordinate clauses')}
        >
          <span className="tooltiptext">የበታች አንቀጾች</span>subordinate clauses
        </span>{' '}
        .<h3>Main clause</h3>
        <p>
          A main clause is a clause that can stand as sentence by{' '}
          <span className="tooltip" onClick={() => handleSpeech('itself')}>
            <span className="tooltiptext">ራሱ</span>itself
          </span>
          .
        </p>
        <h4>Example :</h4>
        <span style={{ borderBottom: '1px dotted' }}>
          When the{' '}
          <span className="tooltip" onClick={() => handleSpeech('power')}>
            <span className="tooltiptext">ኃይል</span>power
          </span>{' '}
          <span className="tooltip" onClick={() => handleSpeech('failed')}>
            <span className="tooltiptext">ሲቋረጥ</span>failed
          </span>{' '}
        </span>
        , the computer{' '}
        <span className="tooltip" onClick={() => handleSpeech('stopped')}>
          <span className="tooltiptext">ቆመ</span>stopped
        </span>
        . (the first phrase)
        <h3>
          <span className="tooltip" onClick={() => handleSpeech('subordinate')}>
            <span className="tooltiptext">የበታች</span>subordinate
          </span>{' '}
          clause
        </h3>
        <span>
          <p>
            A subordinate clause is not a{' '}
            <span className="tooltip" onClick={() => handleSpeech('complete')}>
              <span className="tooltiptext">ተጠናቀቀ</span>complete
            </span>{' '}
            sentence. Dependent clauses are sometimes known as <b>dependent</b>{' '}
            clauses. As their name implies, these clauses depend on independent
            clauses to{' '}
            <span className="tooltip" onClick={() => handleSpeech('clearly')}>
              <span className="tooltiptext">በግልፅ</span>clearly
            </span>{' '}
            express ideas.
          </p>
        </span>
        <h4>Examples :</h4>When the power failed ,
        <span style={{ borderBottom: '1px dotted' }}>
          {' '}
          the computer stopped.
        </span>{' '}
        (the second phrase).
      </div>
      <Comment />
    </div>
  );
};

export default Clauses;
