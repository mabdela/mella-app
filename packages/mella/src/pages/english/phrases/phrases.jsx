import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Phrases = () => {
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
        The{' '}
        <span className="tooltip" onClick={() => handleSpeech('Phrases')}>
          <span className="tooltiptext-text">ሐረጎች</span>Phrases
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/phrases/quiz"
        >
          Quiz
        </Link>
        A phrase is a group of words without a subject or a{' '}
        <span className="tooltip" onClick={() => handleSpeech('predicate')}>
          <span className="tooltiptext">ገላጭ</span>
          predicate
        </span>{' '}
        or both and does not express a complete{' '}
        <span className="tooltip" onClick={() => handleSpeech('thought')}>
          <span className="tooltiptext">ሃሳብ</span>
          thought
        </span>
        .<h3>Phrases vs. clauses</h3>
        <span>
          <p>
            Phrases and clauses aren’t the same thing. A clause contains a
            subject and a predicate and in many—but not all—cases, can be a
            sentence on its own. In contrast, a phrase <b>can’t</b> be its own
            sentence because a phrase does <b>not</b> contain a subject and
            predicate.
          </p>
          <p>Here’s a quick example of a phrase vs. a clause: </p>
          <p>
            <b>Phrase</b>: Meows so loudly
          </p>
          <p>
            <b>Clause</b>: That cat meows so loudly
          </p>
          <p>
            Clauses contain phrases, and sentences contain clauses. So an easy
            way to visualize the three are:{' '}
            <b>phrases &lt; clauses &lt; sentences</b>.{' '}
          </p>
        </span>
        <h3>
          <span className="tooltip" onClick={() => handleSpeech('Types')}>
            <span className="tooltiptext">ዓይነቶች</span>
            Types
          </span>
        </h3>
        <ol>
          <li>
            <h4>Noun Phrases</h4>
            <p>
              A noun phrase consists of a <b>noun</b> and all its{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('modifiers')}
              >
                <span className="tooltiptext">ቀያሪዎች</span>
                <b>modifiers</b>
              </span>
              .
            </p>
          </li>
          <li>
            <h4>Verb Phrases</h4>
            <p>
              A verb phrase consists of a <b>main verb</b> and its{' '}
              <b>
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('helping')}
                >
                  <span className="tooltiptext">ረዳት</span>
                  <b>helping</b>
                </span>{' '}
                verbs
              </b>
              .
            </p>
          </li>
          <li>
            <h4>Phrases</h4>
            <p>
              A prepositional phrase is made up of a <b>preposition</b>,{' '}
              <b>the object of the preposition</b>, and{' '}
              <b>all the words between them</b>.
            </p>
          </li>
          <li>
            <h4>Gerund Phrases</h4>
            <p>A gerund is a verb form used as a noun.</p>
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Phrases;
