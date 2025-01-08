import {useEffect} from 'react';

import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';
import QuizHeader from '@quiz/header/QuizHeader';

import Quiz from '@quiz/sections/quiz/Quiz';
import Pause from '@quiz/sections/pause/Pause';
import Feedback from '@quiz/sections/feedback/feedback/Feedback';
import Commentary from '@quiz/sections/feedback/commentary/Commentary';

import QuizList from '@quiz/navigation/QuizList';
import QuizFooter from '@quiz/footer/quiz/QuizFooter';
import ResultFooter from '@quiz/footer/result/ResultFooter';
import Hr from '@components/ui/Hr';
import {useFonts} from 'expo-font';
import {formatTime} from '@utils/FormatTime';
import {useRecoilState} from 'recoil';
import {
  checkedQuestionState,
  playingState,
  showedExplanationState,
  showedResultState,
  showListState,
  timeState,
} from '../atoms/quiz/QuizAtom';

export interface ResultType {
  Correct: string;
  answer: any;
  correct: any;
  solvingTime: string;
  type: string;
  NextQuestion: () => void;
}

const fontUrl =
  'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff';
const fontUrl2 =
  'https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Bold.woff';

export const QuizPage = () => {
  const [loaded] = useFonts({
    GowunBatang: {uri: fontUrl},
    GowunBatangBold: {uri: fontUrl2},
  });

  const [isPlaying] = useRecoilState(playingState);
  const [time, setTime] = useRecoilState(timeState);
  const [isListVisible] = useRecoilState(showListState);

  const [checkQuestion] = useRecoilState(checkedQuestionState);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isPlaying && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const [showedResult] = useRecoilState(showedResultState);
  const [showedExplanation] = useRecoilState(showedExplanationState);

  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.Header}>
        <QuizHeader />
      </View>
      <View style={styles.Content}>
        {showedResult ? (
          <>
            <ScrollView style={styles.result}>
              {checkQuestion ? (
                <Quiz />
              ) : showedExplanation ? (
                <View style={styles.explanationContainer}>
                  <View style={styles.exTitle}>
                    <Text style={styles.title}>정답 해설</Text>
                  </View>
                  <Hr />
                  <View style={styles.exSection}>
                    <Quiz />
                  </View>
                  <Hr />
                  <View style={styles.exEx}>
                    <ScrollView nestedScrollEnabled={true}>
                      <Commentary />
                    </ScrollView>
                  </View>
                </View>
              ) : (
                <Feedback />
              )}
            </ScrollView>
            <View style={styles.resultFooter}>
              <ResultFooter />
            </View>
          </>
        ) : isPlaying ? (
          <>
            <View style={styles.Quiz}>
              <Quiz />
            </View>
            <View style={styles.QuizFooter}>
              <QuizFooter />
            </View>
          </>
        ) : (
          <Pause time={formatTime(time)} />
        )}
      </View>

      {isListVisible && (
        <View style={styles.List}>
          <QuizList />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    flex: 1,
    alignItems: 'center',
  },
  result: {
    flex: 1,
  },
  resultFooter: {
    height: '10%',
  },
  Header: {
    width: '100%',
    height: '13%',
    marginTop: '8%',
  },
  Quiz: {
    flex: 1,
  },
  QuizFooter: {
    height: '10%',
  },
  Content: {
    width: '100%',
    height: '87%',
  },
  List: {
    position: 'absolute',
    width: 65,
    height: '150%',

    right: 0,
    bottom: 0,
  },
  explanationContainer: {
    flex: 1,
  },
  exTitle: {},
  title: {
    margin: 20,

    fontSize: 30,
    fontFamily: 'Cafe24Oneprettynight',
  },
  exSection: {
    width: '100%',
    height: '58%',
    marginTop: 25,
  },
  exEx: {
    height: '20%',
    marginTop: 25,
  },
});
