import {resultState} from '@atoms/quiz/QuizAtom';
import {useRecoilState} from 'recoil';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Feedback() {
  const [result] = useRecoilState(resultState);

  return (
    <SafeAreaView style={styles.Header}>
      {result.type === '다지선다' ? (
        <View>
          <Text style={styles.title}>{result.Correct}</Text>
          <Text style={styles.selNo}>고른 번호: {result.answer}</Text>
          <Text style={styles.ansNo}>정답: {result.correct}</Text>
          <Text style={styles.svTime}>소요 시간: {result.solvingTime}</Text>
        </View>
      ) : result.type === '입력' ? (
        <View>
          <Text style={styles.title}>{result.Correct}</Text>
          <Text style={styles.selNo}>작성한 정답: {result.answer}</Text>
          <Text style={styles.ansNo}>정답: {result.correct}</Text>
          <Text style={styles.svTime}>소요 시간: {result.solvingTime}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{result.Correct}</Text>
          <Text style={styles.selNo}>선택한 것: {result.answer}</Text>
          <Text style={styles.ansNo}>정답: {result.correct}</Text>
          <Text style={styles.svTime}>소요 시간: {result.solvingTime}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 150,
  },
  title: {
    width: '100%',

    fontFamily: 'Cafe24Oneprettynight',
    textAlign: 'center',
    fontSize: 50,
    marginBottom: 50,
  },
  selNo: {
    marginBottom: 10,
    marginLeft: 20,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 20,
  },
  ansNo: {
    marginBottom: 10,
    marginLeft: 20,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 20,
  },
  svTime: {
    marginBottom: 110,
    marginLeft: 20,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 20,
  },
});
