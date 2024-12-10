import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Logo from './Logo/Logo';

export type RootStackParam = {
  home: undefined;
};

const MainHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={styles.titleView}>
      <TouchableOpacity onPress={() => navigation.navigate('home')}>
        <Image
          source={require('@assets/images/logo/Logo.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleView: {
    marginTop: 65,
    marginLeft: 35,
    marginBottom: -100,
    alignItems: 'flex-start',
  },

  logo: {
    width: 100,
    height: 40, // 대략 0.4 차이
  },
});

export default MainHeader;
