import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Tab from '@main/footer/Tab';
import MainHeader from '@main/header/MainHeader';
import {useAlert} from '@components/common-popups/alert/AlertProvider';
import {getData} from '@utils/DataSetting';
import {ProfilePic, Setting} from '@assets/svgs/ProfileSVG';

const Profile = () => {
  const [corrected, updateCorrect] = useState<any>(null);
  const [solved, updateSolve] = useState<any>(null);
  const [wronged, updateWrong] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const correctData = await getData('correct');
        const wrongData = await getData('wrong');

        updateSolve(correctData + wrongData);
        updateCorrect(correctData);
        updateWrong(wrongData);
      };

      fetchData();
    }, []),
  );

  const {showAlert} = useAlert();

  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.MainHeader}>
        <MainHeader />
      </View>

      <View style={styles.profile}>
        <View style={styles.profilePic}>
          <ProfilePic />
        </View>
        <View style={styles.info}>
          <View style={styles.call}>
            <Text style={styles.callText}>새싹 📗</Text>
          </View>
          <Text style={styles.id}>guest0001</Text>
          <Text style={styles.name}>정보 없음</Text>
          <Text style={styles.introduce}>미가입된 계정입니다.</Text>
          <TouchableOpacity
            style={styles.setting}
            onPress={() => {
              showAlert({
                title: '평명',
                description: `추후 추가할 예정입니다.`,
                type: 'okay',
                onConfirm: () => {},
              });
            }}>
            <Setting />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.general}>
        <Text style={styles.generalTitle}>일반</Text>
        <View style={styles.textSet}>
          <Text style={styles.generalText}>푼 문제 수</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.generalValue}>{solved}개</Text>
        </View>
        <View style={styles.textSet}>
          <Text style={styles.generalText}>정답</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.generalValue}>{corrected}개</Text>
        </View>
        <View style={styles.textSet}>
          <Text style={styles.generalText}>오답</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.generalValue}>{wronged}개</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View style={styles.tab}>
        <Tab colDir="profile" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  BG: {
    backgroundColor: 'white',
    alignItems: 'center',
    flex: 1,
  },
  MainHeader: {
    alignItems: 'flex-start',
    width: '100%',
  },
  profile: {
    width: '100%',
    height: '18%',
    marginTop: 130,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    backgroundColor: 'red',

    justifyContent: 'center',

    height: 150,

    marginLeft: 50,
  },
  info: {
    backgroundColor: 'red',
    flexDirection: 'column',
    justifyContent: 'center',

    width: '80%',
    height: 150,
  },
  call: {
    width: 80,
    height: 25,

    borderWidth: 1.5,
    borderColor: '#C1C1C1',
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  callText: {
    fontSize: 12,
    color: 'black',
  },
  id: {
    fontSize: 15,
    color: '#C1C1C1',
    fontWeight: '500',
  },
  name: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: '600',
    color: 'black',
  },
  introduce: {
    fontSize: 15,
  },
  setting: {
    position: 'absolute',
    right: 190,
    top: 0,
  },
  general: {
    height: '100%',
    width: '100%',
  },
  generalTitle: {
    left: 35,
    top: 10,
    fontSize: 27,
    fontWeight: '600',
    color: '#C1C1C1',
    marginBottom: -10,
  },
  textSet: {
    marginTop: 30,
    left: 40,
    top: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  generalText: {
    fontSize: 20,
    color: '#C1C1C1',
  },
  generalValue: {
    left: 30,
    fontSize: 20,
    fontWeight: '500',
    color: '#888888',
  },
  tab: {
    position: 'absolute',
    bottom: 0,
  },
  verticalLine: {
    left: 15,
    backgroundColor: '#F5F5F5',
    height: '100%',

    marginTop: 5,
    width: 2,
  },
  line: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    height: 2,
    width: '90%',
  },
});

export default Profile;
