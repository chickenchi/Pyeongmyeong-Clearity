import {MutableRefObject} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {question} from '@quiz/data/QuestionList';
import {Draw, Write} from '@assets/svgs/QuizSvg';

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

  const questionCnt = questionList.length;
  let SelQN: string = '01';

  PauseArt({setSubscreen});

  // do {
  //   SelQN = (Math.floor(Math.random() * questionCnt) + 1).toString();
  // } while (SelQN === currentQuestionNo);

  let questionNumberInt = (parseInt(currentQuestionNo) + 1) % (questionCnt - 1);

  if (questionNumberInt.toString().length === 1)
    SelQN = '0' + questionNumberInt.toString();
  else SelQN = questionNumberInt.toString();

  setCurrentQuestionNo(SelQN);
  InsertTagList(questionList[parseInt(SelQN) - 1].tag, {
    setTagList,
    setRequest,
    no,
    setType,
  });
  setCurrentQuestion(questionList[parseInt(SelQN) - 1]);
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
  console.log(no);
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
