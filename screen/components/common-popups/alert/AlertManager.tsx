import React, { useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useAlert } from './AlertProvider';

export const AlertManager = () => {
  const { alert, hideAlert } = useAlert();
  const hideInputRef = useRef<TextInput | null>(null);

  return (
    <Modal transparent={true} visible={!!alert} animationType="fade">
      <View style={styles.alertContainer}>
        <View style={styles.alert}>
          <Text style={styles.title}>{alert?.title}</Text>
          <Text style={styles.description}>
            {alert?.description?.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {'\n'}
              </React.Fragment>
            ))}
          </Text>
          <View style={styles.btnContainer}>
            {alert?.type === 'select' ? (
              <>
                <TouchableOpacity
                  style={styles.yes}
                  onPress={() => {
                    alert?.onConfirm();
                    hideAlert();
                  }}>
                  <Text style={styles.buttonText}>네</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.no} onPress={hideAlert}>
                  <Text style={styles.buttonText}>아니요</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.yes}
                  onPress={() => {
                    hideAlert();
                  }}>
                  <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
              </>
            )}
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
    minWidth: 240,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 17,
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
    fontSize: 14,
  },
  hideInput: {
    position: 'absolute',
    left: -9999,
    width: 1,
    height: 1,
  },
});
