import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const EssayWriting = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('An essay')}>
          <span className="tooltiptext-text">ድርሰት</span>An essay{' '}
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/essay_writing/quiz"
        >
          Quiz
        </Link>
        <span>
          Essays are compositions of paragraphs. lets see the essay structure:
          <br />
          <h3>Essay structre :</h3>
        </span>
        <ol>
          <li>
            <h4>Introduction</h4>
            Here you catch the{' '}
            <span className="tooltip" onClick={() => handleSpeech('attention')}>
              <span className="tooltiptext">ትኩረት</span>attention
            </span>{' '}
            of the reader and introduce your topic
          </li>
          <li>
            <h4>Body</h4>
            It can have as many paragraph as you want. But the paragraphs must
            be type of suporting paragraghs.
          </li>
          <li>
            <h4>conclusions</h4>
            The conclusions siginals the end of your essay. There are different
            ways a conclution, depending on whether you are writing.
          </li>
        </ol>
        <h3>Example of essay</h3>
        <span>
          <h4>Thomas Alva Edison</h4>
          Thomas Alva Edison was born in Milan, the U.S.A. He was the son of a
          man who had tried his hand at every kind of{' '}
          <span className="tooltip" onClick={() => handleSpeech('occupation')}>
            <span className="tooltiptext">ሙያ</span>occupation
          </span>{' '}
          without{' '}
          <span className="tooltip" onClick={() => handleSpeech('succeeding')}>
            <span className="tooltiptext">መሳካት</span>succeeding
          </span>{' '}
          in any. As a boy, Edison was weak in health and he used to ask a lot
          of questions. This{' '}
          <span className="tooltip" onClick={() => handleSpeech('attitude')}>
            <span className="tooltiptext">አመለካከት</span>attitude
          </span>{' '}
          got him{' '}
          <span className="tooltip" onClick={() => handleSpeech('expelled')}>
            <span className="tooltiptext">መባረር</span>expelled
          </span>{' '}
          from school with the remark from his teacher that his brain was{' '}
          <span className="tooltip" onClick={() => handleSpeech('addled')}>
            <span className="tooltiptext">ጨመረ</span>“addled”
          </span>{' '}
          . There after he was{' '}
          <span className="tooltip" onClick={() => handleSpeech('taught')}>
            <span className="tooltiptext">አስተማረ</span>taught
          </span>{' '}
          by his mother, who was a school teacher.
          <br />
          <br />
          At the age of 10, Edison set up his first laboratory in the basement
          of his home. When he needed more money to buy supplies for his
          experiments he went to sell newspapers and sweets in the trains.
          <br />
          <br />
          Edison met with an accident which made him{' '}
          <span className="tooltip" onClick={() => handleSpeech('deaf')}>
            <span className="tooltiptext">መስማት የተሳነው</span>deaf
          </span>
          . He got down from the train at a station to sell papers and did not
          notice the train had started off again. He ran after it, and a railway
          man leaned out and tried to pull him in. the boy had his hands full of
          newspapers and the only thing the man could do was to drag him in by
          the ears. A little later, Edison noticed that his hearing was getting
          weaker. This was the beginning of his lifelong deafness.
          <br />
          <br />
          In the last decade of his life, Edison became{' '}
          <span className="tooltip" onClick={() => handleSpeech('famous')}>
            <span className="tooltiptext">ዝነኛ</span>famous
          </span>{' '}
          as a wizard of the technical age. He remained busy in inventing new
          things until his last breath in October 1931.
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default EssayWriting;
