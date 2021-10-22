import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Conjections = () => {
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
        The{' '}
        <span className="tooltip" onClick={() => handleSpeech('Conjunctions')}>
          <span className="tooltiptext-text">ማያያዣዎች</span>Conjunctions
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/conjections/quiz"
        >
          Quiz
        </Link>
        A conjunction is a word that{' '}
        <span className="tooltip" onClick={() => handleSpeech('connects')}>
          <span className="tooltiptext">ያገናኛል</span>connects
        </span>{' '}
        words or groups of words. Like{' '}
        <span className="tooltip" onClick={() => handleSpeech('prepositions')}>
          <span className="tooltiptext-text">ቅድመ - ግምቶች</span>prepositions
        </span>
        , conjunctions show a relationship between the words they connect. But,
        unlike prepositions, conjunctions do not have <b>objects</b>.
        <h3>There are 3 main categories of conjunctions:</h3>
        <ol>
          <li>
            <h4>Coordinating conjunctions</h4>
            <span>
              {' '}
              <p>
                Coordinating conjunctions connect{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('related')}
                >
                  <span className="tooltiptext">ተዛማጅ</span>related
                </span>{' '}
                words, groups of words, or sentences.
              </p>
              <p>
                There are <b>three</b> coordinating conjunctions:{' '}
                <b>and, but and or</b>.
              </p>
              <p>
                <b>and</b> is used to join words, groups of words, or sentences
                together.
              </p>{' '}
              <p>
                <b>but</b> shows{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('contrast')}
                >
                  <span className="tooltiptext">ንፅፅር</span>contrast
                </span>{' '}
                while <b>or</b> shows{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('choice')}
                >
                  <span className="tooltiptext">ምርጫ</span>choice
                </span>
                .
              </p>
              <b>Example : </b>
              <p>
                The{' '}
                <span className="tooltip" onClick={() => handleSpeech('bull')}>
                  <span className="tooltiptext">በሬ</span>bull
                </span>{' '}
                <b>and</b> the{' '}
                <span className="tooltip" onClick={() => handleSpeech('cart')}>
                  <span className="tooltiptext">ጋሪ</span>cart
                </span>{' '}
                are{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('inseparable')}
                >
                  <span className="tooltiptext">የማይነጣጠሉ</span>inseparable
                </span>
                . (connects two subjects).
              </p>
              <p>
                The food was{' '}
                <span className="tooltip" onClick={() => handleSpeech('hard')}>
                  <span className="tooltiptext">ከባድ</span>hard
                </span>{' '}
                <b>and</b>{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('tasteless')}
                >
                  <span className="tooltiptext">ጣዕም የሌለው</span>tasteless
                </span>
                .
              </p>
            </span>
          </li>
          <li>
            <h4>Correlative conjunctions</h4>
            <p>
              {' '}
              Correlative conjunctions are conjunctions that are used in{' '}
              <span className="tooltip" onClick={() => handleSpeech('pairs')}>
                <span className="tooltiptext">ጥንዶች</span>pairs
              </span>{' '}
              to connect sentence parts.
            </p>
            <p>
              These include <b>either … or</b>, <b>neither … nor</b>,{' '}
              <b>not only … but also</b>,<b>whether … or</b> and{' '}
              <b>both … and</b>.
            </p>
            <b>Examples : </b>
            <p>
              {' '}
              <b>Both</b> boys <b>and</b> girls{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('attended')}
              >
                <span className="tooltiptext">ተገኝተዋል</span>attended
              </span>{' '}
              the{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('conference')}
              >
                <span className="tooltiptext">ጉባኤ</span>conference
              </span>{' '}
              .
            </p>
            <p>
              The students{' '}
              <span className="tooltip" onClick={() => handleSpeech('ride')}>
                <span className="tooltiptext">መንዳት</span>ride
              </span>{' '}
              <b>either</b> on bicycles or motorbikes.
            </p>
          </li>
          <li>
            <h4>Subordinating conjunctions</h4>
            <p>
              Subordinating conjunctions connect <b>two or more clauses</b> to
              form complex sentences.
            </p>
            <p>
              They include <b>because, since, if, as, whether, and for</b>.
            </p>
            <b>Examples: </b>
            <p>
              <b>If</b> I go home, my dog will{' '}
              <span className="tooltip" onClick={() => handleSpeech('follow')}>
                <span className="tooltiptext">ተከተሉ</span>follow
              </span>{' '}
              me.
            </p>
            <p>
              He was{' '}
              <span className="tooltip" onClick={() => handleSpeech('always')}>
                <span className="tooltiptext">ሁልጊዜ</span>always
              </span>{' '}
              <span className="tooltip" onClick={() => handleSpeech('rude')}>
                <span className="tooltiptext">ባለጌ</span>rude
              </span>{' '}
              <b>since</b> he was a child.
            </p>
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Conjections;
