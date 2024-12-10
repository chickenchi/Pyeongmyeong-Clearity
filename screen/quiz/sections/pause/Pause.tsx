import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';

interface Paused {
  time: string;
}

export default function Paused({time}: Paused) {
  return (
    <SafeAreaView style={styles.Header}>
      <View style={styles.t1view}>
        <Text style={styles.text1}>지금은</Text>
      </View>
      <View style={styles.t2view}>
        <Text style={styles.text2}>일시 중지</Text>
      </View>
      <View style={styles.t3view}>
        <Text style={styles.text3}>상태입니다.</Text>
      </View>
      <View style={styles.tmView}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  t1view: {
    width: '70%',

    marginBottom: 15,
  },
  text1: {
    left: 0,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 37,
  },
  t2view: {
    width: '70%',

    alignItems: 'center',

    marginBottom: 20,
  },
  text2: {
    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 55,
  },
  t3view: {
    width: '70%',

    marginBottom: 35,
  },
  text3: {
    textAlign: 'right',

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 37,
  },
  tmView: {
    width: '70%',

    alignItems: 'center',
  },
  time: {
    marginBottom: 50,

    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 60,
  },
});
