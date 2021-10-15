import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
//
import Nouns from '../../pages/english/nouns/nouns';
import Goals from '../goals';
import Punctuations from '../../pages/english/punctuations/punctuations';
import Adjectives from '../../pages/english/adjectives/adjectives';
import Adverbs from '../../pages/english/adverbs/adverbs';
import Articles from '../../pages/english/articles/articles';
import Clauses from '../../pages/english/clauses/clauses';
import Comparison from '../../pages/english/comparison/comparison';
import Conjections from '../../pages/english/conjections/conjections';
import DialogueWriting from '../../pages/english/dialogue-writing/dialogue-writing';
import DiaryEntry from '../../pages/english/diary-entry/diary-entry';
import DirectAndIndirectSpeech from '../../pages/english/direct-and-indirect-speech/direct-and-indirect-speech';
import EssayWriting from '../../pages/english/essay-writing/essay-writing';
import FormalLetterWriting from '../../pages/english/formal-letter-writing/formal-letter-writing';
import InformalLetterWriting from '../../pages/english/informal-letter-writing/informal-letter-writing';
import NoticeWriting from '../../pages/english/notice-writing/notice-writing';
import ParagraphWriting from '../../pages/english/paragraph-writing/paragraph-writing';
import PartsOfSentence from '../../pages/english/parts-of-sentence/parts-of-sentence';
import PartsOfSpeech from '../../pages/english/parts-of-speech/parts-of-speech';
import Phrases from '../../pages/english/phrases/phrases';
import Prepositions from '../../pages/english/prepositions/prepositions';
import Pronouns from '../../pages/english/pronouns/pronouns';
import QuestionTags from '../../pages/english/question-tags/question-tags';
import StoryWriting from '../../pages/english/story-writing/story-writing';
import Tenses from '../../pages/english/tenses/tenses';
import TypesOfSentences from '../../pages/english/types-of-sentences/types-of-sentences';
import Verbs from '../../pages/english/verbs/verbs';
import Capitalization from '../../pages/english/capitalization/capitalization';
import FormationOfWords from '../../pages/english/formation_of_words/formation-of-words';
import WordsUsage from '../../pages/english/words-usage/words-usage';
import Conditional_clauses from '../../pages/english/conditional_clauses/conditional-clauses';
import Infnitive_Gerund from '../../pages/english/infnitive-and-gerund/infnitive-and-gerund';
import MessageWriting from '../../pages/english/message-writing/message-writing';
import Interjections from '../../pages/english/interjections/interjections';
import PunctuationsQuiz from '../../pages/english/punctuations/punctuations-quiz';
import AdjectivesQuiz from '../../pages/english/adjectives/adjectives-quiz';
import CapitalizationQuiz from '../../pages/english/capitalization/capitalization-quiz';
import VerbsQuiz from '../../pages/english/verbs/verbs-quiz';
import TypesOfSentencesQuiz from '../../pages/english/types-of-sentences/types-of-sentences-quiz';
import TensesQuiz from '../../pages/english/tenses/tenses-quiz';
import QuestionTagsQuiz from '../../pages/english/question-tags/question-tags-quiz';
import PronounsQuiz from '../../pages/english/pronouns/pronouns-quiz';
import PrepositionsQuiz from '../../pages/english/prepositions/prepositions-quiz';
import PhrasesQuiz from '../../pages/english/phrases/phrases-quiz';
import PartsOfSentenceQuiz from '../../pages/english/parts-of-sentence/parts-of-sentence-quiz';
import EssayWritingQuiz from '../../pages/english/essay-writing/essay-writing-quiz';
import DirectAndIndirectSpeechQuiz from '../../pages/english/direct-and-indirect-speech/direct-and-indirect-speech-quiz';
import ConjectionsQuiz from '../../pages/english/conjections/conjections-quiz';
import ComparisonQuiz from '../../pages/english/comparison/comparison-quiz';
import ClausesQuiz from '../../pages/english/clauses/clauses-quiz';
import ArticlesQuiz from '../../pages/english/articles/articles-quiz';
import AdverbsQuiz from '../../pages/english/adverbs/adverbs-quiz';
import NounsQuiz from '../../pages/english/nouns/nouns-quiz';
import ConditionalClauses from '../../pages/english/conditional_clauses/conditional-clauses-quiz';
import Voices from '../../pages/english/voices/voice';
import InfnitiveAndGerundQuiz from '../../pages/english/infnitive-and-gerund/infnitive-and-gerund-quiz';
import VoiceQuiz from '../../pages/english/voices/voice-quiz';
// import StoryWritingQuiz from '../../pages/english/story-writing/StoryWritingQuiz';

const Routes = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${url}`} component={Goals} />
      <Route exact path={`${url}/english/grammar/nouns`} component={Nouns} />
      <Route
        exact
        path={`${url}/english/grammar/punctuations`}
        component={Punctuations}
      />
      <Route
        exact
        path={`${url}/english/grammar/adjectives`}
        component={Adjectives}
      />
      <Route
        exact
        path={`${url}/english/grammar/adverbs`}
        component={Adverbs}
      />
      <Route
        exact
        path={`${url}/english/grammar/articles`}
        component={Articles}
      />

      <Route exact path={`${url}/english/grammar/Voice`} component={Voices} />
      <Route
        exact
        path={`${url}/english/grammar/clauses`}
        component={Clauses}
      />
      <Route
        exact
        path={`${url}/english/grammar/comparison`}
        component={Comparison}
      />
      <Route
        exact
        path={`${url}/english/grammar/conjections`}
        component={Conjections}
      />
      <Route
        exact
        path={`${url}/english/grammar/dialogue_writing`}
        component={DialogueWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/diary_entry`}
        component={DiaryEntry}
      />
      <Route
        exact
        path={`${url}/english/grammar/direct_and_indirect_speech`}
        component={DirectAndIndirectSpeech}
      />
      <Route
        exact
        path={`${url}/english/grammar/essay_writing`}
        component={EssayWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/formal_letter_writing`}
        component={FormalLetterWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/informal_letter_writing`}
        component={InformalLetterWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/notice_writing`}
        component={NoticeWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/paragraph_writing`}
        component={ParagraphWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/parts_of_sentence`}
        component={PartsOfSentence}
      />
      <Route
        exact
        path={`${url}/english/grammar/parts_of_speech`}
        component={PartsOfSpeech}
      />
      <Route
        exact
        path={`${url}/english/grammar/phrases`}
        component={Phrases}
      />
      <Route
        exact
        path={`${url}/english/grammar/prepositions`}
        component={Prepositions}
      />
      <Route
        exact
        path={`${url}/english/grammar/pronouns`}
        component={Pronouns}
      />
      <Route
        exact
        path={`${url}/english/grammar/question_tags`}
        component={QuestionTags}
      />
      <Route
        exact
        path={`${url}/english/grammar/story_writing`}
        component={StoryWriting}
      />
      <Route exact path={`${url}/english/grammar/tenses`} component={Tenses} />
      <Route
        exact
        path={`${url}/english/grammar/types_of_sentences`}
        component={TypesOfSentences}
      />
      <Route exact path={`${url}/english/grammar/verbs`} component={Verbs} />
      <Route
        exact
        path={`${url}/english/grammar/capitalization`}
        component={Capitalization}
      />
      <Route
        exact
        path={`${url}/english/grammar/formation_of_words`}
        component={FormationOfWords}
      />
      <Route
        exact
        path={`${url}/english/grammar/words_usage`}
        component={WordsUsage}
      />
      <Route
        exact
        path={`${url}/english/grammar/interjections`}
        component={Interjections}
      />
      <Route
        exact
        path={`${url}/english/grammar/message_writing`}
        component={MessageWriting}
      />
      <Route
        exact
        path={`${url}/english/grammar/conditional_clauses`}
        component={Conditional_clauses}
      />
      <Route
        exact
        path={`${url}/english/grammar/infnitive_and_gerund`}
        component={Infnitive_Gerund}
      />
      {/* quizzes */}
      <Route
        exact
        path={`${url}/english/grammar/nouns/quiz`}
        component={NounsQuiz}
      />

      <Route
        exact
        path={`${url}/english/grammar/punctuations/quiz`}
        component={PunctuationsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/adjectives/quiz`}
        component={AdjectivesQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/adverbs/quiz`}
        component={AdverbsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/articles/quiz`}
        component={ArticlesQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/clauses/quiz`}
        component={ClausesQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/comparison/quiz`}
        component={ComparisonQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/conjections/quiz`}
        component={ConjectionsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/direct_and_indirect_speech/quiz`}
        component={DirectAndIndirectSpeechQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/essay_writing/quiz`}
        component={EssayWritingQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/parts_of_sentence/quiz`}
        component={PartsOfSentenceQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/phrases/quiz`}
        component={PhrasesQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/prepositions/quiz`}
        component={PrepositionsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/pronouns/quiz`}
        component={PronounsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/question_tags/quiz`}
        component={QuestionTagsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/tenses/quiz`}
        component={TensesQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/types_of_sentences/quiz`}
        component={TypesOfSentencesQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/verbs/quiz`}
        component={VerbsQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/capitalization/quiz`}
        component={CapitalizationQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/conditional_clauses/quiz`}
        component={ConditionalClauses}
      />

      <Route
        exact
        path={`${url}/english/grammar/infnitive_and_gerund/quiz`}
        component={InfnitiveAndGerundQuiz}
      />
      <Route
        exact
        path={`${url}/english/grammar/voice/quiz`}
        component={VoiceQuiz}
      />
      {/* <Route
        exact
        path={`${url}/english/grammar/story_writing/quiz`}
        component={StoryWritingQuiz}
      /> */}
    </Switch>
  );
};

export default Routes;
