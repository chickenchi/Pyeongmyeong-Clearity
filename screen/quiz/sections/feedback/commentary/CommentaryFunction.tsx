import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Question} from '../../../Quiz/Data/questionList';

export const ExposeStyling = (
  question: string,
  {setExp, currentQuestion}: ChangeExp,
) => {
  if (!question) return [];

  const parts = question.split(/(\/"|"\/)/);
  const result = [];

  let isKeyword = false;
  let cnt = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    switch (part) {
      case '/"':
        isKeyword = true;
        break;
      case '"/':
        isKeyword = false;
        break;
      default:
        if (isKeyword) {
          cnt += 1;
          const capturedCnt = cnt - 1;
          result.push(
            <View style={styles.TextContainer} key={`keyword-${capturedCnt}`}>
              <View style={styles.noContainer}>
                <Text style={styles.no}>{cnt}.</Text>
              </View>
              <TouchableOpacity
                style={styles.EXBtn}
                onPress={() =>
                  ChangeExp(capturedCnt, {setExp, currentQuestion})
                }>
                <Text style={[styles.expose, {color: 'red'}]}>{part}</Text>
              </TouchableOpacity>
            </View>,
          );
        } else {
          result.push(
            <View style={styles.TextContainer} key={`text-${i}`}>
              <Text style={styles.expose}>{part}</Text>
            </View>,
          );
        }
    }
  }

  return result;
};

interface ChangeExp {
  setExp: (value: string) => void;
  currentQuestion: Question;
}

const ChangeExp = (index: number, {setExp, currentQuestion}: ChangeExp) => {
  console.log(index);
  setExp(currentQuestion.Exp ? currentQuestion.Exp[index] : '');
};

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
  TextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noContainer: {
    height: 25,
    justifyContent: 'center',
  },
  no: {
    fontSize: 8,
  },
  EXBtn: {
    height: 25,
    justifyContent: 'center',
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
