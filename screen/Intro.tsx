import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, Image} from 'react-native';

interface HomePageProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

const Intro = ({navigation}: HomePageProps) => {
  useState(() => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 3000);
  });

  return (
    <SafeAreaView style={styles.BG}>
      <Image
        source={require('@assets/images/logo/Logo.png')}
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 160,
    height: 64.7,
  },
});

export default Intro;
