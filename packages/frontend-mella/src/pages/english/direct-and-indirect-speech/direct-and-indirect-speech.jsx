import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const DirectAndIndirectSpeech = () => {
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
        <span
          className="tooltip"
          onClick={() => handleSpeech('DIRECT AND INDIRECT SPEECH')}
        >
          <span className="tooltiptext-text">ቀጥተኛ እና ቀጥተኛ ያልሆነ ንግግር</span>
          DIRECTAND INDIRECT SPEECH
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/direct_and_indirect_speech/quiz"
        >
          Quiz
        </Link>
        <ul>
          <li>
            <h3>DIRECT SPEECH</h3>
            <span>
              Direct speech is used to give a speaker’s exact words. It is also
              referred to as direct quotation. Direct speech is always{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('enclosed')}
              >
                <span className="tooltiptext">መጠቃለል</span>enclosed
              </span>{' '}
              within <b>quotation marks(“ ”)</b>.<h4>Examples:</h4>Hemedi{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('announced')}
              >
                <span className="tooltiptext">አስታወቀ</span>announced
              </span>
              , <b>“</b>My{' '}
              <span className="tooltip" onClick={() => handleSpeech('aunt')}>
                <span className="tooltiptext">አክስት</span>aunt
              </span>{' '}
              works in a biscuit{' '}
              <span className="tooltip" onClick={() => handleSpeech('factory')}>
                <span className="tooltiptext">ፋብሪካ</span>factory
              </span>{' '}
              <b>”</b>.
              <br />
              <b>“</b>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Creating jobs')}
              >
                <span className="tooltiptext">ሥራዎችን መፍጠር</span>Creating jobs
              </span>{' '}
              will be my first{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('priority')}
              >
                <span className="tooltiptext">ቅድሚያ</span>priority
              </span>{' '}
              <b>”</b> the governor said.
            </span>
          </li>
          <li>
            <h3>INDIRECT SPEECH</h3>
            <span>
              Indirect speech is used to refer to a person’s words without
              quoting him or her exactly.
              <br />
              It is also referred to as <b>indirect quotation</b> or{' '}
              <b>reported speech</b>.
              <br />
              The original spoken words are not{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('repeated')}
              >
                <span className="tooltiptext">ተደጋገመ</span>repeated
              </span>
              . The exact meaning is given without{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('repeating')}
              >
                <span className="tooltiptext">መድገም</span>repeating
              </span>{' '}
              the speaker’s words.
              <h4>Examples:</h4>
              <b>Direct speech</b>: The governor said, <b>“</b>Creating new jobs
              will be my first priority<b>”</b>
              <br />
              <b>Indirect speech</b>:{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('The governor')}
              >
                <span className="tooltiptext">ገዢው</span>The governor
              </span>{' '}
              said that creating new jobs would be his first priority.
            </span>
          </li>
        </ul>
      </div>
      <Comment />
    </div>
  );
};

export default DirectAndIndirectSpeech;
