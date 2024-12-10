import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const UnderConstruction = () => {
  return (
    <SafeAreaView style={styles.BG}>
      <Image
        source={require('@assets/images/under_construction/under_construction.png')}
        style={styles.construction}
      />
      <Text style={styles.description}>여긴 공사 중이에요!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  construction: {
    width: 150,
    height: 150,
    marginBottom: 28,
  },

  description: {
    color: 'black',
    fontSize: 35,
    fontFamily: 'Cafe24Oneprettynight',
  },
});

export default UnderConstruction;
