import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Capitalization = () => {
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
        <span
          className="tooltip"
          onClick={() => handleSpeech('Capitalization')}
        >
          <span className="tooltiptext-text">ካፒታላይዜሽን</span>Capitalization
        </span>
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/capitalization/quiz"
        >
          Quiz
        </Link>
        Capitalization is the writing of a word with its{' '}
        <span className="tooltip" onClick={() => handleSpeech('first letter')}>
          <span className="tooltiptext">የመጀመሪያው ፊደል</span>
          first letter
        </span>{' '}
        as an upper case and the{' '}
        <span
          className="tooltip"
          onClick={() => handleSpeech('remaining letters')}
        >
          <span className="tooltiptext">ቀሪ ፊደሎች</span>
          remaining letters
        </span>{' '}
        in lower case.
        <h3>
          The following are the{' '}
          <span className="tooltip" onClick={() => handleSpeech('cases')}>
            <span className="tooltiptext">ጉዳዮች</span>
            cases
          </span>{' '}
          when capitalization is{' '}
          <span className="tooltip" onClick={() => handleSpeech('used')}>
            <span className="tooltiptext">ጥቅም ላይ ውሏል</span>
            used
          </span>{' '}
          :
        </h3>
        <ol>
          <li>
            <span
              className="tooltip"
              onClick={() => handleSpeech('Abbreviations')}
            >
              <span className="tooltiptext">ምህፃረ ቃላት</span>
              <h4>Abbreviations</h4>
            </span>{' '}
            Abbreviations{' '}
            <span className="tooltip" onClick={() => handleSpeech('begin')}>
              <span className="tooltiptext">የሚጀምረው</span>
              begin
            </span>{' '}
            with a capital letter.
            <br />
            Example : St.james
          </li>
          <li>
            <h4>
              ) Words used as{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('addresses')}
              >
                <span className="tooltiptext">አድራሻዎች</span>
                addresses
              </span>
            </h4>
            Example : Rd. (Road)
          </li>
          <li>
            <h4>The first word of every sentence</h4>
            Abbreviations begin with a capital letter.
            <br />
            Example : What should I do next?
          </li>
          <li>
            <h4>
              {' '}
              <span className="tooltip" onClick={() => handleSpeech('Names')}>
                <span className="tooltiptext">ስሞች</span>
                Names
              </span>
              of{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('organizations')}
              >
                <span className="tooltiptext">ድርጅቶች</span>
                organizations
              </span>{' '}
              and{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('institutions')}
              >
                <span className="tooltiptext">ተቋማት</span>
                institutions
              </span>
              .{' '}
            </h4>
            Abbreviations begin with a capital letter.
            <br />
            Example :: There will be a{' '}
            <span className="tooltip" onClick={() => handleSpeech('beauty')}>
              <span className="tooltiptext">ውበት</span>
              beauty
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('contest')}>
              <span className="tooltiptext">ውድድር</span>
              contest
            </span>{' '}
            at school
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Capitalization;
