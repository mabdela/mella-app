import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const FormalLetterWriting = () => {
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
          onClick={() => handleSpeech('Formal letters')}
        >
          <span className="tooltiptext-text">መደበኛ ደብዳቤ</span>Formal letters
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <span>
          These are sometimes known as business letters.A formal letter is
          written to a certain business organization :
          <ul>
            <li>
              to run{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('business')}
              >
                <span className="tooltiptext-text">ስራ</span>business
              </span>{' '}
              (business letter)
            </li>
            <li>
              to{' '}
              <span className="tooltip" onClick={() => handleSpeech('request')}>
                <span className="tooltiptext-text">መጠይቅ</span>request
              </span>{' '}
              something (letter of request)
            </li>
            <li>
              to{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('complain')}
              >
                <span className="tooltiptext-text">ቅርታ</span>complain
              </span>{' '}
              (complain letter)
            </li>
            <li>
              to{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('seek a job')}
              >
                <span className="tooltiptext-text">ስራ ፍለጋ</span>seek a job
              </span>{' '}
              (job application letter)
            </li>
          </ul>
          <br />
          <h4>8 main parts (Structure) :</h4>
        </span>
        <ol>
          <li>
            The{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('senders address')}
            >
              <span className="tooltiptext">የላኪው አድራሻ</span>senders address
            </span>{' '}
            is put at the <b>top right</b> hand side
          </li>
          <li>
            Include <b>telephone number</b> and <b>email</b> if available
          </li>
          <li>
            The address of the person receiving the letter goes on the{' '}
            <b>left hand side</b> below the sender's address
          </li>
          <li>
            The <b>Date</b>
          </li>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('Greeting')}>
              <span className="tooltiptext">ሰላምታ</span>Greeting
            </span>{' '}
            — <b>Dear</b>, <b>Sir</b> or <b>Madam</b>. You can use the titles{' '}
            <b>Miss.</b> <b>Mrs.</b> or <b>Mr.</b> if you know the name of the
            person to whom you are writing
          </li>
          <li>
            The <b>message</b> (body)
          </li>
          <li>
            Complimentary close — <b>Yours faithfully</b> or{' '}
            <b>Yours sincerely</b>
          </li>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('Signature')}>
              <span className="tooltiptext">ፊርማ</span>Signature
            </span>
          </li>
        </ol>
        <li>
          Write name in block letters (this is to ensure that the person
          receiving the letter knows exactly who has sent it. Signatures may not
          be very clear)
        </li>
        <p>Example</p>
        <div style={{ border: '2px solid black', padding: '15px' }}>
          <p style={{ textAlign: 'right' }}>22 bole Road AA</p>
          <p style={{ textAlign: 'right' }}>Dec 22 2021</p>
          <p>chamber of commerce</p>
          <p>p.o.Box 111 hawasa</p>
          <p>Dear sir </p>
          <p>
            my family is planning to visit hawassa. we have been told that
            hawassa lake is interesting community well worth visiting .would you
            please send some information about the attraction in hawassa?
          </p>
          <p style={{ textAlign: 'right' }}>sincerely</p>
          <p style={{ textAlign: 'right' }}>Abinet Takele</p>
        </div>
      </div>
      <Comment />
    </div>
  );
};

export default FormalLetterWriting;
