import {BackToCategory, Search} from '@assets/svgs/CategorySVG';
import {currentCategoryScreenState} from '@atoms/category/CategoryAtom';

import {
  ageState,
  ageElementState,
  difficultyElementState,
  categoryElementState,
} from '@atoms/common/Atom';

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

import {useRecoilState} from 'recoil';

export type RootStackParam = {
  category: undefined;
};

let ageItems = ['~7세', '초등', '중등', '고등', '일반', '사용자 지정'];

const AgeTypeItem = () => {
  const [age, setAge] = useRecoilState(ageElementState);

  const handleAge = (selectedAge: string) => {
    const newAgeSet =
      selectedAge === '사용자 지정' ? new Set<string>() : new Set(age);
    if (newAgeSet.has(selectedAge)) newAgeSet.delete(selectedAge);
    else {
      if (newAgeSet.has('사용자 지정')) newAgeSet.delete('사용자 지정');
      newAgeSet.add(selectedAge);
    }
    setAge(newAgeSet);
  };

  const hasAge = (selectedAge: string) => {
    const newAgeSet = new Set(age);
    return newAgeSet.has(selectedAge);
  };

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>연령대</Text>

      <View style={styles.typeItemView}>
        {ageItems.map(age => (
          <TouchableOpacity
            style={[
              styles.typeItemBtn,
              hasAge(age) && {borderColor: '#E04E92'},
            ]}
            onPress={() => handleAge(age)}>
            <Text style={[styles.typeItem, hasAge(age) && {color: '#E04E92'}]}>
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

let difficultyItems = ['기초', '쉬움', '보통', '어려움', '극한'];

const DifficultyTypeItem = () => {
  const [difficulty, setDifficulty] = useRecoilState(difficultyElementState);

  const handleDifficulty = (selectedDifficulty: string) => {
    const newDifficultySet = new Set(difficulty);
    if (newDifficultySet.has(selectedDifficulty))
      newDifficultySet.delete(selectedDifficulty);
    else newDifficultySet.add(selectedDifficulty);
    setDifficulty(newDifficultySet);
  };

  const hasDifficulty = (selectedDifficulty: string) => {
    const newDifficultySet = new Set(difficulty);
    return newDifficultySet.has(selectedDifficulty);
  };

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>난이도</Text>

      <View style={styles.typeItemView}>
        {difficultyItems.map(difficulty => (
          <TouchableOpacity
            style={[
              styles.typeItemBtn,
              hasDifficulty(difficulty) && {borderColor: '#E04E92'},
            ]}
            onPress={() => handleDifficulty(difficulty)}>
            <Text
              style={[
                styles.typeItem,
                hasDifficulty(difficulty) && {color: '#E04E92'},
              ]}>
              {difficulty}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

let categoryItems = ['맞춤법', '문법']; // 추후 데이터베이스로 처리

const CategoryTypeItem = () => {
  const [category, setCategory] = useRecoilState(categoryElementState);

  const handleCategory = (selectedCategory: string) => {
    const newCategorySet = new Set(category);
    if (newCategorySet.has(selectedCategory))
      newCategorySet.delete(selectedCategory);
    else newCategorySet.add(selectedCategory);
    setCategory(newCategorySet);
  };

  const hasCategory = (selectedCategory: string) => {
    const newCategorySet = new Set(category);
    return newCategorySet.has(selectedCategory);
  };

  return (
    <View style={styles.typeView}>
      <Text style={styles.typeTitle}>유형</Text>

      <View style={styles.typeItemView}>
        {categoryItems.map(category => (
          <TouchableOpacity
            style={[
              styles.typeItemBtn,
              hasCategory(category) && {borderColor: '#E04E92'},
            ]}
            onPress={() => handleCategory(category)}>
            <Text
              style={[
                styles.typeItem,
                hasCategory(category) && {color: '#E04E92'},
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const SelectCategory = () => {
  const [currentCategory, setCurrentCategory] = useRecoilState(
    currentCategoryScreenState,
  );

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.titleSet}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => setCurrentCategory('view')}>
          <BackToCategory />
        </TouchableOpacity>
        <Text style={styles.title}>유형 추가</Text>
      </View>

      {currentCategory === 'selectCategory' && (
        <View style={styles.searchView}>
          <TextInput style={styles.search} />
          <TouchableOpacity style={styles.searchBtn}>
            <Search />
          </TouchableOpacity>
        </View>
      )}

      {currentCategory === 'selectAge' && AgeTypeItem()}
      {currentCategory === 'selectDifficulty' && DifficultyTypeItem()}
      {currentCategory === 'selectCategory' && CategoryTypeItem()}
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

    marginBottom: 30,
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
  typeView: {
    position: 'relative',

    alignItems: 'center',

    width: 400,
    height: 200,

    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeItemView: {
    position: 'relative',

    alignItems: 'center',

    width: 400,
    height: 700,

    flexDirection: 'row',
    flexWrap: 'wrap',

    marginTop: 30,
  },
  typeTitle: {
    fontSize: 24,
    fontFamily: 'Cafe24Oneprettynight',
    color: '#C1C1C1',
  },
  typeItemBtn: {
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
    color: '#C1C1C1',
    fontSize: 16,
  },
});

export default SelectCategory;
