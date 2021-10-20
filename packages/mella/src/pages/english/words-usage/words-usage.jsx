import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const WordsUsage = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('words usage')}>
          <span className="tooltiptext-text-word">የቃላት አጠቃቀም</span>Words Usage
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <span>
          Words in English language have{' '}
          <span className="tooltip" onClick={() => handleSpeech('various')}>
            <span className="tooltiptext">የተለያዩ</span>various
          </span>{' '}
          meanings depending on their{' '}
          <span className="tooltip" onClick={() => handleSpeech('usage')}>
            <span className="tooltiptext">አጠቃቀም</span>usage
          </span>{' '}
          in sentences.
          <br />
        </span>
        <ul>
          <li>
            <h5>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Synonyms')}
              >
                <span className="tooltiptext">ተመሳሳይ ቃላት</span>Synonyms
              </span>{' '}
            </h5>
            Synonyms are words that have almost the{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('same meaning')}
            >
              <span className="tooltiptext">ተመሳሳይ ትርጉም</span>same meaning
            </span>{' '}
            but different spelling and pronunciation.
            <p>Example:</p>
            <p>
              She was{' '}
              <span className="tooltip" onClick={() => handleSpeech('happy')}>
                <span className="tooltiptext">ደስተኛ</span>happy
              </span>{' '}
              with her grade - She was{' '}
              <span className="tooltip" onClick={() => handleSpeech('pleased')}>
                <span className="tooltiptext">ደስተኛ</span>pleased
              </span>{' '}
              with her grade. (in this example the word happy and pleased have
              the same meaning )
            </p>
            <p>
              <b>Other Synonyms examples</b> :{' '}
              <span className="tooltip" onClick={() => handleSpeech('begin')}>
                <span className="tooltiptext">ጀምር</span>begin
              </span>{' '}
              -{' '}
              <span className="tooltip" onClick={() => handleSpeech('start')}>
                <span className="tooltiptext">ጀምር</span>start
              </span>{' '}
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('chop')}>
                <span className="tooltiptext">መቁረጥ</span>chop
              </span>{' '}
              -{' '}
              <span className="tooltip" onClick={() => handleSpeech('cut')}>
                <span className="tooltiptext">መቁረጥ</span>cut
              </span>{' '}
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('admit')}>
                <span className="tooltiptext">አምነው መቀበል</span>admit
              </span>{' '}
              -{' '}
              <span className="tooltip" onClick={() => handleSpeech('confess')}>
                <span className="tooltiptext">አምነው መቀበል</span>confess
              </span>{' '}
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('hard')}>
                <span className="tooltiptext">ከባድ</span>hard
              </span>{' '}
              -{' '}
              <span className="tooltip" onClick={() => handleSpeech('tough')}>
                <span className="tooltiptext">ከባድ</span>tough
              </span>{' '}
              ...
            </p>
          </li>
          <li>
            <h5>
              {' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('Antonyms')}
              >
                <span className="tooltiptext">ተቃራኒ ቃላት</span>Antonyms
              </span>{' '}
            </h5>
            Antonyms are words that have{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('opposite meanings')}
            >
              <span className="tooltiptext">ተቃራኒ ትርጉሞች</span>opposite meanings
            </span>{' '}
            . Antonyms also add variety to your writing.
            <p>Example:</p>
            <p>
              The air is{' '}
              <span className="tooltip" onClick={() => handleSpeech('cold')}>
                <span className="tooltiptext">ቀዝቃዛ</span>cold
              </span>{' '}
              - The air is{' '}
              <span className="tooltip" onClick={() => handleSpeech('hot')}>
                <span className="tooltiptext">ትኩስ</span>hot
              </span>{' '}
              (cold and hot have opposite meaning){' '}
            </p>
            <p>
              <b>Other suffixes examples</b> :{' '}
              <span className="tooltip" onClick={() => handleSpeech('cold')}>
                <span className="tooltiptext">ቀዝቃዛ</span>cold
              </span>{' '}
              -{' '}
              <span className="tooltip" onClick={() => handleSpeech('hot')}>
                <span className="tooltiptext">ትኩስ</span>hot
              </span>{' '}
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('heavier')}>
                <span className="tooltiptext">ከባድ</span>heavier
              </span>{' '}
              –{' '}
              <span className="tooltip" onClick={() => handleSpeech('lighter')}>
                <span className="tooltiptext">ቀላል</span>lighter
              </span>{' '}
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('fearful')}>
                <span className="tooltiptext">ፈሪ</span>fearful
              </span>{' '}
              –{' '}
              <span className="tooltip" onClick={() => handleSpeech('brave')}>
                <span className="tooltiptext">ደፋር</span>brave
              </span>{' '}
              ...
            </p>
          </li>
          <li>
            <h5>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Idioms and Sayings')}
              >
                <span className="tooltiptext">ፈሊጦች እና አባባሎች</span>Idioms and
                Sayings
              </span>{' '}
            </h5>
            An idiom is a phrase that has a{' '}
            <span className="tooltip" onClick={() => handleSpeech('special')}>
              <span className="tooltiptext">ልዩ</span>special
            </span>{' '}
            meaning as a whole. The meaning of an idiom is different from the
            meanings of its separate words.
            <p>Example:</p>
            <p>
              I put my{' '}
              <span className="tooltip" onClick={() => handleSpeech('foot')}>
                <span className="tooltiptext">እግር</span>foot
              </span>{' '}
              in my{' '}
              <span className="tooltip" onClick={() => handleSpeech('mouth')}>
                <span className="tooltiptext">አፍ</span>mouth
              </span>{' '}
              today. (means 'to say the wrong word'){' '}
            </p>
            <span>
              <b>Other Idomatic expression examples </b>
              <p>
                A{' '}
                <span className="tooltip" onClick={() => handleSpeech('fool')}>
                  <span className="tooltiptext">ሞኝ</span>fool
                </span>{' '}
                and his money are easily{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('parted')}
                >
                  <span className="tooltiptext">ተለያዩ</span>parted
                </span>
                . means( It’s easy for a foolish person to lose his/her money.)
              </p>
              <p>
                A{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('leopard')}
                >
                  <span className="tooltiptext">አቦ ሸማኔ</span>leopard
                </span>{' '}
                can’t change his{' '}
                <span className="tooltip" onClick={() => handleSpeech('spots')}>
                  <span className="tooltiptext">ቦታ</span>spots
                </span>
                . means (You cannot change who you are.)
              </p>
            </span>
          </li>
        </ul>
      </div>
      <Comment />
    </div>
  );
};

export default WordsUsage;
