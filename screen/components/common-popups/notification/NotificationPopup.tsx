import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';

export type RootStackParam = {
  login: undefined;
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: Dimensions.get('screen').height / 2.5,
    margin: 30,
    backgroundColor: 'white',
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

  modalTextStyle: {
    color: '#17191c',
    fontFamily: 'Cafe24Oneprettynight',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 50,
  },

  centeredView: {
    flex: 1,
    alignContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
});

const Notification = (props: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  let response: any;

  const onPressModalClose = () => {
    setIsModalVisible(false);
  };

  const moveToLogin = () => {
    navigation.navigate('login');
  };

  useEffect(() => {
    console.log(response);
    response = props.request.split('; ')[0];
    if (response === undefined || response === '') return;
    setIsModalVisible(true);
  }, [props.request]);

  const Type = () => {
    if (props.type == 'error')
      return (
        <Pressable onPress={onPressModalClose}>
          <Text>확인</Text>
        </Pressable>
      );
    else if (props.type == 'CreatedAccount')
      return (
        <Pressable onPress={moveToLogin}>
          <Text>확인</Text>
        </Pressable>
      );
  };

  return (
    <View style={{marginBottom: 1}}>
      <Modal animationType="slide" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalTextStyle}>
                {props.request.split(';')[0]}
              </Text>
            </View>
            {Type()}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notification;
