import {MutableRefObject} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {question, questionList} from '@quiz/data/QuestionList';
import {Draw, Write} from '@assets/svgs/QuizSVG';

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

interface QuestionListSettingProps {
  setFilteredQuestionList: (value: question[]) => void;
  ageElement: Set<string>;
  difficultyElement: Set<string>;
  categoryElement: Set<string>;
  setCurrentQuestionNo: (value: number) => void;
}

export const QuestionListSetting = ({
  setFilteredQuestionList,
  ageElement,
  difficultyElement,
  categoryElement,
  setCurrentQuestionNo,
}: QuestionListSettingProps) => {
  /*
  데이터베이스 불러오는 과정 대체(추후 데이터베이스로 작업)
  questionList라는 이름으로 recoil 선언할 예정(어차피 여기서 필터링할 거기 때문에 굳이 filtered로 지을 필요 없음)
  */

  let filteredQuestionList: question[] = [];

  questionList.forEach(question => {
    let agePass = false;
    let difficultyPass = false;
    let categoryPass = false;

    question.tag.forEach(tag => {
      if (!ageElement.size || ageElement.has(tag)) {
        agePass = true;
      }

      if (!difficultyElement.size || difficultyElement.has(tag)) {
        difficultyPass = true;
      }

      if (!categoryElement.size || categoryElement.has(tag)) {
        categoryPass = true;
      }
    });

    if (agePass && difficultyPass && categoryPass) {
      filteredQuestionList.push(question);
    }
  });

  setFilteredQuestionList(filteredQuestionList);
  setCurrentQuestionNo(-1);
};

interface SelectNextQuestionProps {
  readOnly: boolean;
  filteredQuestionList: question[];
  currentQuestionNo: number;
  setIsPlaying: (value: boolean) => void;
  setCurrentQuestionNo: (value: number) => void;
  setCurrentQuestion: (value: question) => void;
  setSubscreen: (value: string) => void;

  setTagList: (value: JSX.Element[]) => void;
  setRequest: (value: string) => void;
  no: MutableRefObject<number>;
  setType: (value: string) => void;
  quizOrder: string;
}

export const SelectNextQuestion = async ({
  readOnly,
  filteredQuestionList,
  currentQuestionNo,
  setIsPlaying,
  setCurrentQuestionNo,
  setCurrentQuestion,
  setTagList,
  setSubscreen,
  setRequest,
  no,
  setType,
  quizOrder,
}: SelectNextQuestionProps) => {
  /** 현재 문제 번호 위치 */
  let currentQuestionNumber = currentQuestionNo;

  // 읽기 전용이 아니라면
  if (readOnly === false) {
    setIsPlaying(true); // 문제 풀이 시작 상태로 변경
    PauseArt({setSubscreen}); // 필기, 그림 등 종료

    let questionCount = filteredQuestionList.length;

    // 질문이 랜덤으로 나올 때
    if (quizOrder === 'random') {
      do {
        let randomSelectQuestion = Math.floor(Math.random() * questionCount);
        currentQuestionNumber = randomSelectQuestion;
      } while (currentQuestionNumber === currentQuestionNo);
      // 질문이 번호 순서대로 나올 때
    } else {
      // 이전 질문이 없다면
      currentQuestionNumber = (currentQuestionNumber + 1) % questionCount;
    }

    setCurrentQuestionNo(currentQuestionNumber);
  }

  // 현재 문제의 태그 삽입
  InsertTagList(filteredQuestionList[currentQuestionNumber].tag, {
    setTagList,
    setRequest,
    no,
    setType,
  });

  // 현재 문제 삽입
  if (!readOnly) {
    setCurrentQuestion(filteredQuestionList[currentQuestionNumber]);
  }
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
