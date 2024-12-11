import {MutableRefObject} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {csatTag, grammarTag, question, wordTag} from '@quiz/data/QuestionList';
import {Draw, Write} from '@assets/svgs/QuizSvg';
import {RandomNumberByMaxLength} from '@utils/RandomNumberByMaxLength';
import {hasCommonElement} from '@utils/HasCommonElement';
import {findKeyByValue} from '@utils/FindKeyByValue';

interface AvailableBoard {
  setSubscreen: (value: string) => void;
  subscreen: string;
}

export const AvailableBoard = ({setSubscreen, subscreen}: AvailableBoard) => {
  return (
    <>
      <TouchableOpacity
        style={styles.write}
        onPress={() =>
          setSubscreen(subscreen === 'writingBoard' ? '' : 'writingBoard')
        }>
        <Write />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.draw}
        onPress={() =>
          setSubscreen(subscreen === 'drawingBoard' ? '' : 'drawingBoard')
        }>
        <Draw />
      </TouchableOpacity>
    </>
  );
};

interface SelectQuestion {
  readOnly: boolean;
  questionList: question[];
  currentQuestionNo: string;
  setIsPlaying: (value: boolean) => void;
  setCurrentQuestionNo: (value: string) => void;
  setCurrentQuestion: (value: question) => void;
  setSubscreen: (value: string) => void;

  setTagList: (value: JSX.Element[]) => void;
  setRequest: (value: string) => void;
  no: MutableRefObject<number>;
  setType: (value: string) => void;
  quizType: string;
  quizOrder: string;
  setTypeOfQuestionList: (value: question[]) => void;
  typeOfQuestionList: question[];
  quizPriority: Map<string, number>;
  setQuizPriority: (quizPriority: Map<string, number>) => void;
}

export const SelectQuestion = ({
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
}: SelectQuestion) => {
  if (readOnly) {
    InsertTagList(questionList[parseInt(currentQuestionNo) - 1].tag, {
      setTagList,
      setRequest,
      no,
      setType,
    });
    return;
  }

  setIsPlaying(true);
  PauseArt({setSubscreen});

  /** typeOfQuestionList */
  var toql: question[] = [];
  /** questionPriority */
  var qp: Map<string, number> = new Map();

  // backend에서 데이터 불러오는 과정 대체
  if (!typeOfQuestionList.length) {
    const questionCnt = questionList.length;

    const tagMap = {
      word: wordTag,
      grammar: grammarTag,
      examCode: null,
      CSAT: csatTag,
    };

    let order = 0;

    for (let i = 0; i < questionCnt; i++) {
      const question = questionList[i];
      const relatedTags = tagMap[quizType];

      if (!relatedTags) continue;

      if (hasCommonElement(question.tag, relatedTags)) {
        toql.push(question);
        qp.set(question.questionNo, order);

        order += 1;
      }
    }

    setTypeOfQuestionList(toql);
    setQuizPriority(qp);
  } else {
    toql = typeOfQuestionList;
    qp = quizPriority;
  }

  /** SelectedQuestionNumber */
  let SelQN: string = '01';

  let toqlCnt = toql.length;

  if (quizOrder === 'random') {
    do {
      let randomSelQN = RandomNumberByMaxLength(toqlCnt) - 1;
      SelQN = toql[randomSelQN].questionNo;
    } while (SelQN === currentQuestionNo);
  } else {
    if (!currentQuestionNo) SelQN = toql[0].questionNo;
    else {
      let order = (qp.get(currentQuestionNo) + 1) % toqlCnt;
      SelQN = findKeyByValue(order, qp);
    }
  }

  setCurrentQuestionNo(SelQN);

  let SelQNInt = parseInt(SelQN) - 1;
  InsertTagList(questionList[SelQNInt].tag, {
    setTagList,
    setRequest,
    no,
    setType,
  });
  setCurrentQuestion(questionList[SelQNInt]);
};

interface InsertTagList {
  setTagList: (value: JSX.Element[]) => void;
  setRequest: (value: string) => void;
  no: MutableRefObject<number>;
  setType: (value: string) => void;
}

export const InsertTagList = (
  tagArray: string[],
  {setTagList, setRequest, no, setType}: InsertTagList,
) => {
  const stackTag: JSX.Element[] = tagArray.map((tag, i) => (
    <TouchableOpacity
      key={i}
      style={styles.tag}
      onPress={() =>
        ShowAlert('추후에 추가되는 기능입니다.', 'Okay', {
          setRequest,
          no,
          setType,
        })
      }>
      <Text style={styles.tagDesc}>{tag}</Text>
    </TouchableOpacity>
  ));

  setTagList(stackTag);
};

interface ShowAlert {
  setRequest: (value: string) => void;
  no: MutableRefObject<number>;
  setType: (value: string) => void;
}

export const ShowAlert = (
  script: string,
  type: string,
  {setRequest, no, setType}: ShowAlert,
) => {
  setRequest(script + '; ' + no.current);
  setType(type);
  no.current += 1;
};

interface PauseArt {
  setSubscreen: (value: string) => void;
}

export const PauseArt = ({setSubscreen}: PauseArt) => {
  setSubscreen('none');
};

export const QuestionStyling = (question: string) => {
  if (!question) return [];

  // 패턴에 따른 문자열 분할
  const parts = question.split(/(\/\*|\*\/|\/_|_\/)/);
  const result = [];

  let isBold = false;
  let isItalic = false;

  for (const part of parts) {
    switch (part) {
      case '/*':
        isBold = true;
        break;
      case '*/':
        isBold = false;
        break;
      case '/_':
        isItalic = true;
        break;
      case '_/':
        isItalic = false;
        break;
      default:
        if (isBold) {
          result.push(
            <Text key={result.length} style={styles.bolding}>
              {part}
            </Text>,
          );
        } else if (isItalic) {
          result.push(
            <Text key={result.length} style={styles.italic}>
              {part}
            </Text>,
          );
        } else {
          result.push(<Text key={result.length}>{part}</Text>);
        }
    }
  }

  return result;
};

export const styles = StyleSheet.create({
  tag: {
    backgroundColor: 'none',
    padding: 4,
    height: 30,
    width: 70,
    marginLeft: 5,
    borderColor: '#E04E92',
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  tagDesc: {
    color: '#E04E92',
    textAlign: 'center',
    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 12,
  },
  write: {
    position: 'absolute',
    right: 0,
    padding: 4,
    marginRight: 20,
    fontSize: 20,
    textAlign: 'right',
  },
  draw: {
    position: 'absolute',
    right: 0,
    padding: 4,
    marginRight: 60,
    fontSize: 20,
    textAlign: 'right',
  },

  bolding: {
    fontFamily: 'Cafe24Oneprettynight',
  },

  italic: {
    fontStyle: 'italic',
  },
});
