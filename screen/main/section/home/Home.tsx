import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import Tab from '@main/footer/Tab';

interface HomePageProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

const Home = ({navigation}: HomePageProps) => {
  const Test = () => {
    navigation.navigate('login');
  };

  const QuizPage = () => {
    navigation.navigate('quiz');
  };

  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.titleView}>
        <Image
          source={require('@assets/images/logo/Logo.png')}
          style={styles.logo}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.startBtn]}
        onPress={QuizPage}>
        <Text style={[styles.buttonText, styles.startBtnText]}>시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.battleBtn]}
        onPress={Test}>
        <Text style={[styles.buttonText, styles.battleBtnText]}>계정 변경</Text>
      </TouchableOpacity>

      <View style={styles.tab}>
        <Tab colDir="home" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 65,
  },
  logo: {
    width: 150,
    height: 61,
    marginBottom: 20,
  },
  button: {
    width: '90%',
    height: '8%',

    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,

    marginBottom: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  startBtn: {
    borderColor: '#E04E92',
  },
  startBtnText: {
    color: '#E04E92',
    fontSize: 20,
    fontFamily: 'Cafe24Oneprettynight',
  },

  battleBtn: {
    borderColor: '#C1C1C1',
  },
  battleBtnText: {
    color: '#C1C1C1',
    fontSize: 20,
    fontFamily: 'Cafe24Oneprettynight',
  },

  buttonText: {
    fontFamily: 'NANUMSQUAREROUNDB',
    fontWeight: '600',
    textAlign: 'center',
  },
  tab: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Home;
