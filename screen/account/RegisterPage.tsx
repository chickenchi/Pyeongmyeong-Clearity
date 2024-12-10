import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, TouchableOpacity} from 'react-native';
import {Modal} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Button,
  TextInput,
  View,
} from 'react-native';

import TextLink from 'react-native-text-link';

import Notification from '@components/common-popups/notification/NotificationPopup';

// import axios from 'axios';

interface RegisterPageProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

let no = 0;

const RegisterPage = ({navigation}: RegisterPageProps) => {
  const [request, req] = useState('');
  const [type, setType] = useState('');
  const [response, ChangeResponse] = useState<string>('');

  const showAlert = (script: any, type: any) => {
    req(script + '; ' + no);
    setType(type);
    no += 1;
  };

  const [email, setEmail] = useState('');
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');
  const [pwCheck, setPWCheck] = useState('');

  useEffect(() => {
    if (response == 'Success') {
      showAlert('계정이 생성되었습니다!', 'CreatedAccount');
      ChangeResponse('');
    } else if (response != '') {
      console.log(response);
      showAlert(response, 'error');
      ChangeResponse('');
    }
  }, [response]);

  const checkInput = () => {
    // 이메일 확인
    if (email == '') {
      showAlert('전자 우편 주소를 입력해 주세요.', 'error');
      return;
    } else if (email.indexOf('@') == -1) setEmail(email + '@clearity.co.kr');
    else if (email.split('@')[1] != 'clearity.co.kr') {
      showAlert(
        '유효한 전자 우편 주소가 아닙니다.\nclearity.co.kr을 사용해 주세요.',
        'error',
      );
      return;
    }

    if (id == '') {
      showAlert('계정(ID)을 입력해 주세요.', 'error');
      return;
    } else if (pw == '') {
      showAlert('비밀번호를 입력해 주세요.', 'error');
      return;
    } else if (pwCheck == '') {
      showAlert('비밀번호 확인란을 입력해 주세요.', 'error');
      return;
    } else if (pw != pwCheck) {
      showAlert('비밀번호와 확인이 일치하지 않습니다.', 'error');
      return;
    }

    try {
      const url = 'http://10.0.2.2:5000/register';

      const options = {
        id: id,
        pw: pw,
        email: email,
      };
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.BG}>
      <Notification request={request} type={type} />

      <Image
        source={require('@assets/images/logo/Logo.png')}
        style={styles.logo}
      />

      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        placeholder="전자 우편 주소 (ex12@clearity.co.kr)"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.TextInput}
        autoCapitalize="none"
        placeholder="계정(ID)"
        onChangeText={setID}
        value={id}
      />
      <TextInput
        secureTextEntry
        style={styles.TextInput}
        placeholder="비밀번호 (15자 이내)"
        onChangeText={setPW}
        value={pw}
      />
      <TextInput
        secureTextEntry
        style={styles.TextInput}
        placeholder="비밀번호 확인"
        onChangeText={setPWCheck}
        value={pwCheck}
      />

      <TouchableOpacity style={styles.Btn} onPress={checkInput}>
        <Text style={styles.BtnText}>들어가기</Text>
      </TouchableOpacity>

      <View style={styles.registerView}>
        <Text style={styles.notice}>이미 가입하셨나요?</Text>
        <TextLink
          links={[
            {
              text: '들어가기',
              onPress: () => navigation.navigate('login'),
            },
          ]}
          textStyle={styles.register}
          textLinkStyle={styles.register}>
          들어가기
        </TextLink>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '100%',
  },

  logo: {
    width: 150,
    height: 61,
    marginBottom: 35,
  },

  Btn: {
    width: '55%',
    height: 45,
    backgroundColor: '#399DF9',

    marginTop: 15,
    borderRadius: 10,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  BtnText: {
    color: 'white',
    fontSize: 15,

    fontFamily: 'Cafe24Oneprettynight',
  },

  TextInput: {
    backgroundColor: '#F2F2F2',
    width: '80%',
    height: 52,

    fontSize: 14,

    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 6,
    borderRadius: 6,

    fontFamily: 'Cafe24Oneprettynight',
  },

  registerView: {
    flexDirection: 'row',
    marginTop: 20,
  },

  notice: {
    marginRight: 16,

    fontSize: 14,
    color: '#A4A4A4',

    marginTop: 8,
    fontFamily: 'Cafe24Oneprettynight',
  },

  register: {
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'underline',

    marginTop: 8,
    fontFamily: 'Cafe24Oneprettynight',
  },

  modalBackground: {
    position: 'absolute',
  },

  modalView: {
    marginTop: Dimensions.get('screen').height / 2.5,
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
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
    fontWeight: 'bold',
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

export default RegisterPage;
