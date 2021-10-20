import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Comparison = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Comparison')}>
          <span className="tooltiptext-text">ንፅፅር</span>Comparison
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/comparison/quiz"
        >
          Quiz
        </Link>
        <span>
          <p>
            We have seen that adjectives describe nouns. One way in which they
            describe nouns is by{' '}
            <span className="tooltip" onClick={() => handleSpeech('comparing')}>
              <span className="tooltiptext">ማወዳደር</span>comparing
            </span>{' '}
            people, places or things.
          </p>
          <p>
            To compare <b>two</b> people, places or things, we use the
            comparative form of an adjective.
          </p>
        </span>

        <ol>
          <li>
            <h3>Positive Degree</h3>
            An adjective ot adverb that doesn't make a comparision is called{' '}
            <b>postive or simple degree</b>.
            <p>
              The usual degree of comparison are the <b>postive</b>, which
              simply denotes a property (as with the english words{' '}
              <span className="tooltip" onClick={() => handleSpeech('big')}>
                <span className="tooltiptext">ትልቅ</span>big
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('small')}>
                <span className="tooltiptext">ትንሽ</span>small
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('nice')}>
                <span className="tooltiptext">ጥሩ</span>nice
              </span>{' '}
              ..etc
            </p>
            <div>
              <p>
                <b>Examples</b>
              </p>
              <p>
                My father is{' '}
                <span className="tooltip" onClick={() => handleSpeech('tall')}>
                  <span className="tooltiptext">ረጅም</span>
                  <b>tall</b>
                </span>{' '}
              </p>
              <p>
                Roman is{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('beautiful')}
                >
                  <span className="tooltiptext">ቆንጆ</span>
                  <b>beautiful</b>
                </span>{' '}
              </p>
            </div>
          </li>

          <li>
            <h3>The Comparative</h3>
            The comparative form of the adjective is used to compare one thing,
            person or place with another one.
            <ol>
              <li>
                <h4>
                  {' '}
                  For{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('short')}
                  >
                    <span className="tooltiptext">አጭር</span>short
                  </span>{' '}
                  adjectives, add <b>-er</b>.
                </h4>
                <p>Examples: great + er = greater </p>
              </li>
              <li>
                <h4>
                  {' '}
                  For{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('longer')}
                  >
                    <span className="tooltiptext">ረጅም</span>longer
                  </span>{' '}
                  adjectives, the comparative is formed by using the word
                  <b>more</b> before them.
                </h4>
                <p>
                  Examples: More{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('handsome')}
                  >
                    <span className="tooltiptext">መልከ መልካም</span>handsome
                  </span>
                  , more{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('remarkable')}
                  >
                    <span className="tooltiptext">አስደናቂ</span>remarkable
                  </span>
                  , More{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('attractive')}
                  >
                    <span className="tooltiptext">ማራኪ</span>attractive
                  </span>
                  , more{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('hardworking')}
                  >
                    <span className="tooltiptext">ታታሪ</span>hardworking
                  </span>
                </p>
              </li>
            </ol>
          </li>
          <li>
            <h3> The superlative</h3>
            <p></p>The superlative form of the adjective is used to compare a
            person, a place or a thing with{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('more than one')}
            >
              <span className="tooltiptext">ከ አንድ በላይ</span>
              <b>more than one</b>{' '}
            </span>{' '}
            other of its kind.
            <br />
            Examples:{' '}
            <span className="tooltip" onClick={() => handleSpeech('Elephants')}>
              <span className="tooltiptext">ዝሆኖች</span>Elephants
            </span>{' '}
            are the{' '}
            <span className="tooltip" onClick={() => handleSpeech('largest')}>
              <span className="tooltiptext">ትልቁ</span>largest{' '}
            </span>{' '}
            animals in the{' '}
            <span className="tooltip" onClick={() => handleSpeech('jungle')}>
              <span className="tooltiptext">ጫካ</span>jungle
            </span>
            .
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Comparison;
