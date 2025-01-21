import {Back, Save} from '@assets/svgs/CategorySVG';
import {Logo} from '@assets/svgs/HeaderSvg';
import Hr from '@components/ui/Hr';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export type RootStackParam = {
  home: undefined;
  quiz: undefined;
};

const CategoryHeader = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <SafeAreaView style={styles.bg}>
      <TouchableOpacity
        style={styles.logo}
        onPress={() => navigation.navigate('home')}>
        <Logo />
      </TouchableOpacity>

      <View style={styles.btnSet}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate('quiz')}>
          <Back />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 50,
  },
  logo: {
    position: 'absolute',
    width: '25%',
    left: 20,
  },
  btnSet: {
    position: 'absolute',
    flexDirection: 'row',
    right: 20,
  },
  back: {},
});

export default CategoryHeader;
