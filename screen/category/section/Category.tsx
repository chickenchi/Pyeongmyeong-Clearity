import {Back, Save} from '@assets/svgs/CategorySVG';
import {Logo} from '@assets/svgs/HeaderSvg';
import {currentCategoryState} from '@atoms/category/CategoryAtom';
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
} from 'react-native';
import {useRecoilState} from 'recoil';

export type RootStackParam = {};

const SelectedTypeItem = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  const [, setCurrentCategory] = useRecoilState(currentCategoryState);

  return (
    <View style={styles.typeItemView}>
      <View style={styles.typeItemBtn}>
        <Text style={styles.typeItem}>안녕</Text>
      </View>

      <TouchableOpacity
        style={styles.typeAddBtn}
        onPress={() => setCurrentCategory('select')}>
        <Text style={styles.typeAdd}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const Category = () => {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.hr} />

      <View style={styles.titleSet}>
        <Text style={styles.title}>나의 문제 유형</Text>

        <TouchableOpacity style={styles.trash}>
          <Image
            style={styles.trashImg}
            source={require('@assets/images/bin.png')}
          />
        </TouchableOpacity>
      </View>

      {SelectedTypeItem()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    backgroundColor: 'black',
    width: Dimensions.get('screen').height / 2.5,
    height: 1,
    marginBottom: 20,
  },
  titleSet: {
    position: 'relative',

    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
    height: 30,

    marginBottom: 30,
  },
  title: {
    position: 'absolute',
    fontSize: 24,
    fontFamily: 'Cafe24Oneprettynight',
    color: '#C1C1C1',
  },
  trash: {
    position: 'absolute',

    right: 0,
  },
  trashImg: {
    width: 30,
    height: 30,
  },
  typeItemView: {
    position: 'relative',

    alignItems: 'center',

    width: 400,
    height: 700,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeItemBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0)',

    width: 120,
    height: 45,

    margin: 6,

    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  typeItem: {
    color: '#C1C1C1',
    fontSize: 16,
  },
  typeAddBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0)',

    width: 120,
    height: 45,

    margin: 6,

    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
  },
  typeAdd: {
    color: '#C1C1C1',
    fontSize: 22,
  },
});

export default Category;
