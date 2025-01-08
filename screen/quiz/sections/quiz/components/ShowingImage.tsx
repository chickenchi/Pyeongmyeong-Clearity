import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {ShowImage} from '@assets/svgs/QuizSvg';

interface ShowingImage {
  setSubscreen: (value: string) => void;
  subscreen: string;
}

export const ShowingImage: React.FC<ShowingImage> = ({
  setSubscreen,
  subscreen,
}) => {
  return (
    <View style={styles.showImage}>
      <TouchableOpacity
        onPress={() => setSubscreen(subscreen === 'image' ? '' : 'image')}
        style={styles.ImageBtn}>
        <ShowImage />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  showImage: {
    width: '100%',
  },
  ImageBtn: {
    position: 'absolute',
    right: 20,
  },
});
