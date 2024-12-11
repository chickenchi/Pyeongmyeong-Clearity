import React, {useRef, useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {List} from '@assets/svgs/HeaderSvg';
import {Bookmark, Category, Help} from '@assets/svgs/ListSvg';
import {useRecoilState} from 'recoil';
import {quizTypeState, showListState} from '@atoms/quiz/QuizAtom';
import {useAlert} from '@components/common-popups/alert/AlertProvider';
/* 위치 잘못 잡힘 */

const QuizList = () => {
  const [isListVisible, setIsListVisible] = useRecoilState(showListState);
  const [quizType] = useRecoilState(quizTypeState);
  const {showAlert} = useAlert();

  const construction = () => {
    showAlert({
      title: '평명',
      description: '이 기능은 현재 개발 중입니다.',
      type: 'okay',
      onConfirm: () => {},
    });
  };

  const category = () => {
    switch (quizType) {
      case 'examCode':
        showAlert({
          title: '평명',
          description: `이 유형은 사용이 불가능합니다.`,
          type: 'okay',
          onConfirm: () => {},
        });
        break;
      default:
        showAlert({
          title: '평명',
          description: `이 기능은 현재 개발 중입니다.
어쩌라고 나도 하고 싶어 내놔!!!!`,
          type: 'okay',
          onConfirm: () => {},
        });
        break;
    }
  };

  return (
    <SafeAreaView style={styles.Header}>
      <TouchableOpacity
        onPress={() => setIsListVisible(!isListVisible)}
        style={styles.List}>
        <List />
      </TouchableOpacity>
      <View style={styles.SvgContainer}>
        <TouchableOpacity onPress={construction}>
          <Bookmark />
        </TouchableOpacity>
      </View>
      <View style={styles.SvgContainer}>
        <TouchableOpacity onPress={category}>
          <Category />
        </TouchableOpacity>
      </View>
      <View style={styles.SvgContainer}>
        <TouchableOpacity onPress={construction}>
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
    marginTop: 19,
    marginBottom: 20,
  },
  SvgContainer: {
    marginTop: 20,
    marginBottom: 15,
  },
});

export default QuizList;
