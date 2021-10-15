import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Adjectives = () => {
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
        An{' '}
        <span className="tooltip" onClick={() => handleSpeech('Adjectives')}>
          <span className="tooltiptext-text">ቅፅሎች</span>Adjectives
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/adjectives/quiz"
        >
          Quiz
        </Link>
        An adjective is a word that describes or modifies a noun or a pronoun.
        To describe or{' '}
        <span className="tooltip" onClick={() => handleSpeech('modify')}>
          <span className="tooltiptext">ቀይር</span>modify
        </span>{' '}
        means to{' '}
        <span className="tooltip" onClick={() => handleSpeech('provide')}>
          <span className="tooltiptext">ማቅረብ</span>
          provide
        </span>{' '}
        <span className="tooltip" onClick={() => handleSpeech('additional')}>
          <span className="tooltiptext">ተጨማሪ</span>
          additional
        </span>{' '}
        <span className="tooltip" onClick={() => handleSpeech('information')}>
          <span className="tooltiptext">መረጃ</span>
          <b>information</b>
        </span>{' '}
        about nouns or pronouns.
        <h3>
          Adjective{' '}
          <span className="tooltip" onClick={() => handleSpeech('tell')}>
            <span className="tooltiptext">ንገረው</span>
            tell
          </span>{' '}
        </h3>
        <ol>
          <li>
            <span
              className="tooltip"
              onClick={() => handleSpeech('what kind?')}
            >
              {' '}
              <span className="tooltiptext">ምን አይነት?</span> what kind?
            </span>
            <br />
            <h4>Examples:</h4>
            <p>
              The{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('powerful')}
              >
                <span className="tooltiptext">ኃይለኛ</span>
                powerful
              </span>{' '}
              gorilla{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('knocked down')}
              >
                <span className="tooltiptext">ማፍረስ</span>
                <b>knocked down</b>
              </span>{' '}
              the{' '}
              <span className="tooltip" onClick={() => handleSpeech('hunter')}>
                <span className="tooltiptext">አዳኝ</span>
                hunter
              </span>{' '}
              .
            </p>
          </li>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('how many?')}>
              {' '}
              <span className="tooltiptext">ስንት?</span> how many?
            </span>
            <br />
            <h4>Examples: </h4>
            <p>
              Three zebras were{' '}
              <span className="tooltip" onClick={() => handleSpeech('resting')}>
                <span className="tooltiptext">ማረፍ</span>
                <b>resting</b>
              </span>
              . He has few friends.
            </p>
          </li>
        </ol>
        <h3>
          There are 4{' '}
          <span className="tooltip" onClick={() => handleSpeech('main')}>
            <span className="tooltiptext">ዋና</span>
            main
          </span>{' '}
          kinds of adjectives
        </h3>
        <ol>
          <li>
            <h4>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Descriptive adjectives')}
              >
                {' '}
                <span className="tooltiptext">ገላጭ ቅፅሎች</span> Descriptive
                adjectives
              </span>
            </h4>
            Descriptive adjectives tell us the{' '}
            <span className="tooltip" onClick={() => handleSpeech('size')}>
              <span className="tooltiptext">መጠን</span>
              size
            </span>{' '}
            ,{' '}
            <span className="tooltip" onClick={() => handleSpeech('size')}>
              <span className="tooltiptext">ቅርፅ</span>
              size
            </span>{' '}
            ,{' '}
            <span className="tooltip" onClick={() => handleSpeech('age')}>
              <span className="tooltiptext">ዕድሜ</span>
              age
            </span>{' '}
            ,{' '}
            <span className="tooltip" onClick={() => handleSpeech('colour')}>
              <span className="tooltiptext">ቀለም</span>
              colour
            </span>{' '}
            ,{' '}
            <span className="tooltip" onClick={() => handleSpeech('weight')}>
              <span className="tooltiptext">ክብደት</span>
              weight
            </span>{' '}
            ,{' '}
            <span className="tooltip" onClick={() => handleSpeech('height')}>
              <span className="tooltiptext">ቁመት</span>
              height
            </span>{' '}
            ,{' '}
            <span className="tooltip" onClick={() => handleSpeech('nature')}>
              <span className="tooltiptext">ተፈጥሮ</span>
              nature
            </span>{' '}
            and{' '}
            <span className="tooltip" onClick={() => handleSpeech('origin')}>
              <span className="tooltiptext">አመጣጥ</span>
              origin
            </span>{' '}
            of the nouns they are describing.
            <br />
            <br />
            Examples: A mexican{' '}
            <span className="tooltip" onClick={() => handleSpeech('carpet')}>
              <span className="tooltiptext">ምንጣፍ</span>
              <b>carpet</b>
            </span>
          </li>
          <li>
            <h4>Definite and indefinite adjectives</h4>
            They give the number or the{' '}
            <span className="tooltip" onClick={() => handleSpeech('quantity')}>
              <span className="tooltiptext">ብዛት</span>
              <b>quantity</b>
            </span>
            , either{' '}
            <span className="tooltip" onClick={() => handleSpeech('specific')}>
              <span className="tooltiptext">የተወሰነ</span>
              <b>specific</b>
            </span>{' '}
            or{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('approximate')}
            >
              <span className="tooltiptext">ግምታዊ</span>
              <b>approximate</b>
            </span>{' '}
            , of the noun in question. They are also referred to as{' '}
            <span className="tooltip" onClick={() => handleSpeech('numerals')}>
              <span className="tooltiptext">ቁጥሮች</span>
              <b>numerals</b>
            </span>
            .
            <br />
            <br />
            Examples: Three{' '}
            <span className="tooltip" onClick={() => handleSpeech('elephants')}>
              <span className="tooltiptext">ዝሆኖች</span>
              <b>elephants</b>
            </span>{' '}
            were killed by the game rangers.
          </li>
          <li>
            {' '}
            <h4>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Demonstrative adjectives')}
              >
                {' '}
                <span className="tooltiptext">የማሳያ ቅፅሎች</span> Demonstrative
                adjectives
              </span>
            </h4>
            A demonstrative adjective tells which one or which ones. They are
            used before nouns and other adjectives.
            <br />
            <br />
            Examples: This picture is very{' '}
            <span className="tooltip" onClick={() => handleSpeech('beautiful')}>
              <span className="tooltiptext">ቆንጆ</span>
              <b>beautiful</b>
            </span>
            .
          </li>
          <li>
            {' '}
            <h4>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Interrogative Adjectives')}
              >
                {' '}
                <span className="tooltiptext-text">የምርመራ ቅጽሎች</span>{' '}
                Interrogative Adjectives
              </span>
            </h4>
            The interrogative adjectives are used with nouns to ask questions.
            <br />
            <br />
            Examples: Few people know the name of our president.
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Adjectives;
