import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Infnitive_Gerund = () => {
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
        <span
          className="tooltip"
          onClick={() => handleSpeech('Infnitive And Gerund')}
        >
          <span className="tooltiptext-text">''</span>Infnitive And Gerund
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/infnitive_and_gerund/quiz"
        >
          Quiz
        </Link>
        <p>
          An Infnitive{' '}
          <span className="tooltip" onClick={() => handleSpeech('consists')}>
            <span className="tooltiptext-text">ማቀፍ</span>consists
          </span>{' '}
          of to + the simple form of a verb{' '}
        </p>
        <b>Example </b> to talk , to speak , to run ...
        <p>
          A Gerund is the ing{' '}
          <span className="tooltip" onClick={() => handleSpeech('form')}>
            <span className="tooltiptext-text">አይነት</span>form
          </span>{' '}
          of a verb used as a noun{' '}
        </p>
        <b>Example </b> talking , speaking , eating ....
        <p>To see them in detail</p>
        <ol>
          <li>
            <h3>
              Verbs{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('followed')}
              >
                <span className="tooltiptext-text">ይከተላል</span>followed
              </span>{' '}
              by 'to-infnitve'
            </h3>
            <b>Example :</b> I hope to see you again
          </li>
          <li>
            <h3>Verbs which are followed by a noun / pronoun + to -inf</h3>
            <b>Example :</b> The teacher{' '}
            <span className="tooltip" onClick={() => handleSpeech('told')}>
              <span className="tooltiptext-text">ነገረ</span>told
            </span>{' '}
            us to write a{' '}
            <span className="tooltip" onClick={() => handleSpeech('story')}>
              <span className="tooltiptext-text">ታሪክ</span>story
            </span>
          </li>
          <li>
            <h3>Adjective + to - inf</h3>
            <b>Example :</b> compare - Riding with a drunk driver is dangrous.
            Riding .... is dangrous)
          </li>
          <li>
            <h3>Too / enough + to -inf</h3>
            <b>Example :</b> <b>That box</b> is too heavy for me to lift (means
            I can't lift that box)
          </li>
          <li>
            <h3>Would like + to -inf</h3>
            <b>Example :</b> I would like to tell you someting.
          </li>
          <li>
            <h3>Verbs which are followed by Gerund(ing)</h3>
            <b>Example :</b> finish = we finished eating at 6.30 (finished
            eating)
          </li>
          <li>
            <h3>Preposition + -ing (Gerund)</h3>
            <b>Example :</b> she turned off the tape recorder by pushing the
            stop button . (by pushing)
          </li>
          <li>
            <h3>Special expression followed by ing form of a verb</h3>
            <b>Example :</b> we had fun playing bolleyball. (had fun playing)
          </li>
          <li>
            <h3>need to be or needs + -ing</h3>
            <b>Example :</b> I need to borrow some money . (need to borrow)
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Infnitive_Gerund;
