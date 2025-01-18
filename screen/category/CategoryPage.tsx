import {Logo} from '@assets/svgs/HeaderSvg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import CategoryHeader from '@category/header/CategoryHeader';
import Category from '@category/section/Category';
import {useRecoilState} from 'recoil';
import {currentCategoryScreenState} from '@atoms/category/CategoryAtom';
import SelectCategory from './section/SelectCategory';

interface CategoryProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

export type RootStackParam = {
  home: undefined;
};

const CategoryPage = ({navigation}: CategoryProps) => {
  const [currentCategory] = useRecoilState(currentCategoryScreenState);

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.header}>
        <CategoryHeader />
      </View>
      <View>
        {currentCategory === 'view' ? <Category /> : <SelectCategory />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    marginTop: '8%',
  },
  logo: {
    width: '25%',
    marginLeft: '6.7%',
  },
});

export default CategoryPage;
