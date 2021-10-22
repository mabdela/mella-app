import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const DialogueWriting = () => {
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
      <br />
      <h2>
        <span
          className="tooltip"
          onClick={() => handleSpeech('Dialogue writing')}
        >
          <span className="tooltiptext-text">የውይይት ጽሑፍ</span>Dialogue writing
        </span>
        ?
      </h2>
      <div className="mella-content-container">
        <h3>Definition</h3>
        <p>
          A dialogue is a{' '}
          <span
            className="tooltip"
            onClick={() => handleSpeech('conversation')}
          >
            <span className="tooltiptext-text">የቃላት ልውውጥ</span>conversation
          </span>{' '}
          between two people. It is a record of the{' '}
          <span className="tooltip" onClick={() => handleSpeech('exchanges')}>
            <span className="tooltiptext-text">ልውውጥ</span>exchanges
          </span>{' '}
          as they{' '}
          <span className="tooltip" onClick={() => handleSpeech('occur')}>
            <span className="tooltiptext-text">መከሰት</span>occur
          </span>
          , directly from the speaker’s point of view
        </p>

        <span>
          <h3>when writing a dialogue</h3>
        </span>
        <span>
          <ul>
            <li>
              write the names of the{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('characters')}
              >
                <span className="tooltiptext">ቁምፊዎች</span>
                <b>
                  <i>characters</i>
                </b>
              </span>{' '}
              on the left side of the page
            </li>
            <li>
              use a <b>colon</b> after the name of the character who is speaking
            </li>
            <li>
              use a <b>new line</b> to indicate each new speaker;
            </li>
            <li>
              avoid using long{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('greetings')}
              >
                <span className="tooltiptext">ሰላምታ</span>
                <b>
                  <i>greetings</i>
                </b>
              </span>{' '}
              and introductions – respond to the brief in the question
            </li>
            <li>
              advice to characters (or readers) on how to speak or present the
              action must be given in brackets before the words are spoken;
            </li>
            <li>
              <span className="tooltip" onClick={() => handleSpeech('sketch')}>
                <span className="tooltiptext">ንድፍ</span>
                <b>
                  <i>sketch</i>
                </b>
              </span>{' '}
              a{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('scenario')}
              >
                <span className="tooltiptext">ሁኔታ</span>
                <b>
                  <i>scenario</i>
                </b>
              </span>{' '}
              scenario before you start writing.
            </li>
          </ul>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default DialogueWriting;
