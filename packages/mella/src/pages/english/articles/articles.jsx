import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Articles = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Articles')}>
          <span className="tooltiptext-text">መጣጥፎች</span>Articles
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/articles/quiz"
        >
          Quiz
        </Link>
        <article>
          Articles are the words a, an and the. A and an are special adjectives
          called{' '}
          <span className="tooltip" onClick={() => handleSpeech('indefinite')}>
            <span className="tooltiptext">ያልተወሰነ</span>
            indefinite
          </span>{' '}
          articles. They are used when the nouns they modify do not refer to any
          particular thing.
          <br />
          All articles are <b>adjectives</b>.<h3>Examples</h3>A student{' '}
          <span className="tooltip" onClick={() => handleSpeech('rang')}>
            <span className="tooltiptext">ደወለ</span>
            rang
          </span>{' '}
          the{' '}
          <span className="tooltip" onClick={() => handleSpeech('bells')}>
            <span className="tooltiptext">ደወሎች</span>
            bells
          </span>{' '}
          (no{' '}
          <span className="tooltip" onClick={() => handleSpeech('specific')}>
            <span className="tooltiptext">የተወሰነ</span>
            specific
          </span>{' '}
          <span className="tooltip" onClick={() => handleSpeech('student')}>
            <span className="tooltiptext">ተማሪ</span>
            student
          </span>{' '}
          )
          <br />
          <br />
          An{' '}
          <span className="tooltip" onClick={() => handleSpeech('orange')}>
            <span className="tooltiptext">ብርቱካን</span>
            orange
          </span>{' '}
          is good for you{' '}
          <span className="tooltip" onClick={() => handleSpeech('health')}>
            <span className="tooltiptext">ጤና</span>
            health
          </span>
          . (no specific orange)
          <br />
          <br />
          <b>The</b> is used with both{' '}
          <span className="tooltip" onClick={() => handleSpeech('singular')}>
            <span className="tooltiptext">ነጠላ</span>
            singular
          </span>{' '}
          and{' '}
          <span className="tooltip" onClick={() => handleSpeech('plural')}>
            <span className="tooltiptext">ብዙ</span>
            plural
          </span>{' '}
          nouns, but <b>a</b> and <b>an</b> are used with singular nouns.
        </article>
        <h4>Diffrent types of artcles and their uses</h4>
        <ol>
          <li>
            <h5>Indfnite Articles</h5>
            <p>
              <b>a</b> , <b>an</b> = <b>one</b>
            </p>
            <p>
              <b>a</b> : we use a before a word begining with a consonant
            </p>
            <p>
              Example : He saw <b>a</b> cow.
            </p>
            <p>
              <b>an</b> : we use an before a word begining with a vaoul letter
            </p>
            <p>
              Example : He saw <b>an</b> elephant.
            </p>
          </li>
          <li>
            <h5>Defnite Articles</h5>
            <p>
              we use defnite article <b>the</b> before singular and plural
              countable nouns and before uncountable nouns.
            </p>

            <p>
              Example : He killed <b>the</b> lion.
            </p>
          </li>
          <li>
            <h5>Ommision of Articles</h5>
            <p>
              we do not use an article before nouns that follow certain phrases
              sech as <b>kind of</b> , <b>types of</b> , <b></b>
            </p>

            <p>Example : what kind of man are you?</p>
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Articles;
