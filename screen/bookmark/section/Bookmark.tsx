import {SelectArrow, SelectCloseArrow} from '@assets/svgs/BookmarkSVG';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

const Bookmark = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: '최근순', value: 'recently'},
    {label: '분야별', value: 'category'},
  ]);
  const [value, setValue] = useState(items[0].value);

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.subHeader}>
        <View style={styles.titleSet}>
          <Text style={styles.title}>책갈피</Text>
          <Text style={styles.englishTitle}>bookmark</Text>
        </View>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.select}
          textStyle={{
            color: '#C1C1C1',
            fontWeight: '300',
          }}
          ArrowDownIconComponent={() => <SelectArrow />}
          ArrowUpIconComponent={() => <SelectCloseArrow />}
          tickIconStyle={{opacity: 0}}
          selectedItemContainerStyle={{
            backgroundColor: '#F5F5F5',
          }}
          itemSeparatorStyle={{
            backgroundColor: '#C1C1C1',
          }}
          dropDownContainerStyle={{
            width: 200,
            borderWidth: 1,
            borderColor: '#C1C1C1',
          }}
        />
      </View>

      <View style={styles.bookmarkItemSet}>
        <View style={styles.bookmarkItem}>
          <Text style={styles.questionCode}>{'1006'}번 문제</Text>
          <Text style={styles.questionType}>{'오지선다'}</Text>
          <Text style={styles.bookmarkTitle}>대충 제목</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  subHeader: {
    width: '90%',
    height: 'auto',

    flexDirection: 'row',

    alignItems: 'flex-start',

    margin: 30,
  },
  titleSet: {
    flexDirection: 'column',
    alignItems: 'center',

    marginLeft: 50,
    marginRight: 50,
  },
  title: {
    fontSize: 50,
    fontFamily: 'Cafe24Oneprettynight',
    fontWeight: 600,
    color: '#888888',
  },
  englishTitle: {
    fontSize: 25,
    color: '#C1C1C1',
  },
  select: {
    backgroundColor: 'rgba(0, 0, 0, 0)',

    width: 200,

    borderColor: '#C1C1C1',
    borderWidth: 1,
  },
  bookmarkItemSet: {
    width: '90%',
    height: 'auto',
  },
  bookmarkItem: {
    backgroundColor: '#F5F5F5',
    width: '100%',
    height: 100,

    borderRadius: 5,
  },
  questionCode: {
    color: '#888888',
  },
  questionType: {
    color: '#888888',
  },
  bookmarkTitle: {
    color: '#888888',
  },
});

export default Bookmark;
