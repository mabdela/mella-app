import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';
// import { Link } from 'react-router-dom';

const StoryWriting = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Story Writing')}>
          <span className="tooltiptext-text">ታሪክ መጻፍ</span>Story Writing
        </span>
        ?
      </h2>
      <div className="mella-content-container">
        {/* <Link
          className="quiz-link"
          to="/dashboard/english/grammar/story_writing/quiz"
        >
          Quiz
        </Link> */}
        <h3>Definition</h3>
        <p>
          A story is basically a{' '}
          <span className="tooltip" onClick={() => handleSpeech('narrating')}>
            <span className="tooltiptext-text">መተረክ</span>narrating
          </span>{' '}
          of real or{' '}
          <span className="tooltip" onClick={() => handleSpeech('imaginary')}>
            <span className="tooltiptext-text">ሃሳባዊ</span>imaginary
          </span>{' '}
          events,
          <span className="tooltip" onClick={() => handleSpeech('involving')}>
            <span className="tooltiptext-text">መሳተፍ</span>involving
          </span>{' '}
          real or imaginary people. A story needs to be{' '}
          <span className="tooltip" onClick={() => handleSpeech('represented')}>
            <span className="tooltiptext-text">መወከል</span>represented
          </span>{' '}
          in words{' '}
          <span className="tooltip" onClick={() => handleSpeech('necessarily')}>
            <span className="tooltiptext-text">የግድ</span>necessarily
          </span>
          . Even images or moving pictures (movies) can narrate a story. A story
          is generally designed to{' '}
          <span className="tooltip" onClick={() => handleSpeech('entertain')}>
            <span className="tooltiptext-text">ማዝናናት</span>entertain
          </span>
          , and/or send a message across.
        </p>

        <span>
          <h3>Structure/Format of a Story</h3>
        </span>
        <span>
          <ul>
            <li>
              <b>Beginning : </b> The beginning or the introduction of a story
              is of essential importance. This is the part where you can{' '}
              <span className="tooltip" onClick={() => handleSpeech('hook')}>
                <span className="tooltiptext-text">መሳብ</span>hook
              </span>{' '}
              the reader and capture their attention. You must have come across
              some often used beginnings to stories like,{' '}
              <b>“Once upon a time”</b> or
              <b>“A long time ago”</b>. However, you can get more creative and
              begin your story with intrigue.
            </li>
            <br />
            <li>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Character')}
              >
                <span className="tooltiptext">ገጸ ባህሪ</span>
                <b>Character : </b>
              </span>{' '}
              The date is written on the <b>left-hand side</b> of the page. It
              is written in expanded form.
            </li>
            <br />
            <li>
              <b>TIME :</b> Introduction: Your story will depend heavily on how
              well you write your{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('characters')}
              >
                <span className="tooltiptext-text">ገጸ ባህሪ</span>characters
              </span>
              . To develop your characters, you can use dialogues as well. But
              you want to keep the{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('dialogues')}
              >
                <span className="tooltiptext-text">ንግግር</span>dialogues
              </span>
              limited in the shorter format. Also, do not include unnecessary
              secondary characters, every character of the story must have a
              purpose.
            </li>
            <br />
            <li>
              <b>Plot :</b> Here is where the{' '}
              <span className="tooltip" onClick={() => handleSpeech('actual')}>
                <span className="tooltiptext-text">ትክክለኛ</span>actual
              </span>{' '}
              narration of the story will happen. The events that occur or the
              description of the{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('situation')}
              >
                <span className="tooltiptext-text">ሁነታ</span>situation
              </span>
              will be written in the plot. A plot must always have a conflict,
              which is the focus of any story.
            </li>
            <br />
            <li>
              <b>Climax/Conclusion: :</b> And this is where the story will come
              to its logical conclusion. If there is a plot twist, this is where
              you will include it. Always end your story in an interesting
              manner. Also, it is not necessary to give your story a definite
              ending. A{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('cliffhanger')}
              >
                <span className="tooltiptext">ልብ አንጠልጣይ</span>
                cliffhanger
              </span>{' '}
              is another effective tactic.
            </li>
            <br />
          </ul>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default StoryWriting;
