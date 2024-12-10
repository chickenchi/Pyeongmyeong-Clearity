import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useState} from 'react';
import {DrawingCanvas} from './DrawingCanvas';
import {Eraser, Write} from '@assets/svgs/QuizSvg';

const DrawingBoard = () => {
  const [toolType, setToolType] = useState<string>('pencil');

  return (
    <View style={styles.drawContainer}>
      <View style={styles.canvas}>
        <View style={styles.Tools}>
          <TouchableOpacity
            style={styles.pencil}
            onPress={() => setToolType('pencil')}>
            <Write />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eraser}
            onPress={() => setToolType('eraser')}>
            <Eraser />
          </TouchableOpacity>
        </View>
        /* 아이폰은 그림 안 그려짐 + 그릴 때 좌표 잘못 잡힘 */
        <DrawingCanvas toolType={toolType} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: Dimensions.get('window').height / 2,
    marginTop: '15%',
  },
  canvas: {
    width: '100%',
    height: '100%',
  },
  Tools: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pencil: {
    marginLeft: 20,
  },
  eraser: {
    marginLeft: 10,
  },
});

export default DrawingBoard;
