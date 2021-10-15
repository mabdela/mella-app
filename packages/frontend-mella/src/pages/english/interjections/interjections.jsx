import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Interjections = () => {
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
        {' '}
        <span className="tooltip" onClick={() => handleSpeech('Interjection')}>
          <span className="tooltiptext-interjection">ጣልቃ ገብነቶች</span>
          Interjection
        </span>
      </h2>
      <div className="mella-content-container">
        An interjection is either a single word or short groups of words that is
        used to{' '}
        <span className="tooltip" onClick={() => handleSpeech('express')}>
          <span className="tooltiptext">መግለፅ</span>
          express
        </span>{' '}
        a feeling or emotion. Interjections can express such feelings as{' '}
        <span className="tooltip" onClick={() => handleSpeech('urgency')}>
          <span className="tooltiptext">አጣዳፊ</span>
          urgency
        </span>
        ,{' '}
        <span className="tooltip" onClick={() => handleSpeech('surprise')}>
          <span className="tooltiptext">መደነቅ</span>
          surprise
        </span>
        ,{' '}
        <span className="tooltip" onClick={() => handleSpeech('relief')}>
          <span className="tooltiptext">እፎይታ</span>
          relief
        </span>
        ,{' '}
        <span className="tooltip" onClick={() => handleSpeech('joy')}>
          <span className="tooltiptext">ደስታ</span>
          joy
        </span>
        , or{' '}
        <span className="tooltip" onClick={() => handleSpeech('pain')}>
          <span className="tooltiptext">ህመም</span>
          pain
        </span>
        .
        <p>
          An interjection that expresses{' '}
          <span className="tooltip" onClick={() => handleSpeech('strong')}>
            <span className="tooltiptext">ጠንካራ</span>
            strong
          </span>{' '}
          emotion is often followed by an <b>exclamation mark</b>.
        </p>
        An interjection that expresses{' '}
        <span className="tooltip" onClick={() => handleSpeech('mild')}>
          <span className="tooltiptext">የዋህ</span>
          mild
        </span>{' '}
        emotion is usually followed by a <b>comma</b>.<h3>Examples: </h3>
        <ol>
          <li>
            Let’s go! We can’t sleep before we find the{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('missing boy')}
            >
              <span className="tooltiptext">የጠፋውን ልጅ</span>
              missing boy
            </span>{' '}
            (<b>urgency</b>).
          </li>
          <li>
            Phew! I was{' '}
            <span className="tooltip" onClick={() => handleSpeech('afraid')}>
              <span className="tooltiptext">ፈራ</span>
              afraid
            </span>{' '}
            we would never{' '}
            <span className="tooltip" onClick={() => handleSpeech('find him')}>
              <span className="tooltiptext">እሱን አግኝ</span>
              find him
            </span>
            .
          </li>
          <li>
            (<b>relief</b>) Oh, you have{' '}
            <span className="tooltip" onClick={() => handleSpeech('grown')}>
              <span className="tooltiptext">አድጓል</span>
              grown
            </span>{' '}
            so big.
          </li>
          <li>
            (<b>surprise</b>) Well, I have never been so{' '}
            <span className="tooltip" onClick={() => handleSpeech('happy')}>
              <span className="tooltiptext">ደስተኛ</span>
              happy
            </span>
            .
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Interjections;
