import {currentCategoryScreenState} from '@atoms/category/CategoryAtom';

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';

import {
  ageElementState,
  difficultyElementState,
  categoryElementState,
} from '@atoms/common/Atom';

import {useRecoilState} from 'recoil';

const AgeTypeItem = () => {
  const [, setCurrentCategory] = useRecoilState(currentCategoryScreenState);
  const [age, setAge] = useRecoilState(ageElementState);
  const ageSet = new Set(age);

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>연령대</Text>

      <View style={styles.typeView}>
        {Array.from(ageSet).map(age => (
          <View style={styles.typeBtn}>
            <Text style={styles.typeItem}>{age}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.typeAddBtn}
          onPress={() => setCurrentCategory('selectAge')}>
          <Text style={styles.typeAdd}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DifficultyTypeItem = () => {
  const [, setCurrentCategory] = useRecoilState(currentCategoryScreenState);
  const [difficulty, setDifficulty] = useRecoilState(difficultyElementState);
  const difficultySet = new Set(difficulty);

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>난이도</Text>

      <View style={styles.typeView}>
        {Array.from(difficultySet).map(difficulty => (
          <View style={styles.typeBtn}>
            <Text style={styles.typeItem}>{difficulty}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.typeAddBtn}
          onPress={() => setCurrentCategory('selectDifficulty')}>
          <Text style={styles.typeAdd}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CategoryTypeItem = () => {
  const [, setCurrentCategory] = useRecoilState(currentCategoryScreenState);
  const [category, setCategory] = useRecoilState(categoryElementState);
  const categorySet = new Set(category);

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>유형</Text>

      <View style={styles.typeView}>
        {Array.from(categorySet).map(category => (
          <View style={styles.typeBtn}>
            <Text style={styles.typeItem}>{category}</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.typeAddBtn}
          onPress={() => setCurrentCategory('selectCategory')}>
          <Text style={styles.typeAdd}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Category = () => {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.titleSet}>
        <Text style={styles.title}>나의 문제 유형</Text>

        <TouchableOpacity style={styles.trash}>
          <Image
            style={styles.trashImg}
            source={require('@assets/images/bin.png')}
          />
        </TouchableOpacity>
      </View>

      {AgeTypeItem()}
      {DifficultyTypeItem()}
      {CategoryTypeItem()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#888888',
  },
  trash: {
    position: 'absolute',

    right: 0,
  },
  trashImg: {
    width: 30,
    height: 30,
  },
  typeTitle: {
    fontSize: 24,
    fontFamily: 'Cafe24Oneprettynight',
    color: '#888888',
  },
  typeView: {
    position: 'relative',

    alignItems: 'center',

    width: 400,

    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: 30,
  },
  typeBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0)',

    width: 120,
    height: 45,

    marginRight: 13,
    marginBottom: 13,

    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  typeItem: {
    color: '#888888',
    fontSize: 16,
  },
  typeAddBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0)',

    width: 120,
    height: 45,

    marginRight: 13,
    marginBottom: 13,

    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  typeAdd: {
    color: '#888888',
    fontSize: 22,
  },
});

export default Category;
