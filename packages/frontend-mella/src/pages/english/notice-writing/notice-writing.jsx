import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const NoticeWriting = () => {
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
          onClick={() => handleSpeech('Notice Writing')}
        >
          <span className="tooltiptext-text">ማስታወሻ መጻፍ</span>Notice Writing
        </span>
        ?
      </h2>
      <div className="mella-content-container">
        <h3>Definition</h3>
        <p>
          Notices are a means of formal communication{' '}
          <span className="tooltip" onClick={() => handleSpeech('targetted')}>
            <span className="tooltiptext">ያለመ</span>targetted
          </span>{' '}
          at a particular person or a group of persons. It is like a news item
          informing such person or persons of some important event. This can be
          an{' '}
          <span className="tooltip" onClick={() => handleSpeech('invitation')}>
            <span className="tooltiptext">ግብዣ</span>invitation
          </span>
          to a{' '}
          <span className="tooltip" onClick={() => handleSpeech('meeting')}>
            <span className="tooltiptext">ስብሰባ</span>meeting
          </span>
          , an{' '}
          <span
            className="tooltip"
            onClick={() => handleSpeech('announcement')}
          >
            <span className="tooltiptext">ማስታወቂያ</span>announcement
          </span>{' '}
          of any{' '}
          <span className="tooltip" onClick={() => handleSpeech('event')}>
            <span className="tooltiptext">ክስተት</span>event
          </span>{' '}
          , to issue certain{' '}
          <span
            className="tooltip"
            onClick={() => handleSpeech('instructions')}
          >
            <span className="tooltiptext">መመሪያዎች</span>instructions
          </span>{' '}
          , make{' '}
          <span className="tooltip" onClick={() => handleSpeech('appeals')}>
            <span className="tooltiptext">ይግባኝ</span>appeals
          </span>{' '}
          etc.
        </p>

        <span>
          <h3>
            Let us look at the most used format of{' '}
            <span className="tooltip" onClick={() => handleSpeech('notices')}>
              <span className="tooltiptext">ማስታወቂያዎች</span>notices
            </span>{' '}
            .
          </h3>
        </span>
        <span>
          <ol>
            <li>
              <b>Name of Issuing Organization/Authority : </b> Right at the{' '}
              <b>very top</b>, you print the name of the person or company that
              is{' '}
              <span className="tooltip" onClick={() => handleSpeech('issuing')}>
                <span className="tooltiptext">የታለመ</span>issuing
              </span>{' '}
              the said notices. This will help the reader identify the notices
              as important or unimportant to him.
            </li>
            <br />
            <li>
              <b>Title : </b> When writing notices we mention a title{' '}
              <b>“NOTICE”</b> at the top. This helps draw attention to the
              document. Notices are generally posted at a <b>public place</b> or
              published in <b>newspapers</b>. It is important that they do not
              get lost in a sea of information. So a bold title clearly
              mentioned helps draw the attention.
            </li>
            <br />
            <li>
              <b>Date : </b> After the tile to the left-hand side we print the
              date on which the notices have been published. Since this is a
              formal document date is an important aspect of it since these
              documents stay on record.
            </li>
            <br />
            <li>
              <b>
                <span className="tooltip" onClick={() => handleSpeech('Plot')}>
                  <span className="tooltiptext">ሴራ</span>Plot
                </span>{' '}
                :{' '}
              </b>{' '}
              Here is where the actual narration of the story will happen. The
              events that occur or the description of the situation will be
              written in the plot. A plot must always have a{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('conflict')}
              >
                <span className="tooltiptext">ግጭት</span>conflict
              </span>{' '}
              , which is the focus of any story.
            </li>
            <br />
            <li>
              <b>Heading: :</b> Then we move on to an appropriate heading to the
              notices. This heading should make{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('abundantly')}
              >
                <span className="tooltiptext">በብዛት</span>abundantly
              </span>{' '}
              clear the purpose of the notices.
            </li>
            <br />
            <li>
              <b>Body: :</b> After the heading, we write the brief and to the
              point body of the notice. The main content of the notice features
              in the body.
            </li>
            <br />
            <li>
              <b>Writer’s Name :</b> At the end of the notices we write the name
              and{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('designation')}
              >
                <span className="tooltiptext">ስያሜ</span>designation
              </span>{' '}
              of the notice-writer. The notices have to also be signed by the
              same person to lend it authority and validity.
            </li>
          </ol>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default NoticeWriting;
