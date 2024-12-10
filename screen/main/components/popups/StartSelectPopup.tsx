import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export type RootStackParam = {
  login: undefined;
};

const SelectPopup = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [response, ChangeResponse] = useState<any>(undefined);

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    ChangeResponse(props.request.split(';')[0]);
    if (response === undefined) return;
    setIsModalVisible(true);
  }, [props.request]);

  const Type = () => {
    if (props.type == 'Select')
      return (
        <View style={styles.BtnContainer}>
          <TouchableOpacity style={styles.Btn} onPress={onPressModalClose}>
            <Text style={styles.BtnText}>아니요</Text>
          </TouchableOpacity>
          <Text style={styles.verticalLine}>|</Text>
          <TouchableOpacity
            style={styles.Btn}
            onPress={() => {
              onPressModalClose();
              props.active();
            }}>
            <Text style={styles.BtnText}>네</Text>
          </TouchableOpacity>
        </View>
      );
    else if (props.type == 'Okay')
      return (
        <View style={styles.BtnContainer}>
          <TouchableOpacity style={styles.Btn} onPress={onPressModalClose}>
            <Text style={styles.BtnText}>확인</Text>
          </TouchableOpacity>
        </View>
      );
  };

  return (
    <View style={{marginBottom: 1}}>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.alertTitle}>알림</Text>
              <Text style={styles.modalTextStyle}>{response}</Text>
            </View>
            {Type()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: Dimensions.get('screen').height / 3,
    margin: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  alertTitle: {
    color: '#17191c',
    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  modalTextStyle: {
    color: '#17191c',
    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 19,
    textAlign: 'center',
    marginBottom: 20,
  },

  centeredView: {
    flex: 1,
    alignContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  BtnContainer: {
    flexDirection: 'row',

    justifyContent: 'center',
  },

  Btn: {
    width: '50%',

    alignItems: 'center',
    justifyContent: 'center',
  },

  BtnText: {
    color: '#17191c',
    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 17,
    textAlign: 'center',
  },

  verticalLine: {
    color: '#17191c',
  },
});

export default SelectPopup;
