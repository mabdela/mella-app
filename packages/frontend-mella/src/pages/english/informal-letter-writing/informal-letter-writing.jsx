import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const InformalLetterWriting = () => {
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
        <span
          className="tooltip"
          onClick={() => handleSpeech('Informal letter')}
        >
          <span className="tooltiptext-text">መደበኛ ያልሆነ ደብዳቤ</span>Informal
          letter
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <span>
          These are letters to friends and relations, or people you know well.
          <br />
          <h4>Structure:</h4>
        </span>
        <ul>
          <li>
            The sender's address should always appear on the{' '}
            <b>top right hand</b>
            corner of the page.
          </li>
          <li>
            Include <b>telephone number</b> and <b>email</b> if available
          </li>
          <li>
            <span className="tooltip" onClick={() => handleSpeech('Greeting')}>
              <span className="tooltiptext">ሰላምታ</span>Greeting
            </span>{' '}
            — There are several variations that can be used depending on how
            well you know the person: <b>Dear Mary,</b> <b>Hi Mary,</b>{' '}
            <b>Greetings</b>
          </li>
          <li>
            Complimentary close — <b>short comment,</b> <b>for example Love,</b>{' '}
            <b>Lots of love,</b>
            <b>With thanks,</b> <b>See you soon</b>
          </li>
        </ul>
        <p>Example</p>
        <div style={{ border: '2px solid black', padding: '15px' }}>
          <p style={{ textAlign: 'right' }}>22 bole Road AA</p>
          <p style={{ textAlign: 'right' }}>Dec 22 2021</p>

          <p>Dear Ahmed </p>
          <p>
            what's up? thanks for visting during winter break it was awsome to
            huge out and explore the new city
          </p>
          <p style={{ textAlign: 'right' }}>talk to you soon </p>
          <p style={{ textAlign: 'right' }}>Tesfaye</p>
        </div>
      </div>

      <Comment />
    </div>
  );
};

export default InformalLetterWriting;
