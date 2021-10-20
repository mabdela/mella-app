import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from '../../../components/comment/comment';
import { TextToSpeech } from '../../../components/text-to-speech/text-to-speech';
import { removeQuiz } from '../../../redux/main-content/main-content-actions';
const Pronouns = () => {
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
        <span className="tooltip" onClick={() => handleSpeech('PRONOUNS')}>
          <span className="tooltiptext-text">ተውላጠ ስም</span>PRONOUNS{' '}
        </span>{' '}
      </h2>
      <div className="mella-content-container">
        <Link
          className="quiz-link"
          to="/dashboard/english/grammar/pronouns/quiz"
        >
          Quiz
        </Link>
        A pronoun is a part of speech that takes the place of a noun. They{' '}
        <span className="tooltip" onClick={() => handleSpeech('include')}>
          <span className="tooltiptext-text">ያካተቱ</span>include
        </span>{' '}
        such words as <b>I</b>, <b>we</b>, <b>he</b>, <b>she</b>, <b>they</b>,{' '}
        <b>me</b> and <b>us</b>.
        <br />
        Pronouns can be classified into 6 types
        <h3>classifications of pronouns</h3>
        <span className="tooltip" onClick={() => handleSpeech('personal')}>
          <span className="tooltiptext-text">የግል</span>personal
        </span>{' '}
        ,
        <span className="tooltip" onClick={() => handleSpeech('indifinite')}>
          <span className="tooltiptext-text">ያልተወሰነ</span>indifinite
        </span>{' '}
        ,
        <span className="tooltip" onClick={() => handleSpeech('demostrative')}>
          <span className="tooltiptext-text">ማሳያ</span>demostrative
        </span>{' '}
        ,
        <span className="tooltip" onClick={() => handleSpeech('interrogative')}>
          <span className="tooltiptext-text">የሚጠይቅ</span>interrogative
        </span>{' '}
        ,
        <span className="tooltip" onClick={() => handleSpeech('reflexive')}>
          <span className="tooltiptext-text">አንፀባራቂ</span>reflexive
        </span>{' '}
        and{' '}
        <span className="tooltip" onClick={() => handleSpeech('intensive')}>
          <span className="tooltiptext-text">ጠንከር ያለ</span> intensive
        </span>{' '}
        pronouns.
        <h4>Personal pronouns</h4>A personal pronoun is a word that is used in
        place of a noun or another pronoun. They are used to{' '}
        <span className="tooltip" onClick={() => handleSpeech('refer')}>
          <span className="tooltiptext-text">ማጣቀሻ</span> refer
        </span>{' '}
        to nouns that name persons or things.
        <br />
        <b>Example</b>: kedir put on his{' '}
        <span className="tooltip" onClick={() => handleSpeech('gum')}>
          <span className="tooltiptext">ሙጫ</span>gum
        </span>{' '}
        <span className="tooltip" onClick={() => handleSpeech('boots')}>
          <span className="tooltiptext">ቡትስ ጫማዎች</span>boots
        </span>
        . Then he went to the{' '}
        <span className="tooltip" onClick={() => handleSpeech('shop')}>
          <span className="tooltiptext">ሱቅ</span>shop
        </span>
        .
        <br /> further classifications
        <ol>
          <h5>person</h5>
          <li>
            <b>first person</b> - I , my , me , we , our ,and us
          </li>
          <li>
            <b>Second person</b> - you , yours , your
          </li>
          <li>
            <b>third person</b> - they , his , her , it , its , their , them
          </li>
        </ol>
        based on the form
        <ul>
          <li>
            <h5>subject form</h5>
            A subject pronoun takes the place of a noun as the subject of a
            sentence. <br />
            <b>singular</b> - I , you , they
            <br />
            <b>plural</b> - we , you ,they
          </li>
          <li>
            <h5>object form</h5>
            Object pronouns can replace nouns used after action verbs.
            <br />
            <b>singular</b> - me , you ,him her , it,
            <br />
            <b>plural</b> -us , you ,them
          </li>
        </ul>
        <h3>Indefinite Pronouns</h3>
        <span>
          <p>
            Indefinite pronouns are used when you need to refer to a person or
            thing that doesn’t need to be specifically{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('identified')}
            >
              <span className="tooltiptext">ተለይቷል</span>identified
            </span>
            . Some common indefinite pronouns are{' '}
            <b>one, other, none, some, anybody, everybody, and no one</b>.
          </p>
          <p>
            <b>Example:</b> Everybody was{' '}
            <span className="tooltip" onClick={() => handleSpeech('late')}>
              <span className="tooltiptext">ረፍዷል</span>late
            </span>{' '}
            to work because of the{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('traffic jam')}
            >
              <span className="tooltiptext">የመንገድ ጭንቅንቅ</span>traffic jam
            </span>
            . It matters more to some than others. Nobody knows the{' '}
            <span className="tooltip" onClick={() => handleSpeech('trouble')}>
              <span className="tooltiptext">ችግር</span>trouble
            </span>{' '}
            I’ve seen.
          </p>
          <p>
            When indefinite pronouns function as subjects of a sentence or
            clause, they usually take <b>singular verbs</b>.
          </p>
        </span>
        <h3>Demonstrative Pronouns</h3>
        <span>
          <p>
            <b>That, this, these and those</b> are demonstrative pronouns. They
            take the place of a noun or noun phrase that has already been{' '}
            <span className="tooltip" onClick={() => handleSpeech('mentioned')}>
              <span className="tooltiptext">ተጠቅሷል</span>mentioned
            </span>
            .
          </p>
          <p>
            This is used for singular items that are{' '}
            <span className="tooltip" onClick={() => handleSpeech('nearby')}>
              <span className="tooltiptext">አቅራቢያ</span>nearby
            </span>
            . These is used for multiple items that are nearby. The distance can
            be{' '}
            <span className="tooltip" onClick={() => handleSpeech('physical')}>
              <span className="tooltiptext">አካላዊ</span>physical
            </span>{' '}
            or{' '}
            <span
              className="tooltip"
              onClick={() => handleSpeech('metaphorical')}
            >
              <span className="tooltiptext">ዘይቤያዊ</span>metaphorical
            </span>
            .
          </p>
          <p>
            <b>Example:</b> Here is a{' '}
            <span className="tooltip" onClick={() => handleSpeech('letter')}>
              <span className="tooltiptext">ደብዳቤ</span>letter
            </span>{' '}
            with no return{' '}
            <span className="tooltip" onClick={() => handleSpeech('address')}>
              <span className="tooltiptext">አድራሻ</span>address
            </span>
            . Who could have sent this? What a{' '}
            <span className="tooltip" onClick={() => handleSpeech('fantastic')}>
              <span className="tooltiptext">ድንቅ</span>fantastic
            </span>{' '}
            idea! This is the best thing I’ve heard all day. If you think
            <span className="tooltip" onClick={() => handleSpeech('gardenias')}>
              <span className="tooltiptext">የአትክልት ስፍራዎች</span>gardenias
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('smell')}>
              <span className="tooltiptext">ማሽተት</span>smell
            </span>{' '}
            nice, try smelling these.
          </p>
          <p>
            That is used for singular items that are far away. Those is used for
            multiple items that are{' '}
            <span className="tooltip" onClick={() => handleSpeech('far away')}>
              <span className="tooltiptext">እሩቅ</span>far away
            </span>
            . Again, the distance can be physical or metaphorical.
          </p>
          <p>
            <b>Example:</b> A house like that would be a nice place to live.
            Some new{' '}
            <span className="tooltip" onClick={() => handleSpeech('flavors')}>
              <span className="tooltiptext">ጣዕም</span>flavors
            </span>{' '}
            of soda came in last week. Why don’t you try some of those? Those
            aren’t swans, they’re{' '}
            <span className="tooltip" onClick={() => handleSpeech('geese')}>
              <span className="tooltiptext">ዝይዎች</span>geese
            </span>
            .
          </p>
        </span>
        <h3>Interrogative Pronouns</h3>
        <span>
          <p>
            Interrogative pronouns are used in questions. The interrogative
            pronouns are <b>who, what, which, and whose</b>.
          </p>
          <p>
            <b>Example:</b> Who wants a bag of{' '}
            <span className="tooltip" onClick={() => handleSpeech('jelly')}>
              <span className="tooltiptext">ጄሊ</span>jelly
            </span>{' '}
            <span className="tooltip" onClick={() => handleSpeech('beans')}>
              <span className="tooltiptext">ባቄላ</span>beans
            </span>
            ? What is your name? Which movie do you want to watch? Whose jacket
            is this?
          </p>
        </span>
        <h3>Reflexive and Intensive Pronouns</h3>
        <span>
          <p>
            Reflexive pronouns end in <b>-self</b> or <b>-selves</b> : myself,
            yourself, himself, herself, itself, ourselves, yourselves,
            themselves.
          </p>
          <p>
            Use a reflexive pronoun when both the <b>subject and object</b> of a
            verb refer to the same person or thing.
          </p>
          <p>
            <span style={{ color: '#15c39a' }}>Correct: </span> Henry{' '}
            <span className="tooltip" onClick={() => handleSpeech('cursed')}>
              <span className="tooltiptext">የተረገመ</span>cursed
            </span>
            himself for his poor{' '}
            <span className="tooltip" onClick={() => handleSpeech('eyesight')}>
              <span className="tooltiptext">የዓይን እይታ</span>eyesight
            </span>
            . They booked themselves a room at the resort. I told myself it was
            nothing.
          </p>
          <p>
            Intensive pronouns look the same as reflexive pronouns, but their
            purpose is different. Intensive pronouns add{' '}
            <span className="tooltip" onClick={() => handleSpeech('emphasis')}>
              <span className="tooltiptext">አጽንዖት</span>emphasis
            </span>
            .
          </p>
          <p>
            <span style={{ color: '#15c39a' }}>Correct: </span> I built this
            house myself. Did you yourself see Abebe spill the coffee?
          </p>
          <p>
            “I built this house” and “I built this house myself” mean almost the
            same thing. But “myself” emphasizes that I personally built the
            house — I didn’t{' '}
            <span className="tooltip" onClick={() => handleSpeech('hire')}>
              <span className="tooltiptext">መቅጠር</span>hire
            </span>{' '}
            someone else to do it for me. Likewise, “Did you see Abebe spill the
            coffee?” and “Did you yourself see Abebe spill the coffee?” have
            similar meanings. But “yourself” makes it clear that the person
            asking wants to know whether you actually{' '}
            <span className="tooltip" onClick={() => handleSpeech('witnessed')}>
              <span className="tooltiptext">ተመሰከረ</span>witnessed
            </span>{' '}
            the{' '}
            <span className="tooltip" onClick={() => handleSpeech('incident')}>
              <span className="tooltiptext">ክስተት</span>incident
            </span>{' '}
            or whether you only heard it described by someone else.
          </p>
          <p>
            Occasionally, people are{' '}
            <span className="tooltip" onClick={() => handleSpeech('tempted')}>
              <span className="tooltiptext">ተፈተነ</span>tempted
            </span>{' '}
            to use myself where they should use me because it sounds a little
            <span className="tooltip" onClick={() => handleSpeech('fancier')}>
              <span className="tooltiptext">አድናቂ</span>fancier
            </span>
            . Don’t fall into that{' '}
            <span className="tooltip" onClick={() => handleSpeech('trap')}>
              <span className="tooltiptext">ወጥመድ</span>trap
            </span>
            ! If you use a -self form of a pronoun, make sure it matches one of
            the uses above.
          </p>
          <p>
            <span style={{ color: '#ea1537' }}>Incorrect: </span> Please call
            Sarah or myself if you are going to be late. Abebe, Henry, and
            myself are pleased to welcome you to the neighborhood.
          </p>
        </span>
      </div>
      <Comment />
    </div>
  );
};

export default Pronouns;
