import {ToggleTag} from '@assets/svgs/QuizSvg';
import {ScrollView, TouchableOpacity, View, StyleSheet} from 'react-native';

interface Tag {
  setShowedTag: (value: boolean) => void;
  showedTag: boolean;
  tagList: JSX.Element[];
}

export const Tag: React.FC<Tag> = ({setShowedTag, showedTag, tagList}) => {
  return (
    <View style={styles.Tag}>
      <TouchableOpacity onPress={() => setShowedTag(!showedTag)}>
        <ToggleTag />
      </TouchableOpacity>
      <View style={styles.tagContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tagContentContainer}>{showedTag && tagList}</View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Tag: {
    flexDirection: 'row',
  },
  tagContainer: {
    width: '60%',
  },
  tagContentContainer: {
    flexDirection: 'row',
  },
});
