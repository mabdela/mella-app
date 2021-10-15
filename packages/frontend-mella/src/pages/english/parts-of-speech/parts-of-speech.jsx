import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const PartsOfSpeech = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeQuiz());
  }, [dispatch]);

  const handleSpeech = message => {
    TextToSpeech(message);
  };
  return (
    <div className="mella-content-wrapper">
      {' '}
      <br />
      <br />
      <h2>
        <span
          className="tooltip"
          onClick={() => handleSpeech('Parts of speech')}
        >
          <span className="tooltiptext-text">የንግግር ክፍሎች</span>Parts of speech
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        All words may be{' '}
        <span className="tooltip" onClick={() => handleSpeech('classified')}>
          <span className="tooltiptext">የተመደበ</span>
          classified
        </span>{' '}
        into groups called parts of speech.
        <h3>There are 8 parts of speech namely:</h3>
        <ol>
          <li>
            <Link
              to="/dashboard/english/grammar/nouns"
              className="tooltip link"
            >
              <span className="tooltiptext">ስሞች</span>Nouns
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/verbs"
              className="tooltip link"
            >
              <span className="tooltiptext">ግሶች</span>Verbs
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/pronouns"
              className="tooltip link"
            >
              <span className="tooltiptext">ተውላጠ ስም</span>Pronouns
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/adjectives"
              className="tooltip link"
            >
              <span className="tooltiptext">ቅፅሎች</span>Adjectives
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/adverbs"
              className="tooltip link"
            >
              <span className="tooltiptext">ተዉሳካ ግስ</span>Adverbs
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/conjunctions"
              className="tooltip link"
            >
              <span className="tooltiptext">ማያያዣዎች</span>Conjunctions
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/interjections"
              className="tooltip link"
            >
              <span className="tooltiptext">ማያያዣዎች</span>Interjections
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/dashboard/english/grammar/prepositions"
              className="tooltip link"
            >
              <span className="tooltiptext">ቅድመ - ግምቶች</span>Prepositions
            </Link>
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default PartsOfSpeech;
