import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const MessageWriting = () => {
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
          onClick={() => handleSpeech('Message writing')}
        >
          <span className="tooltiptext-text">መልእክት መጻፍ</span>Message writing
        </span>
        ?
      </h2>
      <div className="mella-content-container">
        <h3>Definition</h3>
        <p>
          A message is a short{' '}
          <span className="tooltip" onClick={() => handleSpeech('piece')}>
            <span className="tooltiptext-text">ቅንጣት</span>piece
          </span>{' '}
          of information that you{' '}
          <span className="tooltip" onClick={() => handleSpeech('give')}>
            <span className="tooltiptext-text">መስጠት</span>give
          </span>{' '}
          to a person when you cannot speak to him{' '}
          <span className="tooltip" onClick={() => handleSpeech('directly')}>
            <span className="tooltiptext-text">በቀጥታ</span>directly
          </span>
          .
        </p>

        <span>
          <h3>Message Writing Format</h3>
        </span>
        <span>
          <ul>
            <li>
              <b>Heading : </b>Message writing{' '}
              <span className="tooltip" onClick={() => handleSpeech('begins')}>
                <span className="tooltiptext-text">መጀመር</span>begins
              </span>{' '}
              by writing the word <b>“Message”</b> in bold and capitals. It is
              written in the{' '}
              <span className="tooltip" onClick={() => handleSpeech('middle')}>
                <span className="tooltiptext-text">መሃል</span>middle
              </span>
              of the line. This is done in order to{' '}
              <span className="tooltip" onClick={() => handleSpeech('catch')}>
                <span className="tooltiptext-text">ያዘ</span>catch
              </span>{' '}
              the attention of the person for whom the message is{' '}
              <span className="tooltip" onClick={() => handleSpeech('drafted')}>
                <span className="tooltiptext-text">አረቀቀ</span>drafted
              </span>
              .
            </li>
            <br />
            <li>
              <b>DATE : </b> The date is written on the <b>left-hand side</b> of
              the page. It is written in{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('expanded')}
              >
                <span className="tooltiptext">ሰፊ</span>
                expanded
              </span>{' '}
              form.
            </li>
            <br />
            <li>
              <b>TIME : </b>Time can be written both on the{' '}
              <b>left and right</b> sides of the message. However, it is
              <span
                className="tooltip"
                onClick={() => handleSpeech('preferable')}
              >
                <span className="tooltiptext-text">ተፈላጊ</span>preferable
              </span>{' '}
              for you to mention it on the <b>right side</b> in order to show a
              wise usage of space.
            </li>
            <br />
            <li>
              <b>
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('SALUTATIONS')}
                >
                  <span className="tooltiptext-text">ሰላምታ</span>SALUTATIONS
                </span>{' '}
                :{' '}
              </b>
              Before writing the main content (body) of the message, it is
              important to address the reader. It helps in avoiding{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('ambiguity')}
              >
                <span className="tooltiptext">አሻሚነት</span>
                ambiguity
              </span>{' '}
              and appears to be polite.
            </li>
            <br />
            <li>
              <b>BODY : </b>It is the main content of the message where in you
              <span className="tooltip" onClick={() => handleSpeech('provide')}>
                <span className="tooltiptext-text">አቀረበ</span>provide
              </span>{' '}
              all the information that needs to be{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('conveyed')}
              >
                <span className="tooltiptext">ማስተላለፍ</span>
                conveyed
              </span>{' '}
              to the person you are unable to contact. It is important to stick
              only to{' '}
              <span className="tooltip" onClick={() => handleSpeech('vital')}>
                <span className="tooltiptext">ወሳኝ</span>
                vital
              </span>{' '}
              information and keep the body of the message short and{' '}
              <span className="tooltip" onClick={() => handleSpeech('crisp')}>
                <span className="tooltiptext">ጥርት ያለ</span>
                crisp
              </span>{' '}
              . Avoid using long sentences.
            </li>
            <br />
            <li>
              <b>SENDER : </b>Once you are done with the body of the message,
              mention your name (or the one given in the question) on the{' '}
              <b>left-hand side</b> of the page. This helps the reader to
              identify the sender of the message.
            </li>
          </ul>
          <h3>Example of message writing</h3>

          <p>
            <b>MESSAGE</b>
            <br />
            <b>27 APRIL 2018</b>
            <br />
            Dear brother
            <br />
            Aweke called in your absence. He wants you to bring his practical
            book to school today. He said is urgent as he needs it.
            <br />
            Kaleb
          </p>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default MessageWriting;
