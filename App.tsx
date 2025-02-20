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
import {useFonts} from 'expo-font';
import CategoryPage from '@category/CategoryPage';
import {StartPopupProvider} from '@main/components/popup/StartPopupProvider';
import {AgeController} from 'screen/age/AgeController';
import Education from '@main/section/education/Education';
import BookmarkPage from 'screen/bookmark/BookmarkPage';
import {CustomAgeProvider} from '@category/section/selectCategoryPopup/CustomAgeProvider';

const Stack = createNativeStackNavigator<CommonType.RootStackPageList>();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Cafe24Oneprettynight: require('@assets/fonts/Cafe24Oneprettynight/Cafe24Oneprettynight.ttf'),
  });

  return (
    <NavigationContainer>
      <RecoilRoot>
        <CustomAgeProvider>
          <StartPopupProvider>
            <AgeController />
            <AlertProvider>
              <AlertManager />
              <Stack.Navigator
                initialRouteName="category"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="intro" component={Intro} />
                <Stack.Screen name="login" component={LoginPage} />
                <Stack.Screen name="register" component={RegisterPage} />
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="education" component={Education} />
                <Stack.Screen name="ranking" component={Ranking} />
                <Stack.Screen name="setting" component={Setting} />
                <Stack.Screen name="quiz" component={QuizPage} />
                <Stack.Screen name="category" component={CategoryPage} />
                <Stack.Screen name="bookmark" component={BookmarkPage} />
              </Stack.Navigator>
            </AlertProvider>
          </StartPopupProvider>
        </CustomAgeProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
};

export default App;
