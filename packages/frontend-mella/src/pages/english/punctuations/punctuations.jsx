import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Punctuations = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('Punctuation')}>
          <span className="tooltiptext-text">ሥርዓተ ነጥብ</span>Punctuation
        </span>
      </h2>
      <div className="mella-content-container">
        Punctuation is the system of{' '}
        <span className="tooltip" onClick={() => handleSpeech('symbols')}>
          <span className="tooltiptext">ምልክቶች</span>symbols
        </span>{' '}
        that we use to{' '}
        <span className="tooltip" onClick={() => handleSpeech('separate')}>
          <span className="tooltiptext">መለየት</span>separate
        </span>{' '}
        sentences and parts of sentences, and to make their{' '}
        <span className="tooltip" onClick={() => handleSpeech('meaning')}>
          <span className="tooltiptext">ትርጉም</span>meaning
        </span>{' '}
        clear.
        <h3>Punctuation marks can be grouped into:</h3>
        <ol>
          <li>
            <h4>End marks</h4>
            <ul>
              <li>
                <h4>The full stop(.)</h4>
                <span>
                  <p>
                    A full stop, also known as a period (.) in American English,
                    is one of the most commonly used punctuation marks in the
                    English language. Analysis of texts indicates that
                    approximately half of all punctuation marks used are{' '}
                    <b>full stops</b>.
                  </p>
                  <p>The punctuation rules:</p>
                  <ul>
                    <li>
                      Mostly used at the end of a declarative sentence, or a
                      statement that is considered to be complete.
                    </li>
                    <li>
                      This punctuation mark is also used following an{' '}
                      <b>abbreviation</b>.
                    </li>
                    <li>
                      A full stop can also show the end of a group of words that
                      don’t form a typical sentence.
                    </li>
                  </ul>
                </span>
                <h4>Example: </h4>Please{' '}
                <span className="tooltip" onClick={() => handleSpeech('climb')}>
                  <span className="tooltiptext">መውጣት</span>climb
                </span>{' '}
                the{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('stairs')}
                >
                  <span className="tooltiptext">ደረጃ</span>stairs
                </span>{' '}
                carefully.
              </li>
              <li>
                <h4>The question mark(?)</h4>
                The question mark is used at the end of an{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('introgative')}
                >
                  <span className="tooltiptext">የሚጠይቅ</span>interrogative
                </span>{' '}
                sentence (a sentence that asks a question). <h4>Example: </h4>
                When was the Times Tower{' '}
                <span className="tooltip" onClick={() => handleSpeech('built')}>
                  <span className="tooltiptext">ተገንብቷል</span>built
                </span>
                ?
              </li>
              <li>
                <h4>The exclamation mark(!)</h4>
                <span>
                  <p>
                    An exclamation mark is used to show emphasis. It can be used
                    in the{' '}
                    <b>middle of a sentence or at the end of a sentence</b>.
                    When used at the end of a sentence, it also takes on the
                    role of a full stop or a period.
                  </p>
                  <p>
                    We often use an exclamation mark (!) to show strong emotion
                    or give a command.
                  </p>
                </span>
                <h4>Example: </h4>
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('Impressive')}
                >
                  <span className="tooltiptext">አስደናቂ</span>Impressive
                </span>
                !
              </li>
            </ul>
          </li>
          <li>
            <h4>The comma(,)</h4>
            <span>
              <p>
                A comma (,) is used to show the difference between two separate
                ideas or elements within a sentence. Commas have other uses as
                well, as they can be used to separate numbers, and write dates.
              </p>
              <p>The comma rules and examples:</p>
              <ol>
                <li>Add a comma when two separate sentences are combined</li>
                <p>
                  <b>Example:</b> We{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('purchased')}
                  >
                    <span className="tooltiptext">ገዝቷል</span>purchased
                  </span>{' '}
                  some cheese, and we purchased some fruit.
                </p>
                <li>
                  Use commas between words in a series. Notice that a comma does
                  not follow the last word in the series
                </li>
                <p>
                  <b>Example:</b> He was tall, dark, and handsome.
                </p>
                <li>
                  Use a comma to separate an{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('introductory')}
                  >
                    <span className="tooltiptext">መግቢያ</span>introductory
                  </span>{' '}
                  element from the rest of the sentence
                </li>
                <p>
                  <b>Example:</b> As the day came to an end, the{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('firefighters')}
                  >
                    <span className="tooltiptext">የእሳት አደጋ ተከላካዮች</span>
                    firefighters
                  </span>{' '}
                  put out the last spark.
                </p>
                <li>Use the comma to set off the words “yes” and “no”.</li>
                <p>
                  <b>Example:</b> No, thank you.
                </p>
                <li>
                  Use a comma to set off a tag question from the rest of the
                  sentence.
                </li>
                <p>
                  <b>Example:</b> She is your sister, isn’t she?
                </p>
                <li>
                  Use a comma to{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('indicate')}
                  >
                    <span className="tooltiptext">አመልክት</span>indicate
                  </span>{' '}
                  a direct address.
                </li>
                <p>
                  <b>Example:</b> Is that you, Mary?
                </p>
                <li>Add a comma when a participle phrase clause is used.</li>
                <p>
                  <b>Example:</b> Walking slowly, I could see the beautiful
                  flowers.
                </p>
                <li>Use a comma to separate parts of the date.</li>
                <p>
                  <b>Example:</b> Tuesday, May 2, 2016, was when I graduated.
                </p>
              </ol>
            </span>
            <h4>Example: </h4>John, Jim, Jack walk to school{' '}
            <span className="tooltip" onClick={() => handleSpeech('everyday')}>
              <span className="tooltiptext">በየቀኑ</span>everyday
            </span>
            .
          </li>
          <li>
            <h4>The semicolon(;)</h4>
            <span>
              <p>
                {' '}
                A semicolon (;) is used to{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('separate')}
                >
                  <span className="tooltiptext">መለየት</span>separate
                </span>{' '}
                two independent clauses while still demonstrating that a close
                relationship exists between them. The semicolon does a better
                job of showing the connection between two statements than a full
                stop would.
              </p>
            </span>
            <h4>Example: </h4>Mountain climbing is{' '}
            <span className="tooltip" onClick={() => handleSpeech('exciting')}>
              <span className="tooltiptext">አስደሳች</span>exciting
            </span>
            ; it can also be{' '}
            <span className="tooltip" onClick={() => handleSpeech('dangerous')}>
              <span className="tooltiptext">አደገኛ</span>dangerous
            </span>
            .
          </li>
          <li>
            <h4>The colon(:)</h4>
            <span>
              <p>
                A colon (:) is a fairly common punctuation mark with a varied
                number of uses. It can be used to introduce a quotation, an
                example, a series, or even an explanation. Secondly, it can be
                used to separate two independent clauses. Finally, a colon can
                be used to show emphasis.
              </p>
            </span>
            <h4>Example: </h4>9:00 A.M. 6:00 P.M. Exodus 2:1-3
          </li>
          <li>
            <h4>The hyphen(-)</h4>
            <span>
              <p>
                A hyphen (–) is a punctuation mark with three main uses. Many
                people{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('confuse')}
                >
                  <span className="tooltiptext">ግራ መጋባት</span>confuse
                </span>{' '}
                this punctuation mark with the dash, but the two are quite
                different. The hyphen can be used in compound words, to link
                words to prefixes, and also as a way to show word breaks.
              </p>
              <p>The hyphen rules and examples:</p>
              <ol>
                <li>
                  Use a hyphen to join two or more words together into a
                  compound term. Do not separate the words with spaces.
                </li>
                <p>Example: My eight-year-old boy loves reading.</p>
                <li>
                  To{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('link')}
                  >
                    <span className="tooltiptext">አገናኝ</span>link
                  </span>{' '}
                  prefixes to words.
                </li>
                <p>
                  For example: These things happened before the{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('pre-enlightenment')}
                  >
                    <span className="tooltiptext">ቅድመ-ብርሃን</span>
                    pre-enlightenment
                  </span>{' '}
                  era.
                </p>
                <li>To indicate word breaks</li>
                <p>
                  For example: Unlike what some people might think, the
                  twentieth-century was very different from other preceding time
                  periods.
                </p>
              </ol>
            </span>
            <h4>Example: </h4>When walking along the streets of Naivasha Town,
            he met his friend, Waina - ina.
          </li>
          <li>
            <h4>The apostoph(')</h4>
            <span>
              <p>
                An apostrophe (‘) is used to show that certain letters have been{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('omitted')}
                >
                  <span className="tooltiptext">ተትቷል</span>omitted
                </span>{' '}
                from a word. The punctuation symbol can also be used to show the
                possessive form of a noun, in addition to indicating the plural
                form of lowercase letters.
              </p>
              <p>The apostrophe rules:</p>
              <ol>
                <li>
                  Use an apostrophe in{' '}
                  <span
                    className="tooltip"
                    onClick={() => handleSpeech('contractions')}
                  >
                    <span className="tooltiptext">መጨናነቅ</span>contractions
                  </span>{' '}
                </li>
                <p>Example: He is = He’s</p>
                <li>Use an apostrophe to indicate possession</li>
                <p>Example: He joined Charles’s army in 1642.</p>
              </ol>
            </span>
            <h4>Example: </h4>the baby’s cot, James’s car, Joseph’s radio.
          </li>
          <li>
            <h4>The Quotation marks(" ")</h4>Quotation marks are{' '}
            <span className="tooltip" onClick={() => handleSpeech('left out')}>
              <span className="tooltiptext">ተተወ</span>left out
            </span>{' '}
            when writing a sentence in direct speech.
            <h4>Example: </h4>Hemedi{' '}
            <span className="tooltip" onClick={() => handleSpeech('announced')}>
              <span className="tooltiptext">አስታወቀ</span>announced
            </span>
            , “My aunt works in a biscuit factory”
          </li>
        </ol>
      </div>
      <Comment />
    </div>
  );
};

export default Punctuations;
