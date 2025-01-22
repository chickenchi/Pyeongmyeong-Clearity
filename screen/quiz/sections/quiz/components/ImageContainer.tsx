import {question} from '@quiz/data/QuestionList';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Exit} from '@assets/svgs/QuizSVG';
import Slider from '@react-native-community/slider';

interface ImageContainer {
  setCurrentOpacity: (value: number) => void;
  currentOpacity: number;
  setSubscreen: (value: string) => void;
  currentQuestion: question;
  subscreen: string;
}

const ImageContainer: React.FC<ImageContainer> = ({
  setCurrentOpacity,
  currentOpacity,
  setSubscreen,
  currentQuestion,
  subscreen,
}) => {
  return (
    <View
      style={[
        styles.resContainer,
        {
          backgroundColor: `rgba(255, 255, 255, ${currentOpacity / 100})`,
          borderColor: `rgba(255, 255, 255, ${currentOpacity / 100})`,
        },
      ]}>
      <View style={styles.exitImageContainer}>
        <TouchableOpacity
          style={[styles.exitImage, {opacity: currentOpacity / 100}]}
          onPress={() => setSubscreen('none')}>
          <Exit />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        style={styles.resContentCtn}>
        {currentQuestion.Image !== 'none' && (
          <Image
            source={currentQuestion.Image}
            style={[styles.img, {opacity: currentOpacity / 100}]}
          />
        )}
        {currentQuestion.Description && (
          <View style={styles.Description}>
            <Text
              style={{
                fontFamily: 'Cafe24Oneprettynight',
                fontSize: 16,
                opacity: currentOpacity / 100,
              }}>
              {currentQuestion.Description}
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.OpacityContainer}>
        <Slider
          style={[styles.slider, {opacity: currentOpacity / 100}]}
          minimumValue={20}
          maximumValue={80}
          value={80}
          onValueChange={setCurrentOpacity}
          minimumTrackTintColor={
            subscreen === 'image' ? '#000000' : 'transparent'
          }
          maximumTrackTintColor="#000000"
          thumbTintColor="#000000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  resContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: Dimensions.get('window').height / 2,
    marginTop: '15%',
  },
  exitImageContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
  },
  exitImage: {
    position: 'absolute',
    right: 0,
    margin: 20,
  },
  resContentCtn: {
    width: '100%',
  },
  img: {
    width: 250,
    height: 150,
    resizeMode: 'cover',
  },
  OpacityContainer: {
    height: '28%',
    width: '100%',
  },
  slider: {
    position: 'absolute',
    width: '40%',
    right: 30,
    margin: 20,
  },
  Description: {
    width: '90%',
  },
});

export default ImageContainer;
