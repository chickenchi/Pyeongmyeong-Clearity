import {useState} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import {currentQuestionState, resultState} from '@atoms/quiz/QuizAtom';
import {useRecoilState} from 'recoil';
import {ExposeStyling} from './CommentaryFunction';

export default function Commentary() {
  const [result] = useRecoilState(resultState);
  const [currentQuestion] = useRecoilState(currentQuestionState);

  const [Exp, setExp] = useState<string>('');

  return (
    <SafeAreaView style={styles.Explanation}>
      <Text style={styles.ansNo}>정답: {result.correct}</Text>
      {currentQuestion.Exposition ? (
        <>
          <Text style={styles.guide}>
            빨간색으로 표시된 부분을 눌러 해설을 확인해 보세요!
          </Text>
          <View style={styles.exposition}>
            {ExposeStyling(currentQuestion.Exposition || '')}
          </View>
          <Text style={styles.EX}>{Exp}</Text>
        </>
      ) : (
        <>
          <View style={styles.exposition}>
            <Text style={styles.expose}>{currentQuestion.WOExposition}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Explanation: {
    flex: 1,
    flexDirection: 'column',

    width: '90%',

    marginBottom: 100,
    marginLeft: 20,
  },
  ansNo: {
    marginBottom: 10,
    fontSize: 21,
    fontFamily: 'Cafe24Oneprettynight',
    textAlign: 'center',
  },
  exposition: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  expose: {
    fontSize: 16,
    fontFamily: 'Cafe24Oneprettynight',
  },
  guide: {
    fontSize: 13,
    fontFamily: 'Cafe24Oneprettynight',
  },
  EX: {
    marginTop: 20,
    fontFamily: 'Cafe24Oneprettynight',
  },
});
