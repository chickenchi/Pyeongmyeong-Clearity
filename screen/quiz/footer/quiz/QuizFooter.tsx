import {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {Clue, ExitAnswer, Correct, Wrong} from '@assets/svgs/QuizSvg';
import {useRecoilState} from 'recoil';
import {
  currentQuestionState,
  playingState,
  resultState,
  selectedQuestionState,
  showedResultState,
  timeState,
} from '@atoms/quiz/QuizAtom';
import {ToggleResult} from '@quiz/QuizPageFunction';
import {useAlert} from '@components/common-popups/alert/AlertProvider';

const QuizFooter = () => {
  const [time, setTime] = useRecoilState(timeState);
  const [inputText, setInputText] = useState<string>('');
  const [selectOX, changeOX] = useState<string>('');
  const [selectedNumber, numberSelecting] = useState<number>(0);
  const [currentHintCnt, changeHintCnt] = useState<number>(4);
  const [showedAnswer, answerShowing] = useState<boolean>(false);

  const {showAlert} = useAlert();

  const [currentQuestion] = useRecoilState(currentQuestionState);
  const [, requestingSelectingQuestion] = useRecoilState(selectedQuestionState);

  const [showedResult, showingResult] = useRecoilState(showedResultState);
  const [, setIsPlaying] = useRecoilState(playingState);
  const [, changeResult] = useRecoilState(resultState);

  const toggleResultVariable = {
    changeResult,
    showingResult,
    showedResult,
    setTime,
    setIsPlaying,
    time,
    requestingSelectingQuestion,
  };

  return (
    <SafeAreaView style={styles.Footer}>
      {showedAnswer && (
        <View style={styles.answerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.answerTitle}>정답 입력</Text>
            <TouchableOpacity
              style={styles.exitAnswer}
              onPress={() => answerShowing(!showedAnswer)}>
              <ExitAnswer />
            </TouchableOpacity>
          </View>

          {currentQuestion.type === '다지선다' && (
            <View style={styles.SelectAnswer}>
              {[1, 2, 3, 4, 5].map(number => (
                <View style={styles.ansItem} key={number}>
                  <TouchableOpacity onPress={() => numberSelecting(number)}>
                    <Text
                      style={[
                        styles.selAnsNo,
                        selectedNumber === number && styles.activeSelAnsNo,
                      ]}>
                      {`①②③④⑤`[number - 1]}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {currentQuestion.type === '입력' && (
            <View style={styles.InputAnswer}>
              <Text style={styles.describe}>{currentQuestion.describe}</Text>
              <View style={styles.ansItem}>
                <TextInput
                  style={styles.input}
                  value={inputText}
                  onChangeText={text => setInputText(text)}
                  placeholder="정답을 입력해 주세요"
                />
              </View>
            </View>
          )}

          {currentQuestion.type === 'OX' && (
            <View style={styles.SelectAnswer}>
              <TouchableOpacity
                style={styles.Correct}
                onPress={() => changeOX('O')}>
                <Correct
                  backgroundColor={selectOX !== 'O' ? '#FFC7E2' : '#E04E92'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Wrong}
                onPress={() => changeOX('X')}>
                <Wrong
                  backgroundColor={selectOX !== 'X' ? '#FFC7E2' : '#E04E92'}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.answeringContainer}>
            <TouchableOpacity
              style={styles.giveupBtn}
              onPress={() => {
                showAlert({
                  title: '평명',
                  description: `포기하지 마세요!`,
                  type: 'okay',
                  onConfirm: () => {},
                });
              }}>
              <Text style={styles.answerDesc}>포기하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.BtnContainer}>
        <View style={styles.ClueContainer}>
          <View style={styles.ClueContent}>
            <View style={styles.clue}>
              <Clue />
            </View>
            <Text style={styles.ClueDesc}>{currentHintCnt}</Text>
          </View>
          <TouchableOpacity
            style={styles.hintBtn}
            onPress={() => {
              if (currentHintCnt) {
                changeHintCnt(currentHintCnt - 1);
                showAlert({
                  title: '평명',
                  description: `${currentQuestion.Hint}`,
                  type: 'okay',
                  onConfirm: () => {},
                });
              } else {
                showAlert({
                  title: '평명',
                  description: `오늘 사용 가능한 힌트를\n 모두 사용하셨습니다.`,
                  type: 'okay',
                  onConfirm: () => {},
                });
              }
            }}>
            <Text style={styles.btnDesc}>힌트</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!showedAnswer) {
              answerShowing(!showedAnswer);
              return;
            }
            if (!selectedNumber && !inputText && !selectOX) {
              showAlert({
                title: '평명',
                description: `정답을 입력하거나\n고르지 않으셨습니다.`,
                type: 'okay',
                onConfirm: () => {},
              });
            } else {
              showAlert({
                title: '평명',
                description: `정답을 제출하시겠습니까?`,
                type: 'select',
                onConfirm: () => {
                  var isCorr: boolean = false;

                  if (currentQuestion.type === '다지선다') {
                    isCorr = selectedNumber === currentQuestion.Corr;
                  } else if (currentQuestion.type === '입력') {
                    isCorr = inputText === currentQuestion.Corr;
                  } else {
                    isCorr = selectOX === currentQuestion.Corr;
                  }

                  ToggleResult(
                    isCorr,
                    currentQuestion.type === '다지선다'
                      ? selectedNumber
                      : currentQuestion.type === '입력'
                      ? inputText
                      : selectOX,
                    currentQuestion.Corr,
                    currentQuestion.type,
                    toggleResultVariable,
                  );
                },
              });
            }
          }}
          style={[
            styles.forgiveBtn,
            showedAnswer && {backgroundColor: '#E04E92'},
          ]}>
          <Text style={[styles.btnDesc, showedAnswer && {color: 'white'}]}>
            {!showedAnswer ? '정답 입력' : '정답 확인'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            showAlert({
              title: '평명',
              description: `문제를 넘기시겠습니까?`,
              type: 'select',
              onConfirm: () => {
                setTime(0);
                requestingSelectingQuestion(true);
              },
            });
          }}>
          <Text style={styles.btnDesc}>넘기기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Footer: {
    flex: 1,
    alignItems: 'center',
  },
  BtnContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',

    width: '100%',
    bottom: 20,
    margin: 15,
    marginTop: 30,
    marginBottom: 40,
  },
  btn: {
    backgroundColor: 'none',

    justifyContent: 'center',
    alignItems: 'center',

    width: '23%',
    height: 40,
    marginRight: 3,

    borderColor: '#E04E92',
    borderRadius: 10,
    borderWidth: 2,
  },
  ClueContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: '23%',
    marginRight: 3,
  },
  hintBtn: {
    backgroundColor: 'none',

    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: 40,

    borderColor: '#E04E92',
    borderRadius: 10,
    borderWidth: 2,
  },
  ClueContent: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    bottom: 5,
  },
  clue: {
    marginRight: 4,
  },
  ClueDesc: {
    color: '#E04E92',

    textAlign: 'center',

    fontSize: 15,
    fontFamily: 'Cafe24Oneprettynight',
  },
  forgiveBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0)',

    justifyContent: 'center',
    alignItems: 'center',

    width: '40%',
    height: 40,
    padding: 4,
    marginRight: 3,

    borderColor: '#E04E92',
    borderRadius: 10,
    borderWidth: 2,
  },
  btnDesc: {
    color: '#E04E92',

    textAlign: 'center',

    fontSize: 16,
    fontFamily: 'Cafe24Oneprettynight',
  },
  answerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',

    alignContent: 'center',
    justifyContent: 'center',

    height: 280,
    width: '100%',

    borderColor: '#888888',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'solid',

    bottom: 140,
  },
  titleContainer: {
    position: 'absolute',

    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '30%',

    top: 0,
  },
  answerTitle: {
    position: 'absolute',

    left: 40,

    color: 'black',
    fontSize: 26,
    fontFamily: 'Cafe24Oneprettynight',
  },
  exitAnswer: {
    position: 'absolute',
    right: 33,
  },
  input: {
    height: 50,
    width: '90%',

    borderColor: '#888888',
    borderRadius: 10,
    borderWidth: 1,

    paddingLeft: 15,
    marginRight: 30,

    color: '#888888',

    fontSize: 14,
    fontFamily: 'Cafe24Oneprettynight',
  },
  InputAnswer: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',

    marginLeft: 15,
    marginTop: 0,
  },
  describe: {
    marginRight: 30,
    marginBottom: 20,

    fontSize: 14,
  },
  SelectAnswer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',

    marginLeft: 15,
    marginTop: 0,
  },
  Correct: {
    marginRight: 5,
  },
  Wrong: {
    marginRight: 20,
  },
  ansItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selAnsNo: {
    marginBottom: 8,
    marginRight: 23,

    color: '#C1C1C1',

    fontSize: 28,
    fontFamily: 'Cafe24Oneprettynight',
  },
  activeSelAnsNo: {
    color: '#585858',
  },
  answeringContainer: {
    position: 'absolute',

    width: '100%',
    height: '17%',

    bottom: 20,
  },
  giveupBtn: {
    position: 'absolute',
    backgroundColor: 'none',

    justifyContent: 'center',
    alignItems: 'center',

    width: 120,
    height: 40,
    marginRight: 3,
    right: 18,

    borderColor: '#888888',
    borderRadius: 10,
    borderWidth: 1,
  },
  answerDesc: {
    color: '#888888',
    textAlign: 'center',

    fontSize: 14,
    fontFamily: 'Cafe24Oneprettynight',
  },
});

export default QuizFooter;
