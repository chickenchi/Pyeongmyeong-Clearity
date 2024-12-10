import {SafeAreaView, StyleSheet, View} from 'react-native';

import MainHeader from '@main/header/MainHeader';
import UnderConstruction from '@components/somepage/UnderConstruction';
import Tab from '@main/footer/Tab';

const Setting = () => {
  return (
    <SafeAreaView style={styles.BG}>
      <View style={styles.MainHeader}>
        <MainHeader />
      </View>

      <UnderConstruction />

      <View style={styles.tab}>
        <Tab colDir="setting" />
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
  tab: {
    position: 'absolute',
    bottom: 0,
  },
});

export default Setting;
