import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const DiaryEntry = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Diary entry')}>
          <span className="tooltiptext-text">ማስታወሻ ደብተር መጻፍ</span>Diary entry
        </span>
        ?
      </h2>
      <div className="mella-content-container">
        <h3>Definition</h3>
        <p>
          A diary entry is a record and{' '}
          <span className="tooltip" onClick={() => handleSpeech('reflection')}>
            <span className="tooltiptext-text">ነጸብራቅ</span>reflection
          </span>{' '}
          on personal experience. The number of entries will be{' '}
          <span className="tooltip" onClick={() => handleSpeech('determined')}>
            <span className="tooltiptext-text">ቆታጥ</span>determined
          </span>{' '}
          by the question.
        </p>

        <span>
          <h3>A diary entry </h3>
        </span>
        <span>
          <ul>
            <li>
              must{' '}
              <span className="tooltip" onClick={() => handleSpeech('reflect')}>
                <span className="tooltiptext">ያንፀባርቁ</span>
                <b>
                  <i>reflect</i>
                </b>
              </span>{' '}
              a date for each entry.
            </li>
            <li>must be written in the first person.</li>
            <li>
              must express{' '}
              <span className="tooltip" onClick={() => handleSpeech('feeling')}>
                <span className="tooltiptext">ስሜት</span>feeling
              </span>{' '}
              and{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('emotions')}
              >
                <span className="tooltiptext">ስሜቶች</span>emotions
              </span>
              .
            </li>
            <li>
              will be{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('informal')}
              >
                <span className="tooltiptext">መደበኛ ያልሆነ</span>
                <b>
                  <i>informal</i>
                </b>
              </span>{' '}
              in style.
            </li>
          </ul>
          <h3>Example of diary entry</h3>

          <p>
            <b>27 APRIL 2018</b>
            <br />
            Dear Diary
            <br />
            My nerves are{' '}
            <span className="tooltip" onClick={() => handleSpeech('shattered')}>
              <span className="tooltiptext">ተሰባበረ</span>
              <b>
                <i>shattered</i>
              </b>
            </span>
            . My stomach is filled with butterflies and my hands are sweaty and
            won’t stop{' '}
            <span className="tooltip" onClick={() => handleSpeech('shaking')}>
              <span className="tooltiptext">እየተንቀጠቀጠ</span>
              <b>
                <i>shaking</i>
              </b>
            </span>
            . I’m so{' '}
            <span className="tooltip" onClick={() => handleSpeech('nervous')}>
              <span className="tooltiptext-text">ጭንቀት</span>nervous
            </span>{' '}
            about this talent show tonight. What on earth made me{' '}
            <span className="tooltip" onClick={() => handleSpeech('decide')}>
              <span className="tooltiptext-text">መወሰን</span>decide
            </span>{' '}
            to compete in the first place and why did I choose{' '}
            <span className="tooltip" onClick={() => handleSpeech('decide')}>
              <span className="tooltiptext-text">ወሰነ</span>decide
            </span>
            singing as my talent?{' '}
          </p>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default DiaryEntry;
