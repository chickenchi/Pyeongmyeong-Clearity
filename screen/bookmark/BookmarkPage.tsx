import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Hr from '@components/ui/Hr';
import BookmarkHeader from './header/BookmarkHeader';
import Bookmark from './section/Bookmark';

interface CategoryProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

export type RootStackParam = {
  home: undefined;
};

const BookmarkPage = ({navigation}: CategoryProps) => {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.header}>
        <BookmarkHeader />
      </View>

      <Bookmark />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  hr: {
    marginBottom: 20,
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

export default BookmarkPage;
