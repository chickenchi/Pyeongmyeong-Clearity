// atoms.ts
import {atom} from 'recoil';
import {question, questionList} from '@quiz/data/QuestionList';
import {ResultType} from '@quiz/QuizPage';

export const playingState = atom({
  key: 'playingState',
  default: true,
});

export const showedResultState = atom({
  key: 'showedResultState',
  default: false,
});

export const timeState = atom({
  key: 'timeState',
  default: 0,
});

export const showListState = atom({
  key: 'showListState',
  default: false,
});

export const showTagState = atom({
  key: 'showTagState',
  default: false,
});

export const resultState = atom<Partial<ResultType>>({
  key: 'resultState',
  default: {},
});

export const checkedQuestionState = atom({
  key: 'checkedQuestionState',
  default: false,
});

export const showedExplanationState = atom({
  key: 'showedExplanationState',
  default: false,
});

const initialQuestion: question = {
  questionNo: '',
  question: '',
  type: '다지선다',
  item1: '',
  item2: '',
  item3: '',
  item4: '',
  item5: '',
  reason1: '',
  reason2: '',
  reason3: '',
  reason4: '',
  reason5: '',
  Corr: '',
  Exposition: '',
  Exp: [''],
  WOExposition: '',
  Hint: '',
  Image: {},
  tag: [''],
  describe: '',
  Description: '',
};

export const filteredQuestionListState = atom<question[]>({
  key: 'filteredQuestionListState',
  default: questionList,
});

export const currentQuestionState = atom<question>({
  key: 'currentQuestionState',
  default: initialQuestion,
});

export const currentQuestionNoState = atom<number>({
  key: 'currentQuestionNoState',
  default: null,
});

export const selectedQuestionState = atom({
  key: 'selectedQuestionState',
  default: true,
});

export const nextQuestionState = atom({
  key: 'nextQuestionState',
  default: true,
});

// --
export const readOnlyState = atom({
  key: 'readOnlyState',
  default: false,
});

// --

export const quizTypeState = atom<string>({
  key: 'quizTypeState',
  default: '',
});

export const quizOrderState = atom<string>({
  key: 'quizOrderState',
  default: 'order',
});
