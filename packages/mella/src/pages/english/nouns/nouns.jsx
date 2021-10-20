import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';

const Nouns = () => {
  const dispatch = useDispatch();
  const handleSpeech = message => {
    TextToSpeech(message);
  };

  useEffect(() => {
    dispatch(removeQuiz());
  }, [dispatch]);

  return (
    <div className="mella-content-wrapper">
      <h2>
        What is a{' '}
        <span className="tooltip" onClick={() => handleSpeech('Noun')}>
          <span className="tooltiptext-text">ስሞች</span>Noun
        </span>
        ?
      </h2>
      <div className="mella-content-container">
        <div>
          <div>
            <Link
              className="quiz-link"
              to="/dashboard/english/grammar/nouns/quiz"
            >
              Quiz
            </Link>
          </div>
        </div>
        <article>
          <p>
            Words that refer to a{' '}
            <span className="tooltip" onClick={() => handleSpeech('person')}>
              <span className="tooltiptext">ሰው</span>
              <b>
                <i>person</i>
              </b>
            </span>
            , an{' '}
            <span className="tooltip" onClick={() => handleSpeech('animal')}>
              <span className="tooltiptext">እንስሳ</span>
              <b>
                <i>animal</i>
              </b>
            </span>
            , a{' '}
            <span className="tooltip" onClick={() => handleSpeech('place')}>
              <span className="tooltiptext">ቦታ</span>
              <b>
                <i>place</i>
              </b>
            </span>
            , a{' '}
            <span className="tooltip" onClick={() => handleSpeech('thing')}>
              <span className="tooltiptext">ነገር</span>
              <b>
                <i>thing</i>
              </b>
            </span>
            , an{' '}
            <span className="tooltip" onClick={() => handleSpeech('idea')}>
              <span className="tooltiptext">ሀሳብ</span>
              <b>
                <i>idea</i>
              </b>
            </span>
            , a{' '}
            <span className="tooltip" onClick={() => handleSpeech('feeling')}>
              <span className="tooltiptext">ስሜት</span>
              <b>
                <i>feeling</i>
              </b>
            </span>{' '}
            or{' '}
            <span className="tooltip" onClick={() => handleSpeech('state')}>
              <span className="tooltiptext">ግዛት</span>
              <b>
                <i>state</i>
              </b>
            </span>{' '}
            are called{' '}
            <span className="tooltip" onClick={() => handleSpeech('nouns')}>
              <span className="tooltiptext">ስሞች</span>
              <b>
                <i>nouns</i>
              </b>
            </span>
            .
          </p>
        </article>

        <article>
          <h4>Examples</h4>
          <ul>
            <li>
              <b>Common Nouns</b>-
              <span
                className="tooltip"
                onClick={() => handleSpeech('Aircraft')}
              >
                <span className="tooltiptext">አውሮፕላን</span>
                <b>
                  <i>Aircraft</i>
                </b>
              </span>
              ,{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('Building')}
              >
                <span className="tooltiptext">መገንባት</span>
                <b>
                  <i>Building</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Rose')}>
                <span className="tooltiptext">ሮዝ</span>
                <b>
                  <i>Rose</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Bottle')}>
                <span className="tooltiptext">ጠርሙስ</span>
                <b>
                  <i>Bottle</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Painter')}>
                <span className="tooltiptext">ሠዓሊ</span>
                <b>
                  <i>Painter</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Student')}>
                <span className="tooltiptext">ተማሪ</span>
                <b>
                  <i>Student</i>
                </b>
              </span>
              .
            </li>
            <li>
              <b>Proper Nouns</b>-
              <span className="tooltip" onClick={() => handleSpeech('English')}>
                <span className="tooltiptext">እንግሊዝኛ</span>
                <b>
                  <i>English</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Monday')}>
                <span className="tooltiptext">ሰኞ</span>
                <b>
                  <i>Monday</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Mumbai')}>
                <span className="tooltiptext">ሙምባይ</span>
                <b>
                  <i>Mumbai</i>
                </b>
              </span>
              ,{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('Godavari')}
              >
                <span className="tooltiptext">የሰው ስም</span>
                <b>
                  <i>Godavari</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Mahesh')}>
                <span className="tooltiptext">የሰው ስም</span>
                <b>
                  <i>Mahesh</i>
                </b>
              </span>
              .
            </li>
            <li>
              <b>Abstract Nouns</b>-
              <span className="tooltip" onClick={() => handleSpeech('Wealth')}>
                <span className="tooltiptext">ሀብት</span>
                <b>
                  <i>Wealth</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Bravery')}>
                <span className="tooltiptext">ጀግንነት</span>
                <b>
                  <i>Bravery</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Voice')}>
                <span className="tooltiptext">ድምጽ</span>
                <b>
                  <i>Voice</i>
                </b>
              </span>
              ,{' '}
              <span
                className="tooltip"
                onClick={() => handleSpeech('Kindness')}
              >
                <span className="tooltiptext">ደግነት</span>
                <b>
                  <i>Kindness</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Truth')}>
                <span className="tooltiptext">እውነት</span>
                <b>
                  <i>Truth</i>
                </b>
              </span>
              .
            </li>
            <li>
              <b>Collective Nouns</b>-
              <span
                className="tooltip"
                onClick={() => handleSpeech('Audience')}
              >
                <span className="tooltiptext">ታዳሚዎች</span>
                <b>
                  <i>Audience</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Family')}>
                <span className="tooltiptext">ቤተሰብ</span>
                <b>
                  <i>Family</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Bunch')}>
                <span className="tooltiptext">ጥቅል</span>
                <b>
                  <i>Bunch</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Flock')}>
                <span className="tooltiptext">መንጋ</span>
                <b>
                  <i>Flock</i>
                </b>
              </span>
              ,{' '}
              <span className="tooltip" onClick={() => handleSpeech('Bouquet')}>
                <span className="tooltiptext">እቅፍ አበባ</span>
                <b>
                  <i>Bouquet</i>
                </b>
              </span>
              .
            </li>
          </ul>
        </article>
        <article>
          <h3>Types of Nouns</h3>
          <p>
            Nouns are an important part of speech in English, probably second
            only to verbs. It is difficult to say much without using a noun.{' '}
            <br />
            <br />
            There are several different types of English nouns. It is often
            useful to recognize what type a noun is because different types
            sometimes have different rules. This helps you to use them
            correctly.
          </p>
          <h3>Common Nouns and Proper Nouns</h3>
          <h4>Common Nouns</h4>
          <span>
            Most nouns are common nouns. Common nouns refer to people, places
            and things in general like chair or dog. Any noun that is not a name
            is a common noun.
            <br />
            <br />
            <span>Examples: teacher, car, music, danger, receipt</span>
            <ul>
              <li>
                Have you seen my <b>dog</b>?
              </li>
              <li>
                The <b>books</b> are on your <b>desk</b>.
              </li>
              <li>
                ...the <b>pursuit</b> of <b>happiness</b>.
              </li>
            </ul>
          </span>

          <h4>Proper Nouns</h4>
          <span>
            <p>
              Names of people, places or organizations are proper nouns. Your
              name is a proper noun. London is a proper noun. United Nations is
              a proper noun.
            </p>
            <p>Rule: Proper nouns always start with a capital letter.</p>
            <p>
              Examples: Jane, Thailand, Sunday, James Bond, Einstein, Superman,
              Game of Thrones, Shakespeare
            </p>
            <ul>
              <li>
                Let me introduce you to <b>Mary</b>.
              </li>
              <li>
                The capital of <b>Italy</b> is <b>Rome</b>.
              </li>
              <li>
                He is the chairman of the{' '}
                <b>British Broadcasting Corporation</b>.
              </li>
              <li>
                I was born in <b>November</b>.
              </li>
            </ul>

            <p>
              Note: Adjectives that we make from proper nouns also usually start
              with a capital letter, for example Shakespearian, Orwellian.
            </p>
          </span>

          <h3>Concrete Nouns and Abstract Nouns</h3>
          <h4>Concrete Nouns</h4>
          <span>
            <p>Concrete nouns are physical things that you can touch.</p>
            <p>Examples: man, rice, head, car, furniture, mobile phone</p>
            <ul>
              <li>
                How many <b>stars</b> are there in the <b>universe</b>?
              </li>
              <li>
                Have you met <b>James Bond</b>?
              </li>
              <li>
                Pour the <b>water</b> down the <b>drain</b>.
              </li>
            </ul>
          </span>
          <h4>Abstract Nouns</h4>
          <span>
            <p>
              Abstract nouns are the opposite of concrete nouns. They are things
              that you cannot touch. Abstract nouns are ideas, concepts and
              feelings.
            </p>
            <p>Examples: happiness, courage, danger, truth</p>
            <ul>
              <li>
                He has great <b>strength</b>.
              </li>
              <li>
                Who killed President Kennedy is a real <b>mystery</b>.
              </li>
              <li>
                Sometimes it takes <b>courage</b> to tell the <b>truth</b>.
              </li>
              <li>
                Their lives were full of <b>sadness</b>.
              </li>
            </ul>
          </span>

          <h3>Countable Nouns and Uncountable Nouns</h3>
          <h4>Countable Nouns (count nouns)</h4>
          <span>
            <p>
              You can count countable nouns. Countable nouns have singular and
              plural forms.
            </p>
            <p>Examples: ball, boy, cat, person</p>
            <ul>
              <li>
                I have only five <b>dollars</b>.
              </li>
              <li>
                The Earth was formed 4.6 billion <b>years</b> ago.
              </li>
              <li>
                There are lots of <b>people</b> but we don't have a <b>car</b>.
              </li>
            </ul>
          </span>
          <h4>Uncountable Nouns (mass nouns)</h4>
          <span>
            <p>
              You cannot count uncountable nouns. You need to use "measure
              words" to quantify them.
            </p>
            <p>
              <b>Rule</b>: We never use uncountable nouns with the indefinite
              article (a/an). Uncountable nouns are always singular.
            </p>
            <p>Examples: water, happiness, cheese</p>
            <ul>
              <li>
                Have you got some <b>money</b>?
              </li>
              <li>
                Air-conditioners use a lot of <b>electricity</b>.
              </li>
              <li>
                Do you have any <b>work</b> for me to do?
              </li>
              <li>
                Many Asians eat <b>rice</b>.
              </li>
            </ul>
          </span>
        </article>
        <article>
          <h3>Singular and Plural Possessive Nouns</h3>
          <p>
            In English grammar, an apostrophe is used to{' '}
            <span className="tooltip" onClick={() => handleSpeech('indicate')}>
              <span className="tooltiptext">አመላካች</span>
              indicate
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('ownership')}>
              <span className="tooltiptext">ባለቤትነት</span>
              ownership
            </span>
            . However, apostrophes can be{' '}
            <span className="tooltip" onClick={() => handleSpeech('tricky')}>
              <span className="tooltiptext">ሸዋጅ</span>
              tricky
            </span>
            . This article is intended to help you understand how to use
            apostrophes correctly with singular & plural nouns.
          </p>

          <p>
            <b>Singular possessive nouns</b> are{' '}
            <span className="tooltip" onClick={() => handleSpeech('easy')}>
              <span className="tooltiptext">ቀላል</span>
              easy
            </span>{' '}
            to form. If a person, place, or thing owns something, you just need
            to add 's.
          </p>
          <span>
            <ul>
              <li>
                Our boss’s car is pretty{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('expensive')}
                >
                  <span className="tooltiptext">ውድ</span>
                  <b>
                    <i>expensive</i>
                  </b>
                </span>
                .
              </li>
              <li>
                The{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('recipe’s')}
                >
                  <span className="tooltiptext">የምግብ አዘገጃጀት መመሪያዎች</span>
                  <b>
                    <i>recipe’s</i>
                  </b>
                </span>{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('ingredients')}
                >
                  <span className="tooltiptext">ንጥረ ነገሮች</span>
                  <b>
                    <i>ingredients</i>
                  </b>
                </span>{' '}
                are not easy to find.
              </li>
            </ul>
          </span>
          <span>
            <b>Plural possessive nouns</b> are formed by adding s' to the end of
            the singular word.
            <ul>
              <li>
                The kids’{' '}
                <span className="tooltip" onClick={() => handleSpeech('toys')}>
                  <span className="tooltiptext">መጫወቻዎች</span>
                  toys
                </span>{' '}
                are{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('scattered')}
                >
                  <span className="tooltiptext">ተበታተነ</span>
                  <b>
                    <i>scattered</i>
                  </b>
                </span>{' '}
                all over the room.
              </li>
              <li>
                Most of the books’ pages were{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('damaged')}
                >
                  <span className="tooltiptext">ተጎድቷል</span>
                  <b>
                    <i>damaged</i>
                  </b>
                </span>{' '}
                in the library{' '}
                <span className="tooltip" onClick={() => handleSpeech('fire')}>
                  <span className="tooltiptext">እሳት</span>
                  fire
                </span>
                .
              </li>
            </ul>
          </span>
          <span>
            However, you should note that if a plural noun does not end in an s
            plural, you should simply add 's to the end of the noun to{' '}
            <span className="tooltip" onClick={() => handleSpeech('create')}>
              <span className="tooltiptext">መፍጠር</span>
              create
            </span>
            its plural form.
            <ul>
              <li>
                The women’s{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('jewellery')}
                >
                  <span className="tooltiptext">ጌጣጌጥ</span>
                  <b>
                    <i>jewellery</i>
                  </b>
                </span>{' '}
                was pretty{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('expensive')}
                >
                  <span className="tooltiptext">ውድ</span>
                  expensive
                </span>
                .
              </li>
              <li>
                Electrical{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('mice’s')}
                >
                  <span className="tooltiptext">የአይጦች</span>
                  <b>
                    <i>mice’s</i>
                  </b>
                </span>{' '}
                <span className="tooltip" onClick={() => handleSpeech('traps')}>
                  <span className="tooltiptext">ወጥመዶች</span>
                  traps
                </span>{' '}
                are more{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('effective')}
                >
                  <span className="tooltiptext">ውጤታማ</span>
                  effective
                </span>{' '}
                than the{' '}
                <span
                  className="tooltip"
                  onClick={() => handleSpeech('traditional')}
                >
                  <span className="tooltiptext">ባህላዊ</span>
                  traditional
                </span>{' '}
                ones.
              </li>
            </ul>
          </span>
        </article>
      </div>
      <Comment />
    </div>
  );
};

export default Nouns;
