import React, {useRef} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useCustomAge} from './CustomAgeProvider';

export const CustomAgeManager = () => {
  const {customAge, hideCustomAge} = useCustomAge();
  const hideInputRef = useRef<TextInput | null>(null);

  return (
    <Modal transparent={true} visible={!!customAge} animationType="fade">
      <View style={styles.alertContainer}>
        <View style={styles.alert}>
          <Text style={styles.title}>사용자 지정</Text>
          <Text style={styles.description}></Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.no}
              onPress={() => {
                hideCustomAge();
                customAge?.onCancel();
              }}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yes}
              onPress={() => {
                hideCustomAge();
                customAge?.onConfirm();
              }}>
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            ref={hideInputRef}
            style={styles.hideInput}
            autoFocus={true}
            onBlur={() => hideInputRef.current?.focus()}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alert: {
    backgroundColor: 'rgb(250, 250, 250)',
    minWidth: 340,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  yes: {
    backgroundColor: 'none',
    width: 80,
    height: 35,
    borderRadius: 5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  no: {
    backgroundColor: 'none',
    width: 80,
    height: 35,
    borderRadius: 5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  hideInput: {
    position: 'absolute',
    left: -9999,
    width: 1,
    height: 1,
  },
});
