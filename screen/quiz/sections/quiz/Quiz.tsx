import React, {useState, useEffect, useRef} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {questionList} from '@quiz/data/QuestionList';

import {useRecoilState} from 'recoil';
import {
  currentQuestionNoState,
  currentQuestionState,
  playingState,
  quizOrderState,
  quizPriorityState,
  quizTypeState,
  readOnlyState,
  selectedQuestionState,
  showTagState,
  typeOfQuestionListState,
} from '@atoms/quiz/QuizAtom';

/* Tools */
import {Tag} from '@quiz/sections/quiz/components/Tag';
import {ShowingImage} from '@quiz/sections/quiz/components/ShowingImage';

/* Components */
import MultipleChoice from '@quiz/sections/quiz/components/MultipleChoice';
import DrawingBoard from '@quiz/sections/quiz/components/DrawingBoard';
import WritingBoard from '@quiz/sections/quiz/components/WritingBoard';
import ImageContainer from '@quiz/sections/quiz/components/ImageContainer';

import {
  AvailableBoard,
  InsertTagList,
  QuestionStyling,
  SelectQuestion,
} from './QuizFunction';

const Quiz = () => {
  const [readOnly] = useRecoilState(readOnlyState);
  const [, setIsPlaying] = useRecoilState(playingState);
  const [currentQuestionNo, setCurrentQuestionNo] = useRecoilState(
    currentQuestionNoState,
  );
  const [currentQuestion, setCurrentQuestion] =
    useRecoilState(currentQuestionState);
  const [reqSelQ, requestingSelectingQuestion] = useRecoilState(
    selectedQuestionState,
  );
  const [requestedShowTag, requestingShowTag] = useRecoilState(showTagState);
  const [quizType] = useRecoilState(quizTypeState);
  const [quizOrder] = useRecoilState(quizOrderState);
  const [typeOfQuestionList, setTypeOfQuestionList] = useRecoilState(
    typeOfQuestionListState,
  );
  const [quizPriority, setQuizPriority] = useRecoilState(quizPriorityState);

  const [tagList, setTagList] = useState<JSX.Element[]>([]);
  const [currentOpacity, setCurrentOpacity] = useState(80);

  const [, setRequest] = useState('');
  const [, setType] = useState('');

  const [showedTag, setShowedTag] = useState<boolean>(false);

  /** image, drawingBoard, writingBoard */
  const [subscreen, setSubscreen] = useState<string>('none');

  let no = useRef(0);

  const selectQuestionProps = {
    readOnly,
    questionList,
    currentQuestionNo,
    setIsPlaying,
    setCurrentQuestionNo,
    setCurrentQuestion,
    setTagList,
    setSubscreen,
    setRequest,
    no,
    setType,
    quizType,
    quizOrder,
    setTypeOfQuestionList,
    typeOfQuestionList,
    quizPriority,
    setQuizPriority,
  };

  const insertTagListProps = {
    setTagList,
    setRequest,
    no,
    setType,
  };

  useEffect(() => {
    let curQuestionNo = parseInt(currentQuestionNo) - 1;

    if (requestedShowTag) {
      InsertTagList(questionList[curQuestionNo].tag, insertTagListProps);
      requestingShowTag(false);
      return;
    }

    if (reqSelQ) {
      // readOnly의 경우 적용 안 됨
      requestingSelectingQuestion(!reqSelQ);
    } else {
      SelectQuestion(selectQuestionProps);
    }
  }, [reqSelQ, readOnly, requestedShowTag]);

  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.BasicContainer}>
        <Tag
          setShowedTag={setShowedTag}
          showedTag={showedTag}
          tagList={tagList}
        />
      </View>
      {!readOnly && AvailableBoard({setSubscreen, subscreen})}
      <View style={styles.QuestionContainer}>
        <Text style={styles.examNum}>{currentQuestion.questionNo}</Text>
        <Text style={styles.question}>
          {QuestionStyling(currentQuestion.question)}
        </Text>
      </View>

      {currentQuestion.type === '다지선다' && (
        <MultipleChoice currentQuestion={currentQuestion} readOnly={readOnly} />
      )}

      {(currentQuestion?.Image !== 'none' || currentQuestion?.Description) && (
        <ShowingImage setSubscreen={setSubscreen} subscreen={subscreen} />
      )}
      {subscreen === 'drawingBoard' && <DrawingBoard />}
      {subscreen === 'writingBoard' && <WritingBoard />}
      {subscreen === 'image' && (
        <ImageContainer
          setCurrentOpacity={setCurrentOpacity}
          currentOpacity={currentOpacity}
          setSubscreen={setSubscreen}
          currentQuestion={currentQuestion}
          subscreen={subscreen}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    flex: 1,
    alignItems: 'center',
  },
  BasicContainer: {
    position: 'relative',
    width: '90%',
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 40,
  },
  QuestionContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  examNum: {
    marginLeft: 20,
    marginRight: 20,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 40,
  },
  question: {
    width: 300,
    marginRight: 15,

    fontFamily: 'Cafe24Oneprettynight',
    fontWeight: 'normal',
    fontSize: 23,
  },
});

export default Quiz;
