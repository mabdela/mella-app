import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Adverbs = () => {
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
        An{' '}
        <span className="tooltip" onClick={() => handleSpeech('Adverbs')}>
          <span className="tooltiptext-text-adverb">ተዉሳከ ግስ</span>Adverbs
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/adverbs/quiz"
        >
          Quiz
        </Link>
        <span>
          <p>
            An adverb is a word that modifies (describes) a verb (he sings
            loudly), an adjective (very tall), another adverb (ended too
            quickly), or even a whole sentence (Fortunately, I had brought an
            umbrella). Adverbs often end in -ly, but some (such as fast) look
            exactly the same as their adjective counterparts. Adverb tell how,
            when, or where, or to what{' '}
            <span className="tooltip" onClick={() => handleSpeech('extent')}>
              <span className="tooltiptext">መጠን</span>
              <b>extent</b>
            </span>{' '}
            an action happens.
          </p>
        </span>
        <h4>Example :</h4>
        <ol>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('HOW')}>
              <span className="tooltiptext">እንዴት</span>
              <b>HOW</b>
            </span>
            :
            <p>
              {' '}
              The man{' '}
              <span className="tooltip" onClick={() => handleSpeech('walked')}>
                <span className="tooltiptext">ተራመደ</span>
                <b>walked</b>
              </span>{' '}
              <span className="tooltip" onClick={() => handleSpeech('quickly')}>
                <span className="tooltiptext">በፍጥነት</span>
                <b>quickly</b>
              </span>
              .
            </p>
          </li>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('WHEN')}>
              <span className="tooltiptext">መቼ</span>
              <b>WHEN</b>
            </span>
            :{' '}
            <p>
              {' '}
              It will{' '}
              <span className="tooltip" onClick={() => handleSpeech('rain')}>
                <span className="tooltiptext">ዝናብ</span>
                <b>rain</b>
              </span>{' '}
              <span className="tooltip" onClick={() => handleSpeech('soon')}>
                <span className="tooltiptext">በቅርቡ</span>
                <b>soon</b>
              </span>
              .
            </p>
          </li>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('WHERE')}>
              <span className="tooltiptext">የት</span>
              <b>WHERE</b>
            </span>
            :{' '}
            <p>
              {' '}
              We shall{' '}
              <span className="tooltip" onClick={() => handleSpeech('meet')}>
                <span className="tooltiptext">መገናኘት</span>
                <b>meet</b>{' '}
              </span>{' '}
              <span className="tooltip" onClick={() => handleSpeech('here')}>
                <span className="tooltiptext">እዚህ</span>
                <b>here</b>
              </span>{' '}
              at 2 p.m.
            </p>
          </li>
        </ol>
        <span>
          <h3>Classfiying adverbs by 'Meaning'</h3>
        </span>
        <ol>
          <li>
            <h4>Adverbs of manner</h4>
            Advers that tell{' '}
            <span className="tooltip" onClick={() => handleSpeech('how')}>
              <span className="tooltiptext">ምን</span>
              <b>'how'</b>{' '}
            </span>{' '}
            are called adverbs of manner
            <p>Example : quickly,slowly,badly, carefully.....</p>
          </li>
          <li>
            <h4>Adverbs of Frequncy</h4>
            Advers that tell{' '}
            <span className="tooltip" onClick={() => handleSpeech('how often')}>
              <span className="tooltiptext">ምን ያህል</span>
              <b>'how often'</b>{' '}
            </span>{' '}
            are called adverbs of Frequncy
            <p>Example : allways, usually, often.....</p>
          </li>
          <li>
            <h4>Adverbs of Time</h4>
            Advers that tell{' '}
            <span className="tooltip" onClick={() => handleSpeech('when')}>
              <span className="tooltiptext">መች</span>
              <b>'when'</b>{' '}
            </span>{' '}
            are called adverbs of Time
            <p>Example : now , soon , then , before , for long time....</p>
          </li>
          <li>
            <h4>Adverbs of Place</h4>
            Advers that tell{' '}
            <span className="tooltip" onClick={() => handleSpeech('where')}>
              <span className="tooltiptext">የት</span>
              <b>'where'</b>{' '}
            </span>{' '}
            are called adverbs of place
            <p>Example : around , in , out , forward.....</p>
          </li>
          <li>
            <h4>Adverbs of Degree</h4>
            Advers that tell{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('to what extenet')}
            >
              <span className="tooltiptext">እስከ ምን ድረስ</span>
              <b>'to what extenet'</b>{' '}
            </span>{' '}
            are called adverbs of degree
            <p>Example : very, quite, rather, extremly.....</p>
          </li>
        </ol>
        <h3>Placement of adverbs</h3>
        <span>
          <p>
            Place adverbs as close as possible to the words they are supposed to
            modify. Putting the adverb in the{' '}
            <span className="tooltip" onClick={() => handleSpeech('wrong')}>
              <span className="tooltiptext">ስህተት</span>
              wrong
            </span>{' '}
            spot can produce an{' '}
            <span className="tooltip" onClick={() => handleSpeech('awkward')}>
              <span className="tooltiptext">የማይመች</span>
              awkward
            </span>{' '}
            sentence at best and completely change the meaning at{' '}
            <span className="tooltip" onClick={() => handleSpeech('worst')}>
              <span className="tooltiptext">በጣም የከፋ</span>
              worst
            </span>
            . Be especially careful about the word only, which is one of the
            most often{' '}
            <span className="tooltip" onClick={() => handleSpeech('misplaced')}>
              <span className="tooltiptext">የተሳሳተ ቦታ</span>
              misplaced
            </span>{' '}
            modifiers. Consider the{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('difference')}
            >
              <span className="tooltiptext">ልዩነት</span>
              difference
            </span>{' '}
            between these two sentences:
          </p>
          <h4>Example :</h4>
          <p>
            Phillip only{' '}
            <span className="tooltip" onClick={() => handleSpeech('fed')}>
              <span className="tooltiptext">መመገብ</span>
              fed
            </span>{' '}
            the cat.
          </p>
          <p>Phillip fed only the cat.</p>
          <p>
            The first sentence means that all Phillip did was feed the cat. He
            didn’t{' '}
            <span className="tooltip" onClick={() => handleSpeech('pet')}>
              <span className="tooltiptext">የቤት እንስሳ</span>
              pet
            </span>{' '}
            the cat or pick it up or anything else. The second sentence means
            that Phillip fed the cat, but he didn’t feed the dog, the bird, or
            anyone else who might have been around.
          </p>
          <p>
            When an adverb is modifying a verb phrase, the most natural place
            for the adverb is usually the{' '}
            <span className="tooltip" onClick={() => handleSpeech('middle')}>
              <span className="tooltiptext">መካከለኛ</span>
              middle
            </span>{' '}
            of the phrase.
          </p>
          <h4 style={{ color: '#15c39a' }}>
            <span className="tooltip" onClick={() => handleSpeech('Correct')}>
              <span className="tooltiptext">ትክክል</span>
              Correct
            </span>{' '}
            :
          </h4>
          <p>
            We are{' '}
            <span className="tooltip" onClick={() => handleSpeech('quickly')}>
              <span className="tooltiptext">በፍጥነት</span>
              <b>quickly</b>
            </span>{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('approaching')}
            >
              <span className="tooltiptext">እየቀረበ ነው</span>
              approaching
            </span>{' '}
            the{' '}
            <span className="tooltip" onClick={() => handleSpeech('deadline')}>
              <span className="tooltiptext">ማለቂያ ሰአት</span>
              deadline
            </span>
            .
          </p>
          <p>
            Phillip has{' '}
            <span className="tooltip" onClick={() => handleSpeech('always')}>
              <span className="tooltiptext">ሁልጊዜ</span>
              <b>always</b>
            </span>{' '}
            loved{' '}
            <span className="tooltip" onClick={() => handleSpeech('singing')}>
              <span className="tooltiptext">መዘመር</span>
              singing
            </span>
            .
          </p>
          <p>
            I will{' '}
            <span className="tooltip" onClick={() => handleSpeech('happily')}>
              <span className="tooltiptext">በደስታ</span>
              <b>happily</b>
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('assist')}>
              <span className="tooltiptext">መርዳት</span>
              assist
            </span>{' '}
            you.
          </p>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default Adverbs;
