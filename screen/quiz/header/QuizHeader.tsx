import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Svg, Path, Rect} from 'react-native-svg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {List, Logo, Pause, Play} from '@assets/svgs/HeaderSvg';

import {useRecoilState} from 'recoil';
import {
  playingState,
  showedResultState,
  showListState,
  showTagState,
  timeState,
} from '../../atoms/quiz/QuizAtom';
import {formatTime} from '@utils/FormatTime';

export type RootStackParam = {
  home: undefined;
};

const QuizHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [showedResult] = useRecoilState(showedResultState);
  const [time] = useRecoilState(timeState);
  const [isListVisible, setIsListVisible] = useRecoilState(showListState);
  const [, requestingShowTag] = useRecoilState(showTagState);

  return (
    <SafeAreaView style={styles.Header}>
      <TouchableOpacity
        style={styles.Logo}
        onPress={() => navigation.navigate('home')}>
        <Logo />
      </TouchableOpacity>

      {!showedResult ? (
        <View style={styles.TimeContainer}>
          <Text style={styles.Time}>{formatTime(time)}</Text>
          {!isPlaying ? (
            <TouchableOpacity
              onPress={() => {
                setIsPlaying(!isPlaying);
                requestingShowTag(true);
              }}>
              <Play />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setIsPlaying(!isPlaying);
                requestingShowTag(true);
              }}>
              <Pause />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.TimeContainer}>
          <Text style={styles.Time}></Text>
        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsListVisible(!isListVisible)}
        style={styles.List}>
        <List />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '6%',
  },
  Logo: {
    width: '25%',
    marginLeft: '6.7%',
  },
  TimeContainer: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Time: {
    marginRight: 14,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 22,
  },
  List: {
    position: 'absolute',
    right: '6.7%',
  },
});

export default QuizHeader;
