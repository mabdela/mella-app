import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Verbs = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Verb')}>
          <span className="tooltiptext-text">ግስ</span>Verb
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link className="quiz-link" to="/dashboard/english/grammar/verbs/quiz">
          Quiz
        </Link>
        <span>
          A verb is a word that
          <ol>
            <li>
              <span className="tooltip" onClick={() => handleSpeech('express')}>
                <span className="tooltiptext">መግለፅ</span>Express
              </span>{' '}
              an action
            </li>
            <li>
              Expresses the state that something{' '}
              <span className="tooltip" onClick={() => handleSpeech('exists')}>
                <span className="tooltiptext">ያለ</span>exists
              </span>
              , or
            </li>
            <li>
              Links the subject with a word that{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('describes')}
              >
                <span className="tooltiptext">መግለፅ</span>describes
              </span>{' '}
              or{' '}
              <span className="tooltip" onClick={() => handleSpeech('renames')}>
                <span className="tooltiptext">ዳግም መሰየም</span>renames
              </span>{' '}
              it.
            </li>
          </ol>
          <span>
            Here there are two kinds of verbs
            <br />
            <h3>Action Verb :</h3>A verb that express actions. They show what
            the subject <b>does</b> or <b>did</b>. Most verbs are{' '}
            <b>action verbs</b>.
            <p>
              <b>Example :</b>
            </p>
            <span className="tooltip" onClick={() => handleSpeech('cat')}>
              <span className="tooltiptext">ድመት</span>Cat
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('drink')}>
              <span className="tooltiptext">መጠጥ</span>drink
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('milk')}>
              <span className="tooltiptext">ወተት</span>milk
            </span>
            .
            <h3>
              <span className="tooltip" onClick={() => handleSpeech('linking')}>
                <span className="tooltiptext">ማገናኘት</span>Linking
              </span>{' '}
              Verb :
            </h3>{' '}
            A linking verb links the subject of a sentence with a word or words
            that:
            <ol>
              <li>
                <h4>Express(es) the subject’s state of being</h4>
                Example: She is here. (expresses state of being)
              </li>
              <li>
                <h4>Describe(es) or rename(es) the subject.</h4>
                Example: Anna is a{' '}
                <span className="tooltip" onClick={() => handleSpeech('nurse')}>
                  <span className="tooltiptext">ነርስ</span>nurse
                </span>{' '}
                (a nurse, describes Anna)
              </li>
            </ol>
            <h3>Common Linking Verbs :</h3>
            <span>
              <p>
                The most common linking verbs are forms of the verb{' '}
                <b>"to be"</b>: am, is, are, was, were, being, been.{' '}
              </p>
            </span>
            <h3>Example :</h3>
            <b>Am</b> look grow , <b>Are</b> feel remain
          </span>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default Verbs;
