import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';

export type RootStackParam = {
  word: undefined;
  spelling: undefined;
};

const Popup = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let response;

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {}, []);

  return (
    <View style={{marginBottom: 1}}>
      <Modal animationType="slide" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}></View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default Popup;
