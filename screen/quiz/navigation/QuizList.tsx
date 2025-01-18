import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {List} from '@assets/svgs/HeaderSvg';
import {Bookmark, Category, Help} from '@assets/svgs/ListSvg';
import {useRecoilState} from 'recoil';
import {showListState} from '@atoms/quiz/QuizAtom';
import {useAlert} from '@components/common-popups/alert/AlertProvider';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

export type RootStackParam = {
  category: undefined;
};

/* 아이콘 위치 잘못 잡힘 */
const QuizList = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [isListVisible, setIsListVisible] = useRecoilState(showListState);
  const {showAlert} = useAlert();

  return (
    <SafeAreaView style={styles.Header}>
      <TouchableOpacity
        onPress={() => setIsListVisible(!isListVisible)}
        style={styles.List}>
        <List />
      </TouchableOpacity>
      <View style={styles.SvgContainer}>
        <TouchableOpacity
          onPress={() => {
            showAlert({
              title: '평명',
              description: `현재 기능은 작업 중에 있습니다.`,
              type: 'okay',
              onConfirm: () => {},
            });
          }}>
          <Bookmark />
        </TouchableOpacity>
      </View>
      <View style={styles.SvgContainer}>
        <TouchableOpacity
          onPress={() => {
            showAlert({
              title: '평명',
              description: `풀던 문제의 정보를 잃을 수 있습니다!
계속하시겠습니까?`,
              type: 'select',
              onConfirm: () => {
                navigation.navigate('category');
              },
            });
          }}>
          <Category />
        </TouchableOpacity>
      </View>
      <View style={styles.SvgContainer}>
        <TouchableOpacity
          onPress={() => {
            showAlert({
              title: '평명',
              description: `현재 기능은 작업 중에 있습니다.`,
              type: 'okay',
              onConfirm: () => {},
            });
          }}>
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
    marginTop: 69,
    marginBottom: 10,
  },
  SvgContainer: {
    marginTop: 40,
  },
});

export default QuizList;
