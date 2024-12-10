import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommonType} from './types/common/CommonType';
import {RecoilRoot} from 'recoil';

import Intro from './screen/Intro';
import LoginPage from '@account/LoginPage';
import RegisterPage from '@account/RegisterPage';
import Home from '@main/section/home/Home';
import Profile from '@main/section/profile/Profile';
import Ranking from '@main/section/ranking/Ranking';
import Setting from '@main/section/setting/Setting';
import {QuizPage} from '@quiz/QuizPage';
import {AlertProvider} from '@components/common-popups/alert/AlertProvider';
import {AlertManager} from '@components/common-popups/alert/AlertManager';

const Stack = createNativeStackNavigator<CommonType.RootStackPageList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RecoilRoot>
        <AlertProvider>
          <AlertManager />
          <Stack.Navigator
            initialRouteName="profile"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="intro" component={Intro} />
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="register" component={RegisterPage} />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="ranking" component={Ranking} />
            <Stack.Screen name="setting" component={Setting} />
            <Stack.Screen name="quiz" component={QuizPage} />
          </Stack.Navigator>
        </AlertProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
};

export default App;