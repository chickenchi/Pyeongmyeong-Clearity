import {Back, BackToCategory, Save, Search} from '@assets/svgs/CategorySVG';
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
  Text,
  Dimensions,
  Image,
  TextInput,
} from 'react-native';

export type RootStackParam = {
  category: undefined;
};

const SelectCategory = () => {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.hr} />

      <View style={styles.titleSet}>
        <View style={styles.back}>
          <BackToCategory />
        </View>
        <Text style={styles.title}>유형 추가</Text>
      </View>

      <View style={styles.searchView}>
        <TextInput style={styles.search} />
        <TouchableOpacity style={styles.searchBtn}>
          <Search />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'relative',
    justifyContent: 'center',
  },
  hr: {
    backgroundColor: 'black',
    width: Dimensions.get('screen').height / 2.5,
    height: 1,
    marginBottom: 20,
  },
  titleSet: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    height: 30,

    marginBottom: 30,
  },
  back: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Cafe24Oneprettynight',
    color: '#C1C1C1',
  },
  searchView: {
    position: 'relative',

    width: 350,
    height: 45,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 5,

    paddingLeft: 10,
  },
  search: {
    width: '87%',

    color: '#C1C1C1',
  },
  searchBtn: {
    position: 'absolute',
    right: 15,
  },
});

export default SelectCategory;
