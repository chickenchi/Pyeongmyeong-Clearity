import {useRecoilState} from 'recoil';
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  checkedQuestionState,
  nextQuestionState,
  playingState,
  showedExplanationState,
  showedResultState,
} from '@atoms/quiz/QuizAtom';

const ResultFooter = () => {
  const [checkQuestion, setCheckQuestion] =
    useRecoilState(checkedQuestionState);
  const [showedExplanation, showingExplanation] = useRecoilState(
    showedExplanationState,
  );

  const [, setIsPlaying] = useRecoilState(playingState);
  const [, showingResult] = useRecoilState(showedResultState);
  const [, requestingNextQuestion] = useRecoilState(nextQuestionState);

  return (
    <SafeAreaView style={styles.Footer}>
      <View style={styles.btnContainer}>
        {!showedExplanation && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setCheckQuestion(!checkQuestion)}>
            <Text style={styles.btnContent}>
              {!checkQuestion ? '문제 보기' : '결과 보기'}
            </Text>
          </TouchableOpacity>
        )}
        {!checkQuestion && !showedExplanation && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIsPlaying(true);
              showingResult(false);
              requestingNextQuestion(true);
            }}>
            <Text style={styles.btnContent}>다음 문제</Text>
          </TouchableOpacity>
        )}
        {!checkQuestion && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => showingExplanation(!showedExplanation)}>
            <Text style={styles.btnContent}>
              {!showedExplanation ? '정답 해설' : '결과 보기'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Footer: {
    flex: 1,
    justifyContent: 'center',
  },

  btnContainer: {
    position: 'absolute',
    bottom: 55,
    flexDirection: 'row',

    width: '100%',

    paddingLeft: 10,
    paddingRight: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    height: 40,

    flex: 1,

    backgroundColor: 'white',
    borderColor: '#E04E92',
    borderWidth: 1,
    borderRadius: 10,

    marginLeft: 10,
    marginRight: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },

  btnContent: {
    color: '#E04E92',

    fontSize: 16,
    fontFamily: 'Cafe24Oneprettynight',
  },
});

export default ResultFooter;
