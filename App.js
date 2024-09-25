import { BottomNavigation, PaperProvider } from 'react-native-paper';
import Home from './components/home';
import History from './components/history';
import Settings from './components/settings';
import { useState } from 'react';
import { WorkoutProvider } from "./components/WorkoutContext";
import { useFonts } from 'expo-font'

const routes = [
  { key: 'home', title: 'Add workout', focusedIcon: 'plus' },
  { key: 'history', title: 'Workouts', focusedIcon: 'account' },
  { key: 'settings', title: 'Settings', focusedIcon: 'cog' }
];

const renderScene = BottomNavigation.SceneMap({
  home: Home,
  history: History,
  settings: Settings
});

export default function App() {
  const [index, setIndex] = useState(0);


  //fontti 
  const [loadedFont] = useFonts({
    BebasNeue: require('./assets/fonts/BebasNeue-Regular.ttf'),
  });
 
  if (!loadedFont) {
    return null;
  }

  return (
    <WorkoutProvider>
      <PaperProvider>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{ backgroundColor: '#ffffffff' }}
          activeColor='#5b12a3'
          activeIndicatorStyle="none"
          inactiveColor='#5b12a3'/>
      </PaperProvider>
    </WorkoutProvider>
  );
}
