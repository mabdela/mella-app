import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const FormationOfWords = () => {
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
        <span
          className="tooltip"
          onClick={() => handleSpeech('formation of words')}
        >
          <span className="tooltiptext-text">የ ቃላት አመሰራረት</span>Formation of
          words
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <span>
          <h4>Words formed by use of prefixes and suffixes</h4>
          Some words are{' '}
          <span className="tooltip" onClick={() => handleSpeech('formed')}>
            <span className="tooltiptext">ተፈጠረ</span>formed
          </span>{' '}
          addition of prefixes and suffixes to other words.
        </span>
        <ul>
          <li>
            <h5>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Prefixes')}
              >
                <span className="tooltiptext">ቅድመ ቅጥያዎች</span>Prefixes
              </span>{' '}
            </h5>
            A prefix is a word part that is added to the{' '}
            <span className="tooltip" onClick={() => handleSpeech('beginning')}>
              <span className="tooltiptext">መጀመሪያ</span>beginning
            </span>{' '}
            of a word to form another word or to{' '}
            <span className="tooltip" onClick={() => handleSpeech('change')}>
              <span className="tooltiptext">መለወጥ</span>change
            </span>{' '}
            its meaning. The word to which the prefix is added is called the{' '}
            <span className="tooltip" onClick={() => handleSpeech('base word')}>
              <span className="tooltiptext">መሰረታዊ ቃል</span>
              <b>base word</b>
            </span>
            .
            <p>
              <b>Example:</b>
            </p>
            <p>
              <span
                className="tooltip"
                onClick={() => handleSpeech('unfriendly')}
              >
                <span className="tooltiptext">ተግባቢ ያልሆነ</span>unfriendly
              </span>{' '}
              means 'not friendly' the prefix is 'un'
            </p>
            <p>
              <span
                className="tooltip"
                onClick={() => handleSpeech('hemisphere')}
              >
                <span className="tooltiptext">ንፍቀ ክበብ</span>hemisphere
              </span>{' '}
              means 'half of sphere' the prefix is 'hemi'
            </p>
            <p>
              <b>Other prefix examples :</b> ultra , infra , ex , hemi ...
            </p>
          </li>
          <li>
            <h5>
              <span
                className="tooltip"
                onClick={() => handleSpeech('suffixes')}
              >
                <span className="tooltiptext">ድህረ-ቅጥያዎች</span>Suffixes
              </span>{' '}
            </h5>
            A suffix is a word part that is added to the{' '}
            <span className="tooltip" onClick={() => handleSpeech('end')}>
              <span className="tooltiptext">መጨረሻ</span>end
            </span>{' '}
            of a base word to form a new word or to change its meaning.
            <p>
              <b>Example:</b>
            </p>
            <p>
              Enjoy + able = enjoyable , in this example{' '}
              <span className="tooltip" onClick={() => handleSpeech('able')}>
                <span className="tooltiptext">የሚችል</span>able
              </span>{' '}
              means 'cabpable of'{' '}
            </p>
            <p>relation + ship = relationship ship shows 'position held'</p>
            <p>
              <b>Other suffixes examples :</b> -acy , -al , -ness , -ship ...
            </p>
          </li>
        </ul>
      </div>
      <Comment />
    </div>
  );
};

export default FormationOfWords;
