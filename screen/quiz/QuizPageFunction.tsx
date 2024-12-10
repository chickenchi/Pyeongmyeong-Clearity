// QuizPageFunctions.ts
import {Dispatch, SetStateAction} from 'react';
import {ResultType} from '@quiz/QuizPage';
import {formatTime} from '@utils/FormatTime';
import {storeData, getData} from '@utils/DataSetting';

interface NextQuestionProps {
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  showingResult: Dispatch<SetStateAction<boolean>>;
  requestingSelectingQuestion: Dispatch<SetStateAction<boolean>>;
}

export const NextQuestion = ({
  setIsPlaying,
  showingResult,
  requestingSelectingQuestion,
}: NextQuestionProps) => {
  setIsPlaying(true);
  showingResult(false);
  requestingSelectingQuestion(true);
};

export interface ToggleResultProps {
  changeResult: (value: ResultType) => void;
  showingResult: Dispatch<SetStateAction<boolean>>;
  showedResult: boolean;
  setTime: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  requestingSelectingQuestion: Dispatch<SetStateAction<boolean>>;
  time: number;
}

export const ToggleResult = async (
  isCorr: boolean,
  answer: any,
  correct: any,
  type: string,
  {
    changeResult,
    showingResult,
    showedResult,
    setTime,
    setIsPlaying,
    time,
    requestingSelectingQuestion,
  }: ToggleResultProps,
) => {
  const Correct = isCorr ? '정답입니다!' : '오답입니다.';
  storeData(isCorr ? 'correct' : 'wrong', (await getData('correct')) + 1);

  const solvingTime = formatTime(time);

  changeResult({
    Correct,
    answer,
    correct,
    solvingTime,
    type,
    NextQuestion: () =>
      NextQuestion({
        setIsPlaying,
        showingResult,
        requestingSelectingQuestion,
      }),
  });

  showingResult(!showedResult);

  setTime(0);
  setIsPlaying(false);
};
