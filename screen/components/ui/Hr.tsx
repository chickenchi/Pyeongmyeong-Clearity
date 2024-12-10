import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const Hr = () => {
    return (
        <View style={styles.horizonLine} />
    )
}

const styles = StyleSheet.create({
    horizonLine: {
      backgroundColor: '#C1C1C1',
      height: 1,
      width: Dimensions.get('screen').height,
    },
  });

export default Hr;