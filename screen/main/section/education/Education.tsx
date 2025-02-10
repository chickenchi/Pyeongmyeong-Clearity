import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DayImg,
  EducationImg,
  OpenImg,
  TimerImg,
} from '@assets/svgs/EducationSVG';

import Tab from '@main/footer/Tab';
import {useStartPopup} from '@main/components/popup/StartPopupProvider';
import MainHeader from '@main/header/MainHeader';

interface HomePageProps {
  navigation: NativeStackNavigationProp<any, 'default'>;
}

const Education = ({navigation}: HomePageProps) => {
  const Test = () => {
    navigation.navigate('login');
  };

  const {showStartPopup} = useStartPopup();

  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.MainHeader}>
        <MainHeader />
      </View>

      <View style={styles.educationDiv}>
        <View style={styles.education}>
          <View style={styles.educationTitleDiv}>
            <Text style={styles.educationText}>학습</Text>
            <EducationImg />
          </View>
          <View style={styles.category}>
            <Text style={styles.categoryText}>최근</Text>
            <OpenImg />
          </View>
          <View style={styles.line} />
          <View style={styles.textSet}>
            <Text style={styles.educationTitle}>본용언과 보조 용언</Text>
            <View style={styles.educationDateView}>
              <Text style={styles.educationDateTime}>1초 전</Text>
              <TimerImg />
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.textSet}>
            <Text style={styles.educationTitle}>품사</Text>
            <View style={styles.educationDateView}>
              <Text style={styles.educationDateTime}>10분 전</Text>
              <TimerImg />
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.textSet}>
            <Text style={styles.educationTitle}>무성음과 유성음</Text>
            <View style={styles.educationDateView}>
              <Text style={styles.educationDateTime}>1일 전</Text>
              <DayImg />
            </View>
          </View>
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.tab}>
        <Tab colDir="education" />
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
    marginBottom: 150,
  },
  educationDiv: {
    width: '80%',
    height: 'auto',
    flexDirection: 'row',
  },
  education: {
    height: '100%',
    width: '100%',
  },
  educationTitleDiv: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 30,
  },
  educationText: {
    fontSize: 27,
    fontWeight: '600',
    color: '#C1C1C1',

    marginRight: 10,
  },
  category: {
    flexDirection: 'row',

    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 10,
  },
  categoryText: {
    color: '#C1C1C1',
    fontSize: 16,

    marginRight: 7,
  },
  textSet: {
    position: 'relative',
    width: '100%',

    height: 70,

    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationTitle: {
    fontSize: 25,
    color: '#888888',
    fontWeight: 700,

    marginLeft: 10,
  },
  educationDateView: {
    position: 'absolute',
    top: 0,
    right: 0,

    alignItems: 'center',
    flexDirection: 'row',
  },
  educationDateTime: {
    color: '#C1C1C1',

    fontSize: 17,
    marginRight: 8,
  },
  educationValue: {
    left: 30,
    fontSize: 20,
    fontWeight: '500',
    color: '#888888',
  },
  line: {
    backgroundColor: '#F5F5F5',
    height: 2,
    width: '100%',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 65,
  },
  tab: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Education;
