import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Tenses = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Tenses')}>
          <span className="tooltiptext-text">ጊዜያት</span>Tenses
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link className="quiz-link" to="/dashboard/english/grammar/tenses/quiz">
          Quiz
        </Link>
        <span>
          <p>
            The time of an action or the state of being is expressed by
            different forms of the verb. These forms are called the{' '}
            <b>tenses of the verb</b>.
          </p>
          <p>
            There are three main forms of a verb: <b>the present</b>,{' '}
            <b>the past</b>, or <b>the future.</b>
          </p>
        </span>
        <ul>
          <li>
            <h3>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Present Tense')}
              >
                <span className="tooltiptext">የአሁኑ ጊዜ</span>Present Tense
              </span>
            </h3>
            <span>
              A verb which is in present tense indicates what the subject of the
              sentence is doing{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('right now')}
              >
                <span className="tooltiptext">አሁኑኑ</span>right now
              </span>
              .
              <span>
                <p>Types: </p>
                <ol>
                  <li>Simple Present</li>
                  <li>Present Perfect</li>
                  <li>Present Continuous</li>
                  <li>Present Perfect Continuous</li>
                </ol>
              </span>
              <h4>Example:</h4>The{' '}
              <span className="tooltip" onClick={() => handleSpeech('teacher')}>
                <span className="tooltiptext">መምህር</span>teacher
              </span>{' '}
              <span className="tooltip" onClick={() => handleSpeech('sees')}>
                <span className="tooltiptext">አያቸው</span>sees
              </span>{' '}
              the{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('students')}
              >
                <span className="tooltiptext">ተማሪዎችን</span>students
              </span>
              . (The verb sees tells that the teacher is seeing the students
              now.)
            </span>
          </li>
          <li>
            <h3>
              <span
                className="tooltip"
                onClick={() => handleSpeech('past Tense')}
              >
                <span className="tooltiptext">ያለፈው ጊዜ</span>Past Tense
              </span>
            </h3>
            <span>
              A verb which is in past tense shows what has{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('already happened')}
              >
                <span className="tooltiptext">ቀድሞውኑ ተከሰተ</span>already happened
              </span>
              .
              <span>
                <p>Types: </p>
                <ol>
                  <li>Simple Past</li>
                  <li>Past Perfect</li>
                  <li>Past Continuous</li>
                  <li>Past Perfect Continuous</li>
                </ol>
              </span>
              <h4>Example:</h4>Tito liked his{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('grandmother’s')}
              >
                <span className="tooltiptext">የሴት አያት</span>grandmother’s
              </span>{' '}
              <span className="tooltip" onClick={() => handleSpeech('story')}>
                <span className="tooltiptext">ታሪክ</span>story
              </span>
              . (The verb liked tells that the action in the sentence happened
              before now.)
            </span>
          </li>
          <li>
            <h3>
              <span
                className="tooltip"
                onClick={() => handleSpeech('future Tense')}
              >
                <span className="tooltiptext">የወደፊቱ ጊዜ</span>Future Tense
              </span>
            </h3>
            <span>
              A verb which is in future tense tells{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('what is going to happen')}
              >
                <span className="tooltiptext">ወደፊት የሚክሰት</span>what is going to
                happen
              </span>
              .
              <span>
                <p>Types: </p>
                <ol>
                  <li>Simple Future</li>
                  <li>Future Perfect</li>
                  <li>Future Continuous</li>
                  <li>Future Perfect Continuous</li>
                </ol>
              </span>
              <h4>Example:</h4>She will probably{' '}
              <span className="tooltip" onClick={() => handleSpeech('come')}>
                <span className="tooltiptext">መምጣት</span>come
              </span>{' '}
              with us. (The verbs will take and will come tell us what is going
              to happen.)
            </span>
          </li>
        </ul>
      </div>
      <Comment />
    </div>
  );
};

export default Tenses;
