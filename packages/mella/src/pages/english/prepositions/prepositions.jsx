import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Prepositions = () => {
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
        The{' '}
        <span className="tooltip" onClick={() => handleSpeech('Prepositions')}>
          <span className="tooltiptext-text">ቅድመ - ግምቶች</span>Prepositions
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/prepositions/quiz"
        >
          Quiz
        </Link>
        A preposition is a word that shows the{' '}
        <span className="tooltip" onClick={() => handleSpeech('relationship')}>
          <span className="tooltiptext">ግንኙነት</span> relationship{' '}
        </span>{' '}
        between other words in a sentence.
        <h3>Example</h3>
        <p>
          The cat{' '}
          <span className="tooltip" onClick={() => handleSpeech('lay')}>
            <span className="tooltiptext">ተኛ</span> lay
          </span>{' '}
          <span className="tooltip" onClick={() => handleSpeech('under')}>
            <span className="tooltiptext">ስር</span> under
          </span>{' '}
          the table.
        </p>
        <article>
          <p>
            Hence a preposition is a word that{' '}
            <span className="tooltip" onClick={() => handleSpeech('links')}>
              <span className="tooltiptext">አገናኞች</span> links
            </span>{' '}
            another word or word group to the rest of the sentence. The noun or
            pronoun after the preposition is called the{' '}
            <b>object of the preposition</b>.
            <br />
            <br />
            The table is the <b>object</b> of the preposition under in the above
            sentence.
            <br />
            <br />
            The preposition under relates the verb lay to the noun table.
          </p>
        </article>
        <ol>
          <li>
            <h4>Preposion of place</h4>
            <p>
              <b>In :</b> in a shop , in a room ...
            </p>
            <p>
              <b>On :</b> on the floor
            </p>
            <p>
              <b>At :</b> At the bus stop
            </p>
            <p>
              <b>To :</b> I wana go to america
            </p>
          </li>
          <li>
            <h4>Preposion of Time</h4>
            <p>
              <b>In :</b> in 2000 GC
            </p>
            <p>
              <b>On :</b> on tusday
            </p>
            <p>
              <b>At :</b> At 2 O'clock
            </p>
            <p>
              <b>From...To :</b> we lived in addis from 2020 to 2021
            </p>
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Prepositions;
