import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {List} from '@assets/svgs/HeaderSvg';
import {Setting, Shopping, Help} from '@assets/svgs/ListSvg';
import {useRecoilState} from 'recoil';
import {showListState} from '@atoms/quiz/QuizAtom';
/* 위치 잘못 잡힘 */

const QuizList = () => {
  const [isListVisible, setIsListVisible] = useRecoilState(showListState);
  const [, req] = useState<string>('');
  const [, editType] = useState<string>('');

  const no = useRef(0);

  const showAlert = (script: string, type: string) => {
    req(script + '; ' + no.current);
    editType(type);
    no.current += 1;
  };

  return (
    <SafeAreaView style={styles.Header}>
      <TouchableOpacity
        onPress={() => setIsListVisible(!isListVisible)}
        style={styles.List}>
        <List />
      </TouchableOpacity>
      <View style={styles.SvgContainer}>
        <TouchableOpacity
          onPress={() => showAlert('현재 기능은 작업 중에 있습니다.', 'Okay')}>
          <Setting />
        </TouchableOpacity>
      </View>
      <View style={styles.SvgContainer}>
        <TouchableOpacity
          onPress={() => showAlert('현재 기능은 작업 중에 있습니다.', 'Okay')}>
          <Shopping />
        </TouchableOpacity>
      </View>
      <View style={styles.SvgContainer}>
        <TouchableOpacity
          onPress={() => showAlert('현재 기능은 작업 중에 있습니다.', 'Okay')}>
          <Help />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: '100%',
    alignItems: 'center',
  },
  List: {
    marginTop: 100,
    marginBottom: 10,
  },
  SvgContainer: {
    marginTop: 20,
  },
});

export default QuizList;
