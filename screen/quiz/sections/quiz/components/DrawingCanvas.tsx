import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions, LayoutChangeEvent, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Line {
  path: string;
  color: string;
  strokeWidth: number;
}

interface DrawingCanvasProps {
  toolType: string,
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({toolType}) => {
  const [paths, setPaths] = useState<Line[]>([]); // 그려진 경로들의 상태 배열
  const [isDrawing, setIsDrawing] = useState(false); // 그리기 상태를 나타내는 상태 변수

  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [viewX, setViewX] = useState(0);
  const [viewY, setViewY] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height, x, y } = event.nativeEvent.layout;
    setViewWidth(width);
    setViewHeight(height);
    setViewX(x);
    setViewY(y);
  };

  const handlePanResponderStart = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const { locationX, locationY } = evt.nativeEvent; // 터치 이벤트의 시작 위치 정보

    setIsDrawing(true); // 그리기 상태 업데이트

    let newLine: Line;

    if (toolType === 'pencil') {
      newLine = {
        path: `M${locationX},${locationY}`,
        color: 'black',
        strokeWidth: 3,
      };
    } else {
      // 지우개는 투명한 흰색 선을 그리도록 설정
      newLine = {
        path: `M${locationX},${locationY}`,
        color: 'white',
        strokeWidth: 20,
      };
    }

    setPaths([...paths, newLine]);
  };

  const handlePanResponderMove = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    if (isDrawing) {
      const { locationX, locationY } = evt.nativeEvent; // 터치 이벤트의 위치 정보

      console.log("loX:", locationX, "vX:", viewX, "vRight:", viewX + viewWidth)
      console.log("loY:", locationY, "vY:", viewY, "vBottom:", viewY + viewHeight)

      if (
        locationX < viewX ||
        locationX > viewX + viewWidth ||
        locationY < viewY ||
        locationY > viewY + viewHeight
      ) {
        handlePanResponderEnd();
        return;
      }

      // 현재 그리는 선의 경로 업데이트
      const updatedPaths = paths.map((line, index) => {
        if (index === paths.length - 1) {
          return {
            ...line,
            path: `${line.path} L${locationX},${locationY}`,
          };
        }
        return line;
      });

      setPaths(updatedPaths);
    }
  };

  const handlePanResponderEnd = () => {
    setIsDrawing(false); // 그리기 상태 종료
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handlePanResponderStart, // 터치 시작 이벤트 핸들러
    onPanResponderMove: handlePanResponderMove, // 터치 이동 이벤트 핸들러
    onPanResponderRelease: handlePanResponderEnd, // 터치 종료 이벤트 핸들러
    onPanResponderTerminate: handlePanResponderEnd, // 터치 종료 이벤트 핸들러
  });

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Svg style={styles.canvas} {...panResponder.panHandlers}>
        {paths.map((line, index) => (
          <Path
            key={index}
            d={line.path}
            fill="none"
            stroke={line.color}
            strokeWidth={line.strokeWidth}
          />
        ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  canvas: {
    width: '100%',
    height: '100%',
  }
});
