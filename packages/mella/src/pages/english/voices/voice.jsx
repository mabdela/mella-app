import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Voices = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('voices')}>
          <span className="tooltiptext-text">ድምፆች</span>Voices
        </span>
      </h2>
      <div className="mella-content-container">
        <Link className="quiz-link" to="/dashboard/english/grammar/voice/quiz">
          Quiz
        </Link>
        Voice is the term used to describe whether a verb is{' '}
        <span className="tooltip" onClick={() => handleSpeech('active')}>
          <span className="tooltiptext">ንቁ</span>
          <b>active</b>
        </span>{' '}
        or{' '}
        <span className="tooltip" onClick={() => handleSpeech('passive')}>
          <span className="tooltiptext">ተገብሮ</span>
          <b>passive</b>
        </span>{' '}
        .
        <h3>
          As ilustrated above there are two types of Voices Active and Passive{' '}
        </h3>
        <ol>
          <li>
            <h4>Active Voice</h4>
            If the subject is performing the action, then the verb is said to be
            in the <b>active voice</b>. Look at this:
            <h5>Example :</h5>The{' '}
            <span className="tooltip" onClick={() => handleSpeech('dog')}>
              <span className="tooltiptext">ውሻ</span>dog
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('ate')}>
              <span className="tooltiptext">በላ</span>ate
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('our meat')}>
              <span className="tooltiptext">ስጋችን</span>our meat
            </span>
            . (in this example "the dog" is the subject and "ate" is verb So
            subject did the verb)
          </li>
          <li>
            <h4>Passive Voice</h4>
            If the subject is having the action done to it, then the verb is
            said to be in the <b>passive voice</b>. Look at this:
            <h5>Example :</h5>The meat was eaten by the dog. (in this example
            subject is having the verb done to it)
          </li>
        </ol>
        <h4>More examples on Active Voices</h4>
        <ul>
          <li>
            Lee ate the pies. (Lee is the subject of the verb. The subject is
            doing the action of the verb.)
          </li>
          <li>
            We{' '}
            <span className="tooltip" onClick={() => handleSpeech('play')}>
              <span className="tooltiptext">መጫወት</span>play
            </span>{' '}
            hopscotch. (We is the subject of the verb. The subject is doing the
            action of the verb.)
          </li>
        </ul>
        <h4>More examples on Passive Voices</h4>
        <ul>
          <li>
            The pies were eaten by Lee. (The pies is the subject of the verb.
            The subject is being acted upon.)
          </li>
          <li>
            Hopscotch is played by us. (Hopscotch is the subject of the verb.
            The subject is being acted upon.)
          </li>
        </ul>
        <h3>When to use active and passive voice</h3>
        <span>
          <p>
            Using the active voice{' '}
            <span className="tooltip" onClick={() => handleSpeech('conveys')}>
              <span className="tooltiptext">ያስተላልፋል</span>conveys
            </span>{' '}
            a <b>strong, clear tone</b> and the passive voice is{' '}
            <b>subtler and weaker</b>. Here’s some good advice: don’t use the
            passive voice just because you think it sounds a bit fancier than
            the active voice.
          </p>
          <p>
            That said, there are times the passive voice is useful and called
            for. Take “The{' '}
            <span className="tooltip" onClick={() => handleSpeech('squirrel')}>
              <span className="tooltiptext">ሽኮኮ</span>squirrel
            </span>{' '}
            was chased by the dog,” for example. That sentence construction
            would be helpful if the squirrel were the focus of your writing and
            not the dog.
          </p>
          <p>
            A good rule of thumb is to try to put the majority of your sentences
            in the active voice, unless you truly can’t write your sentence in
            any other way.
          </p>
        </span>
        <h3>
          How to{' '}
          <span className="tooltip" onClick={() => handleSpeech('change')}>
            <span className="tooltiptext">ለውጥ</span>change
          </span>{' '}
          a sentence in passive voice to active voice
        </h3>
        <span>
          <p>
            Here is an example of a business communication that could be
            <span
              className="tooltip"
              onClick={() => handleSpeech('strengthened')}
            >
              <span className="tooltiptext">ተጠናክሯል</span>strengthened
            </span>{' '}
            by{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('abandoning')}
            >
              <span className="tooltiptext">መተው</span>abandoning
            </span>{' '}
            the passive voice.
          </p>
          <p>
            <b>Example:</b> An error has occurred with your account, but every
            attempt was made to{' '}
            <span className="tooltip" onClick={() => handleSpeech('remedy')}>
              <span className="tooltiptext">ካሳ</span>remedy
            </span>{' '}
            it.
          </p>
          <p>
            That sentence is not incorrect, but it does sound a bit{' '}
            <span className="tooltip" onClick={() => handleSpeech('stiff')}>
              <span className="tooltiptext">ግትር</span>stiff
            </span>{' '}
            and{' '}
            <span className="tooltip" onClick={() => handleSpeech('dishonest')}>
              <span className="tooltiptext">ሐቀኝነት የጎደለው</span>dishonest
            </span>
            . It sounds less trustworthy than it could—almost{' '}
            <span className="tooltip" onClick={() => handleSpeech('evasive')}>
              <span className="tooltiptext">አሳፋሪ</span>evasive
            </span>
            . Who wants to do business with a company that avoids taking full
            responsibility by slipping into formal passive voice territory? Face
            the responsibility head on instead. Own it.
          </p>
          <p>
            <b>Example:</b> We made an error with your account, but we have made
            every attempt to remedy it.
          </p>
          <p>
            To make that sentence active rather than passive, I identified the
            subject: we. It was “our company” that was responsible.
          </p>
          <p>
            <b>Example:</b> If there are any questions, I can be reached at the
            number below.
          </p>
          <p>
            The structure of this sentence is weak because it doesn’t identify
            the subjects in either clause. Let’s{' '}
            <span className="tooltip" onClick={() => handleSpeech('unveil')}>
              <span className="tooltiptext">ግልፅ ማውጣት</span>unveil
            </span>{' '}
            them. Who might have questions to ask? The person being addressed:
            you. Who will be doing the reaching (by calling the number below)?
            It is still the communication’s{' '}
            <span className="tooltip" onClick={() => handleSpeech('recipient')}>
              <span className="tooltiptext">ተቀባይ</span>recipient
            </span>
            .
          </p>
          <p>
            <b>Example:</b> If you have any questions, call me at the number
            below.
          </p>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default Voices;
