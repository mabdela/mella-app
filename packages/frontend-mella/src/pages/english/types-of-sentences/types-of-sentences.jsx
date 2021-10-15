import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const TypesOfSentences = () => {
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
        <span
          className="tooltip"
          onClick={() => handleSpeech('Types of Sentences')}
        >
          <span className="tooltiptext-text">የዓረፍተ ነገሮች</span>
          Sentences
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/types_of_sentences/quiz"
        >
          Quiz
        </Link>
        <h3>Types of sentences</h3>
        <ul>
          <li>
            <h3>In terms of structure</h3>
            <ol>
              <li>
                <h4>simple sentence</h4>A simple sentence contains a{' '}
                <b>single subject</b> and{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('predicate')}
                >
                  <span className="tooltiptext">ገላጭ</span>
                  <b>predicate</b>
                </span>{' '}
                .<p>Example: Bill reads.</p>
              </li>
              <li>
                <h4>compund sentence</h4>A compound sentence consists of{' '}
                <b>two or more</b> simple sentences{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('joined')}
                >
                  <span className="tooltiptext">መቀላቀል</span>
                  joined
                </span>{' '}
                together using a co-ordinating conjunction such as <b>
                  and
                </b>, <b>or</b> or, <b>but.</b>
                <p>
                  Example: The sun was setting in the west and the{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('moon')}
                  >
                    <span className="tooltiptext">ጨረቃ</span>
                    moon
                  </span>{' '}
                  was just{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('rising')}
                  >
                    <span className="tooltiptext">መውጣት</span>
                    rising
                  </span>
                  .
                </p>
              </li>
              <li>
                <h4>complex sentence</h4>A complex sentence contains{' '}
                <b>
                  one{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('independent')}
                  >
                    <span className="tooltiptext">ገለልተኛ</span>
                    independent
                  </span>{' '}
                  (main) clause
                </b>{' '}
                and{' '}
                <b>
                  one or more subordinate (
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('dependent')}
                  >
                    <span className="tooltiptext">ጥገኛ</span>
                    dependent
                  </span>
                  ) clauses.
                </b>
                <p>
                  Example: The{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('picture')}
                  >
                    <span className="tooltiptext">ስዕል</span>
                    picture
                  </span>{' '}
                  looks{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('flat')}
                  >
                    <span className="tooltiptext">ጠፍጣፋ</span>
                    flat
                  </span>{' '}
                  because it is{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('colourless')}
                  >
                    <span className="tooltiptext">ቀለም የሌለው</span>
                    colourless
                  </span>
                  .
                </p>
              </li>
              <li>
                <h4>Compound complex sentences</h4>
                <p>
                  contains two or more independent clauses and one or more
                  dependent clauses
                </p>
                <p>Example : when the house gets cold in the winter</p>
              </li>
            </ol>
            <h3>Based on what sentences do</h3>
            <ol>
              <li>
                <h4>Imperative Sentences</h4>
                <p>
                  An imperative senteces give a command or makes a request .
                  Imperative senteces always end with period.
                </p>
                <b>Example :</b> please take out the garbage (request)
              </li>
              <li>
                <h4>Declarative Sentences</h4>
                <p>
                  A sentece that states a fact or takes an assertion is
                  declarative sentences
                </p>
                <b>Example :</b> The boy is tall
              </li>
              <li>
                <h4>An Interogative Sentences</h4>
                <p>
                  A sentece that asks a question is an interogative sentece. It
                  ends with a question mark (?)
                </p>
                <b>Example :</b> what time is it?
              </li>
              <li>
                <h4>An Exclamation Sentences</h4>
                <p>these kinds of sentences show strong feeling</p>
                <b>Example :</b> you should be ashamed!
              </li>
              <li>
                <h4>Narrative Sentences</h4>
                <p>
                  if your perpose is to tell a story you will be writing a
                  narrative paragraph
                </p>
              </li>
              <li>
                <h4>Descriptive Sentences</h4>
                <p>
                  A descriptive paragraph creates a cicid picture in words of a
                  person , an object or a scene
                </p>
                <b>Example :</b> The sonorant desert in Arizona presents some of
                the most breathtaking sights in America.
              </li>
            </ol>
          </li>
        </ul>
      </div>
      <Comment />
    </div>
  );
};

export default TypesOfSentences;
