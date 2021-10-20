import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const ParagraphWriting = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('The paragraph')}>
          <span className="tooltiptext-text">አንቀጽ</span>The paragraph
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <span>
          A paragraph is made of a group of{' '}
          <span className="tooltip" onClick={() => handleSpeech('related')}>
            <span className="tooltiptext-text">ተቀራራቢ</span>The related
          </span>{' '}
          sentences that support one main idea. The{' '}
          <span className="tooltip" onClick={() => handleSpeech('compostion')}>
            <span className="tooltiptext">ቅንብር</span>compostion
          </span>{' '}
          of paragraph makes an essay. A good paragraph in{' '}
          <span className="tooltip" onClick={() => handleSpeech('acadamic')}>
            <span className="tooltiptext-text">ትምህርታዊ</span>The acadamic
          </span>{' '}
          writing has the following elements.
          <br />
          <h3>Elements of paragraph:</h3>
        </span>
        <ol>
          <li>
            <h4>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Topic sentence')}
              >
                <span className="tooltiptext">መግብያ አረፍተነገር</span>Topic sentence
              </span>{' '}
            </h4>
            this sentence contains the main idea that the{' '}
            <span className="tooltip" onClick={() => handleSpeech('author')}>
              <span className="tooltiptext">ጸሃፊ</span>author
            </span>{' '}
            wants to express. It is{' '}
            <span className="tooltip" onClick={() => handleSpeech('often')}>
              <span className="tooltiptext">በአብዛኛዉ</span>often
            </span>{' '}
            located at the begging of the paragraph but sometimes it can be
            found in the <b>middle</b> or even at the <b>bottom</b> of the
            paragraph.
          </li>
          <li>
            <h4>
              <span
                className="tooltip"
                onClick={() => handleSpeech('Supporting')}
              >
                <span className="tooltiptext">አጋዥ</span>Supporting
              </span>{' '}
              sentence
            </h4>
            All sentences in a paragraph should support the topic sentence. a
            <span
              className="tooltip"
              onClick={() => handleSpeech('combnation')}
            >
              <span className="tooltiptext-text">ጥምረት</span>combnation
            </span>{' '}
            of details , examples ..so on used to{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('illustrate')}
            >
              <span className="tooltiptext-text">በምሳሌ ማስረዳት</span>illustrate
            </span>{' '}
            your idea.
          </li>
          <li>
            <h4>Logical Order</h4>
            The sentence need to be in an order that make sense . This will
            depend on the type of paragraph you are writing. for example if you
            are writing a paragraph outline the steps to get visa you may use
            first, next ...etc
          </li>
          <li>
            <h4>Concluding sentence</h4>
            if your writing comprises only one paragraph , it should have a
            concluding sentence.
          </li>
          <li>
            <h4>
              <span className="tooltip" onClick={() => handleSpeech('Unity')}>
                <span className="tooltiptext">አንድነት</span>Unity
              </span>{' '}
            </h4>
            when all the sentences in a piece of writing relates to one main
            idea , it is unity.
          </li>
        </ol>
      </div>

      <Comment />
    </div>
  );
};

export default ParagraphWriting;
